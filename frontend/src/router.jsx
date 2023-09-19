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
import SoundBoxLQCList from "./Pages/Forms/LQC/SoundBoxLQCList";
import ReviewStatusLQC from "./Pages/Forms/LQC/ReviweStatusLQC";
import AddSoundLQC from "./Pages/Forms/LQC/AddSoundLQC";
import SoundBoxLineChekList from "./Pages/Forms/LQC/SoundBoxLineChekList";
import SoundBoxLQCCcjekList from "./Pages/Forms/LQC/SoundBoxLQCCheckList";
import CheckListedSoundBoxLQC from "./Pages/Forms/LQC/CheckListedSoundBoxLQC";
import ShowDefectedItemList from "./Pages/Forms/Rework/ShowDefectedItemList";
import ReworkCheckList from "./Pages/Forms/Rework/ReworkCheckList";

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
        <Route path="sound_box" element={<SoundBoxLQCList />} />
        <Route path="lqc_reviewStatus" element={<ReviewStatusLQC />} />
        <Route path="AddSoundLQC/:batch_number" element={<AddSoundLQC />} />
        <Route
          path="line_quality_check_list/:IMEI_number/:batch_number"
          element={<SoundBoxLineChekList />}
        />
        <Route path="/Check_list" element={<SoundBoxLQCCcjekList />} />
        <Route
          path="/Check_listed_soundbox/:batch_number"
          element={<CheckListedSoundBoxLQC />}
        />
        <Route path="/rework_soundbox" element={<ShowDefectedItemList />} />
        <Route path="/rework_checklist" element={<ReworkCheckList />} />

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
