
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Employee from "../../pages/Employee/EmployeeList"
import * as employeeActions from '../../actions/employee';

const EmployeeContainer = (props) => {
    return (
        <Employee employeeActionsCreator={props.employeeActionsCreator}
            createEmployee={props.createEmployee} />
    );
}

const mapStateToProps = (state) => {
    return {
        createEmployee: state.createEmployee,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
