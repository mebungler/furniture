import React from 'react';
import {populateCategoriesAsync, storeCategory} from "../../actions/admin";
import api, {urlResolve} from "../../api/admin";
import {connect} from 'react-redux';
import {getUrlParameter} from "../../routes/AppRouter";

class CategoryPage extends React.Component {
    componentDidMount() {
        let param = getUrlParameter("catalogId");
        if (param === ""){
            this.props.dispatch(populateCategoriesAsync());
        }
        else
            this.props.dispatch(populateCategoriesAsync(param));
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
                        Category
                        <span className="pull-right">
                               <a onClick={() => {
                                   this.props.dispatch(storeCategory({}));
                                   this.props.history.push("/categoryAddOrEdit")
                               }}
                                  className="btn btn-md btn-success">
                                   <span className="fa fa-plus"/> Add Category
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
                                {this.props.categories.map((item, index) => {
                                    return (
                                        <tr key={item.ID}>
                                            <th><img src={urlResolve(item.Photo)}
                                                     style={{width: 120, height: 120, borderRadius: 8}}/></th>
                                            <th><p>{item.Name}</p></th>
                                            <th><p>{item.Views}</p></th>
                                            <th>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        this.props.dispatch(storeCategory(item));
                                                        this.props.history.push("./categoryDetail")
                                                    }}
                                                       className="btn btn-primary rounded-circle"><span
                                                        className="fa fa-eye"/></a></div>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        this.props.dispatch(storeCategory(item));
                                                        this.props.history.push("./categoryAddOrEdit");
                                                    }}
                                                       className="btn btn-primary rounded-circle"><span
                                                        className="fa fa-edit"/></a></div>
                                                <div style={{margin: 15}} className="row">
                                                    <a onClick={() => {
                                                        api.category.delete(item.ID);
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

const mapStateToProps = ({categories}) => ({categories});

export default connect(mapStateToProps)(CategoryPage);