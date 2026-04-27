import type { ReactElement, ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export function DocumentationLayout({ label, children }: Props): ReactElement {
  return (
    <div className="md:m-4">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-3xl md:text-5xl">{label}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
