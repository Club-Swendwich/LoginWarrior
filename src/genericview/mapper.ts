import { Dataset } from '../model/dataset'

export interface Mapper<MapLogic, Renderable> {
  updateMapLogic(ml: MapLogic): void;
  map(d: Dataset): Renderable
}
