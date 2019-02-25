import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';


class TopNav extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return (
            <div>
                <Navbar color="light" light expand="xs" className="position-fixed w-100 border-bottom " style={{zIndex:"1030"}}>
                    <NavbarBrand title="home"><NavLink to="/" className="text-dark">enviar</NavLink></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="m-1 text-dark"  title="notifications" to="/components/"><i className="fas fa-bell"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="m-1 text-dark"  title="messages" to="https://github.com/reactstrap/reactstrap"><i className="fas fa-comments"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="m-1 text-dark"  title="profile" to="/profile"><i className="fas fa-user-alt"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="m-1 text-dark"  title="log out" to="https://github.com/reactstrap/reactstrap"><i className="fas fa-sign-out-alt"></i></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div style={{height:"80px"}}></div>
            </div>
        )
    }
}

export default TopNav;