import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateAction} from "../../store/actions/petActions";
import { PageHeader, Button, Descriptions, Avatar } from 'antd';
import bgImg from "../css/images/pandas1.jpg";

class Pet extends Component {

    render() {
        const {pets, users} = this.props;
        console.log("this is pets:", pets)
        const pet = pets.length ? (
            pets.filter((pet) => pet.key === this.props.match.params.id)
        ) : (null);
        let result = null;
        if(pet !== null){
            const user = users.filter((user) => user.key === pet[0].val().uid);
            const petObj = pet[0].val();
            const userObj = user[0].val();
            const petObjAge = (new Date().getFullYear()) - petObj.creationYear + petObj.age;
            result = (
                <div style={bgStyle}>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={<h1>{petObj.name}</h1>}
                        style={{backgroundSize: '100%',backgroundColor: 'rgb(190, 224, 233)'}}
                    >
                        <div style={{paddingBottom: 15, marginLeft: '40%'}}>
                            <Avatar shape="square" size={150} icon="user"/>   
                        </div>
                        <div>
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Name">{petObj.name}</Descriptions.Item>
                                <Descriptions.Item label="Type">{petObj.type}</Descriptions.Item>
                                <Descriptions.Item label="Breed">{petObj.breed}</Descriptions.Item>
                                <Descriptions.Item label="Age">{petObjAge}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{petObj.gender}</Descriptions.Item>
                                <Descriptions.Item label="About">{petObj.info}</Descriptions.Item>
                            </Descriptions>
                            <h3 style={{marginTop: 20, textDecoration: 'underline'}}>Owner's Info</h3>
                            <Descriptions size="small" column={4}>
                                <Descriptions.Item label="Name">{userObj.firstName + " " +  userObj.lastName}</Descriptions.Item>
                                <Descriptions.Item label="Email">{userObj.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{userObj.phoneNum}</Descriptions.Item>
                                <Descriptions.Item label="Location">{userObj.location}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </PageHeader>
                </div>
            )
        } else {
            result = (
                <div>
                    <p>an error occured</p>
                </div>
            )
        }
        return (
            <div>
                {result}
            </div>
        )
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
    return{
        pets: state.petR.pets,
        users: state.petR.users
    }
}

export default connect(mapStateToProps)(Pet);
