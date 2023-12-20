'use client';

import { useState } from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';

interface DragAndDropProps {
  tranformImageToCode: (file: File) => Promise<void>;
}

export function DragAndDrop({ tranformImageToCode }: DragAndDropProps) {
  // const [Files, setFiles] = useState<ExtFile[]>([]);

  function updateFiles(files: ExtFile[]) {
    const file = files[0].file;
    if (file != null) tranformImageToCode(file);

    // setFiles(files);
  }

  return (
    <Dropzone
      header={false}
      footer={false}
      maxFiles={1}
      accept='image/*'
      label='Arrastra aquí tu captura de pantalla'
      onChange={updateFiles}>
      {/* {Files.map((file, index) => (
        <FileMosaic key={index} {...file} preview />
      ))} */}
    </Dropzone>
  );
}
