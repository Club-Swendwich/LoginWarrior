import React, {
  useEffect, useRef, MutableRefObject, useMemo, FormEventHandler,
} from 'react';
import { Color, Shape } from './model/datatypes';
import { SPRenderer } from './scatterplot/renderer';
import SPRenderingSettingsSelectorVM from './scatterplot/renderingsettingsvm';
import SPRenderingSettingsView from './scatterplot/renderingsettingsview';

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const points = useMemo(() => [
    {
      x: 5,
      y: 5,
      size: 1000,
      shape: 'star' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
    {
      x: 7,
      y: 7,
      size: 1000,
      shape: 'square' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
    {
      x: 4,
      y: 3,
      size: 1000,
      shape: 'triangle' as Shape,
      color: [0.6, 0.4, 1, 1] as Color,
    },
    {
      x: 4,
      y: 8,
      size: 500,
      shape: 'triangle' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
  ], []);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [0, 15],
      domainY: [0, 20],
    }),
  }), []);

  // eslint-disable-next-line max-len
  const renderer = useMemo(() => new SPRenderer(points, renderSettingsVM.model.getSettings), [points, renderSettingsVM.model.getSettings]);

  useEffect(() => {
    if (ref !== null) {
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, [ref, renderer, renderSettingsVM.model.getSettings, points]);

  function reload() {
    document.getElementById('render').innerHTML = '';
    const renderernew = new SPRenderer(points, renderSettingsVM.model.getSettings);
    renderernew.render(ref as MutableRefObject<HTMLDivElement>);
  };

  return (
    <>
      <style>
        {`
              .renderArea {
                  height: 400px;
              }
          `}
      </style>
      {/* eslint-disable */}
        <div ref={ref} className="renderArea" id = "render"/>
        <SPRenderingSettingsView viewModel={renderSettingsVM.model} onReaload = {reload}></SPRenderingSettingsView>
        <button onClick={reload}>
          Click to reload!
        </button>
      </>
  );
  
  }
  
  export default App;