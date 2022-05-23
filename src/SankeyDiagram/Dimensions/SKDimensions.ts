import { StorableType } from "../../model/datatypes";

/**
 * interface that stores the Sankey Diagram dimensions
 */
export interface SKDimensions {
    layers: Layer<any, any>[];
}

export interface Layer<T, K> {
    layerTitle: string,
    outcomes: T[];
    map: (k: K) => T;
}

/*

const succesLayer = {
    layerTitle: "Login type"
    outcomes: [LoginType.LoginSuccess, LoginType.LoginFail, LoginType.Logout]
    map: (k: LoginType) => k
};

const isLogout = {
    layerTitle: "Check logout"
    oucomes: [true, false],
    map: (k: LoginType) => (k == LoginType.Logout)
};

*/
