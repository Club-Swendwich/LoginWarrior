import { Dataset } from "./dataset";
import { DatasetParser, ParseError } from "./datasetloader";

export enum ProvideError {
    NetworkError
}

interface DatasetProvider {
    load: () => Promise<Dataset | ProvideError | ParseError>;
}

export class HTTPDatasetProvider implements DatasetProvider {
    constructor(
        private readonly url: string,
        private readonly parser: DatasetParser,
    ) { }

   async load(): Promise<Dataset | ProvideError | ParseError > {
       let res = await fetch(this.url);
       if (!res.ok) {
           return ProvideError.NetworkError;
       }
       const body = await res.text();
       return this.parser.parse(body);
   }
}
