
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Service from '../../../components/MaintenanceCardAdd/Products'

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
const ServiceContainer = (props) => {
    return (
        <Service maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
            maintenanceCardAdd={props.maintenanceCardAdd}
            user = {props.user}
            services = {props.services} />
    );
}

const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);