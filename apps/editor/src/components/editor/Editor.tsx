import type { ComponentProps } from "react";
import type { ReactElement } from "react";
import { imageAtom } from "./atoms/ImageAtoms";
import { imageUrlAtom } from "./atoms/ImageUrlAtoms";
import type { ContentProps } from "./content/Content";
import { Content } from "./content/Content";
import type { WithImageProps } from "~/core/image/WithImage";
import { withImage } from "~/core/image/WithImage";
import ErrorBoundary from "~/core/utils/ErrorBoundary";
import { HydrateAtoms } from "~/core/utils/HydrateAtoms";

interface ImageEditorWithImageProps extends ContentProps, WithImageProps {
  url: string;
}

function Editor({ url, image, ...contentProps }: ImageEditorWithImageProps): ReactElement {
  return (
    <ErrorBoundary fallback={<h1>Internal error</h1>}>
      <HydrateAtoms
        atomValues={[
          [imageUrlAtom, url],
          [imageAtom, image],
        ]}
      >
        <Content {...contentProps} />
      </HydrateAtoms>
    </ErrorBoundary>
  );
}

const editorWithImage = withImage(Editor);

export interface ImageEditorProps extends ComponentProps<typeof editorWithImage> {}

export { editorWithImage as ImageEditor };
