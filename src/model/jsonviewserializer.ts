import { ViewIOError, ViewSerializer } from './viewio';

export class AnyViewJsonSerializer implements ViewSerializer<any> {
  constructor(
    private readonly acceptNulls = false,
  ) { }

  public serialize(src: any): string | ViewIOError {
    if (!this.acceptNulls && (src === undefined || src === null)) {
      return ViewIOError.Null;
    }

    return JSON.stringify(src);
  }
}
