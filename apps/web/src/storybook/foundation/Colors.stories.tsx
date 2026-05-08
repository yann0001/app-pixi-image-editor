import type { ReactElement, ReactNode } from "react";
import { DocumentationDecorator, DocumentationLayout } from "@package/storybook";

export default {
  title: "Design System/Colors",
  tags: ["no-tests"],
  decorators: [DocumentationDecorator],
  parameters: {
    a11y: {
      test: "off",
    },
    layout: "fullscreen",
  },
};

function ColorSection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div>
      <p className="text-xl font-medium">{title}</p>
      <div className="h-2" />
      <div className="flex h-full w-full flex-row flex-wrap items-center justify-start gap-3 px-4 py-1">{children}</div>
    </div>
  );
}

function ColorItem({ name, bgClass, textClass }: { name: string; bgClass: string; textClass: string }): ReactElement {
  return (
    <div
      className={`${bgClass} ${textClass} flex h-14 w-36 items-center justify-center rounded-lg px-2 text-xs font-medium`}
    >
      {name}
    </div>
  );
}

export function Colors(): ReactElement {
  return (
    <DocumentationLayout label="Colors">
      <div className="h-4" />
      <div className="flex flex-col gap-6">
        <ColorSection title="Brand">
          <ColorItem name="primary" bgClass="bg-primary" textClass="text-primary-content" />
          <ColorItem name="primary-content" bgClass="bg-primary-content" textClass="text-primary" />
          <ColorItem name="secondary" bgClass="bg-secondary" textClass="text-secondary-content" />
          <ColorItem name="secondary-content" bgClass="bg-secondary-content" textClass="text-secondary" />
          <ColorItem name="accent" bgClass="bg-accent" textClass="text-accent-content" />
          <ColorItem name="accent-content" bgClass="bg-accent-content" textClass="text-accent" />
          <ColorItem name="neutral" bgClass="bg-neutral" textClass="text-neutral-content" />
          <ColorItem name="neutral-content" bgClass="bg-neutral-content" textClass="text-neutral" />
        </ColorSection>
        <ColorSection title="Base">
          <ColorItem name="base-100" bgClass="bg-base-100" textClass="text-base-content" />
          <ColorItem name="base-200" bgClass="bg-base-200" textClass="text-base-content" />
          <ColorItem name="base-300" bgClass="bg-base-300" textClass="text-base-content" />
          <ColorItem name="base-content" bgClass="bg-base-content" textClass="text-base-100" />
        </ColorSection>
        <ColorSection title="State">
          <ColorItem name="info" bgClass="bg-info" textClass="text-info-content" />
          <ColorItem name="info-content" bgClass="bg-info-content" textClass="text-info" />
          <ColorItem name="success" bgClass="bg-success" textClass="text-success-content" />
          <ColorItem name="success-content" bgClass="bg-success-content" textClass="text-success" />
          <ColorItem name="warning" bgClass="bg-warning" textClass="text-warning-content" />
          <ColorItem name="warning-content" bgClass="bg-warning-content" textClass="text-warning" />
          <ColorItem name="error" bgClass="bg-error" textClass="text-error-content" />
          <ColorItem name="error-content" bgClass="bg-error-content" textClass="text-error" />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
