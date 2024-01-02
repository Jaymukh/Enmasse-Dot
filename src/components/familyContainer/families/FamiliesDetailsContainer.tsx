/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import Select, { SelectSize } from '../../ui/select/Select';
import FamiliesSorting from './FamiliesSorting';
import { storiesState } from "../../../states";

// Utilities
import { storiesSelectOptions } from '../../../utils/constants/Constants';
import familySkeleton from '../../../utils/images/family-skeleton.png';
import { RouteConstants } from '../../../constants';
import { useStoriesService } from '../../../services';
import { useMapHelpers } from '../../../helpers';


const FamiliesDetailsContainer = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const [searchParams, setSearchParams] = useSearchParams();
    const [stories] = useRecoilState(storiesState);
    const { getCurrencyWithSymbol, getNumberWithZero, getSelectedObject, getCoreSolutions } = useMapHelpers();
    const [paginationData, setPaginationData] = useState<any>(getSelectedObject());
    const [iterator, setIterator] = useState(0);
    const [totalStoryInfo, setTotalStoryInfo] = useState<{ totalStories: number, totalPages: number }>({ totalStories: 0, totalPages: 0 });
    const [loaded, setLoaded] = useState(false);
    
    const handleImageLoad = () => {
        // setLoaded(true);
    };

    const handleChangeData = (event: any) => {
        const value = Number(event.target.value);
        setPaginationData((prevPaginationData: any) => ({
            ...prevPaginationData,
            storiespp: value,
            page_no: 1
        }));
        setIterator(0);
    };

    const handleFamilyVisible = (data: any, index: number) => {
        searchParams.set('story_id', (index + 1).toString());
        setSearchParams(searchParams);
        navigate({
            pathname: RouteConstants.story_details,
            search: `?${searchParams.toString()}`,
        });
    };

    const handleNextClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no + 1
        }));
        setIterator(iterator + 1);

    };
    const handlePreviousClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no - 1
        }));
        setIterator(iterator - 1);
    };

    const handlePaginationData = (data: any) => {
        let newPaginationData = { ...paginationData };
        delete newPaginationData['reverse'];
        data.forEach((item: any) => newPaginationData = { ...newPaginationData, ...item });
        setPaginationData(newPaginationData);
    }

    useEffect(() => {
        setTotalStoryInfo({
            totalPages: Math.ceil(totalStoryInfo.totalStories / paginationData.storiespp),
            totalStories: stories.totalStories
        });
    }, [stories.totalStories, paginationData, totalStoryInfo.totalStories])

    useEffect(() => {
        if (paginationData) {
            storiesService.getAllStories(paginationData);
            const currentParams = new URLSearchParams();
            for (const key in paginationData) {
                if (paginationData[key]) {
                    currentParams.set(key, paginationData[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [paginationData])

    return (
        <div className='col-lg-9 col-md-8 col-sm-12 ps-4 mb-5 py-0 h-100'>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Heading
                    title={`Families ${stories?.properties?.name ? `in ${stories?.properties?.name}` : ''}`}
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='text-start mt-4 ms-2'
                />
                <FamiliesSorting handlePaginationData={handlePaginationData} />
            </div>
            <div className='w-100 h-100 mb-5 pb-5 w-100 d-flex flex-column justify-content-between no-scrollbar' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                <div className='row m-0 p-0 w-100' style={{ marginBottom: '5rem' }}>
                    {stories?.family?.map((data, index) => (
                        <div className='col-lg-4 col-md-6 col-sm-12 px-0'>
                            <Card size={CardSize.medium} variant={CardVariant.contained} classname='m-2 mb-4 p-0 cursor-pointer' onClick={() => handleFamilyVisible(data, index)}>
                            {/* {!loaded && <div className="image-placeholder w-100 h-100 position-absolute"></div>} */}
                                <img className="rounded-top story-list-img" src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} alt={data?.familyName} onLoad={handleImageLoad} />
                                <div className="text-start p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <Heading
                                            title={data?.familyName}
                                            type={TypographyType.h4}
                                            colour={TypographyColor.dark}
                                            classname='text-start'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.primary}
                                            classname='mx-0 mb-1 bg-green-1 px-2 py-1 green-card-sm'>
                                            {getNumberWithZero(data?.familyDetails.familyMembers)} members
                                        </Body>
                                    </div>
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='text-left mb-2'>
                                        {data?.district}, {data?.state}, {data?.country}
                                    </Body>
                                    {getCoreSolutions(data?.familyDetails)?.name && 
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='d-flex flex-row align-items-center mx-0'>
                                            <Heading
                                                title={getCoreSolutions(data.familyDetails)?.value}
                                                type={TypographyType.h5}
                                                colour={TypographyColor.primary}
                                                classname='me-1 my-0'
                                            />
                                            Annual Household Spend on {getCoreSolutions(data.familyDetails)?.name}
                                        </Body>
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="w-100 bg-white m-0 mb-5 d-flex flex-row justify-content-between rounded p-2 ms-2">
                    <div className='w-auto d-flex flex-row justify-content-start align-items-center'>
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='m-2'>
                            Stories per page
                        </Body>
                        <Select
                            options={storiesSelectOptions}
                            onChange={(e) => handleChangeData(e)}
                            value={paginationData.storiespp}
                            labelKey='key'
                            valueKey='value'
                            size={SelectSize.small}
                            name='role'
                            classname='width-5 ps-2'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='my-2 ms-2'>
                            {(stories?.totalStories ) ? (iterator * paginationData.storiespp + 1) : 0} - {((iterator * paginationData.storiespp + paginationData.storiespp) < (stories?.totalStories)) ? (iterator * paginationData.storiespp + paginationData.storiespp) : (stories?.totalStories ? stories?.totalStories : 0 )} of {stories?.totalStories ? stories?.totalStories : 0} items
                        </Body>
                    </div>
                    <div className='w-auto d-flex flex-row justify-content-around align-items-center'>
                        <Button
                            theme={paginationData.page_no === 1 ? ButtonTheme.muted : ButtonTheme.primary}
                            // theme={paginationData.page_no === 0 ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === 1}
                            onClick={() => handlePreviousClick()}
                            classname='m-0 h-auto'
                        >
                            <BsArrowLeft className='me-2 mb-1' fontSize={22} />
                            Previous
                        </Button>
                        <div className='d-flex flex-row justify-content-around align-items-center mx-2 h-auto fs-12'>
                            <Body
                                color={BodyColor.dark}
                                type={BodyType.p3}
                                classname='border rounded mx-1 px-2 py-1'
                            >
                                {paginationData?.page_no ? paginationData?.page_no : 0}
                            </Body>
                            of {totalStoryInfo.totalPages ? totalStoryInfo?.totalPages : 0}
                        </div>
                        <Button
                            theme={paginationData.page_no === totalStoryInfo.totalPages ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === totalStoryInfo.totalPages}
                            onClick={() => handleNextClick()}
                            classname=' m-0'
                        >
                            Next
                            <BsArrowRight className='ms-2 mb-1' fontSize={22} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FamiliesDetailsContainer;
