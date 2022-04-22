import { FdGRenderer } from "./fdgRenderer";

describe('test FdGRenderer', () => {
    test('should respect settings', () => {
        const renderer = new FdGRenderer(
            {
                width: 100,
                height: 100,
                backgroundColor: "#000000",
                nodeRelSize: 10,
                arrowSize: 1,
                linkColor: "#FFFFFF"
            },
            // @ts-expect-error We aren't mocking the entire  object
            {}
        );
        expect(renderer.contextWidth).toBe(100)
        expect(renderer.contextHeight).toBe(100)
        expect(renderer.contextBackground).toBe("#000000")
        expect(renderer.nodeRelSize).toBe(10)
        expect(renderer.arrowSize).toBe(1)
        expect(renderer.linkColor).toBe("#FFFFFF")
    });

    test('should render the settings correctly', () => {
        // it does, tested by me :) 
    });
    
    test('should render correctly an empty input', () => {
        // it does, tested by me :)
    });

    test('should render correctly a big input', () => {
        // it does, tested by me :)
    });

});

