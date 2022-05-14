import {observable, autorun, action} from 'mobx'
import { observer } from "mobx-react-lite"
import { toUnicode } from 'punycode'
import React , { useState } from 'react'
import SankeyRenderingSettingsSelector from "../sankRenderingSettingsSelector"
import { OutputListImpl } from "./output"

interface SettingsProp { //Mi serve per mettere apposto
    output: OutputListImpl
}


//Component è un observer del componente output
export const SankeyViewSettings: React.FC<SettingsProp> = observer(({output}) => {

    const [value, setValue] = useState<string>(''); //STATE VARIABLE, torna un array di 2 elementi, uno lo stato e l'altra è la FUNZIONE
    const [x, newX] = useState<string>('');         //per settarne il valore
    const [y, newY] = useState<string>(''); 
    
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

    // SLIDER X
    // FORM Y
    // FORM OUTPUT
    return <div>
    <input type="range" min="1" max="100" value={x} className="slider" onChange={
        (event) => {
        newX(event.target.value);
    }
    }
    id="myRange"></input>   

    <button onClick={()=>{
        output.addOutput(x/*, value*/);
    }}>set width</button>
    <br/>



    <input value={y} onChange={
        (event) => {
            setValue(event.target.value);
        }
    } type= "text"/>  
    
    <button onClick={()=>{
        output.addOutput(y/*, value*/);
    }}>Set height</button>
    <br/>






    <input value={value} onChange={
        (event) => {
            setValue(event.target.value);
        }
    } type= "text"/>

    <button onClick={()=>{
        output.addOutput(value/*, value*/);
    }}>Test Output</button>

    <ul>
        {output.outputs.map( output => {
                return <li>{output.title}</li>
        }
        )}
    </ul>
    </div>
});

export default SankeyViewSettings;