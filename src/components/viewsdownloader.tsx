import React, { useState } from 'react';
import { FullView } from '../model/io/jsonviewparser';
import { ViewIOError, ViewSerializer } from '../model/io/viewio';

interface ViewsDownloaderProp {
  readonly views: FullView;
  readonly serializer: ViewSerializer<FullView>;
}

export const ViewsDownloaderButton = (props: ViewsDownloaderProp) => {
  const { views, serializer } = props;

  const [error, setError] = useState(false);

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
