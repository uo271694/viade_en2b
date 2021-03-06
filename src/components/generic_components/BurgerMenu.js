import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

import { HashRouter as Router, Link } from "react-router-dom";
import "assets/css/BurgerMenu.css";

import ThemeSwitch from "./ThemeSwitch.js";

class BurgerMenu extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu
        disableAutoFocus
        className="bm-menu"
        pageWrapId={this.props.pageWrapId}
        outerContainerId={this.props.container}
      >
        <nav className="bm-item-list">
          <h2 className="bm-item" tabIndex="0">
            <img className="fa fa-fw fa-2x" src="ViaDe.png"></img>
            <span> ViaDe</span>
          </h2>
          <Router>
            <Link id="home" className="menu-item" to="/">
              <i className="fa fa-fw fas fa-map"></i>
              <span>Home</span>
            </Link>

            <Link id="add-route" className="menu-item" to="/notifications">
              <i className="fa fa-fw far fa-bell"></i>
              <span>Notifications</span>
            </Link>

            <Link id="list-routes" className="menu-item" to="/routes">
              <i className="fa fa-fw far fa-list-alt"></i>
              <span>List Routes</span>
            </Link>

            <Link id="list-friends" className="menu-item" to="/friends-list">
              <i className="fa fa-fw fas fa-user"></i>
              <span>List Friends</span>
            </Link>

            <Link id="groups-friends" className="menu-item" to="/groups">
              <i className="fa fa-fw fas fa-users"></i>
              <span>Friend Groups</span>
            </Link>

            <Link id="gpx" className="menu-item" to="/gpx">
              <i className="fa fa-fw fas fa-cubes"></i>
              <span>Import GPX</span>
            </Link>

            <Link id="about" className="menu-item" to="/about">
              <i className="fa fa-fw fas fa-info-circle"></i>
              <span>About</span>
            </Link>

            <ThemeSwitch />
          </Router>
        </nav>
      </Menu>
    );
  }
}

export default BurgerMenu;
