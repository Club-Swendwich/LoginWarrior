/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react';
import React, { FormEventHandler, useState } from 'react';
import RenderingSettingsSelectorVM from './renderingsettingsvm';

interface Props {
  viewModel: RenderingSettingsSelectorVM;
}

function View({ viewModel }: Props) {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-param-reassign
    viewModel.updateSettings = {
      domainX: [x[0], x[1]],
      domainY: [y[0], y[1]],
    };
  };

  const [x] = useState(viewModel.getWidth);

  const [y] = useState(viewModel.getHeight);

  return (
    <form className="settingsSelector" onSubmit={onSubmit}>
      <label htmlFor="xaxis" id="xaxis">Dominio Ascisse:</label>
      <input type="number" id="x0" name="x0" value={x[0]} />
      <input type="number" id="x1" name="x1" value={x[1]} />
      <label htmlFor="yaxis" id="yaxis">Dominio Ordinate:</label>
      <input type="number" id="y0" name="y0" value={y[0]} />
      <input type="number" id="y1" name="y1" value={y[1]} />
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
}

export default observer(View);
