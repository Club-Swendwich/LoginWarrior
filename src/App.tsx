/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useCallback, useEffect,
} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import { Dataset, DatasetSignature } from './model/dataset';
import { SPDimensions } from './scatterplot/dimensions';
import SPViewComposer from './scatterplot/viewcomposer';
import { CSVDatasetParser } from './model/io/datasetloader';
import Navbar from './components/navbar';
import CSVLoader, { CSVDatasetLoaderView } from './components/csvloader';
import ViewJson, { viewFromJson } from './model/viewjson';
import SPRenderSettings from './scatterplot/renderersettings';
import { SPDimensionSelectorVM } from './scatterplot/dimensionselectorvm';
import { DatasetInfoView } from './components/datasetinfo';
import { FullView } from './model/io/jsonviewparser';
import { JSONViewsLoaderView } from './components/viewsloader';
import { JSONViewsDownloaderView, ViewsDownloaderButton } from './components/viewsdownloader';

function App() {
  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [views, setViews] = useState<null | FullView>(null);

  useEffect(() => {
    console.log(views);
  }, [ views ]);

  return (
  <div>
    <DatasetInfoView maybeDataset={dataset} />
    <CSVDatasetLoaderView updateDataset={setDataset} />
    <JSONViewsLoaderView updateViews={setViews}/>
    <JSONViewsDownloaderView views={views}/>
  </div>
  );

//  const [drag, setDrag] = useState(false);
//
//  const onDropCsv = useCallback((acceptedFiles) => {
//    acceptedFiles.forEach((file: Blob) => {
//      const reader = new FileReader();
//      const parser = new CSVDatasetParser(';');
//
//      reader.onabort = () => console.log('file reading was aborted');
//      reader.onerror = () => console.log('file reading has failed');
//      reader.onload = () => {
//        setDataset(parser.parse((reader.result as string).replace(/^[\r\n]+/gm, '')) as Dataset);
//        setDrag(true);
//      };
//      reader.readAsText(file);
//    });
//  }, []);
//
//  const onDropSett = useCallback((acceptedFiles) => {
//    acceptedFiles.forEach((file: Blob) => {
//      const reader = new FileReader();
//
//      reader.onabort = () => console.log('file reading was aborted');
//      reader.onerror = () => console.log('file reading has failed');
//      reader.onload = () => {
//        const uploadedSet = viewFromJson(reader.result as string);
//
//        if (uploadedSet.signature === (dataset as Dataset).signature) {
//          spSettings = uploadedSet.spSettings;
//          spDimensions = uploadedSet.spDimensions;
//        }
//      };
//      reader.readAsText(file);
//    });
//  }, []);
//
//  let spDimensions: SPDimensions = {
//    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
//    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
//    size: ['userId', { identifier: '1', from: StorableType.Int, to: GraphableType.Int }],
//    shape: ['eventType', { identifier: 'default', from: StorableType.LoginType, to: GraphableType.Shape }],
//    color: ['appId', { identifier: 'app color', from: StorableType.String, to: GraphableType.Color }],
//  };
//
//  let spSettings: SPRenderSettings = {
//    domainX: [1600651710000, 1625051710000],
//    domainY: [0, 33000],
//  };
//
//  return (
//    <Router>
//      <Navbar />
//      <Routes>
//        <Route path="/" element={<CSVLoader onDrop={onDropCsv} />} />
//        <Route path="/scatter" element={<SPViewComposer renderSettings={spSettings} spDimensions={spDimensions} dataset={dataset as Dataset} />} />
//        <Route path="/sankey" element={<div />} />
//        <Route
//          path="/settings"
//          element={(
//            <>
//              <ViewSettingsLoader onDrop={onDropSett} />
//            </>
//          )}
//        />
//      </Routes>
//    </Router>
//  );
}

export default App;

// TODO decidere se è da usare
function checkSettings(settings: ViewJson, spDimVM: SPDimensionSelectorVM, signature: DatasetSignature | null): Boolean {
  const xFieldsNames = getNames(spDimVM.fieldX);
  const yFieldsNames = getNames(spDimVM.fieldY);
  const sizeFieldsNames = getNames(spDimVM.fieldSize);
  const shapeFieldsNames = getNames(spDimVM.fieldShape);
  const colorFieldsNames = getNames(spDimVM.fieldColor);
  if (signature) {
    return (
      settings.signature === signature
      && xFieldsNames.indexOf(settings.spDimensions.x[1].identifier) > -1
      && yFieldsNames.indexOf(settings.spDimensions.y[1].identifier) > -1
      && sizeFieldsNames.indexOf(settings.spDimensions.size[1].identifier) > -1
      && shapeFieldsNames.indexOf(settings.spDimensions.shape[1].identifier) > -1
      && colorFieldsNames.indexOf(settings.spDimensions.color[1].identifier) > -1
    );
  }
  return (
    xFieldsNames.indexOf(settings.spDimensions.x[1].identifier) > -1
    && yFieldsNames.indexOf(settings.spDimensions.y[1].identifier) > -1
    && sizeFieldsNames.indexOf(settings.spDimensions.size[1].identifier) > -1
    && shapeFieldsNames.indexOf(settings.spDimensions.shape[1].identifier) > -1
    && colorFieldsNames.indexOf(settings.spDimensions.color[1].identifier) > -1
  );
}

function getNames(names: Set<[string, StorableType]>): string[] {
  const fields: string[] = [];
  names.forEach((val) => fields.push(val[0]));
  return fields;
}
