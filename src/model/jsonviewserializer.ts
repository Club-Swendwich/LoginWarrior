import { ViewIOError, ViewSerializer } from './viewio';

export class AnyViewJsonSerializer implements ViewSerializer<any> {
  constructor(
    private readonly acceptNulls = false,
  ) { }

  // eslint-disable-next-line class-methods-use-this
  get contentType(): string {
    return 'application/json';
  }

  // eslint-disable-next-line class-methods-use-this
  get extension(): string {
    return 'json';
  }

  public serialize(src: any): string | ViewIOError {
    if (!this.acceptNulls && (src === undefined || src === null)) {
      return ViewIOError.Null;
    }

    return JSON.stringify(src);
  }
}
