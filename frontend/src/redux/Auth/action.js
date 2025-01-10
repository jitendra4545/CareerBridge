import axios from 'axios';
import BaseUrl from '../../utils/Api';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './actionTypes';



export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});


export const getUserSuccess=(user)=>({
    type:GET_USER_SUCCESS,
    payload:user
})
export const getUserFailure=(error)=>({
    type:GET_USER_FAILURE,
    payload:error
})

export const getUserRequest=()=>({
    type:GET_USER_REQUEST
})


export const updateUserRequest=()=>({
    type:UPDATE_USER_REQUEST
})
export const updateUserSuccess=(user)=>({
    type:UPDATE_USER_SUCCESS,
    payload:user
})
export const updateUserFailure=(error)=>({
    type:UPDATE_USER_FAILURE,
    payload:error
})



export const updateUser=(formData)=>(dispatch)=>{
    dispatch(updateUserRequest());
    return axios.put(`${BaseUrl}/aspirants/profile`,formData,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
    .then(response=>{
        const user=response.data;
        console.log("User",response);
        dispatch(updateUserSuccess(user));
    })
    .catch(error=>{
        console.log(error);
        dispatch(updateUserFailure(error.message))
    })
}



export const getUser=()=>(dispatch)=>{
  dispatch(getUserRequest());
    return axios.get(`${BaseUrl}/aspirants/profile`,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
    .then(response=>{
        const user=response.data;
        dispatch(getUserSuccess(user));
    }).catch((error)=>{
        console.log(error);
        dispatch(getUserFailure(error.message))
    })

}

export const UserLogin=(formData)=>(dispatch)=>{
    dispatch(loginRequest());
   return axios.post(`${BaseUrl}/aspirants/login`,formData)
    .then(response=>{
        const user=response.data;
        alert(response?.data?.message)
        dispatch(loginSuccess(user?.token));
        localStorage.setItem('token',user?.token);
    })
    .catch(error=>{
        alert(error?.response?.data?.message)
        console.log(error.data)
        dispatch(loginFailure(error.message));
    });
}


export const UserRegister=(formData)=>(dispatch)=>{
    dispatch(registerRequest());
   return axios.post(`${BaseUrl}/aspirants/register`,formData)
    .then(response=>{

        const user=response.data;
        alert(response?.data?.message)
        dispatch(registerSuccess(user));
    })
    .catch(error=>{
         console.log(error.response)
         alert(error?.response?.data?.message)
        dispatch(registerFailure(error.message));
    });
}



