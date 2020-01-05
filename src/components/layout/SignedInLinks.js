import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {signOutAction} from "../../store/actions/authActions";
import {compose} from "redux";
import { Layout, Menu, Button } from 'antd';

const SignedInLinks = (props) => {
    return(
        <div style={{float: 'right'}}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{ lineHeight: '64px' }}
                onClick={(key) => handleClick(props, key)}
            >
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="profile">Profile</Menu.Item>
                <Button style={{marginLeft: '5px'}} onClick={() => doSignOut(props)}>Log Out</Button>
            </Menu>
        </div>
    )
}

const handleClick = (props, key) => {
    if(key.key)
        props.history.push("/" + key.key);
}

const doSignOut = (props) => {  
    props.signOut();
    props.history.push("/");
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOutAction())
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withRouter
)(SignedInLinks)
