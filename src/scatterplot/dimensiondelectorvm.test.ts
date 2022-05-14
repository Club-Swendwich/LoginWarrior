import { SPDimensionSelectorVM } from './dimensionselectorvm';

const mockStruct = {
  x: 1,
  y: 2,
  size: 3,
  shape: 4,
  color: 5,
};

describe('DimensionSelectorVM', () => {
  it('should report the correct results on fields', () => {
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        availableFields: () => mockStruct,
      },
    );
    expect(m.fieldX).toEqual(1);
    expect(m.fieldY).toEqual(2);
    expect(m.fieldShape).toEqual(4);
    expect(m.fieldColor).toEqual(5);
    expect(m.fieldSize).toEqual(3);
  });
  it('should report the correct results on map', () => {
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        availableMappers: () => mockStruct,
      },
    );
    expect(m.mapX).toEqual(1);
    expect(m.mapY).toEqual(2);
    expect(m.mapShape).toEqual(4);
    expect(m.mapColor).toEqual(5);
    expect(m.mapSize).toEqual(3);
  });
  it('should update correctly x', () => {
    const selectedDimensions = [420, 420];
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        selectedDimensions: { x: selectedDimensions },
        availableFields: () => ({
          // @ts-expect-error mock
          x: selectedDimensions[0],
        }),
        availableMappers: () => ({
          // @ts-expect-error mock
          x: selectedDimensions[1],
        }),
      },
    );

    expect(m.fieldX).toEqual(420);
    expect(m.mapX).toEqual(420);

    // @ts-expect-error mock
    m.updateXAxisField(1);
    expect(m.fieldX).toEqual(1);

    // @ts-expect-error mock
    m.updateXAxisMap(1);
    expect(m.mapX).toEqual(1);
  });

  it('should update correctly y', () => {
    const selectedDimensions = [420, 420];
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        selectedDimensions: { y: selectedDimensions },
        availableFields: () => ({
          // @ts-expect-error mock
          y: selectedDimensions[0],
        }),
        availableMappers: () => ({
          // @ts-expect-error mock
          y: selectedDimensions[1],
        }),
      },
    );

    expect(m.fieldY).toEqual(420);
    expect(m.mapY).toEqual(420);

    // @ts-expect-error mock
    m.updateYAxisField(1);
    expect(m.fieldY).toEqual(1);

    // @ts-expect-error mock
    m.updateYAxisMap(1);
    expect(m.mapY).toEqual(1);
  });

  it('should update correctly shape', () => {
    const selectedDimensions = [420, 420];
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        selectedDimensions: { shape: selectedDimensions },
        availableFields: () => ({
          // @ts-expect-error mock
          shape: selectedDimensions[0],
        }),
        availableMappers: () => ({
          // @ts-expect-error mock
          shape: selectedDimensions[1],
        }),
      },
    );

    expect(m.fieldShape).toEqual(420);
    expect(m.mapShape).toEqual(420);

    // @ts-expect-error mock
    m.updateShapeField(1);
    expect(m.fieldShape).toEqual(1);

    // @ts-expect-error mock
    m.updateShapeMap(1);
    expect(m.mapShape).toEqual(1);
  });

  it('should update correctly color', () => {
    const selectedDimensions = [420, 420];
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        selectedDimensions: { color: selectedDimensions },
        availableFields: () => ({
          // @ts-expect-error mock
          color: selectedDimensions[0],
        }),
        availableMappers: () => ({
          // @ts-expect-error mock
          color: selectedDimensions[1],
        }),
      },
    );

    expect(m.fieldColor).toEqual(420);
    expect(m.mapColor).toEqual(420);

    // @ts-expect-error mock
    m.updateColorField(1);
    expect(m.fieldColor).toEqual(1);

    // @ts-expect-error mock
    m.updateColorMap(1);
    expect(m.mapColor).toEqual(1);
  });

  it('should update correctly size', () => {
    const selectedDimensions = [420, 420];
    const m = new SPDimensionSelectorVM(
      {
        // @ts-expect-error mock
        selectedDimensions: { size: selectedDimensions },
        availableFields: () => ({
          // @ts-expect-error mock
          size: selectedDimensions[0],
        }),
        availableMappers: () => ({
          // @ts-expect-error mock
          size: selectedDimensions[1],
        }),
      },
    );

    expect(m.fieldSize).toEqual(420);
    expect(m.mapSize).toEqual(420);

    // @ts-expect-error mock
    m.updateSizeField(1);
    expect(m.fieldSize).toEqual(1);

    // @ts-expect-error mock
    m.updateSizeMap(1);
    expect(m.mapSize).toEqual(1);
  });
});
