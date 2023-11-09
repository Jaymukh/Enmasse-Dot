import { FiArrowRight } from 'react-icons/fi';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { ProgressBar } from '../ui/progressbar/ProgressBar';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/main.css';
import { mapFeatureState, storiesState } from '../../states';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { getCurrencyWithSymbol } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';

const FamilyDetails = () => {
    const navigate = useNavigate();
    const mapFeatures = useRecoilValue(mapFeatureState);
    const { family, properties } = useRecoilValue(storiesState);
    const [familyDetails, setFamilyDetails] = useState<any>({});

    const handleViewButtonClick = () => {
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo-code=${properties?.geo_id}&page-no=1&storiespp=2`,
        });
    }

    useEffect(() => {
        if (family?.length > 0) {
            setFamilyDetails(family[0]);
        }
    }, [family])
    return (
        <div className='mx-0'>
            <div className='row d-flex justify-content-between align-items-center py-2 m-0'>
                <div className='col-4 p-0'>
                    <Heading
                        title={properties?.name}
                        type={TypographyType.h3}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                </div>
                {mapFeatures?.cifData?.properties?.EICoverage &&
                    <div className='col-5 d-flex align-items-center justify-content-around py-2 coverage-div'>
                        <h6 className='w-auto fs-14 text-end m-0 text-nowrap pe-2'>EI Coverage</h6>
                        <AiOutlineInfoCircle fontSize={35} color='#606060' className='me-2' />
                        <ProgressBar coverage={mapFeatures?.cifData?.properties?.EICoverage} />
                        <p className='w-auto fs-12 m-0 text-end text-nowrap ps-2'>{getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.covered)} out Of {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.total)} Districts</p>
                    </div>}
            </div>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='mx-0 mt-2 p-0 row'>
                <img className='col-2 pe-0 ps-0 rounded-start' src={familyDetails?.image} alt={familyDetails?.familyName}></img>
                <div className='col-10 white-bg py-4 px-4 rounded-end'>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-16'>{familyDetails?.familyName}</h6>
                        <p className='ms-3 fs-12'>{familyDetails?.address}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-14 green-text'>{getCurrencyWithSymbol(familyDetails?.familyDetails?.householdSpend, familyDetails?.familyDetails?.spendUOM)}</h6>
                        <p className='ms-2 me-4 grey-para fs-10'>Annual Household Spend</p>
                    </div>
                    <p className='text-start fs-12'>{familyDetails?.description}</p>
                    <div className='d-flex justify-content-start'>
                        <button className='rounded text-start ps-0 border-0 fs-10 white-bg fw-bold green-text' onClick={() => handleViewButtonClick()}>View all families<FiArrowRight className='ms-2' fontSize={18} /></button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FamilyDetails;