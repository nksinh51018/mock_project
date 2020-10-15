import {combineReducers} from 'redux';
import customerReducer from './customer';
import addressReducer from './address';
import maintenanceCardAdd from './MaintenanceCardAdd';
import accessoriesReducer from './accessories';
import servicesReducer from './services';
import userReducer from './user'
import employeeReducer from './employee'
import accessoryReducer from './accessory';
import maintenanceCard from './MaintenanceCard'
import serviceReducer from './service';
import statisticReducer from './statistic';
import paymentReducer from './paymentHistories';
import productsReducer from './products';
import productReducer from './product';

const appReducer = combineReducers({
    customerReducer,
    maintenanceCardAdd,
    accessoriesReducer,
    accessoryReducer,
    servicesReducer,
    serviceReducer,
    productsReducer,
    productReducer,
    addressReducer,
    employeeReducer,
    userReducer,
    maintenanceCard,
    statisticReducer,
    paymentReducer,
})

export default appReducer;