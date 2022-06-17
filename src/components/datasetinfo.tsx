import React from 'react';
import { Dataset } from '../model/dataset';
import { StorableType } from '../model/datatypes';

const pad = (str: string) => ` ${str} `;

export const DatasetInfoView = ({ maybeDataset } : { maybeDataset : Dataset | null }) => {
  if (maybeDataset === null) {
    return <div className="msgFail">Non è ancora stato caricato un dataset</div>;
  }
  return (
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
      { pad(name) }
      -
      { pad(showType(type)) }
    </li>
  );
};
