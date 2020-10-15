import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Layout from '../components/Layout';
import routes from '../routers'
const showContent = (routes,user) => {
    let result = [];

    if (routes.length > 0) {
        result = routes.map((route, index) => {
            if(route.role !== undefined &&  route.role.includes(user.role)){
                return (<Route key={index}
                    path={'/admin' + route.to}
                    exact={route.exact}
                    component={route.main} />
                )
            }
            else{
                return ""
            }
        })
    }
    return <Switch>{result}</Switch>;
}


const AdminRouter = (props) => {

    const [user, setuser] = useState({
        role: 0
    });

    useEffect(() => {
        setuser(props.user)
    }, [props.user]);

    return (
        <React.Fragment>
            <Layout>
                {showContent(routes,user)}
            </Layout>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
  }

export default connect(mapStateToProps,null)(AdminRouter);