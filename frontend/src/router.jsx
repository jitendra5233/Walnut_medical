import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";

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
import ShowCandidate from "./Pages/Hiring/ShowCandidate";
import ShowHiredCandidate from "./Pages/Hiring/ShowHiredCandidate";
import ShowRejectCandidate from "./Pages/Hiring/ShowRejectCandidate";
import AddEditCandidateDetails from "./Pages/Hiring/AddEditCandidateDetails";
import ShowAllEmpolyees from "./Pages/Docs_Details/ShowAllEmpolyees";
import ShowOldEmpolyees from "./Pages/Docs_Details/ShowOldEmpolyees";
import EmployeeDetails from "./Pages/Docs_Details/EmployeeDetails";

// jitendra
import ShowExpense from "./Pages/Expense/ShowExpense";
import AddExpense from "./Pages/Expense/addExpense";
import AddIssuedInventory from "./Pages/Enventory/addIssuedInventory";
import ShowIssuedEnventory from "./Pages/Enventory/ShowIssuedEnventory";
import ShowInventoryItem from "./Pages/Enventory/ShowInventoryItem";
import ShowAvailableItems from "./Pages/Enventory/showAvailableItems";
import ShowLossDamage from "./Pages/Enventory/ShowLossDamage";
import ShowClientsDetials from "./Pages/Clients/ShowClientsDetails";
import AccountDetails from "./Pages/Clients/AccountDetails";
import ShowAccountInfo from "./Pages/Clients/ShowAccountInfo";
import OldClient from "./Pages/Clients/OldClient";
import Websetting from "./Pages/Websetting/Websetting";
import CompantAccount from "./Pages/ComapnyAccount/ComapnyAccount";
import EmployeeExit from "./Pages/Exit/EmployeeExit";
import AddIssuedEnventory from "./Pages/Enventory/addIssuedInventory";
import AddEmployeeExit from "./Pages/Exit/AddEmployeeExit";
import ShowEmployeeExit from "./Pages/Exit/ShowEmployeeExit";
import EditEmployeeExit from "./Pages/Exit/EditEmployeeExit";
import EmployeeAppraisal from "./Pages/Docs_Details/EmployeeAppraisal";
import EmployeeDocs from "./Pages/Docs_Details/EmployeeDocs";
import ManageAccount from "./Pages/ManageAccounts/ManageAccount";
import AdminProfile from "./Pages/Profile/AdminProfile";

const router = createHashRouter(
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
        <Route path="/show-postion/:id" element={<ShowPostions />} />
        <Route path="/show-candidate/:id/:name" element={<ShowCandidate />} />
        <Route path="/show-hired-candidate" element={<ShowHiredCandidate />} />
        <Route
          path="/show-rejected-candidate"
          element={<ShowRejectCandidate />}
        />
        <Route
          path="/candidate-details/:id"
          element={<AddEditCandidateDetails />}
        />
        <Route path="/show-all-employee" element={<ShowAllEmpolyees />} />
        <Route path="/show-old-employee" element={<ShowOldEmpolyees />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        <Route path="/employee-docs/:id" element={<EmployeeDocs />} />
        <Route path="/employee-appraisal/:id" element={<EmployeeAppraisal />} />
        <Route path="/manage-accounts" element={<ManageAccount />} />

        {/* jitendra */}
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expense" element={<ShowExpense />} />
        <Route path="/add-issued" element={<AddIssuedInventory />} />
        <Route path="/issued" element={<ShowIssuedEnventory />} />
        <Route path="/inventory-item" element={<ShowInventoryItem />} />
        <Route path="/available-item" element={<ShowAvailableItems />} />
        <Route path="/loss_Damage" element={<ShowLossDamage />} />
        <Route path="/show_itemrecord" element={<ShowAvailableItems />} />
        <Route path="/client_details" element={<ShowClientsDetials />} />
        <Route path="/account-details/:id" element={<AccountDetails />} />
        <Route path="/show_accountInfo" element={<ShowAccountInfo />} />
        <Route path="/old_clients" element={<OldClient />} />
        <Route path="/web_setting" element={<Websetting />} />
        <Route path="/company_accounts" element={<CompantAccount />} />
        <Route path="/employee_exit" element={<EmployeeExit />} />
        <Route path="/add-employeeexit" element={<AddEmployeeExit />} />
        <Route path="/view-employeeexit/:id" element={<ShowEmployeeExit />} />
        <Route path="/edit-employeeexit/:id" element={<EditEmployeeExit />} />
        <Route path="/profile/:id" element={<AdminProfile />} />
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
