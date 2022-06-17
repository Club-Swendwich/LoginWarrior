export enum ViewIOError {
  WrongFormat,
  MissingField,
  Null,
}

export interface ViewParser<T> {
  parse(src: string): T | ViewIOError
}

export interface ViewSerializer<T> {
  serialize(src: T): string | ViewIOError;
  get contentType(): string;
  get extension(): string;
}
