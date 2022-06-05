import { DatasetValue } from "../model/dataset";
import { SankeyLayer, StorableType } from "../model/datatypes";
import { SKMapper } from "./mapper";

describe('SankeyDiagram mapper', () => {
    it('should handle an empty dataset', () => {
        const dim = {
            layers: [
                ['LoginType', { guid: 24 }],
            ]
        };

        const prov = {
            get: ({ guid }: { guid: number }) => {
                if (guid == 24) {
                    // @ts-expect-error We aren't mocking the entire  object
                    const test: SankeyLayer<any> = {
                        outcomes: [true, false]
                    }
                    return test;
                }
            }
        }

        const mapper = new SKMapper(
            // @ts-expect-error We aren't mocking the entire  object
            prov,
            dim
        )

        const emptyDs = {
            entries: () => []
        }

        // @ts-expect-error We aren't mocking the entire  object
        expect(mapper.map(emptyDs)).toEqual({
            nodes: [
                {
                    name: "nodox",
                    nodeId: "0,0"
                },
                {
                    name: "nodox",
                    nodeId: "0,1"
                }
            ],
            links: []
        });
    });

    it('should map an entire dataset', () => {
        const dim = {
            layers: [
                ['LoginType', { guid: 24 }],
                ['ApplicationType', { guid: 23 }]
            ]
        };

        const prov = {
            get: ({ guid }: { guid: number }) => {
                if (guid == 24) {
                    const test: SankeyLayer<any> = {
                        outcomes: [0, 1, 2],
                        map: (field: DatasetValue) => field.value
                    }
                    return test;
                } else if (guid == 23) {
                    const test: SankeyLayer<any> = {
                        outcomes: [0, 1, 2, 3],
                        map: (field: DatasetValue) => field.value
                    }
                    return test;
                }
            }
        }

        const m = new SKMapper(
            // @ts-expect-error We aren't mocking the entire  object
            prov,
            dim,
        );

        const ds = {
            entries: () => [
                {
                    get: (field: string) => {
                        if (field == "LoginType") {
                            const dv: DatasetValue = {
                                type: StorableType.LoginType,
                                value: 2
                            };
                            return dv;
                        }
                        if (field == "ApplicationType") {
                            const dv: DatasetValue = {
                                type: StorableType.ApplicationType,
                                value: 1
                            };
                            return dv;
                        }
                    }
                }
            ],
        };

        // @ts-expect-error We aren't mocking the entire  object
        expect(m.map(ds)).toEqual({
            nodes: [
                {
                    name: "nodox",
                    nodeId: "0,0"
                },
                {
                    name: "nodox",
                    nodeId: "0,1"
                },
                {
                    name: "nodox",
                    nodeId: "0,2"
                },
                {
                    name: "nodox",
                    nodeId: "1,0"
                },
                {
                    name: "nodox",
                    nodeId: "1,1"
                },
                {
                    name: "nodox",
                    nodeId: "1,2"
                },
                {
                    name: "nodox",
                    nodeId: "1,3"
                },
            ],
            links: [
                {
                    source: "0,2",
                    target: "1,1",
                    value: 1
                },
                {
                    source: "1,1",
                    target: "",
                    value: 1
                }
            ]
        })
    });

    it('should correctly update the dimensions', () => {
        const dim1 = {
            layers: [
                ['LoginType', { guid: 24 }],
            ]
        };


        const prov = {
            get: ({ guid }: { guid: number }) => {
                if (guid == 24) {
                    const test: SankeyLayer<any> = {
                        outcomes: [0, 1, 2],
                        map: (field: DatasetValue) => field.value
                    }
                    return test;
                } else if (guid == 23) {
                    const test: SankeyLayer<any> = {
                        outcomes: [0, 1, 2, 3],
                        map: (field: DatasetValue) => field.value
                    }
                    return test;
                }
            }
        }

        
        const m = new SKMapper(
            // @ts-expect-error We aren't mocking the entire  object
            prov,
            dim1,
        );
            
        const dim2 = {
            layers: [
                ['ApplicationType', { guid: 23 }],
            ]
        };
            
        // @ts-expect-error We aren't mocking the entire  object
        m.updateMapLogic(dim2)

        const ds = {
            entries: () => [
                {
                    get: (field: string) => {
                        if (field == "LoginType") {
                            const dv: DatasetValue = {
                                type: StorableType.LoginType,
                                value: 2
                            };
                            return dv;
                        }
                        if (field == "ApplicationType") {
                            const dv: DatasetValue = {
                                type: StorableType.ApplicationType,
                                value: 1
                            };
                            return dv;
                        }
                    }
                }
            ],
        };
        
        // @ts-expect-error We aren't mocking the entire  object
        expect(m.map(ds)).toEqual({
            nodes: [
                {
                    name: "nodox",
                    nodeId: "0,0"
                },
                {
                    name: "nodox",
                    nodeId: "0,1"
                },
                {
                    name: "nodox",
                    nodeId: "0,2"
                },
                {
                    name: "nodox",
                    nodeId: "0,3"
                }
            ],
            links: [
                {
                    source: "0,1",
                    target: "",
                    value: 1
                }
            ]
        });
    });
});