import { Mapper } from '../genericview/mapper';
import { Dataset, DatasetEntry } from '../model/dataset';
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

// TODO: implement map tests
export default class SPMapper implements Mapper<SPDimensions, SPREnderablePoint[]> {
  private mapFn : MapFnAccumulator;

  constructor(
    private transformer: TransformationProvider,
    settings: SPDimensions,
  ) {
    this.mapFn = this.makeMapFn(settings);
  }

  public map(d: Dataset): SPREnderablePoint[] {
    return d.entries().map(this.apply);
  }

  public updateMapLogic(ml: SPDimensions): void {
    this.mapFn = this.makeMapFn(ml);
  }

  private makeMapFn(s: SPDimensions): MapFnAccumulator {
    const xM = this.transformer.get(s.x[1])!;
    const yM = this.transformer.get(s.y[1])!;
    const sizeM = this.transformer.get(s.size[1])!;
    const shapeM = this.transformer.get(s.shape[1])!;
    const colorM = this.transformer.get(s.color[1])!;
    return {
      x: (d) => xM(d.get(s.x[0])),
      y: (d) => yM(d.get(s.y[0])),
      size: (d) => sizeM(d.get(s.size[0])),
      shape: (d) => shapeM(d.get(s.shape[0])),
      color: (d) => colorM(d.get(s.color[0])),
    };
  }

  private apply(d: DatasetEntry): SPREnderablePoint {
    return {
      x: this.mapFn.x(d),
      y: this.mapFn.y(d),
      size: this.mapFn.size(d),
      shape: this.mapFn.shape(d),
      color: this.mapFn.color(d),
    };
  }
}
