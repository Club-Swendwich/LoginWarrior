/**
 * The enum that rappresents a type that can be stored in the dataset
 */
export enum StorableType {
  Int,
  String,
  LoginType,
  ApplicationType
}

/**
 * Converts a storable type to the respective typescript type
 */
export type StorableTypeToRepr<T extends StorableType>
    = T extends StorableType.Int ? Int
      : T extends StorableType.String ? string
        : T extends StorableType.LoginType ? LoginType
          : ApplicationType;

/**
 * A type that can be plotted by a graph
 */
export enum GraphableType {
  Int,
  Real,
  Color,
  Shape,
  SankeyLayer
}

/**
 * Converts a GraphableType to a typescript type
 */
export type GraphableTypeToRepr<T extends GraphableType>
    = T extends GraphableType.Int ? Int
      : T extends GraphableType.Real ? Real
        : T extends GraphableType.Color ? Color
          : T extends GraphableType.Shape ? Shape
            : SankeyLayer<any>;

export type Int = number;
export type Real = number;
export type Shape = 'star' | 'triangle' | 'cross' | 'square';
export type Color = [number, number, number, number];

export interface SankeyLayer<T> {
  outcomes: T[];
  map: (k: any) => T;
};

export enum LoginType {
  LoginSuccess = 1,
  LoginFail,
  Logout,
}

export enum ApplicationType {
  HRW,
  ERM,
  GTL,
  HRC,
  HR1,
  HRM,
  HUT,
  DWH,
  HTR,
  GAW,
  HSP,
  TM3,
  HCF,
  MD7
}

// Sankey datatypes
export type CustomNode = {
  nodeId: string,
  name: string;
}

export type CustomLink = {}