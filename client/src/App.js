import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostView from "./pages/PostView";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Write from "./pages/Write";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import SinglePost from "./components/SinglePost";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {

  const {user} = useContext(Context)

  
  return (
 
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"element= {user ? <Home /> : <Login />}/>
        <Route path="/register"element= {user ? <Home /> : <Register />}/>
        <Route path="/publish" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<PostView />} />
      </Routes>
    </BrowserRouter>
   

  );
}

export default App;
