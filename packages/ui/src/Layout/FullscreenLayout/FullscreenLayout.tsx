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
        <footer className="footer footer-center bg-base-300 text-base-content gap-y-2 py-2 lg:p-4">
          <aside className="lg:mt-2">
            <p className="text-base font-bold">Made with ☕ by Petter Hancock</p>
            <p>Copyright © 2024 - All right reserved</p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-2">
              <button className="btn btn-square btn-ghost fill-primary p-2" onClick={onGithubClick}>
                <GithubIcon />
              </button>
              <button className="btn btn-square btn-ghost fill-primary p-2" onClick={onLinkedInClick}>
                <LinkedInIcon />
              </button>
            </div>
          </nav>
        </footer>
      )}
    </div>
  );
}
