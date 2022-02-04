import React, {useState} from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Popup } from './Popup';
import { TodoForm } from './TodoForm';

const TodoItem = ({todo, onTodoRemoval, onTodoToggle, handleEdit}) => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleEditPopup = (todo) => {
        togglePopup();
        handleEdit(todo);
    }

    return (
        <List.Item actions={[
                <Tooltip title={todo.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}>
                    <Switch checkedChildren={<CheckOutlined/>}
                            unCheckedChildren={<CloseOutlined/>}
                            onChange={() => onTodoToggle(todo)}
                            defaultChecked={todo.completed} />
                </Tooltip>,
                <Popconfirm title={'Are You Sure'}
                onConfirm={() => {
                    onTodoRemoval(todo)}}>
                        <Button className="remove-todo-button" type="primary" danger>X</Button>
                </Popconfirm>
            ]}            
            className="list-item"
            key={todo.id} >            

            <div className="todo-item">
                <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag edit-button" onClick={togglePopup}>
                    {todo.title}
                </Tag>
            </div>
            {isOpen && 
            <Popup 
                content={<>
                    <b>Edit your task name: {todo.title}</b>
                    <TodoForm onFormSubmit={handleEditPopup} isEdit={true} todo={todo}/>
                </>}
                handleClose={togglePopup}
            />}
        </List.Item>
    );
}

export default TodoItem