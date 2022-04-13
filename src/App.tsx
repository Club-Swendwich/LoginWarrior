/* eslint-disable */
import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  FdGRenderer
} from './ForceDirectedGraph/fdgRenderer'

function App() {
    const ref = useRef<HTMLDivElement>(null)
    const settings = useMemo(() => ({
      width:      1000,
      height:     1000,
      backgroundColor: '#000000',

      nodeRelSize:   4,
      
      linkColor: '#FFFFFF',
      arrowSize:  0,

      zoomNear:   75,
      zoomFar:    16000 
    }), []);
    
    const data = useMemo(() => ({
      nodes: [
        { id: "node1", name: "Marco"},
        { id: "node2", name: "LuBu"},
        { id: "node3", name: "Gianni"},
        { id: "node4", name: "Filippo"},
        { id: "node5", name: "LuBu"},
        { id: "node6", name: "Frango"}
      ],
      links: [
        { source: "node1", target: "node2"},
        { source: "node2", target: "node1"},
        { source: "node5", target: "node3"},
        { source: "node6", target: "node2"},
        { source: "node6", target: "node1"},
        { source: "node6", target: "node3"},
      ]
    }), [])

    const renderer = useMemo(() => new FdGRenderer(settings, data), [settings, data])
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
