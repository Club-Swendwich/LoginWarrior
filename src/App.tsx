import React, {
  useState, useCallback, useEffect
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import './App.scss';
//Dataset
import { Dataset } from './model/dataset';
import { HTTPDatasetProvider } from './model/io/datasetprovider';

//Dimensions
import { SPDimensions } from './scatterplot/dimensions';
import { SKDimensions } from './sankey/dimensions/SKDimensions';

//Composers
import SKViewComposer from './sankey/sankviewcomposer';
import { CSVDatasetParser } from './model/io/datasetloader';


function App() {

  const parser = new CSVDatasetParser(';');

  const [dataset, setDataset] = useState<null | Dataset>(null);
  const datasetProvider = new HTTPDatasetProvider(parser);

  useEffect(() => {
    datasetProvider.load('http://localhost:3000/coded_log.csv').then((r) => setDataset(r as Dataset));
  }, []);

  const skDimensions : SKDimensions = {
    layers: [
             ['userId',{ identifier: 'full', from: StorableType.Int, to: GraphableType.SankeyLayer }],
             ['eventType',{ identifier: 'loginType', from: StorableType.LoginType, to: GraphableType.SankeyLayer }],
             ['appId',{ identifier: 'default', from: StorableType.Int, to: GraphableType.SankeyLayer }],
             ['timestamp',{ identifier: 'giorno', from: StorableType.Date, to: GraphableType.SankeyLayer }]
            ]
  }

  if (dataset !== null) {
    return (
    <>
    <div className="header">
      <div className='logo'>
        <a href="https://github.com/Club-Swendwich"><img src="logo_big.jpg" alt="logo" /></a>
      </div>
    </div>
    <div className="app">
        <SKViewComposer skDimensions={skDimensions} dataset={dataset as Dataset} />
    </div>
    </>
    );
  };

  return (
    <div>
      Caricamento
    </div>
  );
}

export default App;
