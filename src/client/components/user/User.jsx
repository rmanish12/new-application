import React from 'react'
import autobind from 'react-autobind'

class User extends React.Component {
    constructor(props) {
        super(props)

        autobind(this)
    }

    render() {
        return (
            <>
                User home page
            </>
        )
    }
}

export default User