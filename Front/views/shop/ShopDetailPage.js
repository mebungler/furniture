import React from 'react';
import {connect} from 'react-redux'
import {urlResolve} from "../../api/admin";

class ShopDetailPage extends React.Component {
    render() {
        let {shop} = this.props;
        return (
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#">
                            <em className="fa fa-home"/>
                        </a></li>
                        <li className="active">Data</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">{shop.Name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" action="" method="post">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Name</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{shop.Name}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Address</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{shop.Address}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Photo</label>
                                            <div className="col-md-9">
                                                <img src={urlResolve(shop.Photo)}
                                                     style={{width: 300, height: 300}} alt={shop.Name}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shop}) => ({shop});

export default connect(mapStateToProps)(ShopDetailPage);