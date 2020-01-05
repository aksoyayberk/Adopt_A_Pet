import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Descriptions } from 'antd';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import bgImg from "../css/images/pandas2.jpg";

class Profile extends Component {
    render() {
        const {user} = this.props;
        if(user){
            return (        
                <div style={bgStyle}>
                    <h1 style={{fontSize: 40, textDecoration: 'underline'}}>{`${user.firstName}'s Profile`}</h1>
                    <Descriptions title="User Info">
                        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
                        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{user.phoneNum}</Descriptions.Item>
                        <Descriptions.Item label="Location">{user.location}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                    </Descriptions>
                </div>
           )
        }else{
            return(
                <div>
                   {this.props.history.push("/")} 
                </div>
            )
            
        }
    }
}

const bgStyle = {
    padding: 24,
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: '100%',
    backgroundPosition: 'right 0px bottom -225px',
    height: '100%', 
    width: '100%',
    position: 'absolute', 
    backgroundSize: 300,
    backgroundColor: 'rgb(190, 224, 233)'
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authR.isLoggedIn,
        user: state.authR.user
    }
}

export default compose(
    connect(mapStateToProps),
    withRouter
)(Profile);