import React from 'react'
import { Navigate } from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoutes = ({children}) => {
            
  if (isAuthenticated()){
             
    return children
    }
            
  return <Navigate to="/signin" />
                              
};

export default PrivateRoutes