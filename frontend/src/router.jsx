import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import LayoutCom from "./Pages/Layout";
import ShowUsers from "./Pages/User/Users/ShowUsers";
import AddUsers from "./Pages/User/Users/AddUsers";
import AddRole from "./Pages/User/Role/AddRole";
import ShowRole from "./Pages/User/Role/ShowRole";
import LoginNew from "./Pages/User/Auth/LoginNew";
import ForgotPassword from "./Pages/User/Auth/ForgotPassword";
import OtpVerify from "./Pages/User/Auth/OtpVerify";
import ChangePasword from "./Pages/User/Auth/ChangePasword";
import LayoutCom2 from "./Pages/Layout2";
import HiringDashboard from "./Pages/Hiring/HiringDashboard";
import ShowPostions from "./Pages/Hiring/ShowPostions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/login" element={<Login />}></Route> */}
      <Route path="/login" element={<LoginNew />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/otpVerify" element={<OtpVerify />}></Route>
      <Route path="/changePassword" element={<ChangePasword />}></Route>
      <Route element={<LayoutCom2 />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<ShowUsers />} />
        <Route path="/new-user" element={<AddUsers />} />
        <Route path="/roles" element={<ShowRole />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/hiring" element={<HiringDashboard />} />
        <Route path="/show-postion" element={<ShowPostions />} />
      </Route>
    </Route>
  )
);

const RouterCom = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RouterCom;
