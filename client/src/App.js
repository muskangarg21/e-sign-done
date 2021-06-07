import './App.css';
import Setup from './frontend/meta_fields.js';
//import axios from "axios";

// componentDidMount =() =>{
//   axios.get("").then(response =>{
//     console.log(response)
//   });
// };
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./frontend/About.js";
function App() {


  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Setup />} />
          <Route path="/about" exact component={() => <About />} />
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
