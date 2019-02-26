import React from 'react';
import api from '../../api/admin';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {populateCatalogsAsync, populateSubCategoriesAsync} from "../../actions/admin";

class ProductAddOrEditPage extends React.Component {
    state = {
        Product: {
            ID: "",
            Name: "",
            Photo: "",
            Views: "",
            Description: "",
            ShortDescription: "",
            CatalogID: "",
            SubCategoryID: "",
            PriceOld: "",
            PriceNew: "",
            Photos: [],
            Properties: [{Name: "", Value: "", ID: uuid()}]
        },
    };
    onTextChange = (e) => {
        this.setState({...this.state, Product: {...this.state.Product, [e.target.name]: e.target.value}})
    };
    onPropertyChange = ({target}, index) => {
        let properties = this.state.Product.Properties;
        properties[index][target.name] = target.value;
        this.setState({...this.state, Product: {...this.state.Product, Properties: properties}})
    };
    onFileChange = ({target}, isGallery = false) => {
        if (target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                if (isGallery) {
                    this.setState({
                        ...this.state,
                        Product: {
                            ...this.state.Product,
                            Photos: [...this.state.Product.Photos, {
                                Path: fr.result,
                                ID: uuid(),
                                ProductID: this.state.Product.ID
                            }]
                        }
                    });
                    return;
                }
                this.setState({
                    ...this.state,
                    Product: {
                        ...this.state.Product,
                        Photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(target.files[0]);
        }
    };
    add = () => {
        api.product.add(this.state.Product);
        this.props.history.go(0);
    };

    componentDidMount() {
        let {isNew, product} = this.props;
        if (!isNew) {
            this.setState({Product: product});
            return;
        }
        this.props.dispatch(populateCatalogsAsync());
        this.props.dispatch(populateSubCategoriesAsync());
        this.setState({Product: {...this.state.Product, ID: uuid()}})
    }

    render() {
        let {Product} = this.state;
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
                    {!this.props.isNew && (<div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <img className="img-rounded img-fluid" src="https://via.placeholder.com/200x100"
                                     style={{height: 200, width: "100%", marginBottom: 15}}
                                     alt={Product.Name}/>
                                <a className="btn btn-primary btn-block"><span className="fa fa-shopping-cart"/> Owning
                                    factory</a>
                                <a className="btn btn-primary btn-block"><span
                                    className="fa fa-th-list"/> Categories</a>
                                <a className="btn btn-danger btn-block"><span className="fa fa-trash"/> Delete</a>
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
                                                       placeholder="Name of product"
                                                       className="form-control"
                                                       value={Product.Name}
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
                                                       value={Product.ShortDescription}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Old price</label>
                                            <div className="col-md-9">
                                                <input id="email" name="PriceOld" type="text"
                                                       placeholder="Old price"
                                                       className="form-control"
                                                       value={Product.PriceOld}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">New price</label>
                                            <div className="col-md-9">
                                                <input id="email" name="PriceNew" type="text"
                                                       placeholder="New price"
                                                       className="form-control"
                                                       value={Product.PriceNew}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Catalog</label>
                                            <div className="col-md-9">
                                                <select onChange={({target}) => this.setState({
                                                    Product: {
                                                        ...this.state.Product,
                                                        CatalogID: target.value
                                                    }
                                                })}
                                                        className="form-control">
                                                    <option>Select catalog...</option>
                                                    {this.props.catalogs.map((item, index) => {
                                                        console.log(this.state.Product.CatalogID === item.ID);
                                                        if (this.state.Product.CatalogID === item.ID)
                                                            return (
                                                                <option value={item.id} selected>{item.Name}</option>);
                                                        return (
                                                            <option value={item.ID}
                                                            >{item.Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Sub category</label>
                                            <div className="col-md-9">
                                                <select onChange={({target}) => this.setState({
                                                    Product: {
                                                        ...this.state.Product,
                                                        SubCategoryID: target.value
                                                    }
                                                })}
                                                        className="form-control">
                                                    <option>Select subcategory...</option>
                                                    {this.props.subCategories.map((item, index) => {
                                                        console.log(this.state.Product.SubCategoryID === item.ID);
                                                        if (this.state.Product.SubCategoryID === item.ID)
                                                            return (
                                                                <option value={item.id} selected>{item.Name}</option>);
                                                        return (
                                                            <option value={item.ID}
                                                            >{item.Name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Properties</label>
                                            <div className="col-md-9">
                                                {this.state.Product.Properties.map((el, index) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input id="email" name="Name" type="text"
                                                                       placeholder="Name"
                                                                       className="form-control"
                                                                       key={index}
                                                                       value={el.Name}
                                                                       onChange={e => this.onPropertyChange(e, index)}
                                                                />
                                                            </div>
                                                            <div className="col-md-5">
                                                                <input id="email" name="Value" type="text"
                                                                       placeholder="Value"
                                                                       key={index}
                                                                       className="form-control"
                                                                       value={el.Value}
                                                                       onChange={e => this.onPropertyChange(e, index)}
                                                                />
                                                            </div>
                                                            <div style={{margin: 10}} className="pull-right">
                                                                <a onClick={() => this.setState({
                                                                    ...this.state, Product: {
                                                                        ...this.state.Product,
                                                                        Properties: this.state.Product.Properties.filter((el, i) => index !== i)
                                                                    }
                                                                })}
                                                                   className="btn btn-danger"
                                                                   style={{
                                                                       borderRadius: 100,
                                                                       width: 40,
                                                                       height: 40,
                                                                   }}><span style={{marginTop: 6}}
                                                                            className="fa fa-trash"/></a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div style={{margin: 10}} className="pull-right">
                                                    <a onClick={() => this.setState({
                                                        ...this.state, Product: {
                                                            ...this.state.Product,
                                                            Properties: [...this.state.Product.Properties, {
                                                                Name: "",
                                                                Value: "",
                                                                ID: uuid()
                                                            }]
                                                        }
                                                    })}
                                                       className="btn btn-success"
                                                       style={{
                                                           borderRadius: 100,
                                                           width: 40,
                                                           height: 40,
                                                       }}><span style={{marginTop: 6}}
                                                                className="fa fa-plus"/></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Description</label>
                                            <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="Description"
                                                              placeholder="Description..."
                                                              rows="5"
                                                              value={Product.Description}
                                                              onChange={this.onTextChange}
                                                    />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo</label>
                                            <div className="col-md-9">
                                                {Product.Photo === "" ?
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
                                                        <img style={{width: 300, height: 300}} src={Product.Photo}/>
                                                        <a onClick={() => this.setState({
                                                            ...this.state, Product: {
                                                                ...this.state.Product,
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

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo gallery</label>
                                            <div className="col-md-9">
                                                <label htmlFor="gallery">
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
                                                        <input onChange={(e) => this.onFileChange(e, true)}
                                                               type="file" id="gallery"
                                                               style={{display: 'none'}}/>
                                                    </div>
                                                </label>
                                                <div>
                                                    {this.state.Product.Photos.map((item, index) => {
                                                        return (<div><img style={{width: 300, height: 300}}
                                                                          src={item.Path}/>
                                                            <a onClick={() => this.setState({
                                                                ...this.state, Product: {
                                                                    ...this.state.Product,
                                                                    Photos: this.state.Product.Photos.filter((el, i) => i !== index)
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
                                                                        className="fa fa-trash"/></a></div>)
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="col-md-8"/>
                                    <div className="col-md-4 widget-right">
                                        <a onClick={this.add}
                                           className="btn btn-success pull-right btn-block">
                                            <span className="fa fa-plus"/> Add
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

const mapStateToProps = ({product, catalogs, subCategories}) => ({
    product: product,
    isNew: Object.keys(product).length === 0,
    catalogs,
    subCategories
});

export default connect(mapStateToProps)(ProductAddOrEditPage);