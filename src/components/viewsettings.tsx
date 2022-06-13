/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import ViewJson from '../model/viewjson';

export interface ViewSettingsUp {
  onDrop: (a: any) => any
}

export interface ViewSettingsDown {
  viewSettings: ViewJson;
}

export function ViewSettingsLoader(
  prop : ViewSettingsUp,
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

export function ViewSettingsDownloader(
  prop: ViewSettingsDown,
) {
  const { viewSettings } = prop;

  return (
    <button
      type="button"
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        viewSettings.viewToJson,
      )}`}
      download="viewSettings.json"
    >
      Download Json
    </button>
  );
}
