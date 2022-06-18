/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState,
} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dataset } from './model/dataset';
import { DataManagementPage } from './pages/data';
import { ScatterplotPage } from './pages/scatterplot';
import { FullView, ScatterPlotView } from './model/views';

import './App.scss';

function App() {
  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [views, setViews] = useState<null | FullView>(null);

  const spView = views === null ? null : views[0];
  const updateSpView = (s: ScatterPlotView) => {
    setViews([s, views![1]]);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={(
              <ScatterplotPage
                views={spView}
                updateViews={updateSpView}
                dataset={dataset}
              />
            )}
          />
          <Route
            path="/data"
            element={(
              <DataManagementPage
                view={views}
                updateView={setViews}
                dataset={dataset}
                updateDataset={setDataset}
              />
          )}
          />
        </Routes>
      </Router>
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
// function checkSettings(settings: ViewJson, spDimVM: SPDimensionSelectorVM, signature: DatasetSignature | null): Boolean {
//   const xFieldsNames = getNames(spDimVM.fieldX);
//   const yFieldsNames = getNames(spDimVM.fieldY);
//   const sizeFieldsNames = getNames(spDimVM.fieldSize);
//   const shapeFieldsNames = getNames(spDimVM.fieldShape);
//   const colorFieldsNames = getNames(spDimVM.fieldColor);
//   if (signature) {
//     return (
//       settings.signature === signature
//       && xFieldsNames.indexOf(settings.spDimensions.x[1].identifier) > -1
//       && yFieldsNames.indexOf(settings.spDimensions.y[1].identifier) > -1
//       && sizeFieldsNames.indexOf(settings.spDimensions.size[1].identifier) > -1
//       && shapeFieldsNames.indexOf(settings.spDimensions.shape[1].identifier) > -1
//       && colorFieldsNames.indexOf(settings.spDimensions.color[1].identifier) > -1
//     );
//   }
//   return (
//     xFieldsNames.indexOf(settings.spDimensions.x[1].identifier) > -1
//     && yFieldsNames.indexOf(settings.spDimensions.y[1].identifier) > -1
//     && sizeFieldsNames.indexOf(settings.spDimensions.size[1].identifier) > -1
//     && shapeFieldsNames.indexOf(settings.spDimensions.shape[1].identifier) > -1
//     && colorFieldsNames.indexOf(settings.spDimensions.color[1].identifier) > -1
//   );
// }
