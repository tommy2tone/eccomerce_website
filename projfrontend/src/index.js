import React from 'react';
import {createRoot} from 'react-dom/client';

import './styles.css';
import AppRoutes from './AppRoutes';

const root = createRoot(document.getElementById('root'));

root.render(<AppRoutes/>);


