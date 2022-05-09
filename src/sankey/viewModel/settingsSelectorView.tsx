import {observable, autorun, action} from 'mobx'
import { observer } from "mobx-react-lite"
import React , { useState } from 'react'
import SankeyRenderingSettingsSelector from "../sankRenderingSettingsSelector"
import { OutputListImpl } from "./output"

interface SettingsProp { //Mi serve per mettere apposto
    output: OutputListImpl
}



export const SankeyViewSettings: React.FC<SettingsProp> = observer(({output}) => {

    const [value, setValue] = useState<string>(''); //STATE VARIABLE, torna un array di 2 elementi, uno lo stato e l'altra è la FUNZIONE
    //const [x, newX] = useState<string>('');         //per settarne il valore
    //const [y, newY] = useState<string>(''); 
    
    /*
        <input value={x} onChange={
        (event) => {
            newX(event.target.value);
        }
    }type = "text" name='width' placeholder='set width'/>
    <button onClick={()=>{
        output.addOutput(value, value);
    }}>Cambia X</button>
    <br/>

    */

    return <div>
     

    <input  type = "text" name='height' placeholder='set height'/><br/>
    <input type="range" min="1" max="100" value="50" id="myRange"></input><br/>
    <input value={value} onChange={
        (event) => {
            setValue(event.target.value);
        }
    } type= "text"/>

    <button onClick={()=>{
        output.addOutput(value/*, value*/);
    }}>Aggiungi la frase</button>


    </div>
});

export default SankeyViewSettings;