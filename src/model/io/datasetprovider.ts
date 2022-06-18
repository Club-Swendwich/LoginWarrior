import { Dataset } from '../dataset';
import { DatasetParser, ParseError } from './datasetloader';

export enum ProvideError {
  NetworkError,
}

interface DatasetProvider {
  load: (url: string) => Promise<Dataset | ProvideError | ParseError>;
}

export class HTTPDatasetProvider implements DatasetProvider {
  constructor(
    private readonly parser: DatasetParser,
  ) { }

  async load(url: string): Promise<Dataset | ProvideError | ParseError > {
    let res;
    try {
      res = await fetch(url);
    } catch (_) {
      return ProvideError.NetworkError;
    }

    if (!res.ok) {
      return ProvideError.NetworkError;
    }
    const body = await res.text();
    return this.parser.parse(body);
  }
}
