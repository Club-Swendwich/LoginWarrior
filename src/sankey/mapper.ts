/* eslint-disable @typescript-eslint/quotes */
import { entries } from "mobx";
import { COMPUTED } from "mobx/dist/internal";
import { GraphData } from "react-force-graph-2d";
import { Mapper } from "../genericview/mapper";
import { Dataset, DatasetEntry } from "../model/dataset";
import { Int, SankeyLayer } from "../model/datatypes";
import { TransformationProvider, TransformationSignature } from "../model/transformer";
import { SKDimensions } from "./dimensions/SKDimensions";
import { SLink, SNode } from "./renderer";

export class SKMapper implements Mapper<SKDimensions, GraphData> {
  public constructor(
    private transformer: TransformationProvider,
    private dimensions: SKDimensions,

  ) { }

  public updateMapLogic(ml: SKDimensions): void {
    this.dimensions = ml;
  }

  public map(d: Dataset): GraphData {
    const _nodes = this.createNodes();
    const _links = this.createLinks(d);

    return {
      nodes: _nodes,
      links: _links,
    };
  }

  /**
     * Function that from a transformation signature return the corresponding SankeyLayer
     * @param s the transformation signature
     * @returns a transformation rappresenting a SankeyLayer
     */
  private signatureToLayer(s: TransformationSignature): any {
    // console.log(s)
    return this.transformer.get(s);
  }

  /**
     * Function that calulates the source of the link to push
     * @param layer the layer
     * @param element the dataset entry
     * @returns a string rappresenting the source, where the first number rappresents the layer
     * and the second rappresents the node
     */
  private calculateSource(layer: [string, TransformationSignature], element: DatasetEntry): string {
    try {
    const source_result = this.signatureToLayer(layer[1]).map(element.get(layer[0]));
    /*
        if(layer[0] !== "tot")
            console.log(layer[1], element)
        */
    return /* "," + */this.signatureToLayer(layer[1]).outcomes.indexOf(source_result);
  } catch (error) {
    console.log('element: ', element);
    console.log('layer: ', layer);
    console.log('target result: ', this.signatureToLayer(layer[1]).map(element.get(layer[0])));
    return 'null'
}
  }

  /**
     * Function that calculates the target of the link to push
     * @param i index of the layer
     * @param layer
     * @param element the dataset entry
     * @returns a string that rappresents the target, where the first number rappresents the layer
     * and the second rappresents the node
     */
  private calculateTarget(i: number, layer: [string, TransformationSignature], element: DatasetEntry): string {
    try {
        const target_result = this.signatureToLayer(layer[1]).map(element.get(layer[0]));
        return /* (i + 1) + "," + */ this.signatureToLayer(layer[1]).outcomes.indexOf(target_result);
    } catch (error) {
        console.log('element: ', element);
        console.log('layer: ', layer);
        console.log('target result: ', this.signatureToLayer(layer[1]).map(element.get(layer[0])));
        return 'null'
    }
  }

  /**
     * Function that cicle through layers and entries in order to create new links and
     * setting their source and target attributes in the right way
     * @param d object rappresenting the dataset
     * @returns an array of new created links
     */
  private createLinks(d: Dataset): SLink[] {
    const links: SLink[] = [];
    const layersCount = this.dimensions.layers.length;
    console.log(`ci sono ${layersCount} layer`);

    this.dimensions.layers.forEach((layer, i) => { // To be fixed
      const source = [] as any;// Uno layer altro nodo

      if (i < layersCount - 1) {
        console.log('layer: ', this.dimensions.layers[i]);
        d.entries().forEach((element) => {
          const n = Number(this.calculateSource(layer, element));

          const t = Number(this.calculateTarget(i, this.dimensions.layers[i + 1], element));
          // console.log("Questa è il target", t)

          // Se source in quella posizione non c'è lo inizializzi
          // Correzione, ora abbiamo per ogni nodo il suo target
          if (!source[n]) { source[n] = []; } else if (source[n][t]) {
            source[n][t]++;
          } else if (t !== -1) {
            source[n][t] = 1;
          }
        });

        for (let r = 0; r < 20; r++) {
          for (let t = 0; t < 20; t++) {
            if (source[r] && source[r][t]) {
              console.log(` fila ${i} connessione tra nodo${r} a nodo ${t} con val ${source[r][t]}`);
              links.push({
                source: `${i},${r}`,
                target: `${i + 1},${t}`,
                value: source[r][t], // Quanto grande è la connessione
              });
            } else {
              // console.log("connessione non esiste")
            }
          }
        }
      }
    });
    /*
        for (var i=0; i<layersCount -1; i++){
            for (var r = 0; r<100; r++){
                for (var t = 0; t<100; t++){
                    if(source[i][r] && target[i][t]){
                        console.log("connessione tra nodo" + r + " a nodo " + t + " di dimensione " + source[i+1][r])
                    links.push({
                        source: i + "," + r,
                        target: (i + 1) + "," + t,
                        value: source[i][r] // Quanto grande è la connessione
                    })}else{
                        //console.log("connessione non esiste")
                    };
                }
            }
        }
        */
    return links;
  }

  /**
     * Function that cicles through layers and for every layer cicles through his outcomes
     * in order to generate for every outcome of every layer the corresponding nodes.
     * @returns an array of new created nodes
     */
  private createNodes(): SNode[] {
    const nodes: SNode[] = [];
    this.dimensions.layers.forEach((layer, i) => {
      console.log(layer[1]);
      const result: SankeyLayer<any> = this.transformer.get(layer[1]);
      result.outcomes.forEach((element, j) => { // (element, j)
        console.log(`il nodo ${i} e ${j} creato`);
        nodes.push({
          nodeId: i+','+j,
          name: 'nodox',
        });
      });
    });
    return nodes;
  }
}
