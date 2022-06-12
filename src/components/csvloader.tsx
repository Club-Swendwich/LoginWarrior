/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';

export interface CSVLoaderProps {
  onDrop: (a: any) => any
}

function CSVLoader(
  prop : CSVLoaderProps,
) {
  const { onDrop } = prop;
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      style={{
        display: 'flex', width: '100%', height: '150px', border: '1px dashed', justifyContent: 'center', alignItems: 'center',
      }}
      className="drag"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <h1>Clicca qui o trascina il file csv nel riquadro</h1>
    </div>
  );
}

export default CSVLoader;
