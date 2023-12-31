import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React, { useContext } from "react";
import axios from "axios";
import SignUp from "./Registration/SignUp";
import Login from "./Registration/Login";
import Home from "./Registration/Home";
import About from "./Registration/About";
import Analytics from "./components/Analytics";
import Forget_password from "./Registration/Forget_password";
import Product from "./components/Products";
import MiniDrawer from "./Dashboard/Sidebar";
import Dashboard from "./Dashboard/dashboard";
import Sidebar_pos from "./components/POS/containers/Sidebar_pos";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element = {<Login />}/>
       {/* <Route index element = {<Product />}/> */}
      <Route path="/about" element = {<About />}/>
      <Route path="/signup" element = {<SignUp />}/>
      <Route path="/login" element = {<Login />}/>
      <Route path="/forget_pass" element = {<Forget_password />}/>
      <Route path="/dashboard" element = {<Dashboard />}/>
      <Route path="/pos" element = {<Sidebar_pos />}/>
      {/* <Route path="/dashboard" element = {<Dashboard />}/> */}
    </Route>)
  );

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
};

const Root = () => {
  return (
    <>
      <div><Outlet /></div>
    </>
  );
};


export default App;
