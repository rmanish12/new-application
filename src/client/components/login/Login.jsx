import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

import { login, checkUser } from '../../actions/actions'
import { emailValidation, passwordValidation } from '../../utils/validation'

import '../../index.css'

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [disableButton, setDisableButton] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
        if (props.auth.user) {
            if (props.auth.user.error) {
                setShowAlert(true)
            }
        }
    }, [props.auth])

    useEffect(() => {
        if(emailValidation(email) && passwordValidation(password)) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [email, password])

    const onClick = (e) => {
        e.preventDefault()

        props.login(email, password)
    }

    return (
        <>
            {showAlert &&
                <Alert
                    variant="danger"
                    dismissible
                    className="alert"
                    onClose={() => setShowAlert(false)}
                >
                    <div className="alert-content">{props.auth.user.error}</div>
                </Alert>
            }

            <Container>
                <Row>
                    <Col></Col>

                    <Col xs={12} md={6}>
                        <div id='login'>
                            <Form>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    className="login-button"
                                    onClick={onClick}
                                    disabled={disableButton}
                                >
                                    Login
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)