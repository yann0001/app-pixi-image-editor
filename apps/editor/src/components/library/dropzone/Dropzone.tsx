import type { ReactElement } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { useDropzone } from "./UseDropzone";

export interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export function Dropzone({ onDrop }: DropzoneProps): ReactElement {
  const intl = useIntl();
  const { getRootProps, getInputProps, getBackgroundClass } = useDropzone(onDrop);

  return (
    <div className="m-2 flex w-full max-w-screen-sm items-center justify-center md:min-w-96">
      <div {...getRootProps({ className: "w-full h-full" })}>
        <label
          htmlFor="dropzone-file"
          className={clsx(
            "glass border-neutral hover:bg-base-300 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all md:h-48 dark:bg-none",
            getBackgroundClass()
          )}
        >
          <input {...getInputProps()} data-testid="home__dropzone-input" />
          <div className="flex flex-col items-center justify-center">
            <DocumentArrowUpIcon className="fill-primary mb-4 h-8 w-8" />
            <p className="mb-2">
              <span className="font-semibold">
                {intl.formatMessage({
                  description: "Dropzone - click to upload label",
                  defaultMessage: "Click to upload",
                  id: "dropzone.clickToUpload",
                })}
              </span>{" "}
              {intl.formatMessage({
                description: "Dropzone - or drag and drop label",
                defaultMessage: "or drag and drop",
                id: "dropzone.dragAndDrop",
              })}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
