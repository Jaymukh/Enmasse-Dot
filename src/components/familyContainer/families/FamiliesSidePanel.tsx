// External libraries
import React from 'react';
import { useRecoilValue } from 'recoil';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Legend } from '../../ui/legend/Legend';
import StaticMap from '../../ui/maps/StaticMap';
import { storiesState } from '../../../states';


const FamiliesSidePanel = () => {
    const stories = useRecoilValue(storiesState);
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 d-flex flex-column my-4 px-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='py-3 mt-1 mx-0 ms-3 white-bg'>
                <Heading
                    title={stories?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h5}
                    classname='m-0 text-start'
                />
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap />
                </div>
                <Legend />
            </Card>
        </div>
    );
}

export default FamiliesSidePanel;
