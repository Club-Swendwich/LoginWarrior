/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react';
import React, { FormEventHandler } from 'react';
import RenderingSettingsSelectorVM from './renderingsettingsvm';

interface Props {
  viewModel: RenderingSettingsSelectorVM;
}

function SPRenderingSettingsView({ viewModel }: Props) {
  // const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   console.log(viewModel.getHeight);
  //   // eslint-disable-next-line no-param-reassign
  //   viewModel.updateSettings({
  //     domainX: [x[0], x[1]],
  //     domainY: [y[0], y[1]],
  //   });
  //
  //   console.log(viewModel.getHeight);
  // };

  const x = viewModel.getWidth;

  const y = viewModel.getHeight;

  function handleChangeX0(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // make sure you are receiving the the value
    x[0] = parseInt(e.target.value, 10);
  }

  function handleChangeX1(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // make sure you are receiving the the value
    x[1] = parseInt(e.target.value, 10);
  }

  function handleChangeY0(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // make sure you are receiving the the value
    y[0] = parseInt(e.target.value, 10);
  }

  function handleChangeY1(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // make sure you are receiving the the value
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
