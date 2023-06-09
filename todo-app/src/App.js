import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from ".";
import server from ".";
import axios from "axios";
function App() {
  const { setUser, setIsAuthenticated,setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/users/myProfile`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.user)
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false)
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
