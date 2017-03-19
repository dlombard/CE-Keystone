import React from 'react'
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export default class App extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect className="header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Chants d'Espérance</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>
                        <LinkContainer to="/search">
                            <NavItem eventKey={1}><Glyphicon glyph="search"></Glyphicon></NavItem>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <NavItem eventKey={2}>About</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/contactus">
                            <NavItem eventKey={2}>Contact Us</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
