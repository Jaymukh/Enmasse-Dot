import React, { ChangeEvent, useState } from "react";
import * as Constants from '../../../utils/constants/Constants';
import Switch from '../../ui/switch/Switch';
import userStoryImg from '../../../utils/images/user-stories.svg';

interface CoreSolutionsProps {
    handleViewStories: (checked: boolean) => void;
    handleChangeRb: (event: ChangeEvent<HTMLInputElement>, option: Constants.Option) => void;
    selectedRb: number;
}

const CoreSolutions: React.FC<CoreSolutionsProps> = ({
    handleViewStories,
    handleChangeRb,
    selectedRb,
}) => {
    const options = Constants.options;

    const [isChecked, setIsChecked] = useState<any>({ coreSolution: false, viewStories: false });
    const toggleSwitch = (event?: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event?.target?.name!;
        setIsChecked({ ...isChecked, [name]: !isChecked[name] });
    };

    return (
        <div className="ms-4 top-0 start-0" style={{ position: "absolute" }}>
            <div className="mt-4 mx-1 bg-white p-3 ">
                <div className='d-flex'>
                    <h6 className="mx-2 pe-3 text-start fs-16">Core Solutions</h6>
                    <Switch
                        isChecked={isChecked?.coreSolution}
                        toggleSwitch={toggleSwitch}
                        name='coreSolution'
                    />
                </div>
                <div className="pe-3">
                    {options.map((option) => (
                        <div className="d-flex flex-row justify-content-start">
                            <label key={option.label} className="my-1 fs-14">
                                <input
                                    className="mx-2 input-rb"
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
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center bg-white mt-2 mx-1 px-3 py-2">
                <img src={userStoryImg} alt="user story" />
                <p className=" my-0 ms-2 me-5 fs-12">View Stories</p>
                <Switch
                    isChecked={isChecked?.viewStories}
                    toggleSwitch={toggleSwitch}
                    name='viewStories'
                />
            </div>
        </div>
    );
}

export default CoreSolutions;
