import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { logout, isLoggedIn } from '../../actions/actions'

import '../../index.css'

const navbar = (props) => {

    // useEffect(() => {
    //     props.isLoggedIn()
    // }, [])

    function onLogout() {
        document.cookie = "sessionToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        props.logout()
    }

    function show() {
        if(props.auth.user) {
            if(props.auth.user.firstName) {
                const title = props.auth.user.firstName
                return (
                    <Nav>
                        <NavDropdown title={title} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                            <Link to='/profile'>Manage Profile</Link>
                            <Link to='/changePassword'>Change Password</Link>
                        </NavDropdown>             
                    </Nav>                    
                )
            } else {
                return (
                    <Nav>
                        <Nav.Link><Link to='/login' className="link">Login</Link></Nav.Link>
                        <Nav.Link><Link to='/register' className="link">Register</Link></Nav.Link>
                    </Nav>                    
                )
            }
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><Link to='/' className="link">Brand Name</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>

                    {show()}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        isLoggedIn: () => dispatch(isLoggedIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar)