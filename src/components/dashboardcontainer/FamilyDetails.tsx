// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// CSS
import '../../styles/main.css';

// Components
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';
import { ProgressBar } from '../ui/progressbar/ProgressBar';
import { mapFeatureState, storiesState } from '../../states';

// Utilities
import { useMapHelpers } from '../../helpers';
import { RouteConstants } from '../../constants';
import familySkeleton from '../../utils/images/family-skeleton.png';
import InfoPanel from '../ui/InfoPanel';

const FamilyDetails = () => {
    const navigate = useNavigate();
    const mapFeatures = useRecoilValue(mapFeatureState);
    const { getCurrencyWithSymbol, getCoreSolutions } = useMapHelpers();

    const { family, properties } = useRecoilValue(storiesState);
    const [familyDetails, setFamilyDetails] = useState<any>({});

    const handleViewButtonClick = () => {
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${properties?.geo_id}&page_no=1&storiespp=2`,
        });
    }

    useEffect(() => {
        if (family?.length > 0) {
            setFamilyDetails(family[0]);
        }
    }, [family]);

    return (
        <div className='mx-0'>
            <div className='row d-flex justify-content-between align-items-center py-2 m-0'>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 p-0'>
                    <Heading
                        title={properties?.name}
                        type={TypographyType.h2}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                </div>
                {(mapFeatures?.cifData?.properties?.geo_name !== 'district') &&
                    <div className='co-xll-5 col-lg-5 col-md-6 col-sm-12 d-flex align-items-center justify-content-around py-2 coverage-div'>
                        <Heading
                            title='EI Coverage'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='mt-2 w-auto text-end text-nowrap pe-2 '
                        />
                        <InfoPanel fontSize={20} text={mapFeatures?.cifData?.properties?.EICoverage?.infobutton} />
                        <ProgressBar coverage={mapFeatures?.cifData?.properties?.EICoverage} />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='w-auto m-0 text-end text-nowrap ps-2'>
                            {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.covered)} out Of {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.total)} Districts
                        </Body>
                    </div>}
            </div>
            {family?.length > 0
                && <Card size={CardSize.default} variant={CardVariant.contained} classname='mx-0 mt-2 p-0 row'>
                    <img className='col-xl-2 col-lg-2 col-md-3 col-sm-9 pe-0 ps-0 rounded-start' src={familyDetails?.image && familyDetails?.image[0] ? familyDetails?.image[0] : familySkeleton} alt={familyDetails?.familyName} style={{ objectFit: 'cover' }}></img>
                    <div className='col-xl-10 col-xl-10 col-md-9 col-sm-9 white-bg py-4 px-4 rounded-end'>
                        <div className='d-flex flex-row mb-2'>
                            <Heading
                                title={familyDetails?.familyName}
                                colour={TypographyColor.dark}
                                type={TypographyType.h4}
                                classname='m-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.secondary}
                                classname='ms-3'>
                                {familyDetails?.address}
                            </Body>
                        </div>
                        {getCoreSolutions(familyDetails?.familyDetails)?.name &&
                            <div className='d-flex flex-row mb-2'>
                                <Body
                                    type={BodyType.p2}
                                    color={BodyColor.primary}
                                    classname='text-center'>
                                    {getCoreSolutions(familyDetails?.familyDetails)?.value}
                                </Body>
                                <Body
                                    type={BodyType.p4}
                                    color={BodyColor.secondary}
                                    classname='ms-2 me-4 mt-1'>
                                    Annual Household Spend on {getCoreSolutions(familyDetails?.familyDetails)?.name}
                                </Body>
                            </div>
                        }
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='text-start'>
                            {familyDetails?.description}
                        </Body>
                        <div className='d-flex justify-content-start mt-2'>
                            <button className='rounded text-start ps-0 border-0 fs-10 white-bg fw-bold color-green' onClick={() => handleViewButtonClick()}>View all families<FiArrowRight className='ms-2' fontSize={18} /></button>
                        </div>
                    </div>
                </Card>}
        </div>
    )
}

export default FamilyDetails;