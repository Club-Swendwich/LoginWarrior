/* eslint-disable */
import { FdG } from '../common/Types';
import { MutableRefObject } from 'react';
import { Renderer } from '../genericview/renderer';
import { select } from 'd3';
import reactForceGraph2d from 'react-force-graph-2d';
import ForceGraph, { ForceGraphInstance } from 'force-graph';

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
    zoomNear:   number,                          
    zoomFar:    number       
    
    
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

    public updatePoints(p: GraphData): void {
        this.FdGRenderablePoints = p;
    }

    public updateSettings(s: RenderSettings): void {
        this.settings = s;
    }

    private makechart(graph: ForceGraphInstance): void {
        graph
        // context settings
        .width(this.settings.width)
        .height(this.settings.height)
        .backgroundColor(this.settings.backgroundColor)

        // node settings
        .nodeRelSize(this.settings.nodeRelSize)
        .nodeAutoColorBy('name')

        // link settings
        .linkDirectionalArrowLength(this.settings.arrowSize)
        .linkAutoColorBy('source')
        // TO DO: find new settings to apply
    }
}
