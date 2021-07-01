import React from 'react';
import {Button, message} from 'antd';
import {logout} from "../utils";

const Logout = ({onSignoutSuccess}) => {
    const handleLogoutOnClick = () => {
        logout()
            .then(() => {
                onSignoutSuccess();
                message.success(`Log out successfully!`);
            })
            .catch(err => message.error(err.message));
    };


    return (
        <div>
            <Button type="primary"
                    shape="round"
                    onClick={handleLogoutOnClick}>
                Logout
            </Button>
        </div>
    );
}

export default Logout;