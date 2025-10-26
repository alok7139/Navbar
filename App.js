import React from 'react';
import {Route , Routes,Navigate } from 'react-router-dom'
import {Home}  from './components/Landingpage/Home';
import About from './components/Landingpage/About';
import Contact from './components/Landingpage/Contact';
import OfferConfirmation from './components/OfferConfirmation/OfferConfirmation';
import ReportingPage1  from './components/ReportingPage/Reportingpage1';
import Login from "./components/Login/Login";                
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import EditApplication from "./components/Edit Applications page/EditApplication";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { UserApplication } from "./components/UserDashboard/Application/UserApplication";
import UserStatus from "./components/UserDashboard/Status/UserStatus";
import Onboarding from './components/OnboardingLandingPage/Onboarding';
import Documents from './components/OnboardingLandingPage/Documents';
import DocumentVerificationApp from './components/DocumentVerification/DocumentVerificationApp';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';








function App() {
  

  const [role, setRole] = React.useState(localStorage.getItem("userRole"));
 
  React.useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem("userRole"));
    };
   
    window.addEventListener("roleChange", handleRoleChange);
   
    window.addEventListener("storage", handleRoleChange);
   
    setRole(localStorage.getItem("userRole"));
   
    return () => {
      window.removeEventListener("roleChange", handleRoleChange);
      window.removeEventListener("storage", handleRoleChange);
    };
  }, []);
  return (
    <>
 

    <Routes>
      {/* alok */}
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      {/* llakshmi */}
      <Route path='/offer' element={<Layout><OfferConfirmation /></Layout>} />
      {/* aditya */}
      <Route path='/report' element={<Layout><ReportingPage1 /></Layout>} />
      {/* shreya batra */}
      <Route path ="/onboarding" element={<Layout><Onboarding/></Layout>} />
      <Route path='/add/newuser/details' element={<Documents />} />
      {/* akshat */}
      <Route path="/edit/:id" element={<EditApplication/>}/>
      {/* keerthi */}
      <Route path='/doc-verification' element={<Layout> <DocumentVerificationApp/> </Layout>} />
      {/* ayyapa */}
      <Route path="/login" element={<Login />} />
      {role === "sales" ? (
          <>
            <Route path="/dashboard" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            
            {/* Redirect to dashboard for any other route */}
            <Route path="" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : role === "user" ? (
          <>
            <Route path="/user-dashboard" element={
              <Layout>
                <UserDashboard />
              </Layout>
            } />
            <Route path="/apply" element={
              <Layout>
                <UserApplication />
              </Layout>
            } />
            <Route path="/status" element={
              <Layout>
                <UserStatus />
              </Layout>
            } />
            <Route path="" element={<Navigate to="/user-dashboard" replace />} />
          </>
        ) : (
          <Route path="" element={<Navigate to="/login" replace />} />
        )}
    </Routes>
    
      <ToastContainer position='bottom-left' transition={Bounce} autoClose={5000}/> 
    </>
  );
}

export default App;
