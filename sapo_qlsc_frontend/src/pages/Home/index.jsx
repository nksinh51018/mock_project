import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
 
const Home = (props) => {
    const history = useHistory();
    useEffect(() => {
        console.log(props.user.role);
        switch(props.user.role) {
            case 1:
                history.push("/admin/maintenanceCards");
                break;
            case 2:
                history.push("/admin/maintenanceCards");
                break;
            case 3:
                history.push("/admin/analytics/dashboard");
                break;
            default:
                break;
        }
    })
    return (
        <div></div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}
 
export default connect(mapStateToProps, null)(Home);