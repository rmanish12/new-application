import React from 'react'
import autobind from 'react-autobind'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class User extends React.Component {
    constructor(props) {
        super(props)

        autobind(this)
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" className="inner-nav">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title={"First dropdown"} id="collasible-nav-dropdown">
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title={"Second dropdown"} id="collasible-nav-dropdown">
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default User