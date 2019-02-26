import React from 'react';
import {connect} from 'react-redux'
import api, {urlResolve} from "../../api/admin";
import {populateShopAsync, storeCatalog, storeShop} from "../../actions/admin";

class CatalogDetailPage extends React.Component {
    state = {};

    componentWillMount() {
        this.props.dispatch(populateShopAsync(this.props.catalog.ShopID));
    }

    render() {
        let {catalog, shop: Shop} = this.props;
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
                        <h1 className="page-header">Catalog</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <img style={{height: 200, width: "100%", marginBottom: 15}}
                                     className="img-fluid img-rounded"
                                     src={urlResolve(Shop.Photo)}
                                     alt={Shop.Name}/>
                                <a onClick={() => {
                                    this.props.dispatch(storeShop(Shop));
                                    this.props.history.push("/shopDetail");
                                }}
                                   className="btn btn-primary btn-block"><span className="fa fa-shopping-cart"/> Owning
                                    factory</a>
                                <a onClick={() => {
                                    this.props.history.push("/category?catalogId=" + catalog.ID);
                                }} className="btn btn-primary btn-block"><span
                                    className="fa fa-th-list"/> Categories</a>
                                <a onClick={() => {
                                    this.props.dispatch(storeCatalog(catalog));
                                    this.   props.history.push("/catalogAddOrEdit");
                                }} className="btn btn-primary btn-block"><span
                                    className="fa fa-edit"/> Edit</a>
                                <a onClick={() => {
                                    api.category.delete(this.state.Catalog.ID);
                                    this.props.history.go(-1);
                                    this.props.history.go(0);
                                }} className="btn btn-danger btn-block"><span className="fa fa-trash"/> Delete</a>
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
                                                <label className={"control-label"}>{catalog.Name}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Short description</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{catalog.ShortDescription}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Description</label>
                                            <div className="col-md-9">
                                                <label className={"control-label"}>{catalog.Description}</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Photo</label>
                                            <div className="col-md-9">
                                                <img src={urlResolve(catalog.Photo)}
                                                     style={{width: 300, height: 300}} alt={catalog.Name}/>
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

const mapStateToProps = state => {
    return {
        catalog: state.catalog,
        shop: state.shop
    }
};
export default connect(mapStateToProps)(CatalogDetailPage);