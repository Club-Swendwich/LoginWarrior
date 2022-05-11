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
      }, {
          nodeId: 5,
          name: "node5"
      }, {
          nodeId: 6,
          name: "node6"
      }, {
          nodeId: 7,
          name: "node7"
      }, {
          nodeId: 8,
          name: "node8"
      }, {
          nodeId: 9,
          name: "node9"
      }, {
          nodeId: 10,
          name: "node10"
      }, {
          nodeId: 11,
          name: "node11"
      }, {
          nodeId: 12,
          name: "node12"
      }, {
          nodeId: 13,
          name: "node13"
      }, {
          nodeId: 14,
          name: "node14"
      }, {
          nodeId: 15,
          name: "node15"
      }, {
          nodeId: 16,
          name: "node16"
      }, {
          nodeId: 17,
          name: "node17"
      }, {
          nodeId: 18,
          name: "node18"
      }, {
          nodeId: 19,
          name: "node19"
      }, {
          nodeId: 20,
          name: "node20"
      }, {
          nodeId: 21,
          name: "node21"
      }, {
          nodeId: 22,
          name: "node22"
      }, {
          nodeId: 23,
          name: "node23"
      }, {
          nodeId: 24,
          name: "node24"
      }, {
          nodeId: 25,
          name: "node25"
      }, {
          nodeId: 26,
          name: "node26"
      }, {
          nodeId: 27,
          name: "node27"
      }, {
          nodeId: 28,
          name: "node28"
      }, {
          nodeId: 29,
          name: "node29"
      }, {
          nodeId: 30,
          name: "node30"
      }, {
          nodeId: 31,
          name: "node31"
      }, {
          nodeId: 32,
          name: "node32"
      }, {
          nodeId: 33,
          name: "node33"
      }, {
          nodeId: 34,
          name: "node34"
      }, {
          nodeId: 35,
          name: "node35"
      }, {
          nodeId: 36,
          name: "node36"
      }, {
          nodeId: 37,
          name: "node37"
      }, {
          nodeId: 38,
          name: "node38"
      }, {
          nodeId: 39,
          name: "node39"
      }, {
          nodeId: 40,
          name: "node40"
      }, {
          nodeId: 41,
          name: "node41"
      }, {
          nodeId: 42,
          name: "node42"
      }, {
          nodeId: 43,
          name: "node43"
      }, {
          nodeId: 44,
          name: "node44"
      }, {
          nodeId: 45,
          name: "node45"
      }, {
          nodeId: 46,
          name: "node46"
      }, {
          nodeId: 47,
          name: "node47"
      }, {
          nodeId: 48,
          name: "node48"
      }, {
          nodeId: 49,
          name: "node49"
      }, {
          nodeId: 50,
          name: "node50"
      }],
        links: [{
          source: 0,
          target: 2,
          value: 2,

      }, {
          source: 1,
          target: 2,
          value: 2,

      }, {
          source: 1,
          target: 3,
          value: 2,

      }, {
          source: 0,
          target: 4,
          value: 2,

      }, {
          source: 2,
          target: 3,
          value: 2,

      }, {
          source: 2,
          target: 4,
          value: 2,

      }, {
          source: 3,
          target: 4,
          value: 4,

      }, {
          source: 5,
          target: 2,
          value: 10
      }, {
          source: 50,
          target: 10,
          value: 11
      }, {
          source: 37,
          target: 32,
          value: 2
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
