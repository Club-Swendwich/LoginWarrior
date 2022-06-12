/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react';
import React from 'react';
import RenderingSettingsSelectorVM from './renderingsettingsvm';

interface Props {
  viewModel: RenderingSettingsSelectorVM;
}

function SPRenderingSettingsView({ viewModel }: Props) {
  const x = viewModel.getWidth;

  const y = viewModel.getHeight;

  function handleChangeX0(e: React.ChangeEvent<HTMLInputElement>) {
    x[0] = parseInt(e.target.value, 10);
  }

  function handleChangeX1(e: React.ChangeEvent<HTMLInputElement>) {
    x[1] = parseInt(e.target.value, 10);
  }

  function handleChangeY0(e: React.ChangeEvent<HTMLInputElement>) {
    y[0] = parseInt(e.target.value, 10);
  }

  function handleChangeY1(e: React.ChangeEvent<HTMLInputElement>) {
    y[1] = parseInt(e.target.value, 10);
  }

  return (
    <form className="settingsSelector">
      <label htmlFor="xaxis" id="xaxis">Dominio Ascisse:</label>
      <p>
        <input type="number" id="x0" name="x0" defaultValue={x[0]} onChange={(e) => handleChangeX0(e)} />
        <input type="number" id="x1" name="x1" defaultValue={x[1]} onChange={(e) => handleChangeX1(e)} />
      </p>
      <label htmlFor="yaxis" id="yaxis">Dominio Ordinate:</label>
      <p>
        <input type="number" id="y0" name="y0" defaultValue={y[0]} onChange={(e) => handleChangeY0(e)} />
        <input type="number" id="y1" name="y1" defaultValue={y[1]} onChange={(e) => handleChangeY1(e)} />
      </p>
    </form>
  );
}

export default observer(SPRenderingSettingsView);
