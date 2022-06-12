/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import { Dataset } from './model/dataset';
import { SPDimensions } from './scatterplot/dimensions';
import SPViewComposer from './scatterplot/viewcomposer';
import { CSVDatasetParser } from './model/datasetloader';
import Navbar from './components/navbar';
import CSVLoader from './components/csvloader';

function App() {
  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
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

  const spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
    size: ['userId', { identifier: '1', from: StorableType.Int, to: GraphableType.Int }],
    shape: ['eventType', { identifier: 'default', from: StorableType.LoginType, to: GraphableType.Shape }],
    color: ['appId', { identifier: 'app color', from: StorableType.String, to: GraphableType.Color }],
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CSVLoader onDrop={onDrop} />} />
        <Route path="/scatter" element={<SPViewComposer spDimensions={spDimensions} dataset={dataset as Dataset} />} />
        <Route path="/sankey" element={<div />} />
        <Route path="/settings" element={<div />} />
      </Routes>
    </Router>
  );
}

export default App;
