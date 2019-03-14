import React from 'react';

import {connect} from 'react-redux';
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/datepicker3.css";
import "../../assets/css/styles.css";
import {populateDashboardDataAsync} from "../../actions/admin";
import {urlResolve} from "../../api/admin";


class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(populateDashboardDataAsync())
    }

    render() {
        let {statistics = {}, main = []} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Dashboard</h1>
                    </div>
                </div>

                <div className="panel panel-container">
                    <div className="row">
                        <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
                            <div className="panel panel-teal panel-widget border-right">
                                <div className="row no-padding">
                                    <em className="fa fa-xl fa-shopping-cart color-blue"/>
                                    <div className="large">{statistics.Shop}</div>
                                    <div className="text-muted">Shops</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
                            <div className="panel panel-blue panel-widget border-right">
                                <div className="row no-padding">
                                    <em className="fa fa-xl fa-folder-open color-orange"/>
                                    <div className="large">{statistics.Catalog}</div>
                                    <div className="text-muted">Catalogs</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
                            <div className="panel panel-orange panel-widget border-right">
                                <div className="row no-padding">
                                    <em className="fa fa-xl fa-couch color-teal"/>
                                    <div className="large">{statistics.Product}</div>
                                    <div className="text-muted">Products</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-3 col-lg-3 no-padding">
                            <div className="panel panel-red panel-widget ">
                                <div className="row no-padding">
                                    <em className="fa fa-xl fa-certificate"/>
                                    <div className="large">{statistics.Sale}</div>
                                    <div className="text-muted">Products currently on sale</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Most viewed sections</h2>
                    </div>
                    {main && main.map((el, index) => {
                        let section = el.Type.charAt(0).toUpperCase() + el.Type.slice(1);
                        let subEl = el[section];
                        if (!subEl)
                            return;
                        return (
                            <div className="col-md-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">{section}
                                        <div
                                            className="pull-right">Views: {subEl.Views}</div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-md-12">
                                            <div className="col-md-6">
                                                <img src={urlResolve(subEl.Photo)}
                                                     style={{width: 200, height: 200, borderRadius: 8}}/>
                                            </div>
                                            <div className="col-md-6">
                                                <h3>Name: {subEl.Name}</h3>
                                                <h4>Description: {subEl.ShortDescription}</h4></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({dashboard}) => {
    console.warn(dashboard);
    return {main: dashboard.main, statistics: dashboard.statistics}
};

export default connect(mapStateToProps)(DashboardPage);