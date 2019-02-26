import React from 'react';

import {connect} from 'react-redux';
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/datepicker3.css";
import "../../assets/css/styles.css";
import {loginAsync} from "../../actions/admin";

import localStorage from 'local-storage'

class LoginPage extends React.Component {

    state = {
        User: {
            Username: "",
            Password: ""
        }, error: null
    };
    login = () => {
        this.props.dispatch(loginAsync(this.state.User)).then((res) => {
            if (res.status === 200) {
                localStorage.set('User', JSON.stringify(res.data));
                this.props.history.push("/dashboard")
            }
        });
    };

    onTextChange = (e) => {
        this.setState({...this.state, User: {...this.state.User, [e.target.name]: e.target.value}})
    };

    render() {
        let {User} = this.state;
        return (
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">Log in</div>
                        <div className="panel-body">
                            <form role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input onChange={this.onTextChange} className="form-control"
                                               value={User.Username} placeholder="Username" name="Username"
                                               type="email"/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onTextChange} className="form-control"
                                               placeholder="Password" name="Password"
                                               value={User.Password} type="Password"
                                        />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                        </label>
                                    </div>
                                    <a onClick={this.login} className="btn btn-primary">Login</a></fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps)(LoginPage);