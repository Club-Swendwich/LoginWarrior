import React, {
  useState,
} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dataset } from './model/dataset';
import { DataManagementPage } from './pages/data';
import { ScatterplotPage } from './pages/scatterplot';
import { FullView, ScatterPlotView } from './model/views';

import './App.scss';
import Navbar from './components/navbar';
import { addScatterplotTransformations } from './scatterplot/transformer';
import { Transformer } from './model/transformer';
import { HomePage } from './pages/home';

function App() {
  addScatterplotTransformations(Transformer.provideInstance());

  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [views, setViews] = useState<null | FullView>(null);

  const spView = views === null ? null : views.scatterplot;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sankeyView = views === null ? null : views.sankey;
  const updateSpView = (s: ScatterPlotView) => {
    setViews(
      {
        sankey: views!.sankey, // Safe non può essere chiamato prima del !null
        scatterplot: s,
      },
    );
  };

  return (
    <div className="container">
      <Router>
        <div className="header">
          <Navbar />
        </div>
        <Routes>
          <Route
            path="/"
            element={(<HomePage />)}
          />
          <Route
            path="/scatterplot"
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
}

export default App;
