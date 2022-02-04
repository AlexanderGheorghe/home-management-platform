import { authHeader } from '../helpers/authHeader';
const baseUrl = 'https://localhost:7220/api/Users';

export const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,
        password:password,
        email:""})
    };

    return fetch(`${baseUrl}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

export const logout = () => {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${baseUrl}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const loadUsers = () => {
    return fetch(baseUrl).then((res) => res.json());
}

export const getUser = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createUser = (username, password, email) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
    }).then((res) => res.json());
}

export const updateUser = (user) => {
    return fetch(`${baseUrl}/${user.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email
        }),
    }).then((res) => res.json());
}

export const deleteUser = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export const userService = {
    login,
    logout,
    getAll,
    createUser
};
