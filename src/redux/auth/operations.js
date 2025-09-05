
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Yardımcı: Header’a token ekle
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    delete axios.defaults.headers.common.Authorization;
};

// register
export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const res = await axios.post('users/signup', credentials);
        setAuthHeader(res.data.token);
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// login
export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await axios.post('users/login', credentials);
        setAuthHeader(res.data.token);
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// logout
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('users/logout');
        clearAuthHeader();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// refresh user
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
        return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(token);
    try {
        const res = await axios.get('users/current');
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});
