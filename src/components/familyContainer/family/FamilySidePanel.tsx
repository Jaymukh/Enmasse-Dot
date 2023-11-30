import React from 'react';
import '../../../styles/main.css';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineArrowForward } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import StaticMap from '../../StaticMap';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { storiesState } from "../../../states";
import { useRecoilState } from "recoil";
import familySkeleton from '../../../utils/images/family-skeleton.png';
import { Legend } from '../../ui/legend/Legend';

interface FamilySidePanelProps {
    selectedStory: { index: number, story: any };
    handleCarouselSlide: (index: number) => void;
    iterator: number;
    handleBackClick: () => void;
}

const FamilySidePanel: React.FC<FamilySidePanelProps> = ({ selectedStory, handleCarouselSlide, iterator, handleBackClick }) => {
    const [stories] = useRecoilState(storiesState);

    return (
        <div className='col-lg-3 col-md-4 col-sm-12 d-flex flex-column my-4 px-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='py-3 mt-1 mx-0 white-bg'>
                <Heading
                    title={stories?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h5}
                    classname='text-start m-0'
                />
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap coordinates={selectedStory?.story?.geometry?.coordinates} />
                </div>
                <Legend />
            </Card>
            {/* <div id="carouselExampleControlsNoTouching" className="carousel slide custom-carousel d-flex justify-content-center my-3 mx-auto bg-white align-items-center" data-bs-touch="false" data-bs-interval="false"  >
                <div className="carousel-inner h-100">
                    {stories?.family?.map((data, index) => (
                        <div className={`carousel-item h-100 ${index === selectedStory?.index ? ' active' : ''}`} key={index}>
                            <div className="d-flex flex-row align-items-center h-100">
                                <img src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} width="100" height="100" className="d-block carousel-img" alt="Family" />
                                <div className="d-flex flex-column align-items-start justify-content-center my-auto mx-2 px-1 w-100 h-100">
                                    <div className='d-flex flex-row justify-content-between align-items-center w-100 m-auto my-0 py-0' >
                                        <Heading
                                            title={data?.familyName}
                                            type={TypographyType.h4}
                                            colour={TypographyColor.dark}
                                        />
                                        <Body
                                            type={BodyType.p3}
                                            color={BodyColor.dark}
                                        >
                                            {iterator}/{stories?.family.length}
                                        </Body>
                                    </div>
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='my-0'
                                    >
                                        {data?.district}, {data?.state}, {data?.country}
                                    </Body>
                                    <button className='border-0 bg-white color-green m-0 fs-12 p-0' onClick={handleBackClick}>View all<FiArrowRight className='ms-1' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev PrevBtn rounded-circle bg-white"
                    onClick={() => handleCarouselSlide((selectedStory?.index - 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                    data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="prev"
                >
                    <BiArrowBack className="iconNextPrev" aria-hidden="true"></BiArrowBack>
                </button>

                <button className="carousel-control-next NextBtn rounded-circle bg-white"
                    onClick={() => handleCarouselSlide((selectedStory?.index + 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                    data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="next"
                >
                    <MdOutlineArrowForward className='iconNextPrev' fontSize={20} aria-hidden="true"></MdOutlineArrowForward>
                </button>
            </div> */}
            <div className='d-flex flex-row justify-content-center align-items-center my-3' >
                <button className="PrevBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index - 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <BiArrowBack className="iconNextPrev" aria-hidden="true"></BiArrowBack>
                </button>
                <div className="h-100">
                    {stories?.family?.map((data, index) => (
                        <div className={`carousel-item bg-white h-100 ${index === selectedStory?.index ? ' active' : ''}`} key={index}>
                            <div className="d-flex flex-row align-items-center h-100">
                                <img src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} width="100" height="100" className="d-block carousel-img" alt="Family" />
                                <div className="d-flex flex-column align-items-start justify-content-center my-auto mx-2 px-1 w-100 h-100">
                                    <div className='d-flex flex-row justify-content-between align-items-center w-100 m-auto my-0 py-0' >
                                        <Heading
                                            title={data?.familyName}
                                            type={TypographyType.h4}
                                            colour={TypographyColor.dark}
                                        />
                                        <Body
                                            type={BodyType.p3}
                                            color={BodyColor.dark}
                                        >
                                            {iterator}/{stories?.family.length}
                                        </Body>
                                    </div>
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='my-0'
                                    >
                                        {data?.district}, {data?.state}, {data?.country}
                                    </Body>
                                    <button className='border-0 bg-white color-green m-0 fs-12 p-0' onClick={handleBackClick}>View all<FiArrowRight className='ms-1' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="NextBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index + 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <MdOutlineArrowForward className='iconNextPrev' fontSize={20} aria-hidden="true"></MdOutlineArrowForward>
                </button>
            </div>
        </div >
    );
}

export default FamilySidePanel;
