import './App.css'
import {Navbar} from "./Components/Navbar/Navbar.tsx";
import {Route , Routes} from "react-router-dom";
import {Home} from "./Components/Home/Home.tsx";
import {Lobbies} from "./Components/Lobbies/Lobbies.tsx";
import {Settings} from "./Components/Settings/Settings.tsx";


function App() {
    
  return (
      <div>
        <Navbar></Navbar>
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Lobbies" element={<Lobbies />}></Route>
              <Route path="/Settings" element={<Settings />}></Route>
          </Routes>
      </div>
  )
}

export default App
