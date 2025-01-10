import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAILURE,
} from './actionTypes';
const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    token: ""
};


const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;
// console.log(state)
    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload,
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        // case LOGOUT:
        //     return {
        //         ...state,
        //         user: null,
        //         isAuthenticated: false,
        //     };

        case GET_USER_REQUEST:{
            return {
                ...state,
                loading: true,
            };
        }
        case GET_USER_SUCCESS:{
            return {
                ...state,
                user: payload,
                loading: false,
            };
        }

        case GET_USER_FAILURE:{
            return {
                ...state,
                loading: false,
                error: payload,
            }
        }

        case UPDATE_USER_SUCCESS:{  
            return {
                ...state,
                user: payload,
            }
        }

        case UPDATE_USER_REQUEST:{
            return {
                ...state,
                loading: true,
            }
        }

        case UPDATE_USER_FAILURE:{  
            return {
                ...state,
                loading: false,
                error: payload,
            }
        }



        default:

            return state;
    }
}


export default AuthReducer;