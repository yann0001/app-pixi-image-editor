import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { GithubIcon } from "../../Icons/Social/GithubIcon";
import { LinkedInIcon } from "../../Icons/Social/LinkedInIcon";

export interface SocialLinkProps {
  onGithubClick?: () => void;
  onLinkedInClick?: () => void;
}

export interface FullscreenLayoutProps extends SocialLinkProps {
  container?: boolean;
  footer?: boolean;
  children: ReactNode;
}

export function FullscreenLayout({
  container,
  footer,
  onGithubClick,
  onLinkedInClick,
  children,
}: FullscreenLayoutProps): ReactElement {
  return (
    <div className="grid h-dvh w-full grid-rows-[1fr_auto]">
      <main
        className={clsx(
          "flex min-h-0 flex-col items-center justify-center overflow-y-auto",
          container && "container mx-auto w-full"
        )}
      >
        {children}
      </main>
      {footer && (
        <footer className="border-base-300 bg-base-200 border-t px-4 py-5">
          <div className="flex flex-col items-center gap-3">
            <nav className="flex gap-1">
              <button
                className="btn btn-square btn-ghost fill-base-content/60 hover:fill-base-content p-2"
                onClick={onGithubClick}
                aria-label="GitHub"
              >
                <GithubIcon />
              </button>
              <button
                className="btn btn-square btn-ghost fill-base-content/60 hover:fill-base-content p-2"
                onClick={onLinkedInClick}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </button>
            </nav>
            <div className="text-center">
              <p className="text-sm font-semibold">Made with ☕ by Petter Hancock</p>
              <p className="text-base-content/50 text-xs">Copyright © 2024 — All rights reserved</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
