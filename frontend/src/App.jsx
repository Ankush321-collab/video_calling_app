import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./componenets/Home";
import Signup from "./componenets/signup";
import Login from "./componenets/login";
import CallPage from "./componenets/CallPage";
import ChatPage from "./componenets/ChatPage";
import Notification from "./componenets/Notification";
import Onboarding from "./componenets/Onboarding";
import Loader from "./componenets/Loader";
import "./App.css";
import Layout from "./pages/Layout";
import { Notfound } from "./pages/Notfound";
import Friends from "./pages/Friends";
import NotificationNotFound from "./componenets/NotificationNotFound";

function App() {
  const [authuser, setAuthUser, isloading] = useAuth();
  const isonboarded=authuser?.isonboarded;
  

  if (isloading) return <Loader />;

  return (
    <>
      <Routes>
        <Route path="/" element={authuser  && isonboarded ?

           <Layout showsidebar> <Home /></Layout> :authuser && !isonboarded ? <Onboarding /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/call" element={authuser ? <CallPage /> : <Login />} />
        <Route path="/chat" element={authuser ? <ChatPage /> : <Login />} />
        <Route
          path="/notifications"
          element={authuser ? <Layout showsidebar><Notification /></Layout> : <Login />}
        />
        <Route
          path="/onboarding"
          element={authuser ? <Onboarding /> : <Login />}
        />
         <Route
          path="/friends"
          element={authuser ? <Layout showsidebar><Friends /></Layout> : <Login />}
        />
         <Route
          path="/*"
          element={authuser ? <Notfound/>: <Login />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
