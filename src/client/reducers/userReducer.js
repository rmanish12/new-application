import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGGED_IN, USER_FETCHED, USER_FETCH_ERROR,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE,
    REGISTER_SUCCESSFUL, REGISTER_FAILURE
} from '../actions/types'

const userReducer = (state={
    user: {}
}, action) => {
    switch(action.type) {

        case REGISTER_SUCCESSFUL:
            return {
                ...state,
                user: {
                    registerSuccess: action.payload.registerSuccess
                }
            }

        case REGISTER_FAILURE:
            return {
                ...state,
                user: {
                    registerFailure: action.payload.registerFailure
                }
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    firstName: action.payload.name,
                    role: action.payload.role
                } 
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                    user: {
                        error: action.payload.error
                    }
            }

        case LOGOUT:
            return {
                ...state,
                user: {
                    name: ''
                }
            }

        case LOGGED_IN:
            return {
                ...state,
                user: {
                    firstName: action.payload.name,
                    role: action.payload.role
                }
            }

        case USER_FETCHED:
            return {
                ...state,
                user: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    gender: action.payload.gender,
                    dateOfBirth: action.payload.dateOfBirth
                }
            }

        case USER_FETCH_ERROR:
            return {
                ...state,
                user: {
                    error: action.payload.fetchError
                }
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    gender: action.payload.gender,
                    dateOfBirth: action.payload.dateOfBirth,
                    updateSuccess: action.payload.updateSuccess
                }
            }

        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                user: {
                    updateFailure: action.payload.updateFailure
                }
            }

        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    passwordChangeSuccess: action.payload.passwordChangeSuccess
                }
            }

        case PASSWORD_CHANGE_FAILURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    passwordChangeFailure: action.payload.passwordChangeFailure
                }
            }

        default:
            return {
                ...state
            }
    }
}

export default userReducer