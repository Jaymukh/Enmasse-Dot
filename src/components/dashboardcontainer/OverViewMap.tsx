// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import StatisticsCard from "./StatisticsCard";
import { Legend } from '../ui/legend/Legend';
import StaticMap from "../ui/maps/StaticMap";
import { mapFeatureState } from '../../states';

// Utilities
import { useMapHelpers } from '../../helpers';
import InfoPanel from '../ui/InfoPanel';


const OverViewMap = () => {
    const mapFeatures = useRecoilValue(mapFeatureState);
    const { getCurrencyWithSymbol } = useMapHelpers();
    const [cardData, setCardData] = useState<any>([]);
    useEffect(() => {
        const cifData = mapFeatures?.cifData?.properties;
        if (cifData) {
            setCardData([
                { title: 'Total Population', value: cifData?.totalPopulation },
                { title: 'Total Household', value: cifData?.totalHouseholds },
                { title: 'Number of Entrepreneurial Households (EH)', value: cifData?.enMassesThesis?.numberOfEntrepreneurialHouseholds },
                { title: 'Average Annual EH Transactional Value', value: getCurrencyWithSymbol(cifData?.enMassesThesis?.averageAnnualEHTransactionalValue, cifData?.enMassesThesis?.averageAnnualEHTransactionalValueUOM) },
                { title: 'Total Addressable Market', value: getCurrencyWithSymbol(cifData?.enMassesThesis?.totalAddressableMarket, cifData?.enMassesThesis?.totalAddressableMarketUOM) },
            ])
        }
    }, [mapFeatures?.cifData]);

    return (
        <div className="me-3 h-100">
            <Card size={CardSize.default} variant={CardVariant.contained} classname='p-3 h-100'>
                <div className='d-flex flex-row justify-content-start align-items-center'>
                    <Heading
                        title='Overall Information'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='text-start px-1 my-0'
                    />
                    <InfoPanel fontSize={15} text='Hi ! This is info text.' />
                </div>
                <div className='row d-flex justify-content-between px-1'>
                    <div className="col-xl-7 col-lg-7 col-md-9 d-flex flex-column align-items-center justify-content-center static-map">
                        <StaticMap noMarkers={true} />
                        <Legend classname='mt-2' />
                    </div>
                    <div className='col-xl-5 col-lg-5 col-md-3 d-flex flex-column'>
                        {cardData.map((item: any, index: number) => <StatisticsCard data={item} index={index} />)}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default OverViewMap;