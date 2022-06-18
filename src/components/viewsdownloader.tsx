import React, { useMemo, useState } from 'react';
import { AnyViewJsonSerializer } from '../model/io/jsonviewserializer';
import { ViewIOError, ViewSerializer } from '../model/io/viewio';
import { FullView } from '../model/views';

interface ViewsDownloaderViewProp {
  readonly views: FullView | null;
  readonly serializer: ViewSerializer<FullView>;
}

export const ViewsDownloaderView = (props: ViewsDownloaderViewProp) => {
  const { views, serializer } = props;

  const [error, setError] = useState(false);

  const Inner = useMemo(() => {
    if (views === null) {
      return <p className="msgInfo">Nessuna vista disponibile al momento.</p>;
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
        <div className="saveViewButtonArea">
          <button onClick={downloadViews} type="button">Scarica le viste!</button>
        </div>
        { error && <div className="errorMsg">C&apos è stato un errore durante il salvataggio delle viste.</div> }
      </>
    );
  }, [views, serializer, error]);

  return (
    <div>
      <h3>Download viste:</h3>
      { Inner }
    </div>
  );
};

export interface JSONViewsDownloaderViewProp {
  readonly views: FullView | null;
}

// eslint-disable-next-line max-len
export const JSONViewsDownloaderView = ({ views }: JSONViewsDownloaderViewProp) => ViewsDownloaderView({ views, serializer: new AnyViewJsonSerializer() });
