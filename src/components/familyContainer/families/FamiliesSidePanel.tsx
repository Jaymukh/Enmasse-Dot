import React from 'react';
import '../../../styles/main.css';
import StaticMap from '../../StaticMap';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { storiesState } from '../../../states';
import { useRecoilValue } from 'recoil';
import { Legend } from '../../ui/legend/Legend';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';

const FamiliesSidePanel = () => {
    const stories = useRecoilValue(storiesState);
    return (
        <div className='col-3 d-flex flex-column my-4 px-3 h-auto'>
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
