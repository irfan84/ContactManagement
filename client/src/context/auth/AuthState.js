import React, { useReducer } from "react";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, CLEAR_ERRORS, LOGOUT } from "../types";
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    // Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }

    };

    // Login user
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        }
        catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Logout / Clear profile
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    loading: state.loading,
                    token: state.token,
                    error: state.error,
                    loadUser,
                    login,
                    register,
                    logout,
                    clearErrors
                }}>
                {props.children}
            </AuthContext.Provider>
        )
    };

export default AuthState;
