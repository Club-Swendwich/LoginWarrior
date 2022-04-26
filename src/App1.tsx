import React, {
  MutableRefObject, useEffect, useMemo, useRef,
} from 'react';
import { SankeyRenderer } from './sankey/rendv2';

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const settings = useMemo(() => ({
    width: 600,
    height: 600,
    backgroundColor: '#000000',
  }), []);

  const data = useMemo(() => ({
    nodes: [
      { name: 'Alice', category: '1' },
      { name: 'Gianna', category: '1' },
      { name: 'Carola', category: '1' },
      { name: 'Damiano', category: '1' },
    ],
    links: [
      { source: 'Alice', target: 'Gianna', value: 2 },
      { source: 'Gianna', target: 'Carola', value: 3 },
      { source: 'Damiano', target: 'Gianna', value: 1 },
    ],
  }), []);

  const renderer = useMemo(() => new SankeyRenderer(data, settings), [settings, data]);
  useEffect(() => {
    if (ref !== null) { renderer.render(ref as MutableRefObject<HTMLDivElement>); }
  }, [ref, renderer, settings, data]);
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
      <div ref={ref} className="renderArea"/>
    </>
  );
  // return <div><Sankey /></div>;
}

export default App;
