import React, {
  useEffect, useRef, MutableRefObject, useMemo, FormEventHandler, useState, useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Color, GraphableType, Shape, StorableType,
} from './model/datatypes';
import { SPRenderer } from './scatterplot/renderer';
import SPRenderingSettingsSelectorVM from './scatterplot/renderingsettingsvm';
import SPRenderingSettingsView from './scatterplot/renderingsettingsview';
import SPDimensionSelectorView from './scatterplot/dimensionselectorview';
import { SPDimensionSelectorVM } from './scatterplot/dimensionselectorvm';
import { Dataset, DatasetSignature } from './model/dataset';
import { TransformationSignature, TransformationQuerryable } from './model/transformer';
import { SPDimensions } from './scatterplot/dimensions';
import { SPMapper } from './scatterplot/mapper';
import SPViewComposer from './scatterplot/spviewcomposer';
import { CSVDatasetParser } from './model/datasetloader';
import { HTTPDatasetProvider } from './model/datasetprovider';

function App() {
  const pointcsv = '10;744598728;2020-06-15 14:19:45.000;2;ERM;erm3zs02;ip_2;"          ";"          ";zx2e87892e\n10;922713975;2020-11-04 10:56:10.000;2;ERM;erm3zs02;ip_3;"          ";"          ";ukmk56u3zv\n17;37103170;2021-03-09 09:34:01.000;2;ERM;erm3zs02;ip_4;"          ";"          ";x817ikmgsk\n17;84371471;2021-04-29 14:12:31.000;1;ERM;erm3zs02;ip_4;"006       ";vsvefmedzu;r2hhwyei0b\n17;199266238;2021-02-02 09:04:05.000;2;ERM;erm3zs02;ip_4;"          ";"          ";i8cfakl78n\n17;225652999;2021-02-02 09:04:05.000;1;ERM;erm3zs02;ip_4;"006       ";hlqffmgglu;c1wpq4r93s\n17;243769831;2021-03-09 10:23:06.000;1;ERM;erm3zs02;ip_4;"006       ";gqvayusnbd;vl7m9grrhb\n17;245702123;2021-03-04 11:06:45.000;1;ERM;erm3zs02;ip_4;"006       ";gzbsamehsm;jpr32wxbuw\n17;279198338;2021-04-29 14:12:31.000;2;ERM;erm3zs02;ip_4;"          ";"          ";lgbv6iuptf\n17;337103223;2021-03-09 09:34:01.000;1;ERM;erm3zs02;ip_4;"006       ";embuifusll;ffwiz208zg\n17;376457170;2021-03-09 10:23:06.000;2;ERM;erm3zs02;ip_4;"          ";"          ";obl0jk5vc8\n17;639611601;2021-03-04 11:06:45.000;2;ERM;erm3zs02;ip_4;"          ";"          ";osyf4acqg6\n17;675896707;2021-03-04 10:30:15.000;2;ERM;erm3zs02;ip_4;"          ";"          ";g1tjckbix5\n17;753664448;2021-03-04 15:49:20.000;2;ERM;erm3zs02;ip_4;"          ";"          ";e4k5fcvfwl\n17;761869196;2021-03-04 10:30:15.000;1;ERM;erm3zs02;ip_4;"006       ";xsekgselkd;ex3q81ab4p\n17;766604474;2021-04-01 15:23:30.000;1;ERM;erm3zs02;ip_4;"006       ";zxkitutmhn;w08d4p3ads\n17;799436489;2021-03-04 15:49:20.000;1;ERM;erm3zs02;ip_4;"006       ";tiendkgpae;vvpcsitz7u\n17;802221495;2021-04-01 15:23:30.000;2;ERM;erm3zs02;ip_4;"          ";"          ";s5pph8tat9\n17;846757338;2021-03-04 10:30:22.000;2;ERM;erm3zs02;ip_4;"          ";"          ";hm5rim4fdf\n';

  const parser = new CSVDatasetParser(';');

  const datasetProvider = new HTTPDatasetProvider(parser);

  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [drag, setDrag] = useState(false);

  /*   useEffect(() => {
    datasetProvider.load('http://localhost:3000/coded_log.csv').then((r) => setDataset(r as Dataset));
  }, []); */

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      datasetProvider.load(acceptedFiles).then((r) => setDataset(r as Dataset));
      setDrag(true);
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
    size: ['userId', { identifier: 'default', from: StorableType.Int, to: GraphableType.Int }],
    shape: ['appId', { identifier: 'app to shape', from: StorableType.String, to: GraphableType.Shape }],
    color: ['eventType', { identifier: 'event to color', from: StorableType.LoginType, to: GraphableType.Color }],
  };
  console.log(drag);
  console.log(dataset);
  if (drag === true) {
    console.log('drag TRUE');
    if (dataset !== null) {
      console.log('non null');
      return (
        <div className="app">
          <SPViewComposer spDimensions={spDimensions} dataset={dataset as Dataset} />
        </div>
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
    <div style={{ display: 'flex', width: '100%', height: '150px', border: '1px dashed', justifyContent: 'center', alignItems: 'center' }} className="drag" {...getRootProps()}>
      <input {...getInputProps()} />
      <h1>Clicca qui o trascina il file csv nel riquadro</h1>
    </div>
  );
}
export default App;
