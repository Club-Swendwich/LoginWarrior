import { Dataset, DatasetEntry } from "../../model/dataset";
import { StorableType } from "../../model/datatypes";

/**
 * interface that stores the Sankey Diagram dimensions
 */
export interface SKDimensions {
    layers: [string, Layer<any>][];
}

export interface Layer<T> {
    outcomes: T[];
    map: (k: any) => T;
}

/*

const succesLayer = {
    outcomes: [LoginType.LoginSuccess, LoginType.LoginFail, LoginType.Logout]
    map: (k: LoginType) => k
};

const isLogout = {
    oucomes: [true, false],
    map: (k: LoginType) => (k == LoginType.Logout)
};

*/
