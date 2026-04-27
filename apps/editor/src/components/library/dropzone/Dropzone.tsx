import type { ReactElement } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useDropzone } from "./UseDropzone";

export interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export function Dropzone({ onDrop }: DropzoneProps): ReactElement {
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
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <DocumentArrowUpIcon className="fill-primary mb-4 h-8 w-8" />
            <p className="mb-2">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
