import React from 'react';
import api from '../../api/admin';
import uuid from 'uuid';
import {connect} from 'react-redux';
import Map from "../../components/map/CustomMap"

class ShopAddOrEditPage extends React.Component {
    state = {
        Shop: {
            ID: "",
            Name: "",
            Photo: "",
            Location: "",
            Address: ""
        },
    };
    onTextChange = (e) => {
        this.setState({...this.state, Shop: {...this.state.Shop, [e.target.name]: e.target.value}})
    };
    onFileChange = ({target}) => {
        if (target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    Shop: {
                        ...this.state.Shop,
                        Photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(target.files[0]);
        }
    };
    add = () => {
        api.shop.add(this.state.Shop).then(r => {
            this.props.history.go(0);
        });
    };

    save = () => {
        api.shop.update(this.state.Catalog).then(r => {
            this.props.history.go(0);
            x
        });
    };

    componentDidMount() {
        let {isNew, shop} = this.props;
        if (!isNew) {
            this.setState({Shop: shop});
            return;
        }
        this.setState({Shop: {...this.state.Shop, ID: uuid()}})
    }

    render() {
        let {Shop} = this.state;
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
                        <h1 className="page-header">Shop</h1>
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
                                                       placeholder="Name of shop"
                                                       className="form-control"
                                                       value={Shop.Name}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label">Address</label>
                                            <div className="col-md-9">
                                                <input id="email" name="Address" type="text"
                                                       placeholder="Address"
                                                       className="form-control"
                                                       value={Shop.Address}
                                                       onChange={this.onTextChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label"
                                                   htmlFor="message">Photo</label>
                                            <div className="col-md-9">
                                                {Shop.Photo === "" ?
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
                                                        <img style={{width: 300, height: 300}} src={Shop.Photo}/>
                                                        <a onClick={() => this.setState({
                                                            ...this.state, Shop: {
                                                                ...this.state.Shop,
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

                                        <div className="col-md-12" style={{height: 600}}>
                                            <label>Choose the location of the shop</label>
                                            <Map
                                                defaultState={{center: [41.285149, 69.2560953], zoom: 9}}
                                                onClick={(e) => {
                                                    let a = e.get('coords');
                                                    this.setState({
                                                        Shop: {
                                                            ...this.state.Shop,
                                                            Location: a[0].toString() + "," + a[1].toString()
                                                        }
                                                    });
                                                }}
                                                style={{width: "100%", height: 600}}
                                                location={this.state.Shop.Location}
                                            />
                                        </div>
                                    </fieldset>
                                    <div className="row">
                                        <div className="col-md-8"/>
                                        <div className="col-md-4 widget-right">
                                            <a onClick={isNew ? this.add : this.save}
                                               className="btn btn-success pull-right btn-block">
                                            <span
                                                className={isNew ? "fa fa-plus" : "fa fa-save"}/> {isNew ? "Add" : "Save"}
                                            </a>
                                        </div>
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

const mapStateToProps = ({shop,}) => ({
    shop: shop,
    isNew: Object.keys(shop).length === 0,
});

export default connect(mapStateToProps)(ShopAddOrEditPage);