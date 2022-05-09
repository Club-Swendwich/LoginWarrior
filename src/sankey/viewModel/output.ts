import { makeObservable, observable } from "mobx"

interface Output {
    id: number;
    title: string;
    //previous: string;
    //after: string;
    completed: boolean;
}

export class OutputListImpl {
    outputs: Output[] = [];

    
    //MOBX: Variabili sono osservabili
    //      Per aggiornare i tupi OSSERVABILI hai bisogno di una AZIONE
    //      Le variabili COMPUTED sono create senza cambiare lo STORE
    //      Se avessi usato un CONTEXT avrei potuto usare MOLTEPLICI istanze
    constructor() {
        makeObservable(this, {
            outputs: observable
            //addTodo: action;
        });
    }

    //An action is anything that MUTATES the state
    addOutput(title:string){
        const item: Output = {
            id: +Math.random().toFixed(4),
            title,
            //after,
            completed:false
        };
        this.outputs.push(item);
    }
    //mobX si preoccupa di notificare le parti della pagina

    toggleOutput(id: number): void {
        const index = this.outputs.findIndex(item => item.id === id)
        if (index > -1){
            this.outputs[index].completed = !this.outputs[index].completed;
        }
    }
}

export const OutputList = new OutputListImpl();