import './frontend/App.css';
import Setup from './frontend/meta_fields.js';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./frontend/sign_pad.js";
import Coordinates from "./frontend/coordinates.js";



function App() {


  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Setup />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/coord" exact component={() => <Coordinates/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div >
//       <div>
//         <Setup/>
//       </div>
//       {/* <button>upload a file</button> */}
//     </div>
//   );
// }

// export default App;
