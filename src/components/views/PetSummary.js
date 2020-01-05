import React from 'react';
import {Card, Avatar} from 'antd';

const PetSummary = (props) => {
    const {pet} = props;
    const petObj = pet.val();
    return (
        <div className="card-content" key={pet.key}>
            <Card size="small" title={petObj.name} style={{ width: 160 }}>
                <Avatar size={64} icon="user" style={{float: 'right'}} />
                <p>- {petObj.type}</p>
                <i>- {petObj.breed}</i>
            </Card>
        </div>
    )
}

export default PetSummary;