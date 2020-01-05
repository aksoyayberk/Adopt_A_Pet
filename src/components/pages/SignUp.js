import React, { Component } from 'react';
import {connect} from "react-redux";
import {signUpAction} from "../../store/actions/authActions";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Form, Input, Select, Button} from 'antd';
import "../css/signup.css";
import {pulse} from "react-animations";
import styled, { keyframes } from "styled-components";

const PulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  animation: infinite 5s ${PulseAnimation};
`;
const { Option } = Select;

class SignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        phoneNum: "",
        location: "",
        email: "",
        password: ""
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    componentDidUpdate(){
        if(this.props.isLoggedIn){
            this.props.history.push("/home")
        }
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator} = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
          })(
            <Select style={{ width: 70 }}>
              <Option value="1">+1</Option>
              <Option value="90">+90</Option>
            </Select>,
          );
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };
        // const tailFormItemLayout = {
        //     wrapperCol: {
        //       xs: {
        //         span: 24,
        //         offset: 0,
        //       },
        //       sm: {
        //         span: 16,
        //         offset: 8,
        //       },
        //     },
        //   };
        return (
             <div className="background-div">
                <div className="signup-div">
                    <PulseDiv>
                        <h1>Let's Register!</h1>
                    </PulseDiv>
                    <Form  onSubmit={this.handleSubmit} className="signup-form">
                        <Form.Item label="First Name">
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }],
                            })(
                                <Input
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Last Name">
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' }],
                            })(
                                <Input
                                    placeholder="Last Name"
                                    onChange={this.handleChange} 
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phoneNum', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(<Input 
                                    addonBefore={prefixSelector} 
                                    style={{ width: '100%' }} 
                                    onChange={this.handleChange} 
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Location"> 
                        {getFieldDecorator('location', {
                            rules: [{ required: true, message: 'Please input your location!' }],
                        })(
                            <Input
                                placeholder="(e.g. Toronto/Canada)"
                                onChange={this.handleChange} 
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                                ],
                            })(<Input onChange={this.handleChange} />)}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                                ],
                            })(<Input.Password onChange={this.handleChange}/>)}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item >
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            Register!
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authR.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (user) => dispatch(signUpAction(user)) 
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    Form.create()
)(SignUp);
