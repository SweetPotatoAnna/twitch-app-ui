import React, {Component} from 'react';
import { Button, Modal, Form , Input, message } from 'antd';
import { login } from '../utils';
import {LockOutlined, UserOutlined} from "@ant-design/icons";

class Login extends Component {
    state = {
        isModalVisible: false
    };

    handleLoginButtonOnClick = () => {
        this.setState({ isModalVisible: true });
    };

    handleLoginOnCancel = () => {
        this.setState({ isModalVisible: false });
    };

    handleLoginOnFinish = (values) => {
        console.log('Values: ', values);
        login(values)
            .then(data => {
                this.setState({ isModalVisible: false });
                message.success(`Welcome back, ${data.name}!`);
                this.props.onSigninSuccess();
            })
            .catch(err => message.error(err.message));
    };

    render = () => {
        const { isModalVisible } = this.state;
        return (
            <div>
                <Button type="primary"
                        shape="round"
                        onClick={this.handleLoginButtonOnClick}>
                    Login
                </Button>
                <Modal title="Log in"
                       footer={null}
                       destroyOnClose={true}
                       visible={isModalVisible}
                       onCancel={this.handleLoginOnCancel}
                >
                    <Form
                        name="normal_login"
                        onFinish={this.handleLoginOnFinish}
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    };
}

export default Login;