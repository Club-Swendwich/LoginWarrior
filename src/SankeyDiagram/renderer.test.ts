import { SKRenderer } from "./renderer";

describe("test SKRenderer", () => {
    test("should respect settings", () => {
        const renderer = new SKRenderer(
            {
                width: 100,
                height: 100,
            },
            // @ts-expect-error We aren't mocking the entire object
            {}
        );

        expect(renderer.svgWidth).toBe(100);
        expect(renderer.svgHeight).toBe(100);
    });
});