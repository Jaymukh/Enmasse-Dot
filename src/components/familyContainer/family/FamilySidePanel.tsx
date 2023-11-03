import React from 'react';
import '../../../App.css';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineArrowForward } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import StaticMap from '../../StaticMap';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { storiesState } from "../../../states";
import { useRecoilState } from "recoil";
import familySkeleton from '../../../utils/images/family-skeleton.png';
import { Legend } from '../../ui/legend/Legend';

interface FamilySidePanelProps {
    selectedFamily: number;
    selectedData: any;
    handleCarouselSlide: (index: number) => void;
}

const FamilySidePanel: React.FC<FamilySidePanelProps> = ({ selectedFamily, selectedData, handleCarouselSlide }) => {
    const [stories] = useRecoilState(storiesState);
    return (
        <div className='col-3 d-flex flex-column my-4 px-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='py-3 mt-1 mx-0 white-bg'>
                <h6 className='fs-14 text-start m-0'>{stories?.properties?.region}</h6>
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap coordinates={selectedData?.geometry?.coordinates}/>
                </div>
                <Legend />
            </Card>
            <div id="carouselExampleControlsNoTouching" className="carousel slide custom-carousel d-flex justify-content-center my-3 mx-auto bg-white align-items-center" data-bs-touch="false" data-bs-interval="false" style={{ height: "6vw" }} >
                <div className="carousel-inner h-100">
                    {stories?.family.map((data, index) => (
                        <div className={`carousel-item h-100 ${index === selectedFamily ? ' active' : ''}`} key={index}>
                            <div className="d-flex flex-row align-items-center h-100">
                                <img src={data.image? data.image : familySkeleton} width="100" height="100" className="d-block carousel-img" alt="Family Image" />
                                <div className="d-flex flex-column align-items-start justify-content-center mx-2 w-100 h-100">
                                    <Heading
                                        title={data.familyName}
                                        type={TypographyType.h3}
                                        colour={TypographyColor.dark}
                                    />
                                    <p className='carousel-caption-p text-p fs-12 text-start m-0 py-1'>{data.district}, {data.state}, {data.country}</p>
                                    <button className='border-0 bg-white carousel-caption-p color-green m-0 fs-12 p-0'>View all<FiArrowRight className='ms-1' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev PrevBtn rounded-circle bg-white"
                    onClick={() => handleCarouselSlide((selectedFamily - 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                    data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="prev"
                >
                    <BiArrowBack className="iconNextPrev" aria-hidden="true"></BiArrowBack>
                </button>

                <button className="carousel-control-next NextBtn rounded-circle bg-white"
                    onClick={() => handleCarouselSlide((selectedFamily + 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                    data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="next"
                >
                    <MdOutlineArrowForward className='iconNextPrev' fontSize={20} aria-hidden="true"></MdOutlineArrowForward>
                </button>
            </div>
        </div >
    );
}

export default FamilySidePanel;
