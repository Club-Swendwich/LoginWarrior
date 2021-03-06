import { Mapper, MapperError } from '../genericview/mapper';
import { Dataset, DatasetEntry, DatasetValue } from '../model/dataset';
import { TransformationProvider } from '../model/transformer';
import { SPDimensions } from './dimensions';
import { SPREnderablePoint } from './renderer';

interface MapFnAccumulator {
  x: (e: DatasetEntry) => any;
  y: (e: DatasetEntry) => any;
  size: (e: DatasetEntry) => any;
  shape: (e: DatasetEntry) => any;
  color: (e: DatasetEntry) => any;
}

export class SPMapper implements Mapper<SPDimensions, SPREnderablePoint[]> {
  private mapFn : MapFnAccumulator | MapperError;

  constructor(
    private transformer: TransformationProvider,
    settings: SPDimensions,
  ) {
    try {
      this.mapFn = this.makeMapFn(settings);
    } catch (_) {
      this.mapFn = MapperError.UnknownSignature;
    }
  }

  public map(d: Dataset): SPREnderablePoint[] | MapperError {
    if (this.mapFn === MapperError.UnknownSignature) return MapperError.UnknownSignature;
    try {
      return d.entries().map(this.apply, this);
    } catch (e) {
      return MapperError.UnknownField;
    }
  }

  public updateMapLogic(ml: SPDimensions): void {
    try {
      this.mapFn = this.makeMapFn(ml);
    } catch (_) {
      this.mapFn = MapperError.UnknownSignature;
    }
  }

  private makeMapFn(s: SPDimensions): MapFnAccumulator {
    const xM = this.transformer.get(s.x[1])!;
    const yM = this.transformer.get(s.y[1])!;
    const sizeM = this.transformer.get(s.size[1])!;
    const shapeM = this.transformer.get(s.shape[1])!;
    const colorM = this.transformer.get(s.color[1])!;
    return {
      x: (d) => xM((d.get(s.x[0]) as DatasetValue).value),
      y: (d) => yM((d.get(s.y[0]) as DatasetValue).value),
      size: (d) => sizeM((d.get(s.size[0]) as DatasetValue).value),
      shape: (d) => shapeM((d.get(s.shape[0]) as DatasetValue).value),
      color: (d) => colorM((d.get(s.color[0]) as DatasetValue).value),
    };
  }

  private apply(d: DatasetEntry): SPREnderablePoint {
    const mapper = this.mapFn as MapFnAccumulator;
    return {
      x: mapper.x(d),
      y: mapper.y(d),
      size: mapper.size(d),
      shape: mapper.shape(d),
      color: mapper.color(d),
    };
  }
}
