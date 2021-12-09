import React, {useEffect, useState, useCallback} from 'react';
import { Tabs, Row, Col, message, Input, Layout } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService';

const {TabPane} = Tabs;
const {Content} = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing]= useState(false);
    const [Todos, setTodos]= useState([]);
    const [activeTodos, setActiveTodos]= useState([]);
    const [completedTodos, setCompletedTodos]= useState([]);

    const handleFormSubmit = (todo) => {
        console.log('Todo to create', todo);
        createTodo(todo).then(onRefresh());
        message.success('Congrats, Todo added');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo Removed');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.completed = !todo.completed;
        updateTodo(todo).then(onRefresh());
        message.info('Todo Updated');
    }

    const refresh = () => {
        loadTodos()
          .then(json => {
            setTodos(json);
            setActiveTodos(json.filter(todo => todo.completed === false));
            setCompletedTodos(json.filter(todo => todo.completed === true));
        }).then(console.log('fetch completed'));
    }

    const onRefresh = useCallback( async () => {
            setRefreshing(true);
            let data = await loadTodos();
            setTodos(data);
            setActiveTodos(data.filter(todo => todo.completed === false));
            setCompletedTodos(data.filter(todo => todo.completed === true));
            setRefreshing(false);
            console.log('refresh State', refreshing);
        }, [refreshing]);

        useEffect(() => {
            refresh();
        }, [onRefresh]);    


    return (
        <Layout className="layout">
           <Content style={{padding: '0 50px'}}>
               <div className="todolist">
                   <Row>
                       <Col span={14} offset={5}>
                           <h1>Family Tasks List</h1>
                           <TodoForm onFormSubmit={handleFormSubmit} />
                           <br/>
                           <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab Todos={Todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab Todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTab Todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                           </Tabs>
                       </Col>
                   </Row>
               </div>
            </Content> 
        </Layout>
    );
}

export default TodoList