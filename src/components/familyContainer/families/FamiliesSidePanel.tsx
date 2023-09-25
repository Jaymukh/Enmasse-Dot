import React from 'react';
import '../../../App.css';
import StaticMap from '../../StaticMap';

const FamiliesSidePanel: React.FC = () => {
    return (
        <div className='col-3 d-flex flex-column align-items-start white-bg mt-4 fam-side-map-div ms-5 me-3' >
            <h6 className='fs-14 pt-4 ps-3'>India</h6>
            <div className='map-container-sm d-flex mx-auto justify-content-center'>
                <StaticMap />
            </div>
        </div>
    );
}

export default FamiliesSidePanel;
