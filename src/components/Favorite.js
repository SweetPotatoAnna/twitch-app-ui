import React, {Component} from 'react';
import {Button, Drawer, Menu} from "antd";

const { SubMenu } = Menu;
const tabKeys = {
    Streams: 'Streams',
    Videos: 'Videos',
    Clips: 'Clips',
}

class Favorite extends Component {
    state = {
        displayDrawer: false
    }

    onFavoriteClick = () => {
        this.setState({displayDrawer: true})
    };

    onDrawerClose = () => {
        this.setState({displayDrawer: false})
    };

    render() {
        const { displayDrawer } = this.state;
        const { items } = this.props;
        return (
            <div>
                <Button type="primary"
                        shape="round"
                        onClick={this.onFavoriteClick}>
                    Favorite
                </Button>
                <Drawer
                    title="My Favorite"
                    placement="right"
                    width={720}
                    onClose={this.onDrawerClose}
                    visible={displayDrawer}
                >
                    <Menu
                        mode="inline"
                        defaultOpenKeys={[tabKeys.Streams]}
                        style={{ height: '100%', borderRight: 0 }}
                        selectable={false}
                    >
                        <SubMenu key={tabKeys.Streams} title={tabKeys.Streams}>
                            {
                                items.STREAM.map(item =>
                                    <Menu.Item key={item.id}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {`${item.broadcaster_name} - ${item.title}`}
                                        </a>
                                    </Menu.Item>
                                )
                            }
                        </SubMenu>
                        <SubMenu key={tabKeys.Videos} title={tabKeys.Videos}>
                            {
                                items.VIDEO.map(item =>
                                    <Menu.Item key={item.id}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {`${item.broadcaster_name} - ${item.title}`}
                                        </a>
                                    </Menu.Item>
                                )
                            }
                        </SubMenu>
                        <SubMenu key={tabKeys.Clips} title={tabKeys.Clips}>
                            {
                                items.CLIP.map(item =>
                                    <Menu.Item key={item.id}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {`${item.broadcaster_name} - ${item.title}`}
                                        </a>
                                    </Menu.Item>
                                )
                            }
                        </SubMenu>
                    </Menu>
                </Drawer>
            </div>
        );
    }
}

export default Favorite;