import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import EditSetting from './EditSetting';
import WorkInProgressImage from '../../../../../utils/images/work_in_progress.svg';

describe('EditProfile Component', () => {
    test("it renders the Edit Setting component with the image and text",()=>{
        render(
            <EditSetting editMode={true} handleEditClick={() => {}} />
        );
        const image = screen.getByAltText('Image') as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toContain(WorkInProgressImage);
        expect(screen.getByText("Work in progress")).toBeInTheDocument();
        expect(screen.getByText("Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.")).toBeInTheDocument();
    });

    test("on click close button calls the handleEditClick",()=>{
        const handleEditClick = jest.fn();
        handleEditClick(false);
        render(
            <EditSetting editMode={true} handleEditClick={() => {}} />
        );
        const closeBtn = screen.getByTestId("closeBtnId");
        fireEvent.click(closeBtn);
        expect(handleEditClick).toBeCalledTimes(1);
    })

});
