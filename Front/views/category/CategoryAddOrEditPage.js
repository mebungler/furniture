import React from 'react';
import api from '../../api/admin';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {populateCatalogsAsync} from "../../actions/admin";

class CategoryAddOrEditPage extends React.Component {
    state = {
        Category: {
            ID: "",
            Name: "",
            Photo: "",
            Views: "",
            Description: "",
            ShortDescription: "",
            CatalogID: "",
            ShopID: ""
        },
    };
    onTextChange = (e) => {
        this.setState({...this.state, Category: {...this.state.Category, [e.target.name]: e.target.value}})
    };
    onFileChange = ({target}) => {
        if (target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    Category: {
                        ...this.state.Category,
                        Photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(target.files[0]);
        }
    };
    add = () => {
        api.category.add(this.state.Category).then(r => {
            this.props.history.go(0);
        });
    };
    save = () => {
        api.category.update(this.state.Category).then(r => {
            this.props.history.go(0);
        });
    };

    componentDidMount() {
        let {isNew, category} = this.props;
        this.props.dispatch(populateCatalogsAsync());
        if (!isNew) {
            this.setState({Category: category});
            return;
        }
        this.setState({Category: {...this.state.Category, ID: uuid()}})
    }

    render() {
        let {Category} = this.state;
        let {isNew} = this.props;
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
                        <h1 className="page-header">Category</h1>
                    </div>
                </div>
                <div className="row">
                    {!this.props.isNew && (<div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <img className="img-rounded img-fluid" src="https://via.placeholder.com/200x100"
                                     style={{height: 200, width: "100%", marginBottom: 15}}
                                     alt={Category.Name}/>
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
                                                       placeholder="Name of category"
                                                       className="form-control"
                                                       value={Category.Name}
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
                                                       value={Category.ShortDescription}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Catalog</label>
                                            <div className="col-md-9">
                                                <select onChange={({target}) => this.setState({
                                                    Category: {
                                                        ...this.state.Category,
                                                        CatalogID: target.value,
                                                        ShopID: this.props.catalogs.filter((el, i) => el.ID === target.value)[0]
                                                    }
                                                })}
                                                        className="form-control">
                                                    <option>Select catalog...</option>
                                                    {this.props.catalogs.map((item, index) => {
                                                        if (this.state.Category.CatalogID === item.ID)
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
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Description</label>
                                            <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="Description"
                                                              placeholder="Description..."
                                                              rows="5"
                                                              value={Category.Description}
                                                              onChange={this.onTextChange}
                                                    />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo</label>
                                            <div className="col-md-9">
                                                {Category.Photo === "" ?
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
                                                        <img style={{width: 300, height: 300}} src={Category.Photo}/>
                                                        <a onClick={() => this.setState({
                                                            ...this.state, Category: {
                                                                ...this.state.Category,
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

const mapStateToProps = ({category, catalogs}) => ({
    category: category,
    isNew: Object.keys(category).length === 0,
    catalogs
});

export default connect(mapStateToProps)(CategoryAddOrEditPage);