/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FullView, FullViewParser, SankeyJsonParser, ScatterPlotJsonParser,
} from '../model/io/jsonviewparser';
import { ViewIOError, ViewParser } from '../model/io/viewio';

const Status = ({ status }: { status: CurrentStatus }) => {
  switch (status) {
    case CurrentStatus.Init:
      return <div>Pronto al caricamento della view</div>;
    case CurrentStatus.Loading:
      return <div>Caricamento in corso...</div>;
    case CurrentStatus.TooMany:
      return <div className="msgFail">Puoi caricare al massimo un file alla volta</div>;
    case CurrentStatus.Aborted:
    case CurrentStatus.Failed:
      // eslint-disable-next-line react/no-unescaped-entities
      return <div className="msgFail">C'è stato un errore durante il caricamento del file</div>;
    case CurrentStatus.Incomplete:
      return <div className="msgFail">Il file risulta essere incompleto</div>;
    case CurrentStatus.WrongFormat:
      return <div className="msgFail">Il file risulta essere del formato errato</div>;
    case CurrentStatus.Ok:
      return <div className="msgSuccess">Vista caricata con successo!</div>;
    default:
      // throw new AssertionError({ message: 'Unreachable! unexpected status!' });
      return <div />;
  }
};

export interface ViewsLoaderProp {
  viewsParser: ViewParser<FullView>;
  updateViews: (v: FullView) => void;
}

enum CurrentStatus {
  Init,
  TooMany,
  Aborted,
  Failed,
  Loading,
  Incomplete,
  WrongFormat,
  Ok,
}

export const ViewsLoader = ({ viewsParser, updateViews }: ViewsLoaderProp) => {
  const [status, setStatus] = useState(CurrentStatus.Init);

  const onViewsUpload = (files: Blob[]) => {
    if (files.length === 0) {
      return;
    }

    if (files.length !== 1) {
      setStatus(CurrentStatus.TooMany);
    }

    const reader = new FileReader();

    reader.onabort = () => setStatus(CurrentStatus.Aborted);
    reader.onerror = () => setStatus(CurrentStatus.Failed);
    reader.onload = () => {
      setStatus(CurrentStatus.Loading);
      const content = reader.result as string;
      const parsed = viewsParser.parse(content);

      if (parsed === ViewIOError.MissingField || parsed === ViewIOError.Null) {
        setStatus(CurrentStatus.Incomplete);
        return;
      }

      if (parsed === ViewIOError.WrongFormat) {
        setStatus(CurrentStatus.WrongFormat);
        return;
      }

      updateViews(parsed);
      setStatus(CurrentStatus.Ok);
    };

    reader.readAsText(files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onViewsUpload });

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
      <Status status={status} />
    </div>
  );
};

export interface JSONViewsLoaderViewProp {
  updateViews: (v: FullView) => void;
}
export const JSONViewsLoaderView = ({ updateViews }: JSONViewsLoaderViewProp) => ViewsLoader({
  viewsParser: new FullViewParser(new ScatterPlotJsonParser(), new SankeyJsonParser()),
  updateViews,
});
