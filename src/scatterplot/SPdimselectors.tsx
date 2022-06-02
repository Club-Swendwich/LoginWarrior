/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, {
  ChangeEventHandler, Dispatch,
} from 'react';
import { TransformationSignature } from '../model/transformer';

interface SelectorProp {
  readonly name: string
  readonly fields: string[]
  readonly maps: Set<TransformationSignature>
  readonly defaultField: string
  readonly defaultMap: TransformationSignature
  readonly set: {
    readonly setField: Dispatch<React.SetStateAction<string >>
    readonly setMap: Dispatch<React.SetStateAction<TransformationSignature >>
  }
  readonly onNewSelection: (s: string) => void
}

export function Selector(prop: SelectorProp) {
  const {
    name, set, fields, maps, defaultField, defaultMap, onNewSelection,
  } = prop;

  const setFields: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    onNewSelection(s.target.value);
    const val = s.target.value;
    set.setField(val);
    ConverterOption();
    return null;
  };

  const setMaps: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (s) => {
    const x = Array.from(maps.values());
    const map = x.find((e) => e.identifier === s.target.value);
    set.setMap(map!);
  };

  function FieldOption() {
    return (
      <select defaultValue={defaultField} onChange={setFields}>
        {fields.map((e) => <option key={`${name}-${e}`} value={e}>{e}</option>) }
      </select>
    );
  }

  function ConverterOption() {
    const options: string[] = [];
    maps.forEach((val) => options.push(val.identifier));
    return (
      <select defaultValue={defaultMap.identifier} onChange={setMaps}>
        { options.map((e) => <option key={`${name}-${e}`} value={e}>{e}</option>) }
      </select>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <FieldOption />
      <ConverterOption />
    </div>
  );
}

export function RealSelector(prop: SelectorProp) {
  const {
    name, fields, maps, set, defaultField, defaultMap, onNewSelection,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      defaultField={defaultField}
      defaultMap={defaultMap}
      onNewSelection={onNewSelection}
    />
  );
}

export function IntSelector(prop: SelectorProp) {
  const {
    name, fields, maps, set, defaultField, defaultMap, onNewSelection,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      defaultField={defaultField}
      defaultMap={defaultMap}
      onNewSelection={onNewSelection}
    />
  );
}

export function ColorSelector(prop: SelectorProp) {
  const {
    name, fields, maps, set, defaultField, defaultMap, onNewSelection,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      defaultField={defaultField}
      defaultMap={defaultMap}
      onNewSelection={onNewSelection}
    />
  );
}

export function ShapeSelector(prop: SelectorProp) {
  const {
    name, fields, maps, set, defaultField, defaultMap, onNewSelection,
  } = prop;
  return (
    <Selector
      name={name}
      fields={fields}
      maps={maps}
      set={set}
      defaultField={defaultField}
      defaultMap={defaultMap}
      onNewSelection={onNewSelection}
    />
  );
}
