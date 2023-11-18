import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import {Navbar} from "./Components/Navbar/Navbar.tsx";
import {Route , Routes} from "react-router-dom";
import {Home} from "./Components/Home/Home.tsx";
import {Lobbies} from "./Components/Lobbies/Lobbies.tsx";
import {Settings} from "./Components/Settings/Settings.tsx";
import {LobbyChat} from "./Components/LobbyChat/LobbyChat.tsx";
import {useEffect} from "react";
import * as chatservice from "./Services/Chat/ChatService.tsx";
import {AuthenticationLanding} from "./Components/Authentication/AuthenticationLanding.tsx";


function App() {
    //functions
    //---------
    useEffect( () => {
        chatservice.StartChat()
    }, [])
    
    
    //view
    //----
  return (
      <div>
        <Navbar></Navbar>
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Lobbies" element={<Lobbies />}></Route>
              <Route path="/Lobby/:id" element={<LobbyChat />}></Route>
              <Route path="/Settings" element={<Settings />}></Route>
              <Route path="/Auth" element={<AuthenticationLanding />}></Route>
          </Routes>
      </div>
  )
}

export default App
