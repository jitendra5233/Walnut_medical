import React, { useState } from "react";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";

import LoginNew from "./Pages/User/Auth/LoginNew";
import ForgotPassword from "./Pages/User/Auth/ForgotPassword";
import OtpVerify from "./Pages/User/Auth/OtpVerify";
import ChangePasword from "./Pages/User/Auth/ChangePasword";

// jitendra

import Websetting from "./Pages/Websetting/Websetting";

import LayoutMain from "./Pages/LayoutMain";

import PostDataShow from "./Pages/PostData/PostDataShow";
import UploadData from "./Pages/UploadData/UploadData";
import ManageUser from "./Pages/User/UserAndRole/ManageUser";
import ManageRole from "./Pages/User/UserAndRole/ManageRole";
import MasterCartonOQC from "./Pages/Forms/OQC/MasterCartonOQC";
import CheckedOQC from "./Pages/Forms/OQC/CheckedOQC";
import ReviewStatusOQC from "./Pages/Forms/OQC/ReviewStatusOQC";
import AddMasterCartonOQC from "./Pages/Forms/OQC/AddMasterCartonOQC";

const routerAdmin = createHashRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/login" element={<Login />}></Route> */}
      <Route path="/login" element={<LoginNew />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/otpVerify" element={<OtpVerify />}></Route>
      <Route path="/changePassword" element={<ChangePasword />}></Route>

      <Route element={<LayoutMain />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ManageUser" element={<ManageUser />} />
        <Route path="/ManageRole" element={<ManageRole />} />
        <Route path="/settings" element={<Websetting />} />
        <Route path="PostApi" element={<PostDataShow />} />
        <Route path="FileUpload" element={<UploadData />} />

        {/* Form Start */}
        <Route path="MasterCartonOQC" element={<MasterCartonOQC />} />
        <Route path="CheckedOQC" element={<CheckedOQC />} />
        <Route path="ReviewStatusOQC" element={<ReviewStatusOQC />} />
        <Route path="AddMasterCartonOQC" element={<AddMasterCartonOQC />} />
        {/* Form End */}
      </Route>
    </Route>
  )
);

const RouterCom = () => {
  const [activeRoutes, setActiveRoutes] = useState(routerAdmin);

  return (
    <div>
      <RouterProvider router={activeRoutes} />
    </div>
  );
};

export default RouterCom;
