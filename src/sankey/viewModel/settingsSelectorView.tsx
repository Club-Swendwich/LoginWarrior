import {observable, autorun, action, computed, makeAutoObservable} from 'mobx'
import { observer } from "mobx-react-lite"
import { toUnicode } from 'punycode'
import React , { useState } from 'react'
import SankeyRenderingSettingsSelector from "../sankRenderingSettingsSelector"
import SankeySettings from "../sankRendererSettings"
import { Domain } from 'domain'
import App from "../../App"

interface SettingsProp { //Mi serve per mettere apposto
    settingsVM: SankeyRenderingSettingsSelectorVM;
}

export default class SankeyRenderingSettingsSelectorVM {
    @observable
    private model: SankeyRenderingSettingsSelector;
  
    public constructor(settings: SankeySettings = {
      width: 800,
      height: 400,
      nodewidth: 20,
      opacity: 0.4
    }) {
      makeAutoObservable(this);
      this.model = new SankeyRenderingSettingsSelector(settings);
    }


    @action
    set updateSettings(settings: SankeySettings) {
      this.model = new SankeyRenderingSettingsSelector(settings);
      console.log("La altezza ora è "+ this.getHeight);
    }
  
    @action/*("update larghezza")*/
    set setWidth(domain: number) {
      const tmpsettings = this.model.selectedSettings;
      const settings: SankeySettings = {
        width: tmpsettings.width,
        height: domain,
        nodewidth: domain,
        opacity: domain
      };
      this.model = new SankeyRenderingSettingsSelector(settings);
      //const InstanceSankeyRenderingSettingsSelectorVm = new SankeyRenderingSettingsSelectorVM(settings);
    }
    
    /**
     * Actions should only, and always, be used on functions that modify state
     */
    @action
    set setHeight(domain: number) {
      const tmpsettings = this.model.selectedSettings;
      const settings: SankeySettings = {
        width: tmpsettings.width,
        height: domain,
        nodewidth: domain,
        opacity: domain
      };
      this.model = new SankeyRenderingSettingsSelector(settings);
    }
  
    @computed
    get getSettings(): SankeySettings {
      return this.model.selectedSettings;
    }
  
    @computed
    get getWidth(): number {
      return this.model.selectedSettings.width;
    }
  
    @computed
    get getHeight(): number {
      return this.model.selectedSettings.height;
    }

    @computed
    get getNodeWidth(): number {
      return this.model.selectedSettings.nodewidth;
    }

    @computed
    get getOpacity(): number {
      return this.model.selectedSettings.opacity;
    }
  }

/*
//Component è un observer del componente output
export const SankeyViewSettings: React.FC<SettingsProp> = observer(({output,settingsVM}) => {


  const height = useState(settingsVM.getHeight); 
  const width = useState(settingsVM.getWidth);
  const nodewidth = useState(settingsVM.getWidth);
  const opacity = useState(settingsVM.getWidth);

  const [value, setValue] = useState<string>(''); //STATE VARIABLE, torna un array di 2 elementi, uno lo stato e l'altra è la FUNZIONE
     /*const [x, newX] = useState<string>('');         //per settarne il valore
    


    
        <input value={x} onChange={
        (event) => {
            newX(event.target.value);
        }
    }type = "text" name='width' placeholder='set width'/>
    <button onClick={()=>{
        output.addOutput(value, value);
    }}>Cambia X</button>
    <br/>

    

    // SLIDER X
    // FORM Y
    // FORM OUTPUT

    //cambia sotto, crea un console log che da observer prende per poi fare output
    return <div> 
    <input type="range" value={value} min="1" max="100" onChange={
        (event) => {
            settingsVM.updateSettings = {
              height: parseFloat(value),
              width: settingsVM.getWidth,
              nodewidth: settingsVM.getNodeWidth,
              opacity: settingsVM.getOpacity
            }
        }
    }/>

  <input type="range" value={value} min="1" max="100" onChange={
        (event) => {
            settingsVM.updateSettings = {
              height: parseFloat(value),
              width: settingsVM.getWidth,
              nodewidth: settingsVM.getNodeWidth,
              opacity: settingsVM.getOpacity
            }
        }
    }/>
    <input value={value} onChange={
        (event) => {
            setValue(event.target.value);
        }
    } type= "text"/>
 
    <button onClick={()=>{
        output.addOutput(value/*, value);
    }}>Test Output</button>

    <ul>
        {output.outputs.map( output => {
                return <li>{output.title}</li>
        }
        )}
    </ul>
    </div>
});
*/

//export default SankeyViewSettings;

export const InstanceSankeyRenderingSettingsSelectorVm = new SankeyRenderingSettingsSelectorVM()

