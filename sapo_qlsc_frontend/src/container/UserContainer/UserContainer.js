import Login from "../../pages/Login/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersAction from '../../actions/users';
import User from "../../pages/Login/index";

const UserContainer = (props) => {
    return (
        <User usersActionsCreator={props.usersActionsCreator}
            createUser={props.createUser} />
    );
}

const mapStateToProps = (state) => {
    return {
        createUser: state.createUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersActionsCreator: bindActionCreators(usersAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
