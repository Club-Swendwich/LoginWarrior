/*eslint-disable*/
import { MutableRefObject } from 'react';
import { Renderer } from '../genericview/renderer';
import { select } from 'd3';
import reactForceGraph2d from 'react-force-graph-2d';
import ForceGraph, { ForceGraphInstance } from 'force-graph';
import { FdG } from '../common/Types';
export interface RenderSettings {
    // chart settings
    width:      number,                           
    height:     number,                          
    backgroundColor: string,

    // node settings
    nodeRelSize:   number,                           

    // link settings    
    arrowSize:  number,                           
    linkColor: string,

    // optional settings  
}

export interface GraphData {
    nodes: FdG.CustomeNodeObject[],
    links: FdG.CustomeLinkObject[]
}

export class FdGRenderer implements Renderer<RenderSettings, GraphData> {
    public constructor(
        private settings: RenderSettings,
        private FdGRenderablePoints: GraphData
    ) {}

    public render(ref: MutableRefObject<HTMLDivElement>): void {
        const graph = ForceGraph()(ref.current)
        graph.graphData(this.FdGRenderablePoints)
        this.makechart(graph)
    }

    /**
     * Manipulate the graph via his methods taking the values from settings interface
     * @param graph instance of type ForceGraphInstance used to maninuplate the graph via
     * his methods
     * 
     */
    private makechart(graph: ForceGraphInstance): void {
        graph
        // context settings
        .width(this.settings.width)
        .height(this.settings.height)
        .backgroundColor(this.settings.backgroundColor)

        // node settings
        .nodeRelSize(this.settings.nodeRelSize)
        .nodeAutoColorBy('id')
        .nodeLabel('id')
        
        // link settings
        .linkDirectionalArrowLength(this.settings.arrowSize)
        .linkAutoColorBy('source')
        
        // TODO: find new settings to apply
    }

    public updatePoints(p: GraphData): void {
        this.FdGRenderablePoints = p;
    }

    public updateSettings(s: RenderSettings): void {
        this.settings = s;
    }


    public get contextWidth(): number {
        return this.settings.width
    }

    public get contextHeight(): number {
        return this.settings.height
    }

    public get contextBackground(): string {
        return this.settings.backgroundColor
    }

    public get nodeRelSize(): number {
        return this.settings.nodeRelSize
    }

    public get arrowSize(): number {
        return this.settings.arrowSize
    }

    public get linkColor(): string {
        return this.settings.linkColor
    }
}
