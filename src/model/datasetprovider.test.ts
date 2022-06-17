import { HTTPDatasetProvider, ProvideError } from "./datasetprovider";

const unmockedFetch = global.fetch

afterAll(() => {
    global.fetch = unmockedFetch
})

describe('HTTPDatasetProvider', () => {
    it("should handle a non existent url", async () => {
        global.fetch = () => Promise.reject();

        // @ts-expect-error We aren't mocking the entire  object
        const p = new HTTPDatasetProvider({})

        const load = await p.load("an url");

        expect(load).toEqual(ProvideError.NetworkError);
    });

    it("should handle rejected request", async () => {
        // @ts-expect-error We aren't mocking the entire  object
        global.fetch = () => Promise.resolve({ ok: false });

        // @ts-expect-error We aren't mocking the entire  object
        const p = new HTTPDatasetProvider({})

        const load = await p.load("an url");

        expect(load).toEqual(ProvideError.NetworkError);
    });

    it("should handle a correct request", async () => {
        // @ts-expect-error We aren't mocking the entire  object
        global.fetch = () => Promise.resolve({ ok: true, text: () => "aaa" });


        const p = new HTTPDatasetProvider({
            // @ts-expect-error We aren't mocking the entire  object
            parse: (b) => {
                expect(b).toEqual("aaa");
                return { guid: 32 };
            }
        })

        const load = await p.load("an url");

        expect(load).toEqual({ guid: 32 });
    });
});
