import React from 'react';
import api, {urlResolve} from '../../api/admin';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {populateShopAsync, populateShopsAsync, storeShop} from "../../actions/admin";

class CatalogAddOrEditPage extends React.Component {
    state = {
        Catalog: {
            ID: "",
            Name: "",
            Photo: "",
            Views: "",
            Description: "",
            ShortDescription: ""
        },
    };
    onTextChange = (e) => {
        this.setState({...this.state, Catalog: {...this.state.Catalog, [e.target.name]: e.target.value}})
    };
    onFileChange = ({target}) => {
        if (target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    Catalog: {
                        ...this.state.Catalog,
                        Photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(target.files[0]);
        }
    };
    add = () => {
        api.catalog.add(this.state.Catalog).then(r => {
            this.props.history.go(0);
        });
    };
    save = () => {
        api.catalog.update(this.state.Catalog).then(r => {
            this.props.history.go(0);
        });
    };

    componentDidMount() {
        let {isNew, catalog} = this.props;
        this.props.dispatch(populateShopsAsync());
        if (!isNew) {
            this.props.dispatch(populateShopAsync(catalog.ShopID));
            this.setState({Catalog: catalog});
            return;
        }
        this.setState({Catalog: {...this.state.Catalog, ID: uuid()}})
    }

    render() {
        let {Catalog} = this.state;
        let {shop: Shop, isNew} = this.props;
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
                    {(!isNew && Shop) && (<div className="col-md-3">
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
                                    this.props.history.push("/category?catalogId=" + this.state.Catalog.ID);
                                }} className="btn btn-primary btn-block"><span
                                    className="fa fa-th-list"/> Categories</a>
                                <a onClick={() => {
                                    api.catalog.delete(this.state.Catalog.ID);
                                    this.props.history.go(0);
                                }} className="btn btn-danger btn-block"><span className="fa fa-trash"/> Delete</a>
                            </div>
                        </div>
                    </div>)}
                    <div className={!this.props.isNew ? "col-md-9" : "col-md-12"}>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" action="" method="post">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Name</label>
                                            <div className="col-md-9">
                                                <input id="Name" name="Name" type="text"
                                                       placeholder="Name of catalog"
                                                       className="form-control"
                                                       value={Catalog.Name}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Short description</label>
                                            <div className="col-md-9">
                                                <input id="email" name="ShortDescription" type="text"
                                                       placeholder="Short description"
                                                       className="form-control"
                                                       value={Catalog.ShortDescription}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Shop</label>
                                            <div className="col-md-9">
                                                <select onChange={({target}) => this.setState({
                                                    Catalog: {
                                                        ...this.state.Catalog,
                                                        ShopID: target.value
                                                    }
                                                })}
                                                        className="form-control">
                                                    <option>Select shop...</option>
                                                    {isNew ? this.props.shops.map((item, index) => {
                                                        if (this.state.Catalog.ShopID === item.ID)
                                                            return (
                                                                <option value={item.id} selected>{item.Name}</option>);
                                                        return (
                                                            <option value={item.ID}
                                                            >{item.Name}</option>
                                                        )
                                                    }) : <option value={Shop.ID}
                                                    >{Shop.Name}</option>}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Description</label>
                                            <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="Description"
                                                              placeholder="Description..."
                                                              rows="5"
                                                              value={Catalog.Description}
                                                              onChange={this.onTextChange}
                                                    />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo</label>
                                            <div className="col-md-9">
                                                {Catalog.Photo === "" ?
                                                    <label htmlFor="image">
                                                        <div style={{
                                                            width: 300,
                                                            height: 300,
                                                            borderWidth: 2,
                                                            borderStyle: "dashed",
                                                            borderRadius: 8,
                                                            cursor: 'pointer'
                                                        }}>
                                                            <span className="fa fa-plus center-block text-center"
                                                                  style={{marginTop: 140}}/>
                                                            <input onChange={this.onFileChange} type="file" id="image"
                                                                   style={{display: 'none'}}/>
                                                        </div>
                                                    </label>
                                                    : <div>
                                                        <img style={{width: 300, height: 300}} src={Catalog.Photo}/>
                                                        <a onClick={() => this.setState({
                                                            ...this.state, Catalog: {
                                                                ...this.state.Catalog,
                                                                Photo: ""
                                                            }
                                                        })}
                                                           className="btn btn-danger"
                                                           style={{
                                                               borderRadius: 100,
                                                               width: 40,
                                                               height: 40,
                                                               position: "absolute",
                                                               marginTop: 280,
                                                               marginLeft: -20
                                                           }}><span style={{marginTop: 6}}
                                                                    className="fa fa-trash"/></a>
                                                    </div>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="col-md-8"/>
                                    <div className="col-md-4 widget-right">
                                        <a onClick={isNew ? this.add : this.save}
                                           className="btn btn-success pull-right btn-block">
                                            <span
                                                className={isNew ? "fa fa-plus" : "fa fa-save"}/> {isNew ? "Add" : "Save"}
                                        </a>
                                    </div>
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
        isNew: Object.keys(state.catalog).length === 0,
        shops: state.shops,
        shop: state.shop,
    }
};

export default connect(mapStateToProps)(CatalogAddOrEditPage);