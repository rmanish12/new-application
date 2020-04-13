import React, { Component } from 'react'
import autobind from 'react-autobind'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'

import { register } from '../../actions/actions'
import ModalComponent from '../modal/Modal.jsx'

import '../../index.css'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: 'Male',
            dob: '',
            password: '',
            confirmPassword: '',
            error: '',
            success: ''
        }

        autobind(this)
    }

    onChange(event) {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value })
    }

    onClick(event) {
        event.preventDefault()

        const { firstName, lastName, email, gender, dob, password } = this.state

        this.props.register(firstName, lastName, email, password, gender, dob)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { registerSuccess, registerFailure } = nextProps.auth.user

        console.log('registerSuccess, registerFailure: ', registerSuccess, registerFailure)

        if(registerSuccess) {
            this.setState({success: true})
        } else if(registerFailure) {
            this.setState({error: registerFailure})
        }
    }

    render() {
        return (
            <>
                {this.state.error &&
                    <Alert
                        variant="danger"
                        dismissible
                        className="alert"
                        onClose={() => this.setState({error: false})}
                    >
                        <div className="alert-content">{this.state.error}</div>
                    </Alert>
                }

                <ModalComponent
                    show = {this.state.success}
                    onHide = {() => this.props.history.push('/')}
                    heading = "Registration Successful"
                >
                    You have successfully registered. Please login to continue.
                </ModalComponent>

                <Container>
                    <Row>
                        <Col md={12}><div className="form-header"><h3>Register</h3></div></Col>
                    </Row>

                    <Row>
                        <Col></Col>

                        <Col xs={12} md={5}>
                            <div id='login'>
                                <Form>
                                    <Form.Group controlId="firstname">
                                        <Form.Label className="required">First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            onChange={this.onChange}
                                            value={this.state.firstName}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="lastname">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            onChange={this.onChange}
                                            value={this.state.lastName}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label className="required">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="gender">
                                        <Form.Label className="required">Gender</Form.Label>
                                        <Form.Check inline name="gender" label="Male" value="Male" type="radio" checked className="gender-radio" onChange={this.onChange} />
                                        <Form.Check inline name="gender" label="Female" value="Female" type="radio" onChange={this.onChange} />
                                    </Form.Group>

                                    <Form.Group controlId="dob">
                                        <Form.Label className="required">Date Of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            onChange={this.onChange}
                                            value={this.state.dob}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label className="required">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="confirm-password">
                                        <Form.Label className="required">Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            onChange={this.onChange}
                                            value={this.state.confirmPassword}
                                        />
                                    </Form.Group>

                                    <Button className="login-button" onClick={this.onClick}>
                                        Register
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
        register: (firstName, lastName, email, password, gender, dob) => dispatch(register(firstName, lastName, email, password, gender, dob))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))