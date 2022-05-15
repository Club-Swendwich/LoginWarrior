/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, {
  ChangeEvent, ChangeEventHandler, Dispatch, FunctionComponent,
} from 'react';
import { TransformationSignature } from '../model/transformer';

export const LITERAL_VALUE = 'Literal';

interface SelectorProp {
  readonly name: string
  readonly fields: string[]
  readonly maps: Set<TransformationSignature>
  readonly set: {
    readonly setField: Dispatch<React.SetStateAction<string | undefined>>
    readonly setMap: Dispatch<React.SetStateAction<TransformationSignature | undefined>>
  }
  readonly literal: {
    readonly default: string
    readonly Component: FunctionComponent<DefaultProp>
  }
}

interface DefaultProp {
  readonly keyV: string,
  readonly selected: string,
  readonly onChange: (s: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function Selector(prop: SelectorProp) {
  const {
    literal, name, set, fields, maps,
  } = prop;

  const setFields: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    const val = s.target.value;
    if (val === LITERAL_VALUE) {
      set.setField(val);
      return literalInput;
    }
    set.setField(val);
    ConverterOption();
    return null;
  };

  const setMaps: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    const x = Array.from(maps.values());
    const map = x.find((e) => e.identifier === s.target.value);
    set.setMap(map);
  };

  function FieldOption() {
    return (
      <select value={fields[0]} onChange={setFields}>
        {fields.map((e) => <option key={`${name}-${e}`} value={e}>{e}</option>) }
        <option key={`${name}-${LITERAL_VALUE}`} value={LITERAL_VALUE}>{LITERAL_VALUE}</option>
      </select>
    );
  }

  const literalInput = (
    <literal.Component
      onChange={setMaps}
      selected={Array.from(maps.values())[0].identifier}
      keyV={`${name}-in`}
    />
  );

  function ConverterOption() {
    const options: string[] = [];
    maps.forEach((val) => options.push(val.identifier));
    return (
      <select value={options[0]} onChange={setMaps}>
        { options.map((e) => <option key={`${name}-${e}`} value={e}>{e}</option>) }
      </select>
    );
  }

  return (
    <div>
      <FieldOption />
      <ConverterOption />
    </div>
  );
}

export type FSelectorProp = Omit<SelectorProp, 'literal'>;

const DEFAULT_REAL = 0;
export function RealSelector(prop: FSelectorProp) {
  const {
    name, fields, maps, set,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      literal={{
        default: DEFAULT_REAL.toString(),
        Component: ({ onChange, selected, keyV }) => (
          <input
            onChange={onChange}
            value={selected}
            key={keyV}
            type="number"
            step="0.000001"
          />
        ),
      }}
    />
  );
}

const DEFAULT_INT = 0;
export function IntSelector(prop: FSelectorProp) {
  const {
    name, fields, maps, set,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      literal={{
        default: DEFAULT_INT.toString(),
        Component: ({ onChange, selected, keyV }) => (
          <input
            onChange={onChange}
            value={selected}
            key={keyV}
            type="number"
            step="1"
          />
        ),
      }}
    />
  );
}

const DEFAULT_COLOR = '#F5B7A4';
export function ColorSelector(prop: FSelectorProp) {
  const {
    name, fields, maps, set,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      literal={{
        default: DEFAULT_COLOR.toString(),
        Component: ({ onChange, selected, keyV }) => (
          <input
            onChange={onChange}
            value={selected}
            key={keyV}
            type="color"
          />
        ),
      }}
    />
  );
}

const DEFAULT_SHAPE = 'star';
export function ShapeSelector(prop: FSelectorProp) {
  const {
    name, fields, maps, set,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      literal={{
        default: DEFAULT_SHAPE.toString(),
        Component: ({ onChange, selected }) => (
          <select value={selected} onChange={onChange}>
            <option key={`${name}-star`}>star</option>
          </select>
        ),
      }}
    />
  );
}
