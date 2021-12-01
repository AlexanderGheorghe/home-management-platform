import React, {useEffect} from 'react';
import { Tabs, Row, Col, List } from 'antd'; 
import TodoItem from './TodoItem';

const TodoTab = ({Todos, onTodoRemoval, onTodoToggle}) => {
    return (
        <>
            <List locale={{emptyText: "There's nothing to do"}}
            dataSource={Todos}
            renderItem={(todo) => (
                <TodoItem
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval={onTodoRemoval} />
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }} />   
        </>
    )
}

export default TodoTab