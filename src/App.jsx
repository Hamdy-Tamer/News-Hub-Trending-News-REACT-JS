import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Business from "./Components/Business/Business";
import Entertainment from "./Components/Entertainment/Entertainment";
import General from "./Components/General/General";
import Sports from "./Components/Sports/Sports";
import Technology from "./Components/Technology/Technology";
import Science from "./Components/Science/Science";
import Health from "./Components/Health/Health";
import NotFounded from "./Components/NotFounded/NotFounded";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

export default function App() {
  let [logindata, setLoginData] = useState(null);

  function saveLoginData() {
    let encodedToken = localStorage.getItem("usertoken");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
  } 

  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      saveLoginData();
    }
  }, []);

let routers = createBrowserRouter([
    {
        path:"", 
        element: <Layout logindata={logindata} setLoginData={setLoginData} />, 
        children: [
        {index:true, element:<Login saveLoginData={saveLoginData} />},
        {path:"register", element:<Register/>},
        {path:"home", element: <Home/>},
        {path:"about", element: <About/>},
        {path:"contact", element: <Contact/>},
        {path:"business", element: <Business/>},
        {path:"entertainment", element: <Entertainment/>},
        {path:"health", element: <Health/>},
        {path:"science", element: <Science/>},
        {path:"sport", element: <Sports/>},
        {path:"technology", element: <Technology/>},
        {path:"general", element: <General/>},
        {path:"*", element: <NotFounded/>}
    ]}
]);

  return (
    <>
      <Toaster />
      <RouterProvider router={routers}></RouterProvider>
      <ScrollToTop />
    </>
  );
}