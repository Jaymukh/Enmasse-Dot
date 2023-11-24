import '../../styles/main.css';
import StatisticsCard from "./StatisticsCard";
import StaticMap from "../StaticMap";
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { useEffect, useState } from 'react';
import { mapFeatureState } from '../../states';
import { useRecoilValue } from 'recoil';
import { useMapHelpers } from '../../helpers';
import { Legend } from '../ui/legend/Legend';

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
                {/* <h5 className="pb-2 text-start fs-14">Overall Information</h5> */}
                <Heading
                    title='Overall Information'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='pb-2 text-start ps-1'
                />
                <div className='row d-flex justify-content-between px-1'>
                    <div className="col-7 d-flex flex-column align-items-center justify-content-center static-map">
                        <StaticMap noMarkers={true} />
                        <Legend classname='mt-2' />
                    </div>
                    <div className='col-5 d-flex flex-column'>
                        {cardData.map((item: any, index: number) => <StatisticsCard data={item} index={index} />)}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default OverViewMap;