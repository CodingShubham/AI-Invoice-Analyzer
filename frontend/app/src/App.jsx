import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";

function App() {



  return (

    <Routes>

    <Route path="/" element={<Layout/>}>

    <Route path="/login" element={<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/logout" element={<Login/>}></Route>

    </Route>
    </Routes>
 
  );
}

export default App;