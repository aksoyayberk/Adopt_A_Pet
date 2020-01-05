import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOutAction} from "../../store/actions/authActions";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {firebaseRef} from "../../config/firebaseConfig";
import { PageHeader, Button, Descriptions } from 'antd';

const NavBar = (props) => {

    const links = props.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />;
    const userTitle = props.user ? `Welcome, ${props.user.firstName}` : "";

    return (
        <div>
            <div style={{color: "white", float: 'left'}}>
                <h2 style={{color: "white"}}>{userTitle}</h2>
            </div>
            {links}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authR.isLoggedIn,
        user: state.authR.user
    }
}

export default connect(mapStateToProps)(NavBar);
