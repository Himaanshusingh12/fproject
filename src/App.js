import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './Pages/About';
import Home from './Pages/Home';
import Serivces from './Pages/Serivces';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// admin
import Dashboard from './admin/Pages/Dashboard';
import Add_users from './admin/Pages/Add_users';
import Manage_user from './admin/Pages/Manage_user';
import Aheader from './admin/Components/Aheader';
import Slidnav from './admin/Components/Slidnav';
import VerifyOtp from './Pages/VerifyOtp';
import BSlidnav from './Users/Components/BSlidnav';
import Bfooter from './Users/Components/Bfooter';
import BDashboard from './Users/Pages/User';
import User from './Users/Pages/User';
import Profile from './Users/Pages/Profile';
import Change_password from './Users/Pages/Change_password';
import PrivateRoute from './Pages/PrivateRoute';
import Admin_login from './admin/Pages/Admin_login';
import AdminRoute from './admin/Pages/AdminRoute';
import ForgotPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Chart_Account from './Users/Pages/Chart_Account';
import Profit_Loss from './Users/Pages/Profint_Loss';
import Balance_sheet from './Users/Pages/Balance_sheet';
import Customer_master from './Users/Pages/Customer_master';
import Vendor_master from './Users/Pages/Vendor_master';
import Customer_statement from './Users/Pages/Customer_statement';
import Vendor_statement from './Users/Pages/Vendor_statement';

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Footer /> */}
      {/* <Home /> */}
      {/* <About /> */}
      {/* <Serivces /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Slidebar /> */}
      {/* <ForgotPassword /> */}
      {/* <ResetPassword /> */}

      {/* admin */}
      {/* <Aheader /> */}
      {/* <Slidnav /> */}
      {/* <Dashboard /> */}
      {/* <VerifyOtp /> */}
      {/* <Admin_login /> */}



      {/* users */}


      {/* <User /> */}
      {/* <BSlidnav /> */}
      {/* <Bfooter /> */}
      {/* <BDashboard /> */}
      {/* <Profile /> */}
      {/* <Change_password /> */}
      {/* <Chart_Account /> */}
      {/* <Profit_Loss /> */}
      {/* <Balance_sheet /> */}
      {/* <Customer_master /> */}
      {/* <Vendor_master /> */}
      {/* <Customer_statement /> */}
      {/* <Vendor_statement /> */}





      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          {/* website */}
          <Route path="/" element={<><Home /></>}></Route>
          <Route path="/about" element={<><About /></>}></Route>
          <Route path="/service" element={<><Serivces /></>}></Route>
          <Route path="/signup" element={<><Signup /></>}></Route>
          <Route path="/login" element={<><Login /></>}></Route>
          <Route path="/verify-otp" element={<><VerifyOtp /></>}></Route>
          {/* <Route path="/forget-password" element={<><ForgotPassword /></>}></Route> */}
          {/* <Route path="" element={<><ResetPassword /></>}></Route> */}
          {/* Admin */}
          <Route path="/admin/login" element={<><Admin_login /></>}></Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/add_users" element={<><Add_users /></>}></Route>
          <Route path="/manage_users" element={<><Manage_user /></>}></Route>
          {/* users */}
          <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>}></Route>
          <Route path="/profile" element={<><Profile /></>}></Route>
          <Route path="/change_password" element={<><Change_password /></>}></Route>
          <Route path="/chart-account" element={<><Chart_Account /></>}></Route>
          <Route path="/profit-loss" element={<><Profit_Loss /></>}></Route>
          <Route path="/balance-sheet" element={<><Balance_sheet /></>}></Route>
          <Route path="/customer-master" element={<><Customer_master /></>}></Route>
          <Route path="/vendor-master" element={<><Vendor_master /></>}></Route>
          <Route path="/customer-statement" element={<><Customer_statement /></>}></Route>
          <Route path="/vendor-statement" element={<><Vendor_statement /></>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
