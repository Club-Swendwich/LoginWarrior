/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dataset } from '../model/dataset';
import { CSVDatasetParser, DatasetParser, ParseError } from '../model/io/datasetloader';

const Status = ({ status }: { status: CurrentStatus }) => {
  switch (status) {
    case CurrentStatus.Init:
      return <div>Pronto al caricamento del dataset</div>
      case CurrentStatus.Init:
      return <div>Caricamento in corso...</div>
    case CurrentStatus.TooMany:
      return <div className='msgFail'>Puoi caricare al massimo un file alla volta</div>
    case CurrentStatus.Aborted:
    case CurrentStatus.Failed:
      return <div className='msgFail'>C'è stato un errore durante il caricamento del file</div>
    case CurrentStatus.InvalidFormat:
      return <div className='msgFail'>Il file risulta essere del formato sbagliato</div>
    case CurrentStatus.InvalidRow:
      return <div className='msgFail'>Una riga del dataset risulta essere malformato</div>
    case CurrentStatus.Ok:
      return <div className='msgSuccess'>Dataset caricato con successo!</div>
  }
}

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

export const LoadDatasetView = (prop : DatasetLoaderProps)  => {
  const { datasetParser, updateDataset } = prop;

  console.log("ds view");

  const [status, setStatus] = useState(CurrentStatus.Init);

  const onDatasetUpload = (files: Blob[]) => {
    if (files.length != 1) {
      setStatus(CurrentStatus.TooMany);
    }

    console.log("upload");

    const reader = new FileReader();

    reader.onabort = () => setStatus(CurrentStatus.Aborted);
    reader.onerror = () => setStatus(CurrentStatus.Failed);
    reader.onload = () => {
      setStatus(CurrentStatus.Loading);

      const content = reader.result as string;
      const cleanContent = content.replace(/^[\r\n]+/gm, '');
      const parsed = datasetParser.parse(cleanContent);

      console.log("parsed", parsed);

      if (parsed === ParseError.InvalidFormat) {
        setStatus(CurrentStatus.InvalidFormat);
        return;
      }

      if (parsed == ParseError.InvalidRow) {
        setStatus(CurrentStatus.InvalidRow);
        return;
      }

      updateDataset(parsed);
      setStatus(CurrentStatus.Ok);
    }

    reader.readAsText(files[0]);
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDatasetUpload });

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
      <Status status={status}/>
    </div>
  );
}

export interface CSVDatasetLoaderViewProps {
  updateDataset: (d: Dataset) => void;
}
export const CSVDatasetLoaderView = ({ updateDataset }: CSVDatasetLoaderViewProps ) => {
  return LoadDatasetView({ updateDataset, datasetParser: new CSVDatasetParser(";") });
}
