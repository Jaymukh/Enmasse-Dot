import React from 'react';
import '../../../App.css';
import StaticMap from '../../StaticMap';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { storiesState } from '../../../states';
import { useRecoilValue } from 'recoil';

const FamiliesSidePanel = () => {
    const stories = useRecoilValue(storiesState);
    return (
        <div className='col-3 d-flex flex-column my-4 px-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='py-3 mt-1 mx-0 ms-3 white-bg'>
                <h6 className='fs-14 text-start m-0'>{stories?.properties?.region}</h6>
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap />
                </div>
            </Card>
        </div>
    );
}

export default FamiliesSidePanel;
