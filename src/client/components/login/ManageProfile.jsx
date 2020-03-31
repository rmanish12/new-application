import React, { Component } from 'react'
import autobind from 'react-autobind'
import { connect } from 'react-redux'

import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'

import { manageProfile, updateProfile } from '../../actions/actions'

import '../../index.css'

class ManageProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            dob: '',
            editable: false,
            success: '',
            failure: ''
        }

        autobind(this)
    }

    componentDidMount() {
        this.props.manageProfile()
    }

    componentWillReceiveProps(nextProps) {
        const { firstName, lastName, email, gender, dateOfBirth, updateSuccess, updateFailure } = nextProps.auth.user
        console.log('nextProps.auth.user: ', nextProps.auth.user)

        this.setState({
            firstName,
            lastName,
            email,
            gender,
            dob: dateOfBirth,
            success: updateSuccess,
            failure: updateFailure
        }, () => {
            if(this.state.success) {
                this.setState({editable: false})
            }
        })
        
    }

    onChange(e) {
        e.preventDefault()

        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    onEdit(e) {
        e.preventDefault()

        this.setState({ editable: !this.state.editable })
    }

    onUpdate(e) {
        e.preventDefault()

        const { firstName, lastName, email, gender, dob } = this.state

        this.props.updateProfile(firstName, lastName, email, gender, dob)

    }

    render() {
        return (
            <>
                {this.state.success &&
                    <Alert
                        variant="success"
                        dismissible
                        className="alert"
                        onClose={() => this.setState({success: ''})}
                    >
                        <div className="alert-content">{this.state.success}</div>
                    </Alert>
                }

                {this.state.failure &&
                    <Alert
                        variant="danger"
                        dismissible
                        className="alert"
                        onClose={() => this.setState({failure: ''})}
                    >
                        <div className="alert-content">{this.state.failure}</div>
                    </Alert>
                }
                <Container>
                    <Row>
                        <Col></Col>

                        <Col xs={12} md={5}>
                            <Container>
                                <Row>
                                    <Col xs={12} md={8}><h2>My Profile</h2></Col>
                                    <Col xs={12} md={4}>
                                        <Button variant="warning" className="edit-button" onClick={this.onEdit}>Edit</Button>
                                    </Col>
                                </Row>
                            </Container>
                            <div id='login'>
                                <Form>
                                    <Form.Group controlId="firstname">
                                        <Form.Label className="required">First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            onChange={this.onChange}
                                            value={this.state.firstName}
                                            disabled={!this.state.editable}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="lastname">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            onChange={this.onChange}
                                            value={this.state.lastName}
                                            disabled={!this.state.editable}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label className="required">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            disabled="true"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="gender">
                                        <Form.Label className="required">Gender</Form.Label>
                                        <Form.Check
                                            inline
                                            name="gender"
                                            label="Male"
                                            value="Male"
                                            type="radio"
                                            checked={this.state.gender === 'Male' ? true : false}
                                            className="gender-radio"
                                            onChange={this.onChange}
                                            disabled={!this.state.editable}
                                        />

                                        <Form.Check
                                            inline
                                            name="gender"
                                            label="Female"
                                            value="Female"
                                            type="radio"
                                            checked={this.state.gender === 'Female' ? true : false}
                                            onChange={this.onChange}
                                            disabled={!this.state.editable}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="dob">
                                        <Form.Label className="required">Date Of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            onChange={this.onChange}
                                            value={this.state.dob}
                                            disabled={!this.state.editable}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="success"
                                        className="login-button"
                                        disabled={!this.state.editable}
                                        onClick={this.onUpdate}
                                    >
                                        Update
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
        manageProfile: () => dispatch(manageProfile()),
        updateProfile: (firstName, lastName, email, gender, dateOfBirth) => dispatch(updateProfile(firstName, lastName, email, gender, dateOfBirth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile)