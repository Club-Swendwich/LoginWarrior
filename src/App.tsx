import React, {
  useState, useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import { Dataset } from './model/dataset';

//Dimensions
import { SPDimensions } from './scatterplot/dimensions';
import { SKDimensions } from './sankey/dimensions/SKDimensions';

//Composers
import SPViewComposer from './scatterplot/spviewcomposer';
import SKViewComposer from './sankey/sankviewcomposer';
import { CSVDatasetParser } from './model/datasetloader';

function App() {
  const parser = new CSVDatasetParser(';');

  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
      // Do whatever you want with the file contents
        setDataset(parser.parse((reader.result as string).replace(/^[\r\n]+/gm, '')) as Dataset);
        setDrag(true);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
    size: ['userId', { identifier: 'default', from: StorableType.Int, to: GraphableType.Int }],
    shape: ['appId', { identifier: 'app to shape', from: StorableType.String, to: GraphableType.Shape }],
    color: ['eventType', { identifier: 'event to color', from: StorableType.LoginType, to: GraphableType.Color }],
  };

  const skDimensions: SKDimensions = {
    layers: ['timestamp', {identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }]
  }

  if (drag === true) {
    if (dataset !== null) {
      return (
        <>
        <div className="app">
          <SPViewComposer spDimensions={spDimensions} dataset={dataset as Dataset} />
        </div>
        <div className="sank">
          <SKViewComposer skDimensions={skDimensions} dataset={dataset as Dataset} />
        </div>
        </>
      );
    }
    console.log('null');
    return (
      <div>
        Caricamento
      </div>
    );
  }
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
export default App;
