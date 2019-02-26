import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import SideBar from "../sidebard/SideBar";

class NewRoute extends React.Component {
    componentWillMount() {
        this.unlisten = this.props.history.listen(location => {
            this.setState({location});
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const {isAuthenticated, component: Component, ...rest} = this.props;
        return <Route {...rest} render={(props) =>
            isAuthenticated ? <SideBar><Component {...props}/></SideBar> : <Redirect to="/admin"/>}/>
    }
}

function mapStateToProps(state) {
    if (state.user) {
        return {
            isAuthenticated: Object.keys(state.user).length !== 0
        };
    }
    return {
        isAuthenticated: false
    };
}

export default withRouter(connect(mapStateToProps)(NewRoute));