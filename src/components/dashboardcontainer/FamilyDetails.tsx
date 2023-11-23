import { FiArrowRight } from 'react-icons/fi';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';
import { ProgressBar } from '../ui/progressbar/ProgressBar';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/main.css';
import { mapFeatureState, storiesState } from '../../states';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useMapHelpers } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import familySkeleton from '../../utils/images/family-skeleton.png';

const FamilyDetails = () => {
    const navigate = useNavigate();
    const mapFeatures = useRecoilValue(mapFeatureState);
    const { getCurrencyWithSymbol } = useMapHelpers();

    const { family, properties } = useRecoilValue(storiesState);
    const [familyDetails, setFamilyDetails] = useState<any>({});

    const handleViewButtonClick = () => {
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${properties?.geo_id}&page-no=1&storiespp=2`,
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
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                </div>
                {(mapFeatures?.cifData?.properties?.geo_name !== 'district') &&
                    <div className='col-5 d-flex align-items-center justify-content-around py-2 coverage-div'>
                        <Heading
                            title='EI Coverage'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='mt-2 w-auto text-end text-nowrap pe-2 '
                        />
                        <AiOutlineInfoCircle fontSize={35} color='#606060' className='me-2' />
                        <ProgressBar coverage={mapFeatures?.cifData?.properties?.EICoverage} />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='w-auto m-0 text-end text-nowrap ps-2'>
                            {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.covered)} out Of {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.total)} Districts
                        </Body>
                    </div>}
            </div>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='mx-0 mt-2 p-0 row'>
                <img className='col-2 pe-0 ps-0 rounded-start' src={familyDetails?.image && familyDetails?.image[0] ? familyDetails?.image[0] : familySkeleton} alt={familyDetails?.familyName} style={{ objectFit: 'cover' }}></img>
                <div className='col-10 white-bg py-4 px-4 rounded-end'>
                    <div className='d-flex flex-row'>
                        <Heading
                            title={familyDetails?.familyName}
                            colour={TypographyColor.dark}
                            type={TypographyType.h4}
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='ms-3'>
                            {familyDetails?.address}
                        </Body>
                    </div>
                    <div className='d-flex flex-row'>
                        <Body
                            type={BodyType.p2}
                            color={BodyColor.primary}
                            classname='text-center'>
                            {getCurrencyWithSymbol(familyDetails?.familyDetails?.householdSpend, familyDetails?.familyDetails?.spendUOM)}
                        </Body>
                        <Body
                            type={BodyType.p4}
                            color={BodyColor.muted}
                            classname='ms-2 me-4 mt-1'>
                            Annual Household Spend
                        </Body>
                    </div>
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='text-start'>
                        {familyDetails?.description}
                    </Body>
                    <div className='d-flex justify-content-start'>
                        <button className='rounded text-start ps-0 border-0 fs-10 white-bg fw-bold green-text' onClick={() => handleViewButtonClick()}>View all families<FiArrowRight className='ms-2' fontSize={18} /></button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FamilyDetails;