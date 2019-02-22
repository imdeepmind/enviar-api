import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


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
                <Navbar color="primary" dark expand="xs" className="position-fixed w-100" style={{zIndex:"1030"}}>
                    <NavbarBrand href="/" title="home">enviar</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink title="notifications" href="/components/"><i className="fas fa-bell"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink title="messages" href="https://github.com/reactstrap/reactstrap"><i className="fas fa-comments"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink title="profile" href="https://github.com/reactstrap/reactstrap"><i className="fas fa-user-alt"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink title="log out" href="https://github.com/reactstrap/reactstrap"><i className="fas fa-sign-out-alt"></i></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopNav;