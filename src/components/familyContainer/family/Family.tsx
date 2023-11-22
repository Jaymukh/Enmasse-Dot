/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FamilySidePanel from './FamilySidePanel';
import FamilyDetailsContainer from './FamilyDetailsContainer';
import DistrictSidebar from './DistrictSidebar';
import '../../../App.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStoriesService } from '../../../services';
import { useRecoilValue } from 'recoil';
import { storiesState } from '../../../states';
import { RouteConstants } from '../../../constants';
import { useMapHelpers } from '../../../helpers';

interface FamilyProps {
    selectedFamily: number;
    handleCarouselSlide: (selectedFamily: number) => void;
    selectedData: any;
    handleBackClick: () => void;
    iterator: number;
}

const Family = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const stories = useRecoilValue(storiesState);
    const [searchParams, setSearchParams] = useSearchParams();
    const { getSelectedObject } = useMapHelpers();
    const [pageInfo, setPageInfo] = useState<any>(getSelectedObject());
    const [selectedStory, setSelectedStory] = useState<{ index: number, story: any }>({ index: Number(searchParams.get('story_id')) - 1, story: {} });
    
    const handleCarouselSlide = (index: number) => {
        setPageInfo({
            ...pageInfo,
            story_id: (index + 1)
        })
        setSelectedStory({
            index: index,
            story: stories?.family[index]
        });
    };

    const handleBackClick = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        navigate({
            pathname: RouteConstants.stories,
            search: `?${currentParams.toString()}`,
        });
    }

    useEffect(() => {
        const paginationData = {
            geo_code: Number(searchParams.get('geo_code')),
            page_no: Number(searchParams.get('page_no')),
            storiespp: Number(searchParams.get('storiespp')),
        }
        storiesService.getAllStories(paginationData);
    }, []);

    useEffect(() => {
        if (pageInfo.story_id && stories?.family && stories?.family.length > 0) {
            setSelectedStory((prevData: any) => ({
                ...prevData,
                story: stories?.family[pageInfo.story_id - 1]
            }));
        }
    }, [pageInfo.story_id, stories?.family]);

    useEffect(() => {
        if (pageInfo) {
            const currentParams = new URLSearchParams();
            for (const key in pageInfo) {
                if (pageInfo[key]) {
                    currentParams.set(key, pageInfo[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [pageInfo]);

    return (
        <div style={{ height: '86.25vh' }} className='row w-100 m-0'>
            <FamilySidePanel selectedStory={selectedStory} handleCarouselSlide={handleCarouselSlide} iterator={pageInfo.story_id} handleBackClick={handleBackClick} />
            <FamilyDetailsContainer selectedData={selectedStory?.story} />
            <div className='col-3 p-0 bg-white h-100'>
                <DistrictSidebar />
            </div>
        </div>
    );
}

export default Family;
