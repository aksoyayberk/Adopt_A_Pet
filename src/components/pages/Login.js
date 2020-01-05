import React, { Component } from 'react';
import {connect} from "react-redux";
import {signInAction} from "../../store/actions/authActions";
import {withRouter, NavLink} from "react-router-dom";
import {compose} from "redux";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "../css/login.css";
import bgImgSrc1 from "../css/images/pandas1.jpg";
import bgImgSrc2 from "../css/images/pandas2.jpg";
import bgImgSrc3 from "../css/images/pandas3.jpg";
import bgImgSrc4 from "../css/images/pandas4.jpg";
import bgImgSrcDefault from "../css/images/loginBackground.jpg";

import {fadeIn} from "react-animations";
import styled, { keyframes } from "styled-components";

const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation: 2s ${FadeInAnimation};
`;

class Login extends Component {

    state = {
        username: "",
        password: "",
        background: [bgImgSrc1, bgImgSrc2, bgImgSrc3, bgImgSrc4],
        bgImg: bgImgSrc1,
        bgImgCount: 0,
        loading: false,
    }

    changeBackground = () => {
        this.backgroundTimer = setInterval(() => {
            if(this.state.bgImgCount === 4){
                this.setState({
                    bgImgCount: 0
                });
            }
            this.setState({
                bgImgCount: this.state.bgImgCount + 1,
                bgImg: this.state.background[this.state.bgImgCount]
            });
        }, 1000);
    }

    componentDidMount(){
        this.changeBackground();
    }

    componentWillUnmount(){
        clearInterval(this.backgroundTimer);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // let token = new Token(this.state.username, false);
        // this.setState({
        //     token
        // }, () => this.checkCredentials())
        this.props.signIn(this.state);
    }

    enterLoading = () => {
        this.setState({ loading: true });
    };
    
    exitLoading = () => {
        this.setState({loading: false});
    }

    // //Check credentials on server side and redirect if flag returns true (send token as json)
    // checkCredentials = () => {
    //     let token = this.state.token;
    //     token.setFlag(true);
    //     this.setState({
    //         token
    //     }, () => console.log(this.state.token))
    // }

    componentDidUpdate(){
        if(this.props.isLoggedIn){
            this.props.history.push("/home")
        }
        if(this.props.loginErr && this.state.loading){
            this.exitLoading();
        }
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <div className="background-div">
                <FadeInDiv>
                    <div className="login-div" style={{backgroundImage: `url(${this.state.bgImg})`}}>
                        <h1>Adopt A Pet</h1>
                        <h4>Please Log In</h4>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange} 
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} 
                                loading={this.state.loading} onClick={this.enterLoading}
                            >
                                Log In
                            </Button>
                            Or <NavLink to="/signup">Sign Up</NavLink>
                            </Form.Item>
                        </Form>
                    </div>
                </FadeInDiv>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authR.isLoggedIn,
        loginErr: state.authR.loginErr
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (credentials) => dispatch(signInAction(credentials))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    Form.create()
) (Login);