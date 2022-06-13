/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import { Dataset, DatasetSignature } from './model/dataset';
import { SPDimensions } from './scatterplot/dimensions';
import SPViewComposer from './scatterplot/viewcomposer';
import { CSVDatasetParser } from './model/datasetloader';
import Navbar from './components/navbar';
import CSVLoader from './components/csvloader';
import { ViewSettingsDownloader, ViewSettingsLoader } from './components/viewsettings';
import ViewJson, { viewFromJson } from './model/viewjson';
import SPRenderSettings from './scatterplot/renderersettings';
import { SPDimensionSelectorVM } from './scatterplot/dimensionselectorvm';

function App() {
  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [drag, setDrag] = useState(false);

  const onDropCsv = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      const parser = new CSVDatasetParser(';');

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        setDataset(parser.parse((reader.result as string).replace(/^[\r\n]+/gm, '')) as Dataset);
        setDrag(true);
      };
      reader.readAsText(file);
    });
  }, []);

  const onDropSett = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const uploadedSet = viewFromJson(reader.result as string);

        if (uploadedSet.signature === (dataset as Dataset).signature) {
          spSettings = uploadedSet.spSettings;
          spDimensions = uploadedSet.spDimensions;
          skSettings = uploadedSet.skSettings;
          skDimensions = uploadedSet.skDimensions;
        }
      };
      reader.readAsText(file);
    });
  }, []);

  let spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
    size: ['userId', { identifier: '1', from: StorableType.Int, to: GraphableType.Int }],
    shape: ['eventType', { identifier: 'default', from: StorableType.LoginType, to: GraphableType.Shape }],
    color: ['appId', { identifier: 'app color', from: StorableType.String, to: GraphableType.Color }],
  };

  let spSettings: SPRenderSettings = {
    domainX: [1600651710000, 1625051710000],
    domainY: [0, 33000],
  };

  let skDimensions: any = {};

  let skSettings: any = {};

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CSVLoader onDrop={onDropCsv} />} />
        <Route path="/scatter" element={<SPViewComposer renderSettings={spSettings} spDimensions={spDimensions} dataset={dataset as Dataset} />} />
        <Route path="/sankey" element={<div />} />
        <Route
          path="/settings"
          element={(
            <>
              <ViewSettingsLoader onDrop={onDropSett} />
              <ViewSettingsDownloader viewSettings={new ViewJson((dataset as Dataset).signature, spSettings, spDimensions, skSettings, skDimensions)} />
            </>
)}
        />
      </Routes>
    </Router>
  );
}

export default App;

// TODO decidere se è da usare
function checkSettings(settings: ViewJson, spDimVM: SPDimensionSelectorVM, signature: DatasetSignature | null) {
  if (signature) {
    const xFieldsNames = getNames(spDimVM.fieldX);
    const yFieldsNames = getNames(spDimVM.fieldY);
    const sizeFieldsNames = getNames(spDimVM.fieldSize);
    const shapeFieldsNames = getNames(spDimVM.fieldShape);
    const colorFieldsNames = getNames(spDimVM.fieldColor);
  
    return (
      settings.signature === signature
      && xFieldsNames.indexOf(settings.spDimensions.x[1].identifier) > -1
      && yFieldsNames.indexOf(settings.spDimensions.y[1].identifier) > -1
      && sizeFieldsNames.indexOf(settings.spDimensions.size[1].identifier) > -1
      && shapeFieldsNames.indexOf(settings.spDimensions.shape[1].identifier) > -1
      && colorFieldsNames.indexOf(settings.spDimensions.color[1].identifier) > -1
    );
  }
}

function getNames(names: Set<[string, StorableType]>): string[] {
  const fields: string[] = [];
  names.forEach((val) => fields.push(val[0]));
  return fields;
}
