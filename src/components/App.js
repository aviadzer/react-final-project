import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Navigation from "./Navigation";
import Customers from "./Customers";
import Products from "./Products";
import Purchased from "./Purchased";
import Menu from "./Menu";
import Logout from './Logout';
import EditOrAddCustomer from './EditOrAddCustomer';
import EditOrAddProduct from './EditOrAddProduct';
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import '../App.css';

/*
  This component is the top level component of the application.
  It uses :
  AuthProvider - a context to control the user login state.
  Navigation - display a navigation bar on top of each page.
  Router - to go to the appropriate page (component).
  Pay attention to using Conditional Routes - per user login and permissions
*/

function App() {
  return (
    <>
      <AuthProvider>
        <div className='sticky-header'>
          <Navigation />
        </div>
        { <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Router>        
                  <Routes >
                    <Route path="/login" element={<Login />} />

                    {/* ProtectedRoute controls the displayed component based on user login and permissions */}
                    <Route element={<ProtectedRoute requiredPermission={['simple user', 'admin']}/>}>  
                      <Route path="/Menu" element={<Menu />} />
                      <Route path="/Customers" element={<Customers />} />
                      <Route path="/Products" element={<Products />} />
                      <Route path="/Purchased" element={<Purchased />} />
                    </Route>
                    <Route element={<ProtectedRoute requiredPermission={['admin']}/>}>  
                      <Route path="/EditOrAddCustomer/:id" element={<EditOrAddCustomer />} />
                      <Route path="/EditOrAddProduct/:id" element={<EditOrAddProduct />} />
                    </Route>

                    <Route path="/Logout" element={<Logout />} />
                    <Route path="*" element={<Menu />}  />

                  </Routes >
                
              </Router>
            </div>
        </Container> }
      </AuthProvider>
    </>
  )
}

export default App