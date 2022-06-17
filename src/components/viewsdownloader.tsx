import React, { useState } from 'react';
import { FullView } from '../model/io/jsonviewparser';
import { AnyViewJsonSerializer } from '../model/io/jsonviewserializer';
import { ViewIOError, ViewSerializer } from '../model/io/viewio';

interface ViewsDownloaderViewProp {
  readonly views: FullView | null;
  readonly serializer: ViewSerializer<FullView>;
}

export const ViewsDownloaderView = (props: ViewsDownloaderViewProp) => {
  const { views, serializer } = props;

  const [error, setError] = useState(false);

  if (views === null) {
    return <div>Nessuna vista disponibile al momento.</div>;
  }

  const serialize = () => serializer.serialize(views);

  const downloadViews = () => {
    const serialized = serialize();
    if (serialized === ViewIOError.Null) {
      setError(true);
      return;
    }

    const element = document.createElement('a');
    const file = new Blob(
      [serialized as string],
      { type: serializer.contentType },
    );

    element.href = URL.createObjectURL(file);
    element.download = `viste.${serializer.extension}`;
    document.body.append(element);
    element.click();
  };

  return (
    <>
      <button onClick={downloadViews} type="button">Scarica le viste!</button>
      { error && <div className="errorMsg">C&apos è stato un errore durante il salvataggio delle viste.</div> }
    </>
  );
};

export interface JSONViewsDownloaderViewProp {
  readonly views: FullView | null;
}

// eslint-disable-next-line max-len
export const JSONViewsDownloaderView = ({ views }: JSONViewsDownloaderViewProp) => ViewsDownloaderView({ views, serializer: new AnyViewJsonSerializer() });
