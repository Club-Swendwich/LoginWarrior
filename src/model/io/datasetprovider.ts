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
    const res = await fetch(url);
    if (!res.ok) {
      return ProvideError.NetworkError;
    }
    const body = await res.text();
    return this.parser.parse(body);
  }
}
