/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, {
  ChangeEvent, ChangeEventHandler, Dispatch, FunctionComponent, SetStateAction,
} from 'react';
import { TransformationSignature } from '../model/transformer';

export const LITERAL_VALUE = 'Literal';

interface SelectorProp {
  readonly name: string
  readonly selection: {
    readonly set: Dispatch<SetStateAction<[string, TransformationSignature]>>
    readonly get: [string, TransformationSignature]
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

function Selector(prop: SelectorProp) {
  const {
    literal, name, selection,
  } = prop;

  const setSelection0: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    const val = s.target.value;
    if (val === LITERAL_VALUE) {
      selection.set([val, literal.default]);
    } else {
      selection.set([val, selection.get(val)![1]]);
    }
  };
  const setSelection1: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    selection.set([selection.get[0], s.target.value]);
  };

  function FieldOption() {
    return (
      <select value={selection.get[0]} onChange={setSelection0}>
        { Array.from(selection.get[0])
          .map((e) => <option key={`${name}-${e}`} value={e}>{e}</option>) }
        <option key={`${name}-${LITERAL_VALUE}`} value={LITERAL_VALUE}>{LITERAL_VALUE}</option>
      </select>
    );
  }

  const literalInput = (
    <literal.Component
      onChange={setSelection1}
      selected={selection.get[1]}
      keyV={`${name}-in`}
    />
  );

  function ConverterOption() {
    const option = selection.get[0];
    if (option === LITERAL_VALUE) {
      return literalInput;
    }
    const opts = selection.get[1]; //???
    return (
      <select value={selection.get[1]} onChange={setSelection1}>
        { (opts ? opts : []).map(e => <option key={`${name}-${option}`} value={e}>{e}</option>) }
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
    selection, name,
  } = prop;
  return (
    <Selector
      name={name}
      selection={selection}
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
    selection, name,
  } = prop;
  return (
    <Selector
      name={name}
      selection={selection}
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
    selection, name,
  } = prop;
  return (
    <Selector
      name={name}
      selection={selection}
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
    selection, name,
  } = prop;
  return (
    <Selector
      name={name}
      selection={selection}
      literal={{
        default: DEFAULT_SHAPE.toString(),
        Component: ({ onChange, selected, keyV }) => (
          <select value={selected} onChange={onChange}>
            <option key={`${name}-star`}>star</option>
          </select>
        ),
      }}
    />
  );
}
