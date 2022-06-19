import React, {
  useState, useCallback, useEffect
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  GraphableType, StorableType,
} from './model/datatypes';

//Dataset
import { Dataset } from './model/dataset';
import { HTTPDatasetProvider } from './model/datasetprovider';

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
  const datasetProvider = new HTTPDatasetProvider(parser);

  useEffect(() => {
    datasetProvider.load('http://localhost:3000/coded_log.csv').then((r) => setDataset(r as Dataset));
  }, []);

  const skDimensions : SKDimensions = {
    layers: [
             ['eventType',{ identifier: 'loginType', from: StorableType.LoginType, to: GraphableType.SankeyLayer }]
            ]
  }
  
  if (dataset !== null) {
    return (
      <div className="app">
        <SKViewComposer skDimensions={skDimensions} dataset={dataset as Dataset} />
      </div>
    );
  }
  return (
    <div>
      Caricamento
    </div>
  );
}
export default App;
