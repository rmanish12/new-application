import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { Table, Form, Pagination, Container, Col, Row, Alert, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

import '../../index.css'

const allUsers = () => {

    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [numberOfUsers, setNumberOfUsers] = useState('')
    const [pages, setPages] = useState([])
    const [active, setActive] = useState(1)
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(2)

    const token = document.cookie.split('=')[1]

    useEffect(() => {
        axios.post('/getAllUsers', {
            pageId: active,
            numberOfUsers: numberOfItemsPerPage
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setUsers(res.data.users)
            setNumberOfUsers(res.data.numberOfUsers)
        }).catch(err => {
            setError(err.response.data)
        })
    }, [numberOfItemsPerPage, active])

    useEffect(() => {
        const a = []
        for (let i = 1; i <= Math.ceil(numberOfUsers / numberOfItemsPerPage); i++) {
            a.push(
                <Pagination.Item key={i} active={i === active} onClick={() => onPageChange(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        setPages(a)
    }, [numberOfUsers, active, numberOfItemsPerPage])

    function onPageChange(id) {
        setActive(id)
    }

    function onNumberOfItemsChange(e) {
        setNumberOfItemsPerPage(e.target.value)
        setActive(1)
    }

    function onExcelDownload() {

        axios({
            method: 'post',
            url: '/generateExcel',
            responseType: 'blob',
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Users.xlsx')
            document.body.appendChild(link)
            link.click()
        })
            .catch(err => {
                console.log('err: ', err)
            })

    }

    function onGenderFilter(e) {
        const name = e.target.name
        const value = e.target.value

        console.log(name, value)
    }

    return (
        <>
            {error &&
                <Alert
                    variant="danger"
                    dismissible
                    className="alert"
                    onClose={() => setError('')}
                >
                    <div className="alert-content">{error}</div>
                </Alert>
            }
            {users &&
                <>
                    <div style={{ backgroundColor: 'azure' }}>
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <Button className="export-button" onClick={onExcelDownload}>Export Excel</Button>
                                </Col>
                                <Col md={2}>
                                    <div className="items-per-page"><Form.Label>Items Per Page</Form.Label></div>
                                </Col>
                                <Col md={2}>
                                    <Form>
                                        <Form.Group controlId="itemsPerPage">

                                            <Form.Control as="select" defaultValue={2} onChange={onNumberOfItemsChange} className="items-per-page-dropdown">
                                                <option value="2">2</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>
                                        Gender
                                        <DropdownButton
                                            as={ButtonGroup}
                                            key="info"
                                            id='genderFilter'
                                            variant="info"
                                            title="Filter"
                                        >
                                            <Dropdown.Item eventKey="1">
                                                <Form>
                                                    <Form.Check
                                                        name="genderFilter"
                                                        type="checkbox"
                                                        label="Male"
                                                        value="Male"
                                                        id="Male Checkbox"
                                                        onChange={onGenderFilter}
                                                    />

                                                    <Form.Check
                                                        name="genderFilter"
                                                        type="checkbox"
                                                        label="Female"
                                                        value="Female"
                                                        id="Female Checkbox"
                                                        onChange={onGenderFilter}
                                                    />
  {/* {['checkbox', 'radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check inline label="1" type={type} id={`inline-${type}-1`} />
      <Form.Check inline label="2" type={type} id={`inline-${type}-2`} />
      <Form.Check
        inline
        disabled
        label="3 (disabled)"
        type={type}
        id={`inline-${type}-3`}
      />
    </div>
  ))} */}
                                                </Form>
                                            </Dropdown.Item>

                                        </DropdownButton>{' '}
                                    </th>
                                    <th>Date Of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    const dob = moment(user.dateOfBirth).format('DD-MM-YYYY')
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>{dob}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </Table>
                    </div>

                    <div className="pagination"><Pagination size="sm">{pages}</Pagination></div>

                </>
            }
        </>
    )
}

export default allUsers