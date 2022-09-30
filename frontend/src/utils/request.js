import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from '~/redux/authSlice';
import { getUsersFailed, getUsersStart, getUsersSuccess } from '~/redux/userSlice';

const request = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL || 'https://khanhmtn.api.internship.designveloper.com',
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data
}

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data
}

export const put = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data
}

export const patch = async (path, options = {}) => {
    const response = await request.patch(path, options);
    return response.data
}

export const remove = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data
}

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await request.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (err) {
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await request.post('/auth/register', user);
        dispatch(registerSuccess());
        navigate("/signin");
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart())
    try {
        // const res = await axiosJWT.get('https://khanhmtn.api.internship.designveloper.com/userAuth', {
        const res = await axiosJWT.get('http://localhost:3001/userAuth', {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(getUsersSuccess(res.data))
    } catch(err) {
        dispatch(getUsersFailed())
    }
}

export const logOut = async(dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart())
    try {
        // await axiosJWT.post('https://khanhmtn.api.internship.designveloper.com/auth/logout', id, { 
        await axiosJWT.post('http://localhost:3001/auth/logout', id, { 
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logOutSuccess())
        navigate('/signin')
    } catch (err) {
        dispatch(logOutFailed())
    }
}

export default request