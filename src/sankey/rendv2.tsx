import React, {
  MutableRefObject, useEffect, useMemo, useState,
} from 'react';
import { useMeasure } from 'react-use';
import { sankey, SankeyLayout } from 'd3-sankey';
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
  SankeySettings
} from './types';
import { GraphableType, GraphableTypeToRepr } from '../model/datatypes';
import { Renderer } from '../genericview/renderer';

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

// eslint-disable-next-line import/prefer-default-export
export class SankeyRenderer implements Renderer<SankeySettings, SankeyData> {
  constructor(
    private points: SankeyData[],
    private settings: SankeySettings,
  ) { }

  updatePoints(p: SankeyData[]): void {
    this.points = p;
  }

  updateSettings(s: SankeySettings): void {
    this.settings = s;
  }

  render(ref: MutableRefObject<HTMLDivElement>): void {
    // const [ref, measurements] = useMeasure<HTMLDivElement>();
    // const { width } = measurements;
  }
}
