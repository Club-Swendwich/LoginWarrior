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
      width: 1000,
      height: 100
    }), []);
    
    const data = useMemo(() => ({
    nodes: [{
        nodeId: 0,
        name: "node0"
    }, {
        nodeId: 1,
        name: "node1"
    }, {
        nodeId: 2,
        name: "node2"
    }, {
        nodeId: 3,
        name: "node3"
    }, {
        nodeId: 4,
        name: "node4"
    }],
      links: [{
        source: 0,
        target: 2,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 1,
        target: 2,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 1,
        target: 3,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 0,
        target: 4,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 2,
        target: 3,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 2,
        target: 4,
        value: 2,
        uom: 'Widget(s)'
    }, {
        source: 3,
        target: 4,
        value: 4,
        uom: 'Widget(s)'
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
