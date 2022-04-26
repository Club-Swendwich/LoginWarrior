import { SankeyLink as SankeyLinkType, SankeyNode } from 'd3-sankey';

export interface SankeyDataLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyDataNode {
  name: string;
  category: string;
}

export interface SankeyData {
  nodes: SankeyDataNode[];
  links: SankeyDataLink[];
}

export interface SankeySettings {
  width: number,
  height: number,
  backgroundColor: string
}

// LABEL TYPES

export interface SankeyLabelProps {
  x: number;
  y: number;
  dy: string;
  textAnchor?: 'start' | 'middle' | 'end';
  text: string;
}

export interface SankeyLabelGroupProps {
  nodes: RectNode[];
  width: number;
}

// LINK TYPES

export type PathLink = SankeyLinkType<SankeyDataNode, SankeyDataLink>;

export interface SankeyLinkProps {
  d: string;
  strokeWidth?: number;
  color?: string;
  title?: string;
}

export interface SankeyLinkGroupProps {
  links: PathLink[];
  titleFunc?(link: PathLink): string;
  colorFunc?(link: PathLink): string;
}

// RECT TYPES

export type RectNode = SankeyNode<SankeyDataNode, SankeyDataLink>;

export interface SankeyRectNodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
  title?: string;
}

export interface SankeyRectNodeGroupProps {
  nodes: RectNode[];
  titleFunc?(node: RectNode): string;
  colorFunc?(node: RectNode): string;
}

export interface SankeyChartProps {
  width: number;
  height: number;
}
