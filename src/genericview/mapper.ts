import { Dataset } from '../model/dataset';

/**
 * Interface that represents a generic mapper, a components that transforms the
 * dataset in something that can be rendered by a renderer.
 * @template Dimensions the association between a dataset entry to a graph
 * dimension.
 * @template Renderable the structure that this mapper can map the dataset to.
 */
export interface Mapper<Dimensions, Renderable> {
  updateMapLogic(ml: Dimensions): void;
  map(d: Dataset): Renderable
}
