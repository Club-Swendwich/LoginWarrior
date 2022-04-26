import React, {
  MutableRefObject, useEffect, useMemo, useState,
} from 'react';
import { useMeasure } from 'react-use';
import { sankey, SankeyLayout } from 'd3-sankey';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { format } from 'd3-format';
import {
  SankeyLabelGroupProps,
  RectNode,
  PathLink,
  SankeyLabelProps,
  SankeyLinkProps,
  SankeyLinkGroupProps,
  SankeyRectNodeProps,
  SankeyRectNodeGroupProps,
  SankeyChartProps,
  SankeyData,
  SankeyDataLink,
  SankeyDataNode,
  SankeySettings,
} from './types';
import {
  getData,
  isFullRectNode,
  getTextProps,
  getCoordinates,
  makeDPath,
} from './functions';

function SankeyLabel({
  text,
  ...textProps
}: SankeyLabelProps): JSX.Element {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <text {...textProps}>{text}</text>;
}

function SankeyLabelGroup({
  nodes,
  width,
}: SankeyLabelGroupProps): JSX.Element {
  return (
    <g style={{ fontSize: 10 }}>
      {nodes.map((node) => {
        if (!isFullRectNode(node)) return null;
        const textProps = getTextProps(node, width);

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <SankeyLabel {...textProps} text={node.name} key={node.name} />;
      })}
    </g>
  );
}

function SankeyLink({
  d,
  color,
  strokeWidth,
  title,
}: SankeyLinkProps): JSX.Element {
  return (
    <g style={{ mixBlendMode: 'multiply' }}>
      <path d={d} stroke={color} strokeWidth={strokeWidth}>
        {title && <title>{title}</title>}
      </path>
    </g>
  );
}

function SankeyLinkGroup({
  links,
  titleFunc,
  colorFunc,
}: SankeyLinkGroupProps): JSX.Element {
  return (
    <g fill="none" strokeOpacity={0.5}>
      {links.map((link) => {
        const d = makeDPath(link);

        if (!d) return null;

        const strokeWidth = Math.max(1, link.width || 0);

        const { source, target } = link;
        const key = `${typeof source === 'object' ? source.name : source
        }--${
          typeof target === 'object' ? target.name : target}`;

        return (
          <SankeyLink
            key={key}
            d={d}
            color={colorFunc?.(link)}
            title={titleFunc?.(link)}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
}

//  Creazione nodo singolo
function SankeyRectNode({
  color,
  title,
  ...rectProps
}: SankeyRectNodeProps): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <rect {...rectProps} fill={color}>
      {title && <title>{title}</title>}
    </rect>
  );
}

//  Creazione gruppo nodi
function SankeyRectNodeGroup({
  nodes,
  titleFunc,
  colorFunc,
}: SankeyRectNodeGroupProps): JSX.Element {
  return (
    <g stroke="#000">
      {nodes.map((node) => {
        const coords = getCoordinates(node);
        return (
          <SankeyRectNode
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...coords}
            key={node.name}
            color={colorFunc?.(node)}
            title={titleFunc?.(node)}
          />
        );
      })}
    </g>
  );
}

const d3Color = scaleOrdinal(schemeCategory10);

const colorRectFunc = (dataPoint: RectNode) => d3Color(dataPoint.category || dataPoint.name);

const colorLinkFunc = (dataPoint: PathLink) => {
  const name = typeof dataPoint.target === 'object'
    ? dataPoint.target.name
    : dataPoint.target;

  return d3Color(name);
};

const d3format = format(',.0f');

const formatRectTitleFunc = (dataPoint: RectNode) => {
  if (!dataPoint.value) return dataPoint.name;

  return `${dataPoint.name}\n${d3format(dataPoint.value)}`;
};

const formatLinkTitleFunc = ({
  source,
  target,
  value,
}: PathLink): string => {
  const sourceName = typeof source === 'object' ? source.name : source;
  const targetName = typeof target === 'object' ? target.name : target;

  return `${sourceName} → ${targetName}\n${d3format(value)}`;
};

interface MakeSankeyInput {
  width: number;
  height: number;
}

const makeSankeyFunc = ({
  width,
  height,
}: MakeSankeyInput): SankeyLayout<
SankeyData,
SankeyDataNode,
SankeyDataLink
> => {
  const sankeyGen = sankey<SankeyDataNode, SankeyDataLink>()
    .nodeId((d) => d.name)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([
      [1, 5],
      [width - 1, height - 5],
    ]);

  return sankeyGen;
};

//  render grafico
function SankeyChart({
  width,
  height,
}: SankeyChartProps): JSX.Element | null {
  const [data, setData] = useState<SankeyData | null>(null);

  useEffect(() => {
    getData().then(setData);
  }, []);

  const sankeyGen = useMemo(
    () => makeSankeyFunc({
      width,
      height,
    }),
    [width, height],
  );

  const sankeyResult = useMemo(() => {
    if (!data) return null;

    return sankeyGen(data);
  }, [data, sankeyGen]);

  if (!data || !sankeyResult) return null;

  const { nodes, links } = sankeyResult;

  return (
    <svg width={width} height={height}>
      <SankeyRectNodeGroup
        nodes={nodes}
        colorFunc={colorRectFunc}
        titleFunc={formatRectTitleFunc}
      />
      <SankeyLinkGroup
        links={links}
        colorFunc={colorLinkFunc}
        titleFunc={formatLinkTitleFunc}
      />
      <SankeyLabelGroup nodes={nodes} width={width} />
    </svg>
  );
}

// eslint-disable-next-line import/prefer-default-export
export function Sankey(): JSX.Element {
  const [ref, measurements] = useMeasure<HTMLDivElement>();
  const { width } = measurements;

  return (
    <div ref={ref}>
      {width > 0 && <SankeyChart width={width} height={600} />}
    </div>
  );
}
