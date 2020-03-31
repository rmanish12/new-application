import React from 'react'
import autobind from 'react-autobind'

import { Button } from 'react-bootstrap'

import AllUsers from './AllUsers.jsx'

class Admin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            getAllUsers: false
        }

        autobind(this)
    }

    onGetAllUsers(e) {
        e.preventDefault()

        this.setState({getAllUsers: true})
    }

    render() {
        return (
            <>
                <Button onClick={this.onGetAllUsers}>Get All Users</Button>
                <hr/>
                {this.state.getAllUsers &&
                    <AllUsers />
                }
            </>
        )
    }

}

export default Admin