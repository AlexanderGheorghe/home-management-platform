import { authHeader } from '../helpers/authHeader';
const baseUrl = 'https://localhost:7220/api/Todos';

export const loadTodos = () => {
    return fetch(baseUrl,{
        method: 'GET',
        headers: authHeader()
    }).then((res) => res.json());
}

export const getTodo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {...{"Content-Type": "application/json"}, ...authHeader()},
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        }),
    }).then((res) => res.json());
}

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: "PUT",
        headers: {...{"Content-Type": "application/json"}, ...authHeader()},
        body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        }),
    }).then((res) => res.json());
}

export const deleteTodo = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {...{"Content-Type": "application/json"}, ...authHeader()},
    }).then((res) => res.json());
}
