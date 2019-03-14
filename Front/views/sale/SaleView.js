import React from "react";
import {connect} from 'react-redux';
import api from "../../api/admin";
import {populateSaleAsync} from "../../actions/admin"
import uuid from "uuid";

class SaleView extends React.Component {
    state = {
        Sale: {
            ID: "",
            Name: "",
            Photo: "",
            Views: "",
            Description: "",
            ShortDescription: "",
            CatalogID: "",
            ShopID: "",
            IsSale: false
        },
    };
    onTextChange = (e) => {
        this.setState({...this.state, Sale: {...this.state.Sale, [e.target.name]: e.target.value}})
    };
    onFileChange = ({target}) => {
        if (target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    Sale: {
                        ...this.state.Sale,
                        Photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(target.files[0]);
        }
    };
    save = () => {
        let sale = this.state.Sale;
        sale.IsSale = true;
        if (sale.ID = "") {
            sale.ID = uuid();
            api.category.add(sale).then(r => {
                this.props.history.go(0);
            });
            return
        }
        api.category.update(sale).then(r => {
            this.props.history.go(0);
        });
    };

    componentDidMount() {
        this.props.dispatch(populateSaleAsync());
        this.setState({Sale: this.props.sale})
    }

    render() {
        let {Sale} = this.state;
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
                        <h1 className="page-header">Sale</h1>
                    </div>
                </div>
                <div className="row">
                    <div className={"col-md-12"}>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" action="" method="post">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Name</label>
                                            <div className="col-md-9">
                                                <input id="Name" name="Name" type="text"
                                                       placeholder="Name or title of sale "
                                                       className="form-control"
                                                       value={Sale.Name}
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
                                                       value={Sale.ShortDescription}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Description</label>
                                            <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="Description"
                                                              placeholder="Description..."
                                                              rows="5"
                                                              value={Sale.Description}
                                                              onChange={this.onTextChange}
                                                    />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo</label>
                                            <div className="col-md-9">
                                                {Sale.Photo === "" ?
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
                                                        <img style={{width: 300, height: 300}} src={Sale.Photo}/>
                                                        <a onClick={() => this.setState({
                                                            ...this.state, Sale: {
                                                                ...this.state.Sale,
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
                                        <a onClick={this.save}
                                           className="btn btn-success pull-right btn-block">
                                            <span
                                                className={"fa fa-save"}/> {"Save"}
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

const mapStateToProps = ({sale}) => ({sale});

export default connect(mapStateToProps)(SaleView);

