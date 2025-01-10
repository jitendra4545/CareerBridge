import { GET_APPLY_JOB_FAILURE, GET_APPLY_JOB_REQUEST, GET_APPLY_JOB_SUCCESS, GET_JOBS_FAILURE, GET_JOBS_REQUEST, GET_JOBS_SUCCESS } from "./actionTypes"

const initialState = {
    allJobs: [],
    loading: false,
    error: null,
    appliedJobs: []
}



export const JobReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_JOBS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                loading: false,
                allJobs: payload
            }
        case GET_JOBS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case GET_APPLY_JOB_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_APPLY_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                appliedJobs: payload
            }
        case GET_APPLY_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}



