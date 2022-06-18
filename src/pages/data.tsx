import React from 'react';
import { Link } from 'react-router-dom';
import { CSVDatasetLoaderView } from '../components/csvloader';
import { DatasetInfoView } from '../components/datasetinfo';
import { JSONViewsDownloaderView } from '../components/viewsdownloader';
import { JSONViewsLoaderView } from '../components/viewsloader';
import { Dataset } from '../model/dataset';
import { FullView } from '../model/views';

export interface DataManagementPageProp {
  dataset: Dataset | null;
  view: FullView | null;
  updateDataset: (d: Dataset) => void;
  updateView: (v: FullView) => void;
}

export const DataManagementPage = (prop: DataManagementPageProp) => {
  const {
    dataset, view, updateDataset, updateView,
  } = prop;

  return (
    <div>
      <h1>Gestione dati</h1>
      <div className="info-loader">
        <h2>Dataset</h2>
        <div className="sett-flex-container">
          <CSVDatasetLoaderView updateDataset={updateDataset} />
          <DatasetInfoView maybeDataset={dataset} />
        </div>
      </div>
      <div className="info-loader">
        <h2>Viste</h2>
        <div>
          <div className="sett-flex-container">
            <JSONViewsLoaderView updateViews={updateView} />
            <JSONViewsDownloaderView views={view} />
          </div>
        </div>
      </div>
      <Link to="/">Scatterplot</Link>
    </div>
  );
};
