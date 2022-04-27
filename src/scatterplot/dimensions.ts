import { TransformationSignature } from '../model/transformer'

export interface SPDimensions {
  readonly x: [string, TransformationSignature];
  readonly y: [string, TransformationSignature];
  readonly size: [string, TransformationSignature];
  readonly shape: [string, TransformationSignature];
  readonly color: [string, TransformationSignature];
}

