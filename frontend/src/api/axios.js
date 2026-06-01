import axios from "axios"

const BASE_URL = '/api'

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (method, path, body) => {
    const config = {
        headers : {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        }
    }

    const needsBody = ['post', 'put', 'patch'].includes(method);
    const res = needsBody
        ? await axios[method](`${BASE_URL}${path}`, body ?? {}, config)
        : await axios[method](`${BASE_URL}${path}`, config)

    return res.data
}


export const api = {
    get: (path) => request('get', path),
    post: (path, body) => request('post', path, body),
    put: (path, body) => request('put', path, body),
    patch: (path, body) => request('patch', path, body),
    delete: (path) => request('delete', path)
}