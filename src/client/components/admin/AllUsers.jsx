import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { Table, Button } from 'react-bootstrap'

const allUsers = () => {

    const [users, setUsers] = useState([])
    const [error, setError] = useState('')

    const token = document.cookie.split('=')[1]

    useEffect(() => {
        axios.post('/getAllUsers', {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            setError(err.response.data)
        })
    }, [])

    function exportExcel() {
        console.log('clicked')
        const downloadExcelLink = document.getElementById('downloadExcel')

        axios.post('/generateExcel', {
            users: users
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(async res => {
            console.log('res: ', res)
            const downloadExcelBlob = await res.blob();
            const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);
            downloadExcelLink.href = downloadExcelObjectURL;
        }).catch(err => {
            console.log('err: ', err)
        }).catch(err => console.log(err))
    }

    return (
        <>
            {users &&
                <>
                    <a id="dowloadExcel" download="AllUsers.xlsx" href="#" onClick={exportExcel}>Export Excel</a>

                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            const dob = moment(user.dateOfBirth).format('DD-MM-YYYY')
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
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
                </>
            }
        </>
    )
}

export default allUsers