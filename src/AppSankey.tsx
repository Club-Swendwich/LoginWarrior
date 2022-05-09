import { OutputList } from "./sankey/viewModel/output"
import  output  from "./sankey/viewModel/settingsSelectorView"
import  SankeyViewSettings  from "./sankey/viewModel/settingsSelectorView"

function App() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
     <SankeyViewSettings output={OutputList}/> 
    </main>
  );
}

export default App;
