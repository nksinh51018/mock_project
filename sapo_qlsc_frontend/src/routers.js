import React from 'react';
import MaintenanceCardAdd from './pages/MaintenanceCards/MaintenanceCardAdd';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccessoriesList from './pages/Accessories/AccessoriesList';
import ListCustomer from './pages/Customer/ListCustomer';
import CustomerInfo from './pages/Customer/CustomerInfo';
import AddCustomer from './pages/Customer/AddCustomer';
import MaintenanceCards from './pages/MaintenanceCards';
import WarrantyCardInfo from './pages/MaintenanceCards/MaintenanceCardEdit';
import CreateAccessory from './pages/Accessories/CreateAccessory';
import UpdateCustomer from './pages/Customer/UpdateCustomer';
import UpdateAccessory from './pages/Accessories/UpdateAccessory';
import Overview from './pages/Report/Overview';
import EmployeeFormUpdate from './pages/Employee/EmployeeFormUpdate';
import EmployeeInfo from './pages/Employee/EmployeeInfo';
import EmployeeFormInsert from './pages/Employee/EmployeeFormInsert';
import EmployeeList from './pages/Employee/EmployeeList';
import ServicesList from './pages/Services/ServicesList';
import UpdateService from './pages/Services/UpdateService';
import CreateService from './pages/Services/CreateService';
import Login from "./pages/Login/index"
import ProductsList from './pages/Products/ProductsList';
import CreateProduct from './pages/Products/CreateProduct';
import UpdateProduct from './pages/Products/UpdateProduct';
const routes = [
    {
        to: '/',
        exact: true,
        main: () => <Home />,
        role: [1,2,3]
    },
    {
        to: '/accessories',
        exact: true,
        main: () => <AccessoriesList />,
        role: [3]
    },
    {
        to: '/accessories/create',
        exact: true,
        main: () => <CreateAccessory />,
        role: [3]
    },
    {
        to: '/customers',
        exact: true,
        main: () => <ListCustomer />,
        role: [1,3]
    },
    {
        to: '/customers/create',
        exact: true,
        main: ({ match }) => <AddCustomer match={match} />,
        role: [1,3]
    },
    {
        to: '/customers/:id(\\d+)',
        exact: true,
        main: ({ match }) => <CustomerInfo match={match} />,
        role: [1,3]
    },
    {
        to: '/customers/update/:id',
        exact: true,
        main: ({match}) => <UpdateCustomer match={match}/>,
        role: [1,3]
    },
    {
        to: '/maintenanceCards',
        exact: true,
        main: () => <MaintenanceCards />,
        role: [1,2,3]
    },
    {
        to: '/maintenanceCards/create',
        exact: true,
        main: () => <MaintenanceCardAdd />,
        role: [1,3]
    },
    {
        to: '/maintenanceCards/:id(\\d+)',
        exact: true,
        main: ({match}) => <WarrantyCardInfo match={match} />,
        role: [1,2,3]
    },
    {
        to: '/accessories/detail/:id',
        exact: true,
        main: () => <UpdateAccessory />,
        role: [3]
    },
    {
        to: '/analytics/dashboard',
        exact: true,
        main: () => <Overview />,
        role: [3]
    },
    {
        to: '/employees/update/:id',
        exact: true,
        main: () => <EmployeeFormUpdate />,
        role: [3]
    },
    {
        to: '/employees/create',
        exact: true,
        main: () => <EmployeeFormInsert />,
        role: [3]
    },
    {
        to: '/employees/:id(\\d+)',
        exact: true,
        main: ({match}) => <EmployeeInfo match={match} />,
        role: [3]
    },
    {
        to: '/employees',
        exact: true,
        main: () => <EmployeeList />,
        role: [3]
    },
    {
        to: '/services',
        exact: true,
        main: () => <ServicesList />,
        role: [3]
    },
    {
        to: '/services/detail/:id',
        exact: true,
        main: () => <UpdateService />,
        role: [3]
    },
    {
        to: '/services/create',
        exact: true,
        main: () => <CreateService />,
        role: [3]
    },
    {
        to: '/products',
        exact: true,
        main: () => <ProductsList />,
        role: [3]
    },
    {
        to: '/products/create',
        exact: true,
        main: () => <CreateProduct />,
        role: [3]
    },
    {
        to: '/product/:id(\\d+)',
        exact: true,
        main: () => <UpdateProduct />,
        role: [3]
    },
    {
        to: '*',
        exact: true,
        main: () => <NotFound />,
        role: [1,2,3]
    },
]

export default routes;
