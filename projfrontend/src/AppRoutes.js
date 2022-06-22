import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";



const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/signup" exact element={<Signup/>}/>
                <Route path="/signin" exact element={<Signin/>}/>
                <Route path="/cart" exact element={<Cart/>}/>
                <Route path="/user/dashboard" exact element={<PrivateRoutes><UserDashboard/></PrivateRoutes>} />
                             
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;