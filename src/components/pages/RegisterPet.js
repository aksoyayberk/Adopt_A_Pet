import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actions from "../../store/actions/petActions";
import {firebaseRef} from "../../config/firebaseConfig";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Form, Input, Button, Result} from 'antd';
import styled, { keyframes } from "styled-components";
import {pulse} from "react-animations";
import "../css/registerPet.css";

const PulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  animation: infinite 5s ${PulseAnimation};
`;

class RegisterPet extends Component {

    state = {
        pet: {
            name: "",
            type: "",
            breed: "",
            age: "",
            gender: "",
            info: "",
            creationYear: ""
        },
        regSuccFlag: false
    }

    // componentDidMount() {
    //     this.props.fetchPets();
    // }

    handleChange = (e) => {
        this.setState({
            pet: {
                ...this.state.pet,
                [e.target.id]: e.target.value,
                creationYear: new Date().getFullYear()
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPet(this.state.pet);
        this.setState({
            pet: {
                name: "",
                type: "",
                breed: "",
                age: "",
                gender: "",
                info: "",
                creationYear: ""
            }
        })
    }

    componentDidUpdate() {
        if(this.props.isRegisterSucc && !this.state.regSuccFlag){
            this.setState({
                regSuccFlag: true
            })
            this.props.setRegSucc(false);
        }
    }

    goBackHome = () =>{
        if(!this.props.isRegisterSucc && this.state.regSuccFlag){
            this.setState({
                regSuccFlag: false
            })
            this.props.history.push("/home");
        }
    }

    render() {
        const {user} = this.props;
        const { getFieldDecorator} = this.props.form;
        if(user){
            if(this.state.regSuccFlag){
                return(
                    <Result
                        status="success"
                        title="Successfully Registered!"
                        extra={setTimeout(() => this.goBackHome(), 2000)}
                    />
                )
            }
            return (    
                <div className="registerPetBackground-div">     
                    <div className="registerPet-div">  
                        <PulseDiv>
                            <h1>Let's Help A Little Friend!</h1>
                        </PulseDiv>                 
                        <Form  onSubmit={this.handleSubmit} className="registerPet-form">
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input a name!' }],
                                })(
                                    <Input
                                        placeholder="Name"
                                        onChange={this.handleChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Type">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: 'Please input the type!' }],
                                })(
                                    <Input
                                        placeholder="Type"
                                        onChange={this.handleChange} 
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Breed">
                                {getFieldDecorator('breed', {
                                    rules: [{ required: true, message: 'Please input the breed!' }],
                                })(<Input 
                                        placeholder="Breed"
                                        onChange={this.handleChange} 
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Age"> 
                                {getFieldDecorator('age', {
                                    rules: [{ required: true, message: 'Please input the age!' }],
                                })(
                                    <Input
                                        placeholder="Age"
                                        onChange={this.handleChange} 
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Gender">
                                {getFieldDecorator('gender', {
                                    rules: [{ required: true, message: 'Please input the age!' }],
                                })(
                                    <Input 
                                        placeholder="Gender"
                                        onChange={this.handleChange} 
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="About"> 
                                {getFieldDecorator('info', {
                                    rules: [{ required: true, message: 'Please input some info!' }],
                                })(
                                    <Input
                                        placeholder="About"
                                        onChange={this.handleChange} 
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authR.isLoggedIn,
        user: state.authR.user,
        isRegisterSucc: state.petR.isRegisterSucc
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addPet: (pet) => dispatch(actions.addPetAction(pet)),
        fetchPets: () => dispatch(actions.fetchPetsAction()),
        setRegSucc: (flag) => dispatch(actions.setRegSucc(flag))
    }
}

export default compose(
    connect(mapStateToProps,  mapDispatchToProps),
    withRouter,
    Form.create()
)(RegisterPet);
