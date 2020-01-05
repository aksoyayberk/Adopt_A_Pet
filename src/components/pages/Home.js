import React, { Component } from 'react';
import PetList from "../views/PetList";
import {connect} from "react-redux";
import {fetchPetsAction, updateStateAction} from "../../store/actions/petActions";
import {firebaseRef} from "../../config/firebaseConfig";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { Layout, Button, Popover} from 'antd';
import bgImg from "../css/images/loginBackground.jpg";

const { Content } = Layout;
const buttonContent = (
    <div>
      <p>Register a pet to be adopted by other animal lovers!</p>
    </div>
  );

class Home extends Component {

    componentDidMount() {
        this.props.updateState();
    }

    render() {
        const {pets, user} = this.props;
        if(user){
            return (
                <div className="container" style={bgStyle}>
                    <Popover content={buttonContent} title="Let's Help A Little Friend!">
                        <Button style={{float: 'left', margin: 5, top: 70, left: 12}} type="primary" shape="circle" onClick={() => this.props.history.push("/registerpet")}>+</Button>
                    </Popover>
                    <div style={{marginLeft: 50}}>
                        <PetList petList={pets}/>
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

const bgStyle = {
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
        pets: state.petR.pets,
        user: state.authR.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchPets: () => dispatch(fetchPetsAction()),
        updateState: () => dispatch(updateStateAction())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Home);