import { SKRenderer } from "./renderer";

describe("SKRenderer", () => {
    it('should respect settings', () => {
        const renderer = new SKRenderer(
            {
                width: 100,
                height: 100,
                nodewidth: 20,
                opacity: 0.2
            },
            // @ts-expect-error We aren't mocking the entire object
            {}
        );
        expect(renderer.svgWidth).toEqual(100);
        expect(renderer.svgHeight).toEqual(100);
    });    

        expect(renderer.svgWidth).toBe(100);
        expect(renderer.svgHeight).toBe(100);
        expect(renderer.svgHeight).toBe(20);
        expect(renderer.svgHeight).toBe(0.2);
    });
});