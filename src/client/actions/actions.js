import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGGED_IN, USER_FETCHED, USER_FETCH_ERROR,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE,
    REGISTER_SUCCESSFUL, REGISTER_FAILURE
} from './types'

import axios from 'axios'
import history from '../history'

axios.defaults.baseURL='http://localhost:8000'

export const register = (firstName, lastName, email, password, gender, dob) => dispatch => {
    axios.post('/user', {
        firstName,
        lastName,
        email,
        gender,
        password,
        dob 
    }).then(res => {
        dispatch({
            type: REGISTER_SUCCESSFUL,
            payload: {
                registerSuccess: res.data
            }
        })
    }).catch(err => {
        dispatch({
            type: REGISTER_FAILURE,
            payload: {
                registerFailure: err.response.data
            }
        })
    })
}

export const login = (email, password) => dispatch => {
    axios.post('/login', {
        email,
        password
    }).then(res => {
        document.cookie="sessionToken="+res.data.token
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                name: res.data.firstName,
                role: res.data.role
            }
        })
        history.push('/home')
    }).catch(err => {
        dispatch({
            type: LOGIN_FAILURE,
            payload: {
                error: err.response.data
            }
        })
    })
}

export const isLoggedIn = () => dispatch => {
    const token = document.cookie.split('=')[1] 

    axios.post('/isLoggedIn', {}, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(res => {
        dispatch({
            type: LOGGED_IN,
            payload: {
                name: res.data.firstName,
                role: res.data.role
            }
        })
    }).catch(err => {
        console.log('err: ', err)
    })
}

export const checkUser = () => {
    // console.log('check')
    // const token = document.cookie.split('=')[1]

    // axios.post('/checkUser', {}, {
    //     headers: {
    //         Authorization: "Bearer " + token
    //     }
    // })
}

export const manageProfile = () => dispatch => {
    const token = document.cookie.split('=')[1]

    axios.post('/getProfile', {}, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(res => {
        dispatch({
            type: USER_FETCHED,
            payload: {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                gender: res.data.gender,
                dateOfBirth: res.data.dateOfBirth
            }
        })
    }).catch(err => {
        dispatch({
            type: USER_FETCH_ERROR,
            payload: {
                fecthError: err.response.data
            }
        })
    })
    
}

export const updateProfile = (firstName, lastName, email, gender, dateOfBirth) => dispatch => {
    const token = document.cookie.split('=')[1]

    axios.post('/updateProfile', {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(res => {
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: {
                firstName: res.data.firstName,
                lastName: res.data,lastName,
                email: res.data.email,
                gender: res.data.gender,
                dateOfBirth: res.data.dateOfBirth,
                updateSuccess: res.data.message
            }
        })
    }).catch(err => {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: {
                updateFailure: err.response.data
            }
        })
    })
}

export const changePassword = (oldPassword, newPassword) => dispatch => {
    const token = document.cookie.split('=')[1]

    axios.post('/changePassword', {
        oldPassword,
        newPassword
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(res => {
        dispatch({
            type: PASSWORD_CHANGE_SUCCESS,
            payload: {
                passwordChangeSuccess: res.data
            }
        })
    }).catch(err => {
        dispatch({
            type: PASSWORD_CHANGE_FAILURE,
            payload: {
                passwordChangeFailure: err.response.data
            }
        })
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    history.push('/')
}