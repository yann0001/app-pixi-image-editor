import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import type { Command } from "./Command";
import { type CommandShortcut, isMac } from "./CommandShortcut";
import { useCommandPaletteKeyboard } from "./UseCommandPaletteKeyboard";

export interface CommandPaletteProps {
  isOpen: boolean;
  commands: Command[];
  onClose: () => void;
}

interface CommandGroup {
  name: string;
  commands: Command[];
}

const DEFAULT_GROUP = "__default__";

function filterCommands(commands: Command[], query: string): Command[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return commands;
  }
  return commands.filter((command) => {
    const haystack = [command.label, command.description ?? "", ...(command.keywords ?? []), command.group ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

function groupCommands(commands: Command[]): CommandGroup[] {
  const groups = new Map<string, Command[]>();
  for (const command of commands) {
    const key = command.group ?? DEFAULT_GROUP;
    const existing = groups.get(key);
    if (existing) {
      existing.push(command);
    } else {
      groups.set(key, [command]);
    }
  }
  return Array.from(groups.entries()).map(([name, cmds]) => ({ name, commands: cmds }));
}

function ShortcutDisplay({ shortcut }: { shortcut: CommandShortcut }): ReactElement {
  const mac = isMac();
  return (
    <span className="flex items-center gap-0.5">
      {shortcut.mod && <kbd className="kbd kbd-sm text-[10px]">{mac ? "⌘" : "Ctrl"}</kbd>}
      {shortcut.alt && <kbd className="kbd kbd-sm text-[10px]">{mac ? "⌥" : "Alt"}</kbd>}
      {shortcut.shift && <kbd className="kbd kbd-sm text-[10px]">{mac ? "⇧" : "Shift"}</kbd>}
      <kbd className="kbd kbd-sm text-[10px]">{shortcut.key.toUpperCase()}</kbd>
    </span>
  );
}

export function CommandPalette({ isOpen, commands, onClose }: CommandPaletteProps): ReactElement {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = useMemo(() => filterCommands(commands, query), [commands, query]);
  const groups = useMemo(() => groupCommands(filtered), [filtered]);

  useEffect(() => {
    if (filtered.length === 0) {
      setActiveId(undefined);
      return;
    }
    setActiveId((prev) => (prev && filtered.some((c) => c.id === prev) ? prev : filtered[0]!.id));
  }, [filtered]);

  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const element = listRef.current.querySelector<HTMLElement>(`[data-command-id="${activeId}"]`);
    element?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  function runCommandById(id: string): void {
    const command = commands.find((c) => c.id === id);
    if (!command) return;
    onClose();
    queueMicrotask(() => command.perform());
  }

  useCommandPaletteKeyboard({ isOpen, filtered, activeId, commands, onClose, setActiveId });

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:backdrop-blur-sm"
      aria-label={intl.formatMessage({
        description: "CommandPalette: aria-label - dialog",
        defaultMessage: "Command palette",
        id: "dgEdHD",
      })}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-box flex h-120 max-h-[calc(100dvh-4rem)] w-full max-w-lg flex-col overflow-hidden p-0 shadow-2xl">
        <div className="border-base-300 flex shrink-0 items-center gap-3 border-b px-4 py-3">
          <MagnifyingGlassIcon className="text-base-content/50 h-5 w-5 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={intl.formatMessage({
              description: "CommandPalette: placeholder - search",
              defaultMessage: "Type a command or search…",
              id: "jzHua/",
            })}
            aria-activedescendant={activeId ? `command-palette__option-${activeId}` : undefined}
            data-testid="command-palette__search"
            className="bg-base-100 text-base-content placeholder:text-base-content/40 flex-1 text-sm outline-none"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2" tabIndex={0}>
          <div ref={listRef} className="h-full">
            {filtered.length === 0 ? (
              <div className="text-base-content/50 flex h-full items-center justify-center p-6 text-sm">
                {intl.formatMessage({
                  description: "CommandPalette: empty-state - no commands found",
                  defaultMessage: "No commands found",
                  id: "TtuPpt",
                })}
              </div>
            ) : (
              <div role="listbox" aria-label="Commands" className="flex flex-col gap-3">
                {groups.map((group) => (
                  <div key={group.name}>
                    {group.name !== DEFAULT_GROUP && (
                      <div className="text-base-content/50 px-2 pb-1 text-xs font-medium uppercase">{group.name}</div>
                    )}
                    <div className="flex flex-col">
                      {group.commands.map((command) => {
                        const isActive = command.id === activeId;
                        return (
                          <div
                            key={command.id}
                            id={`command-palette__option-${command.id}`}
                            role="option"
                            aria-selected={isActive}
                            data-command-id={command.id}
                            data-testid={`command-palette__item-${command.id}`}
                            onMouseEnter={() => setActiveId(command.id)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              runCommandById(command.id);
                            }}
                            className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                              isActive
                                ? "bg-primary/10 text-base-content font-medium"
                                : "text-base-content/70 hover:text-base-content"
                            }`}
                          >
                            {command.icon && (
                              <span className="text-base-content/60 flex h-5 w-5 items-center justify-center">
                                {command.icon}
                              </span>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate">{command.label}</span>
                              {command.description && (
                                <span className="text-base-content/50 truncate text-xs">{command.description}</span>
                              )}
                            </div>
                            {command.shortcut && <ShortcutDisplay shortcut={command.shortcut} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
