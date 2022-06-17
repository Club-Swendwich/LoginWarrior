export type ViewIndex = string;

export enum ViewRepositoryError {
  NotFound,
}

export enum ViewType {
  ScatterPlot,
  Sankey,
}

// FIXME: Placeholder
export type View = string;

// FIXME
export const DEFAULTSP = 'fixme';
export const DEFAULTSK = 'fixmes';

export class ViewRepository {
  private readonly data: Map<ViewIndex, View>;

  constructor() {
    this.data = new Map();
  }

  public createNewDefaultView(idx: ViewIndex, type: ViewType): boolean {
    if (this.data.has(idx)) {
      return false;
    }

    const v = type === ViewType.ScatterPlot ? DEFAULTSP : DEFAULTSK;

    this.data.set(idx, v);
    return true;
  }

  public getViewAt(idx: ViewIndex): View | ViewRepositoryError {
    if (!this.data.has(idx)) {
      return ViewRepositoryError.NotFound;
    }

    return this.data.get(idx)!;
  }

  public getViews(): [ViewIndex, View][] {
    return Array.from(this.data.entries());
  }
}
