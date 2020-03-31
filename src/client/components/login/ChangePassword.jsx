import React, { Component } from 'react'
import autobind from 'react-autobind'
import { connect } from 'react-redux'

import { changePassword } from '../../actions/actions'

import '../../index.css'

import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
            success: '',
            failure: ''
        }

        autobind(this)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { passwordChangeSuccess, passwordChangeFailure } = nextProps.auth.user
        console.log(nextProps.auth.user)

        if (passwordChangeSuccess) {
            this.setState({ success: passwordChangeSuccess })
        } else if (passwordChangeFailure) {
            this.setState({ failure: passwordChangeFailure })
        }
    }

    onChange(e) {
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value
        })
    }

    onUpdate(e) {
        e.preventDefault()

        const { oldPassword, newPassword, confirmPassword } = this.state


        this.setState({success: '', failure: ''})

        if (newPassword === confirmPassword) {
            this.props.changePassword(oldPassword, newPassword)
        } else {
            this.setState({ error: 'Password does not match.' })
        }
    }

    render() {
        return (
            <>
                {this.state.success &&
                    <Alert
                        variant="success"
                        className="alert"
                        dismissible
                        onClose={() => this.setState({success: ''})}
                    >
                        <div className="alert-content">{this.state.success}</div>
                    </Alert>
                }

                {this.state.failure &&
                    <Alert
                        variant="danger"
                        className="alert"
                        dismissible
                        onClose={() => this.setState({failure: ''})}
                    >
                        <div className="alert-content">{this.state.failure}</div>
                    </Alert>
                }
                <Container>
                    <Row>
                        <Col></Col>

                        <Col xs={12} md={6}>
                            <h3>Change Password</h3>
                            <div id='login'>
                                <Form>
                                    <Form.Group controlId="email">
                                        <Form.Label>Old Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="oldPassword"
                                            value={this.state.oldPassword}
                                            onChange={this.onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={this.state.newPassword}
                                            name="newPassword"
                                            onChange={this.onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.confirmPassword}
                                            name="confirmPassword"
                                            onChange={this.onChange}
                                        />
                                    </Form.Group>

                                    {this.state.error &&
                                        <div className="error-msg">{this.state.error}</div>
                                    }
                                    <hr />
                                    <Button
                                        className="login-button"
                                        onClick={this.onUpdate}
                                    >
                                        Change Password
                                </Button>
                                </Form>
                            </div>

                        </Col>

                        <Col></Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword, newPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)