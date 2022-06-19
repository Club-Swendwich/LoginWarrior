/* eslint-disable react/jsx-props-no-spreading */

// import { AssertionError } from 'assert';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dataset } from '../model/dataset';
import { CSVDatasetParser, DatasetParser, ParseError } from '../model/io/datasetloader';

const Status = ({ status }: { status: CurrentStatus }) => {
  switch (status) {
    case CurrentStatus.Init:
      return null;
    case CurrentStatus.Loading:
      return <div className="msgInfo">Caricamento in corso...</div>;
    case CurrentStatus.TooMany:
      return <div className="msgFail">Puoi caricare al massimo un file alla volta</div>;
    case CurrentStatus.Aborted:
    case CurrentStatus.Failed:
      // eslint-disable-next-line react/no-unescaped-entities
      return <div className="msgFail">C'è stato un errore durante il caricamento del file</div>;
    case CurrentStatus.InvalidFormat:
      return <div className="msgFail">Il file risulta essere del formato sbagliato</div>;
    case CurrentStatus.InvalidRow:
      return <div className="msgFail">Il dataset risulta essere malformato</div>;
    case CurrentStatus.Ok:
      return <div className="msgSuccess">Dataset caricato con successo!</div>;
    default:
      // throw new AssertionError({ message: 'Unreachable! unexpected status!' });
      return <div />;
  }
};

export interface DatasetLoaderProps {
  datasetParser: DatasetParser;
  updateDataset: (d: Dataset) => void;
}

enum CurrentStatus {
  Init,
  Loading,
  TooMany,
  Aborted,
  Failed,
  InvalidFormat,
  InvalidRow,
  Ok,
}

export const LoadDatasetView = (prop : DatasetLoaderProps) => {
  const { datasetParser, updateDataset } = prop;

  const [status, setStatus] = useState(CurrentStatus.Init);

  const onDatasetUpload = (files: Blob[]) => {
    if (files.length === 0) {
      return;
    }

    if (files.length !== 1) {
      setStatus(CurrentStatus.TooMany);
    }

    const reader = new FileReader();

    setStatus(CurrentStatus.Loading);
    reader.onabort = () => setStatus(CurrentStatus.Aborted);
    reader.onerror = () => setStatus(CurrentStatus.Failed);
    reader.onload = () => {
      const content = reader.result as string;
      const cleanContent = content.replace(/^[\r\n]+/gm, '');
      const parsed = datasetParser.parse(cleanContent);

      if (parsed === ParseError.InvalidFormat) {
        setStatus(CurrentStatus.InvalidFormat);
        return;
      }

      if (parsed === ParseError.InvalidRow) {
        setStatus(CurrentStatus.InvalidRow);
        return;
      }

      updateDataset(parsed);
      setStatus(CurrentStatus.Ok);
    };

    reader.readAsText(files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDatasetUpload });

  return (
    <div className="Drag">
      <p>Caricamento del dataset:</p>
      <div className="dragArea" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Clicca qui o trascina il file csv nel riquadro</p>
      </div>
      <Status status={status} />
    </div>
  );
};

export interface CSVDatasetLoaderViewProps {
  updateDataset: (d: Dataset) => void;
}
export const CSVDatasetLoaderView = ({ updateDataset }: CSVDatasetLoaderViewProps) => LoadDatasetView({ updateDataset, datasetParser: new CSVDatasetParser(';') });
