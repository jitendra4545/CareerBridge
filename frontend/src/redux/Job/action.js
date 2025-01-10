import BaseUrl from "../../utils/Api"
import { GET_APPLY_JOB_FAILURE, GET_APPLY_JOB_REQUEST, GET_APPLY_JOB_SUCCESS, GET_JOBS_FAILURE, GET_JOBS_REQUEST, GET_JOBS_SUCCESS } from "./actionTypes"
import axios from 'axios'

export const getJobSuccess = (payload) => {
    return {
        type: GET_JOBS_SUCCESS,
        payload
    }
}


export const getJobRequest = () => {
    return {
        type: GET_JOBS_REQUEST
    }
}

export const getJobFailure = (error) => {
    return {
        type: GET_JOBS_FAILURE,
        payload: error
    }
}


export const getApplyJobRequest = () => {
    return {
        type: GET_APPLY_JOB_REQUEST
    }
}

export const getApplyJobSuccess = (payload) => {
    return {
        type: GET_APPLY_JOB_SUCCESS,
        payload
    }
}

export const getApplyJobFailure = (error) => {
    return {
        type: GET_APPLY_JOB_FAILURE,
        payload: error
    }
}


export const getJobs = () => (dispatch) => {
    dispatch(getJobRequest())
    axios.get(`${BaseUrl}/jobs`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then((res) => {
        console.log(res)
        dispatch(getJobSuccess(res.data))
    }).catch((error) => {
        console.log(error)
        dispatch(getJobFailure(error))
    })
}





export const getAppliedJobs = () => (dispatch) => {
    dispatch(getApplyJobRequest())
    axios.get(`${BaseUrl}/aspirants/applications`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then((res) => {
        dispatch(getApplyJobSuccess(res?.data?.applications))
    }).catch((error) => {
        dispatch(getApplyJobFailure(error))
    })
}