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

<<<<<<< HEAD
    it('should correctly render an empty input', () =>{
        // TODO        
    });

    it('should render correctly a big input', () => {
        // TODO
    });

    it('should\'t render if an invalid ref is passed', () => {
        // TODO
=======
        expect(renderer.svgWidth).toBe(100);
        expect(renderer.svgHeight).toBe(100);
        expect(renderer.svgHeight).toBe(20);
        expect(renderer.svgHeight).toBe(0.2);
>>>>>>> 5a1ad307ec7d680d7d0ecb49d39b6bc1dee4292d
    });
});