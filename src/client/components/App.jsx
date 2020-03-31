import React, { useEffect } from 'react'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './header/Navbar.jsx'
import Home from './home/Home.jsx'
import Login from './login/Login.jsx'
import Register from './register/Register.jsx'
import ManageProfile from './login/ManageProfile.jsx'
import ChangePassword from './login/ChangePassword.jsx'
import Admin from './admin/Admin.jsx'
import User from './user/User.jsx'

import { isLoggedIn } from '../actions/actions'

function App(props) {

    console.log('props: ', props)
    const role = props.auth.user.role

    useEffect(() => {
        props.isLoggedIn()
    }, [])

    return (
        <>
            <Navbar />

            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/profile' exact component={ManageProfile} />
                <Route path='/changePassword' exact component={ChangePassword} />
                <Route path='/home' exact component={role==='Admin' ? Admin : User } />
            </Switch>
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
        isLoggedIn: () => dispatch(isLoggedIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)