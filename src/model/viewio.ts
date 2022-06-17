export enum ViewParserError {
    WrongFormat,
    MissingField
};

export interface ViewParser<T> {
    parse(src: string): T | ViewParserError
};
