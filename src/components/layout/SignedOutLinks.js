import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOutAction} from "../../store/actions/authActions";
import { Button } from 'antd';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const SignedOutLinks = (props) => {
    return(
        <div style={{float: 'right'}}>
            <Button type="primary" style={{marginRight: '5px'}} onClick={() => props.history.push("/signup")}>Sign Up</Button>
            <Button onClick={() => props.history.push("/")}>Log In</Button>
        </div>
    )
}

export default withRouter(SignedOutLinks);
