import { SankeyLink, SankeyNode } from 'd3-sankey';

/**
 * The enum that rappresents a type that can be stored in the dataset
 */
export enum StorableType {
  Int,
  String,
  LoginType,
  Date,
  Ip,
}

/**
 * Converts a storable type to the respective typescript type
 */
export type StorableTypeToRepr<T extends StorableType>
    = T extends StorableType.Int ? Int
      : T extends StorableType.String ? string
        : T extends StorableType.Date ? Date
          : T extends StorableType.Ip ? string
            : LoginType;

/**
 * A type that can be plotted by a graph
 */
export enum GraphableType {
  Int,
  Real,
  Color,
  Shape,
}

/**
 * Converts a GraphableType to a typescript type
 */
export type GraphableTypeToRepr<T extends GraphableType>
    = T extends GraphableType.Int ? Int
      : T extends GraphableType.Real ? Real
        : T extends GraphableType.Color ? Color
          : Shape;

export type Int = number;
export type Real = number;
export type Shape = 'star' | 'triangle' | 'cross' | 'square';
export type Color = [number, number, number, number];

export enum LoginType {
  LoginSuccess = 1,
  LoginFail,
  Logout,
}

// Sankey datatypes
export type CustomNode = {
  nodeId: number;
  name: string;
};

export type CustomLink = {
  source: number;
  target: number;
  value: number;
};
