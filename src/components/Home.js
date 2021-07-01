import React from 'react';
import {Tabs, Card, List, Button, Tooltip, message} from "antd";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import {addFavoriteItem, deleteFavoriteItem} from "../utils";

const { TabPane } = Tabs;
const tabKeys = {
    Streams: 'Streams',
    Videos: 'Videos',
    Clips: 'Clips',
}

const processUrl = url => url
    .replace('%{height}', '252')
    .replace('%{width}', '480')
    .replace('{height}', '252')
    .replace('{width}', '480');

const renderCardTitle = (item, favs, onFavorite, loggedIn) => {
    let title = `${item.broadcaster_name} - ${item.title}`;
    const isFav = favs.find((fav) => fav.id === item.id);

    const handleOnClick = () => {
        if (isFav) {
            deleteFavoriteItem(item).then(() => {
                onFavorite();
            }).catch(err => {
                message.error(err.message)
            })
        } else {
            addFavoriteItem(item).then(() => {
                onFavorite();
            }).catch(err => {
                message.error(err.message)
            })
        }
    };

    return (
        <>
            {
                loggedIn &&
                <Tooltip title={isFav ? "Remove from favorite list" : "Add to favorite list"}>
                    <Button shape="circle" icon={isFav ? <StarFilled /> : <StarOutlined />} onClick={handleOnClick} />
                </Tooltip>
            }
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 450, marginTop: '5px'}}>
                <Tooltip title={title}>
                    <span>{title}</span>
                </Tooltip>
            </div>
        </>
    )
};

const renderCardGrid = (data, favs, onFavorite, loggedIn) => {
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Card title={renderCardTitle(item, favs, onFavorite, loggedIn)}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img
                                alt="Placeholder"
                                src={processUrl(item.thumbnail_url)}
                            />
                        </a>
                    </Card>
                </List.Item>
            )}
        />
    );
};

const Home = ({data, favoriteItems, onFavorite, loggedIn}) => {
    return (
        <>
            <Tabs defaultActiveKey={tabKeys.Streams}>
                <TabPane tab={tabKeys.Streams} key={tabKeys.Streams}>
                    {
                        renderCardGrid(data.STREAM, favoriteItems.STREAM, onFavorite, loggedIn)
                    }
                </TabPane>
                <TabPane tab={tabKeys.Videos} key={tabKeys.Videos}>
                    {
                        renderCardGrid(data.VIDEO, favoriteItems.VIDEO, onFavorite, loggedIn)
                    }
                </TabPane>
                <TabPane tab={tabKeys.Clips} key={tabKeys.Clips}>
                    {
                        renderCardGrid(data.CLIP, favoriteItems.CLIP, onFavorite, loggedIn)
                    }
                </TabPane>
            </Tabs>
        </>
    );
};

export default Home;