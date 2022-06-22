/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react-lite';
import { FormEventHandler, useState } from 'react';
import SankeyRenderingSettingsSelectorVM from './settingsSelectorView';
import SKViewComposer from '../sankviewcomposer'

interface Props {
  viewModel: SankeyRenderingSettingsSelectorVM;
}

function View({ viewModel }: Props) {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    viewModel.updateSettings = {
      height: document.getElementById('height').value,
      width: document.getElementById('width').value,
      nodewidth: document.getElementById('nodewidth').value,
      opacity: document.getElementById('opacity').value
    };
    //const [input] = document.getElementById('width').value
  };

  
  const [width] = useState(viewModel.getWidth);
  const [height] = useState(viewModel.getHeight);
  const [nodewidth] = useState(viewModel.getNodeWidth);
  const [opacity] = useState(viewModel.getOpacity);

  return (
    <div className='settingsArea'>
    <form className="settingsSelector" onSubmit={onSubmit}>
      <label>Width:</label><br/>
      <input type="number" id="width" name="width" defaultValue={width}/><br/>
      <label>Height:</label><br/>
      <input type="number" id="height" name="height" defaultValue={height} /><br/>
      <label>NodeWidth:</label><br/>
      <input type="number" id="nodewidth" name="nodewidth" defaultValue={nodewidth} /><br/>
      <input className="applyButton" type="submit" value="Applica" />
    </form>
    </div>
  );
}

export default observer(View);