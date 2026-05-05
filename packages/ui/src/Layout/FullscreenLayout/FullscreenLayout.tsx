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
  className?: string;
  children: ReactNode;
}

export function FullscreenLayout({
  container,
  footer,
  className,
  onGithubClick,
  onLinkedInClick,
  children,
}: FullscreenLayoutProps): ReactElement {
  return (
    <div className={clsx("grid h-dvh w-full grid-rows-[1fr_auto]", className)}>
      <main
        className={clsx(
          "flex min-h-0 flex-col items-center justify-center overflow-y-auto",
          container && "container mx-auto w-full"
        )}
      >
        {children}
      </main>
      {footer && (
        <footer className="bg-base-200 px-4 pt-0 pb-5">
          <div className="from-primary/40 via-secondary/40 to-accent/40 mb-4 h-px bg-linear-to-r" />
          <div className="flex flex-col items-center gap-3">
            <nav className="flex gap-2">
              <button
                className="btn btn-circle btn-outline btn-xs btn-neutral fill-neutral hover:fill-neutral-content"
                onClick={onGithubClick}
                aria-label="GitHub"
              >
                <GithubIcon />
              </button>
              <button
                className="btn btn-circle btn-outline btn-xs btn-info fill-info hover:fill-info-content"
                onClick={onLinkedInClick}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </button>
            </nav>
            <div className="text-center">
              <p className="text-sm font-semibold">Made with ☕ by Petter Hancock</p>
              <p className="text-base-content/50 text-xs">Copyright © 2026 — All rights reserved</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
