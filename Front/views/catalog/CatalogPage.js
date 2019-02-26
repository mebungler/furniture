import React from 'react';
import {populateCatalogsAsync, storeCatalog} from "../../actions/admin";
import api, {urlResolve} from "../../api/admin";
import {connect} from 'react-redux';

class CatalogPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(populateCatalogsAsync());
    }

    render() {
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
                <div className="pane panel-default">
                    <div className="panel-heading">
                        Catalog
                        <span className="pull-right">
                               <a onClick={() => {
                                   this.props.dispatch(storeCatalog({}));
                                   this.props.history.push("/catalogAddOrEdit");
                               }}
                                  className="btn btn-md btn-success">
                                   <span className="fa fa-plus"/> Add Catalog
                               </a>
                            </span>
                    </div>
                    <div className="panel-body">
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.catalogs.map((item, index) => {
                                    return (
                                        <tr key={item.ID}>
                                            <th><img src={urlResolve(item.Photo)}
                                                     style={{width: 120, height: 120, borderRadius: 8}}/></th>
                                            <th><p>{item.Name}</p></th>
                                            <th><p>{item.Views}</p></th>
                                            <th>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        this.props.dispatch(storeCatalog(item));
                                                        this.props.history.push("./catalogDetail")
                                                    }}
                                                       className="btn btn-primary rounded-circle"><span
                                                        className="fa fa-eye"/></a></div>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        this.props.dispatch(storeCatalog(item));
                                                        this.props.history.push("./catalogAddOrEdit");
                                                    }}
                                                       className="btn btn-primary rounded-circle"><span
                                                        className="fa fa-edit"/></a></div>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        api.catalog.delete(item.ID);
                                                        this.props.history.go(0);
                                                    }}
                                                       className="btn btn-danger rounded-circle"><span
                                                        className="fa fa-trash"/></a></div>
                                            </th>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({catalogs}) => ({catalogs});

export default connect(mapStateToProps)(CatalogPage);