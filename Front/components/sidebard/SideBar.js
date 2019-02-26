import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const SideBar = ({children: Children, user, ...rest}) => {
    return (
        <div>
            <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#sidebar-collapse"><span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span></button>
                        <a className="navbar-brand" href="#"><span>FURNITURE STORE</span></a>
                    </div>
                </div>
            </nav>
            <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <img src="http://placehold.it/50/30a5ff/fff" className="img-responsive" alt=""/>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">{user.Username}</div>
                        <div className="profile-usertitle-status"><span className="indicator label-success"></span>Online
                        </div>
                    </div>
                    <div className="clear"/>
                </div>
                <div className="divider"/>
                <form role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search"/>
                    </div>
                </form>
                <ul className="nav menu">
                    <li><NavLink to="/dashboard"><em
                        className="fa fa-home">&nbsp;</em> Dashboard</NavLink>
                    </li>
                    <li className="parent "><a data-toggle="collapse" href="#sub-item-1">
                        <em className="fa fa-th-large">&nbsp;</em> Data <span data-toggle="collapse"
                                                                              href="#sub-item-1"
                                                                              className="icon pull-right">
                        <em className="fa fa-plus">&nbsp;</em>
                    </span>
                    </a>
                        <ul className="children collapse" id="sub-item-1">
                            <li><NavLink to="/catalog" className="" href="#">
                                <span className="fa fa-folder-open">&nbsp;</span> Catalog
                            </NavLink></li>
                            <li><NavLink to={"/category"} className="">
                                <span className="fa fa-th-list">&nbsp;</span> Category
                            </NavLink></li>
                            <li><NavLink to={"/subCategory"} className="">
                                <span className="fa fa-grip-horizontal">&nbsp;</span> Sub Category
                            </NavLink></li>
                            <li><NavLink to={"/product"} className="">
                                <span className="fa fa-couch">&nbsp;</span> Product
                            </NavLink></li>
                            <li><NavLink to={"/shop"} className="" href="#">
                                <span className="fa fa-shopping-cart">&nbsp;</span> Shops
                            </NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to={"/admin"}><em className="fa fa-power-off">&nbsp;</em> Logout</NavLink></li>
                </ul>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                {Children}
            </div>
        </div>
    )
};

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps)(SideBar)