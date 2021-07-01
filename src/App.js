import React, {Component} from "react";
import {Col, Row, Layout, Menu} from 'antd';
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Favorite from "./components/Favorite";
import CustomSearch from "./components/CustomSearch";
import Home from "./components/Home";
import { FireOutlined, LikeOutlined } from '@ant-design/icons';
import {getFavoriteItem, getRecommendations, getTopGames, searchGameById} from "./utils";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class App extends Component {
    state = {
        loggedIn: false,
        topGames: [],
        resources: {
            VIDEO: [],
            STREAM: [],
            CLIP: [],
        },
        favoriteItems: {
            VIDEO: [],
            STREAM: [],
            CLIP: [],
        },
    }

    componentDidMount() {
        getTopGames()
            .then(data => this.setState({topGames: data}));
        this.updateRecommendations();
    }

    updateRecommendations = () => {
        getRecommendations()
            .then(data => {
                this.setState({ resources: data})
            });
    };

    handleSigninSuccess = () => {
        this.setState({loggedIn: true});
        getFavoriteItem()
            .then(data => {
                this.setState({favoriteItems: data})
            });
        this.updateRecommendations();
    };

    handleSignoutSuccess = () => {
       this.setState({loggedIn: false});
    };

    handleSearchSuccess = (data) => {
        this.setState({resources: data});
    };

    handleNavClick = e => {
        if (e.key === 'Recommendation') {
            this.updateRecommendations();
        } else {
            searchGameById(e.key)
                .then(data => {
                    this.setState({ resources: data})
                });
        }
    };

    handleOnFavorite = e => {
        getFavoriteItem()
            .then(data => {
                this.setState({favoriteItems: data})
            });
    };

    render = () => {
        const { loggedIn, resources, favoriteItems } = this.state;
        const navTopGames =
            <Menu
                onClick={this.handleNavClick}
                defaultOpenKeys={['Top Games']}
                defaultSelectedKeys={['Recommendation']}
                mode="inline"
                style={{ marginTop: '10px' }}
            >
                <Menu.Item key="Recommendation" icon={<LikeOutlined />}>Recommend for you</Menu.Item>
                <SubMenu key="Top Games" icon={<FireOutlined />} title="Top Games">
                    {
                        this.state.topGames.map(game =>
                            <Menu.Item key={game.id}>
                                <img alt="Placeholder"
                                     src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
                                     style={{ borderRadius: '50%', marginRight: '20px' }} />
                                <span>
                                    {game.name}
                                </span>
                            </Menu.Item>
                        )
                    }
                </SubMenu>
            </Menu>;

        return (
            <Layout>
                <Header className="header" >
                    <Row justify="space-between">
                        <Col>
                            {
                                loggedIn && <Favorite items={favoriteItems}/>
                            }
                        </Col>
                        <Col className="login-header-col" style={{ display: 'flex'}}>
                            {
                                loggedIn ?
                                    <Logout onSignoutSuccess={this.handleSignoutSuccess} />
                                    :
                                    <>
                                        <Login onSigninSuccess={this.handleSigninSuccess} />
                                        <Register />
                                    </>
                            }
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={300} className="site-layout-background">
                        <CustomSearch onSearchSuccess={this.handleSearchSuccess} />
                        {navTopGames}
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                height: 800,
                                overflow: 'auto'
                            }}
                        >
                            <Home data={resources}
                                  favoriteItems={favoriteItems}
                                  onFavorite={this.handleOnFavorite}
                                  loggedIn={loggedIn}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            );
    };
}

export default App;
