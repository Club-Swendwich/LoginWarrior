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

export interface DocumentJson {
  data: string;
  fileName: string;
  fileType: string;
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
      <h1>Clicca qui o trascina il file json nel riquadro</h1>
    </div>
  );
}

// export const ViewSettingsDownloader = async (prop: ViewSettingsDown) => {
//   const { viewSettings } = prop; // I am assuming that "this.state.myData"
//   // is an object and I wrote it to file as
//   // json
//   const fileName = 'file';
//   const json = JSON.stringify(viewSettings);
//   const blob = new Blob([json], { type: 'application/json' });
//   const href = await URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = href;
//   link.download = `${fileName}.json`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// function handleDownload(viewSettings: ViewJson) {
//   const data = JSON.stringify(viewSettings);
//   const fileDownload = require('react-file-download');
//   fileDownload(data, 'filename.json');
// }

const downloadFile = (documentJson: DocumentJson) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([documentJson.data], { type: documentJson.fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a');
  a.download = documentJson.fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

const exportToJson = (viewSettings: ViewJson) => {
  downloadFile({
    data: JSON.stringify(viewSettings),
    fileName: 'users.json',
    fileType: 'text/json',
  });
};

export function ViewSettingsDownloader(
  prop: ViewSettingsDown,
) {
  const { viewSettings } = prop;

  return (
    <button
      type="button"
      onClick={() => exportToJson(viewSettings)}
    >
      Download Json
    </button>
  );
}
