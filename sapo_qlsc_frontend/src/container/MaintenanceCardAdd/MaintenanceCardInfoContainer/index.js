
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaintenanceCardInfo from '../../../components/MaintenanceCardAdd/MaintenanceCardInfo'

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
const WarrantyCardInfoContainer = (props) => {

    return (
        <MaintenanceCardInfo maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
            maintenanceCardAdd={props.maintenanceCardAdd}
            user={props.user} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyCardInfoContainer);