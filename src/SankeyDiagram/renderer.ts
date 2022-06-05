/*eslint-disable*/
import { MutableRefObject } from 'react';
import { Renderer } from '../genericview/renderer';
import { CustomNode, CustomLink } from '../model/datatypes';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import chroma from "chroma-js";
import SankeySettings from "./sankRendererSettings"

<<<<<<< HEAD
type SNode = d3Sankey.SankeyNode<CustomNode, CustomLink>;
type SLink = d3Sankey.SankeyLink<CustomNode, CustomLink>;

export interface GraphData {
    nodes: SNode[];
    links: SLink[];
}

export class SKRenderer implements Renderer<SankeySettings, GraphData>{
=======
export type SNode = d3Sankey.SankeyNode<CustomNode, CustomLink>;
export type SLink = d3Sankey.SankeyLink<CustomNode, CustomLink>;
export type GraphData = d3Sankey.SankeyGraph<CustomNode, CustomLink>;
export interface RenderSettings {
    width: number,
    height: number,

    // We need to find new settings
}

export class SKRenderer implements Renderer<RenderSettings, GraphData>{
>>>>>>> d64862d560a609466103b68f61e2344fc8bce3b5
    public constructor(
        private settings: SankeySettings,
        private SKRenderableData: GraphData
<<<<<<< HEAD
    ) {}
    
    updateSettings(s: SankeySettings): void {
=======
    ) { }

    updateSettings(s: RenderSettings): void {
>>>>>>> d64862d560a609466103b68f61e2344fc8bce3b5
        this.settings = s;
    }
    updatePoints(p: GraphData): void {
        this.SKRenderableData = p;
    }

    render(ref: MutableRefObject<HTMLDivElement>): void {
        const height = this.settings.height;
        const width = this.settings.width;
<<<<<<< HEAD
        const nodewidth = this.settings.nodewidth;
        

=======
>>>>>>> d64862d560a609466103b68f61e2344fc8bce3b5
        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

<<<<<<< HEAD
        const graph = d3Sankey.sankey()
                        .nodeWidth(nodewidth)
                        .nodePadding(10)
                        .extent([[1, 1], [width - 1, height - 6]]);
=======
        const graph = d3Sankey.sankey<GraphData, CustomNode, CustomLink>()
            .nodeId(
                (accessor: SNode) => accessor.nodeId
            )
            .nodeAlign(d3Sankey.sankeyLeft)
            .nodeWidth(25)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);
>>>>>>> d64862d560a609466103b68f61e2344fc8bce3b5
        graph(this.SKRenderableData);

        const links = this.createLinks(svg);
        this.createNodes(svg, graph, links);
    }

    /**
     * Function that takes the plot area as input and then it creates and appends the links to the plot area (with some additional props)
     * @param svg the plot area 
     * @returns the created links
     */
<<<<<<< HEAD
    private createLinks(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {     
        const opacity = this.settings.opacity;
        
        const link = svg.append("g").selectAll(".link")
                    .data(this.SKRenderableData.links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", d3Sankey.sankeyLinkHorizontal())
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", opacity)
                    .attr("fill", "none")
                    .attr("stroke-width", function(d: any) { 
                        return Math.max(1, d.width); 
                    })
                    .on("mouseover", function () {
                        d3.select(this)
                        .attr("stroke-opacity", 0.5)
                    })
                    .on("mouseleave", function () {
                        d3.select(this)
                        .attr("stroke-opacity", 0.2)
                    })
=======
    private createLinks(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
        const link = svg.append("g").selectAll(".link")
            .data(this.SKRenderableData.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .attr("fill", "none")
            .attr("stroke-width", function (d: any) {
                return Math.max(1, d.width);
            })
            .on("mouseover", function () {
                d3.select(this)
                    .attr("stroke-opacity", 0.5)
            })
            .on("mouseleave", function () {
                d3.select(this)
                    .attr("stroke-opacity", 0.2)
            })
>>>>>>> d64862d560a609466103b68f61e2344fc8bce3b5
        return link;
    }

    /**
     * Function that creates and appends nodes to the plot area and makes them draggable
     * @param svg the plot area
     * @param graph the SankeyLayout 
     * @param link path between nodes
     */

    private createNodes(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
        graph: d3Sankey.SankeyLayout<GraphData, CustomNode, CustomLink>,
        link: d3.Selection<SVGPathElement, SLink, SVGGElement, unknown>): void {

        /**
         * TODO: Stop drag when the node goes outside the borders
         * TODO: implement node's title 
         */
        const _self = this;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const node = svg.append("g")
            .selectAll(".node")
            .data(this.SKRenderableData.nodes)
            .enter().append("rect")
            .attr("class", "node")
            .attr("x", function (d: any) { return d.x0; })
            .attr("y", function (d: any) { return d.y0; })
            .attr("height", function (d: any) { return d.y1 - d.y0; })
            .attr("width", function (d: any) { return d.x1 - d.x0; })
            .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
            .attr("stroke", "#000");
    }

    /**
     * Get the svg width
     * @returns the width of the svg
     */
    public get svgWidth(): number {
        return this.settings.width;
    }

    /**
     * Get the svg height
     * @returns the height of the svg
    */
    public get svgHeight(): number {
        return this.settings.height;
    }

    public get svgNodeWidth(): number {
        return this.settings.nodewidth;
    }

    public get svgOpacity(): number {
        return this.settings.opacity;
    }
}