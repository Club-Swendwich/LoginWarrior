import { sankeyLinkHorizontal } from 'd3-sankey';
import {
  RectNode,
  SankeyData,
  SankeyDataLink,
  SankeyDataNode,
} from './types';

export const getData = async (): Promise<SankeyData> => {
  const nodes = [
    { name: 'Alice', category: '1' },
    { name: 'Gianna', category: '1' },
    { name: 'Carola', category: '1' },
    { name: 'Damiano', category: '1' },
  ];

  const links = [
    { source: 'Alice', target: 'Gianna', value: 2 },
    { source: 'Gianna', target: 'Carola', value: 3 },
    { source: 'Damiano', target: 'Gianna', value: 1 },
  ];

  return { nodes, links };
};

export const isFullRectNode = (node: RectNode): node is Required<RectNode> => (
  node.x0 !== undefined
  && node.x1 !== undefined
  && node.y0 !== undefined
  && node.y1 !== undefined
);

export const getTextProps = (
  {
    x0,
    x1,
    y0,
    y1,
  }: Required<RectNode>,
  width: number,
) => {
  const x = x0 < width / 2 ? x1 + 6 : x0 - 6;
  const y = (y1 + y0) / 2;

  const textAnchor = x0 < width / 2 ? 'start' : 'end';

  return {
    x,
    y,
    textAnchor,
    dy: '0.35em',
  } as const;
};

export const makeDPath = sankeyLinkHorizontal<SankeyDataNode, SankeyDataLink>();

export const getCoordinates = (node: RectNode) => {
  const {
    x0,
    x1,
    y0,
    y1,
  } = node;
  const width = x0 !== undefined && x1 !== undefined ? x1 - x0 : undefined;
  const height = y0 !== undefined && y1 !== undefined ? y1 - y0 : undefined;

  return {
    x: x0,
    y: y0,
    width,
    height,
  };
};
