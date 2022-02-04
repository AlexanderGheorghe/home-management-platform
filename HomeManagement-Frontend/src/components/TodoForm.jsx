import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

export const TodoForm = ({onFormSubmit, isEdit = false, todo}) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        if (isEdit) {
            let request = {
                id: todo.id,
                title: form.getFieldValue('title'),
                completed: todo.completed,
            };
            onFormSubmit(request);
        } else {
            onFormSubmit({
                title: form.getFieldValue('title'),
                completed: false
            });
            console.log(form.getFieldValue('title'));
        }
        form.resetFields();
    }

    return(
        <Form form={form} onFinish={onFinish} layout="horizontal" className="todo-form">
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item name={'title'} rules={[{required: true, message: 'This is a required field'}]}>
                        <Input placeholder="What needs to be done"></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}></Col>
                {isEdit 
                ? <Button type="primary" htmlType="submit" block>Edit Todo</Button>
                : <Button type="primary" htmlType="submit" block><PlusCircleFilled />Add Todo</Button>
                }
                
            </Row>
        </Form>
    )
}

export default TodoForm;