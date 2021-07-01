import React, {Component} from 'react';
import {Button, Modal, Form, Input, message} from "antd";
import {searchGameByName} from "../utils";
import { SearchOutlined } from '@ant-design/icons';

class CustomSearch extends Component {
    state = {
        displayModal: false
    };

    searchOnClick = () => {
        this.setState({displayModal: true});
    };

    handleCancel = () => {
        this.setState({displayModal: false});
    };


    onFinish = (values) => {
        searchGameByName(values.game_name)
            .then(data => {
                this.setState({displayModal: false});
                this.props.onSearchSuccess(data);
                message.success(`Search successfully!`);
            })
            .catch(err => message.error(err.message));
    };

    render() {
        const { displayModal } = this.state;
        return (
            <>
                <Button shape="round"
                        onClick={this.searchOnClick}
                        style={{marginLeft: '20px', marginTop: '20px'}}
                        icon={<SearchOutlined />}
                >
                    Custom Search
                </Button>
                <Modal title="Custom Search"
                       visible={displayModal}
                       footer={null}
                       destroyOnClose={true}
                       onCancel={this.handleCancel}>
                    <Form
                        name="custom_search"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="game_name"
                            rules={[{ required: true, message: 'Please enter a game name!' }]}
                        >
                            <Input placeholder="Game name"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default CustomSearch;