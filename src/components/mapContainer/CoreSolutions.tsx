import React, { ChangeEvent } from "react";
import * as Constants from '../../utils/constants/Constants';
import Switch from '../ui/switch/Switch';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { MdLayers } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { PiRadioButtonLight } from 'react-icons/pi';

interface CoreSolutionsProps {
    handleChangeRb: (event: ChangeEvent<HTMLInputElement>, option: Constants.Option) => void;
    selectedRb: number;
    isChecked: any;
    toggleSwitch: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoreSolutions: React.FC<CoreSolutionsProps> = ({
    handleChangeRb,
    selectedRb,
    isChecked,
    toggleSwitch
}) => {

    const options = Constants.options;

    return (
        <div className="ms-4">
            {/* <div className="ms-4 top-0 start-0" style={{ position: "absolute" }}> */}
            <div className="mt-4 bg-white px-3 py-2">
                <div className='d-flex align-items-center justify-content-between'>
                    <PiRadioButtonLight fontSize={22} />
                    <h6 className="ms-2 my-0 pe-2 text-start fs-16">Core Solutions</h6>
                    <Switch
                        isChecked={isChecked?.coreSolution}
                        toggleSwitch={toggleSwitch}
                        name='coreSolution'
                    />
                </div>
                {isChecked?.coreSolution && <div className="pe-3 mt-1">
                    {options.map((option) => (
                        <div className="d-flex flex-row justify-content-start ms-1" key={option.label}>
                            <label className="my-1 fs-14">
                                <input
                                    className="me-2 input-rb"
                                    size={1.5}
                                    type="radio"
                                    value={option.key}
                                    checked={selectedRb === option.key}
                                    onChange={(event) => handleChangeRb(event, option)}
                                />
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>}
            </div>
            <div className="d-flex justify-content-between align-items-center bg-white mt-2 px-3 py-2">
                <div className='d-flex'>
                    <BsFillChatLeftTextFill className='me-1' fontSize={20} />
                    <h6 className="my-0 fs-16 ms-2">View Stories</h6>
                </div>
                <Switch
                    isChecked={isChecked?.viewStories}
                    toggleSwitch={toggleSwitch}
                    name='viewStories'
                />
            </div>
            <div className="d-flex justify-content-between align-items-center bg-white mt-2 px-3 py-2">
                <MdLayers fontSize={22} />
                <h6 className="my-0 fs-16">Request Layers</h6>
                <AiOutlineInfoCircle fontSize={15} color='#b8b7b8' />
                <IoIosArrowForward fontSize={22}  />
            </div>
        </div>
    );
}

export default CoreSolutions;
