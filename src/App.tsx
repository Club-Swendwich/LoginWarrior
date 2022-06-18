import React, {
  useState, useCallback, useEffect
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  GraphableType, StorableType,
} from './model/datatypes';
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
  
  /*

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


  const skDimensions: SKDimensions = {
    layers: ['timestamp', {identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }]
  }
  */
  
  const pointcsv = '10;744598728;2020-06-15 14:19:45.000;2;ERM;erm3zs02;ip_2;"          ";"          ";zx2e87892e\n10;922713975;2020-11-04 10:56:10.000;2;ERM;erm3zs02;ip_3;"          ";"          ";ukmk56u3zv\n17;37103170;2021-03-09 09:34:01.000;2;ERM;erm3zs02;ip_4;"          ";"          ";x817ikmgsk\n17;84371471;2021-04-29 14:12:31.000;1;ERM;erm3zs02;ip_4;"006       ";vsvefmedzu;r2hhwyei0b\n17;199266238;2021-02-02 09:04:05.000;2;ERM;erm3zs02;ip_4;"          ";"          ";i8cfakl78n\n17;225652999;2021-02-02 09:04:05.000;1;ERM;erm3zs02;ip_4;"006       ";hlqffmgglu;c1wpq4r93s\n17;243769831;2021-03-09 10:23:06.000;1;ERM;erm3zs02;ip_4;"006       ";gqvayusnbd;vl7m9grrhb\n17;245702123;2021-03-04 11:06:45.000;1;ERM;erm3zs02;ip_4;"006       ";gzbsamehsm;jpr32wxbuw\n17;279198338;2021-04-29 14:12:31.000;2;ERM;erm3zs02;ip_4;"          ";"          ";lgbv6iuptf\n17;337103223;2021-03-09 09:34:01.000;1;ERM;erm3zs02;ip_4;"006       ";embuifusll;ffwiz208zg\n17;376457170;2021-03-09 10:23:06.000;2;ERM;erm3zs02;ip_4;"          ";"          ";obl0jk5vc8\n17;639611601;2021-03-04 11:06:45.000;2;ERM;erm3zs02;ip_4;"          ";"          ";osyf4acqg6\n17;675896707;2021-03-04 10:30:15.000;2;ERM;erm3zs02;ip_4;"          ";"          ";g1tjckbix5\n17;753664448;2021-03-04 15:49:20.000;2;ERM;erm3zs02;ip_4;"          ";"          ";e4k5fcvfwl\n17;761869196;2021-03-04 10:30:15.000;1;ERM;erm3zs02;ip_4;"006       ";xsekgselkd;ex3q81ab4p\n17;766604474;2021-04-01 15:23:30.000;1;ERM;erm3zs02;ip_4;"006       ";zxkitutmhn;w08d4p3ads\n17;799436489;2021-03-04 15:49:20.000;1;ERM;erm3zs02;ip_4;"006       ";tiendkgpae;vvpcsitz7u\n17;802221495;2021-04-01 15:23:30.000;2;ERM;erm3zs02;ip_4;"          ";"          ";s5pph8tat9\n17;846757338;2021-03-04 10:30:22.000;2;ERM;erm3zs02;ip_4;"          ";"          ";hm5rim4fdf\n';
  const parser = new CSVDatasetParser(';');
  const datasetProvider = new HTTPDatasetProvider(parser);
  const [dataset, setDataset] = useState<null | Dataset>(null);

  useEffect(() => {
    datasetProvider.load(pointcsv).then((r) => setDataset(r as Dataset));
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
