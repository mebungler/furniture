import React from 'react';

import {connect} from 'react-redux';
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/datepicker3.css";
import "../../assets/css/styles.css";


class DashboardPage extends React.Component {
    render() {
        return (
            <p>This is dashboard page</p>
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashboardPage);