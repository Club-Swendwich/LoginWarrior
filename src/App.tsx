/* eslint-disable */
import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  SKRenderer
} from './SankeyDiagram/renderer'
import * as d3Sankey from 'd3-sankey';

function App() {
    const ref = useRef<HTMLDivElement>(null)
    const settings = useMemo(() => ({
      width: 2000,
      height: 1000
    }), []);
    
    const data = useMemo(() => ({
      nodes: [{
          nodeId: "00",
          name: "node0"
      }, {
          nodeId: "01",
          name: "node1"
      }, {
          nodeId: "10",
          name: "node2"
      }],
        links: [{
          source: "00",
          target: "10",
          value: 2,
      }, {
          source: "01",
          target: "10",
          value: 10
      }]
      }), [])

    const renderer = useMemo(() => new SKRenderer(settings, data), [settings, data])
    useEffect(() => {
        if (ref !== null) 
          renderer.render(ref as MutableRefObject<HTMLDivElement>)
    }, [ref, renderer, settings, data])

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
}

export default App;
