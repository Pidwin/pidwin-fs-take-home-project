import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PasswordSetting from "./components/PasswordSettings/PasswordSettings";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/password" element={<PasswordSetting />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
