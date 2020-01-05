import React from 'react';
import PetSummary from "./PetSummary";
import {Link} from "react-router-dom";
import {Icon} from 'antd';

const PetList = (props) => {
    const {petList} = props;
    const list = petList.length ? (
        petList.map(pet => {
            return(
                <div className="card-content" key={pet.key} style={{margin: 24, display: 'inline-block'}}>
                    <Link to={"/pet/" + pet.key}>
                        <PetSummary pet={pet}/>
                    </Link>
                </div>
            )
        })
    ) : (
        <div style={{position: 'absolute !important', margin:'auto'}}>
            Loading<Icon type="loading" />
        </div>
        );


    return (
        <div className="container">
            {list}
        </div>
    )
}

export default PetList;