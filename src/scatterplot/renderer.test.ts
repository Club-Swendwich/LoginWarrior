import { groupByShape, SPRenderer } from './renderer';

describe('SPRenderer', () => {
  it('should respect xAxisSettings', () => {
    const renderer = new SPRenderer(
      // @ts-expect-error We aren't mocking the entire  object
      {},
      { domainX: [10, 20] },
    );
    expect(renderer.xAxis.domain()).toEqual([10, 20]);
  });

  it('should respect yAxisSettings', () => {
    const renderer = new SPRenderer(
      // @ts-expect-error We aren't mocking the entire  object
      {},
      { domainY: [10, 20] },
    );
    expect(renderer.yAxis.domain()).toEqual([10, 20]);
  });

  it('should render the axis correctly', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correctly an empty input', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correclty on one shape group', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correclty more than one shape group', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correclty different colors', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correclty different sizes', () => {
    // TODO: Figure out how to mock webgl
  });

  it('should render correclty a big input', () => {
    // TODO: Figure out how to mock webgl
  });
  it('shouldn\'t render on an invalid reference', () => {
    // TODO: Figure out how to mock webgl
  });
});

describe('method GrupByShape', () => {
  it('should work on empty collections', () => {
    expect(groupByShape([])).toEqual(new Map());
  });

  it('should work on only one group', () => {
    const input = [
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
    ];

    // @ts-expect-error We aren't mocking the entire  object
    expect(groupByShape(input)).toEqual(new Map([
      ['a', input],
    ]));
  });

  it('should work in multiple groups even when shuffled', () => {
    const a = [
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
      { shape: 'a' },
    ];

    const b = [
      { shape: 'b' },
      { shape: 'b' },
      { shape: 'b' },
      { shape: 'b' },
      { shape: 'b' },
      { shape: 'b' },
    ];

    const c = [
      { shape: 'c' },
      { shape: 'c' },
      { shape: 'c' },
      { shape: 'c' },
      { shape: 'c' },
      { shape: 'c' },
    ];

    // @ts-expect-error We aren't mocking the entire  object
    expect(groupByShape(a.concat(...b).concat(...c).sort(() => Math.random - 0.5)))
      .toEqual(new Map([
        ['a', a],
        ['b', b],
        ['c', c],
      ]));
  });
});
