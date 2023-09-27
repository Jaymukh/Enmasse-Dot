import React from 'react';
import '../../../App.css';
import StaticMap from '../../StaticMap';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';

const FamiliesSidePanel: React.FC = () => {
    return (
        // <div className='col-3 d-flex flex-column align-items-start white-bg mt-4 fam-side-map-div ms-5 me-3' >
        <div className='col-3 d-flex flex-column mx-auto align-items-center my-3 h-auto' >
            <Card size={CardSize.medium} variant={CardVariant.contained} classname=' mt-1 white-bg'>
                <h6 className='fs-14 pt-4 text-start'>India</h6>
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap />
                </div>
            </Card>
        </div>
    );
}

export default FamiliesSidePanel;
