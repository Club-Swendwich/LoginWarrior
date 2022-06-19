import React, { useMemo } from 'react';
import { Dataset } from '../model/dataset';
import { StorableType } from '../model/datatypes';

const pad = (str: string) => ` ${str} `;

export const DatasetInfoView = ({ maybeDataset } : { maybeDataset : Dataset | null }) => {
  const Inner = useMemo(() => {
    if (maybeDataset === null) {
      return <div className="msgInfo">Non è ancora stato caricato un dataset</div>;
    }

    return (
      <div className="datasetFieldsList">
        <div>
          <p>
            Il dataset ha
            { pad(maybeDataset.size.toString()) }
            righe!
          </p>
          <p>Sono disponibili i seguenti campi:</p>
          <ul>
            { Array.from(maybeDataset.signature)
              .map(([name, type], key) => FieldInfo({ name, type, key })) }
          </ul>
        </div>
      </div>
    );
  }, [maybeDataset]);

  return (
    <div className="datasetInfoArea">
      <h3>Informazioni sul dataset in uso:</h3>
      { Inner }
    </div>
  );
};

const FieldInfo = ({ name, type, key }: { name: string, type: StorableType, key: number }) => {
  const showType = (ty: StorableType) => {
    switch (ty) {
      case StorableType.Date:
        return 'Date';
      case StorableType.Int:
        return 'Integer';
      case StorableType.Ip:
        return 'Ip';
      case StorableType.LoginType:
        return 'Login event';
      case StorableType.String:
        return 'String';
      default:
        return 'Unknown';
    }
  };

  return (
    <li key={key}>
      <span>{ pad(name) }</span>
      <span>{ pad(showType(type)) }</span>
    </li>
  );
};
