import React, {Component} from 'react';
import { Button, Modal, Form , Input, message } from 'antd';
import { register } from '../utils';
import {LockOutlined, UserOutlined} from "@ant-design/icons";

class Register extends Component {
    state = {
        isModalVisible: false
    };

    handleRegisterButtonOnClick = () => {
        this.setState({ isModalVisible: true });
    };

    handleRegisterOnCancel = () => {
        this.setState({ isModalVisible: false });
    };

    handleRegisterOnFinish = (values) => {
        console.log('Values: ', values);
        register(values)
            .then(() => {
                this.setState({ isModalVisible: false });
                message.success(`Registered successfully!`);
            })
            .catch(err => message.error(err.message));
    };

    render = () => {
        const { isModalVisible } = this.state;
        return (
            <div>
                <Button type="primary"
                        shape="round"
                        onClick={this.handleRegisterButtonOnClick}>
                    Register
                </Button>
                <Modal title="Register"
                       footer={null}
                       destroyOnClose={true}
                       visible={isModalVisible}
                       onCancel={this.handleRegisterOnCancel}
                >
                    <Form
                        name="normal_register"
                        onFinish={this.handleRegisterOnFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="user_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="Password"/>
                        </Form.Item>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input placeholder="First Name"/>
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input placeholder="Last Name"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Register;