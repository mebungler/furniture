import React from 'react';
import {connect} from 'react-redux'
import {urlResolve} from "../../api/admin";

class ProductDetailPage extends React.Component {
    render() {
        let {product} = this.props;
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
                        <h1 className="page-header">Product</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <img className="img-rounded img-fluid" src="https://via.placeholder.com/200x100"
                                     style={{height: 200, width: "100%",marginBottom:15}}
                                     alt={product.Name}/>
                                <a className="btn btn-primary btn-block"><span className="fa fa-shopping-cart"/> Owning
                                    factory</a>
                                <a className="btn btn-primary btn-block"><span
                                    className="fa fa-th-list"/> Categories</a>
                                <a onClick={() => this.props.history.push("./productAddOrEdit")}
                                   className="btn btn-primary btn-block"><span className="fa fa-edit"/> Edit</a>
                                <a className="btn btn-danger btn-block"><span className="fa fa-trash"/> Delete</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" action="" method="post">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Name</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{product.Name}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Short description</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{product.ShortDescription}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Description</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{product.Description}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Photo</label>
                                            <div className="col-md-9">
                                                <img src={urlResolve(product.Photo)}
                                                     style={{width: 300, height: 200}} alt={product.Name}/>
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

const mapStateToProps = ({product}) => ({product});

export default connect(mapStateToProps)(ProductDetailPage);