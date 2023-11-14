import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import UploadImage from './UploadImage';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from 'react-router-dom';
import { APIS } from '../../../../../constants'; // Make sure to import your constants correctly
import { RecoilRoot } from 'recoil'; // Import RecoilRoot to provide the Recoil state

describe('UploadImage component', () => {
    it('renders with initial data', async () => {
        const showUploadImageModal = true;
        const setShowUploadImageModal = jest.fn();
        const openUploadImageModal = jest.fn();
        const closeUploadImageModal = jest.fn();
        const handleImageChange = jest.fn();
        const zoomLevel = 100;
        const setZoomLevel = jest.fn();
        const newImage = 'test.jpg';
        const handleSaveImage = jest.fn();
        const handleZoomIn = jest.fn();
        const handleZoomOut = jest.fn();
        const handleSliderChange = jest.fn();
        const minZoom = 50;
        const maxZoom = 200;
        const handleDeleteModel = jest.fn();

        render(
            <RecoilRoot>
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    setShowUploadImageModal={setShowUploadImageModal}
                    openUploadImageModal={openUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                />
            </RecoilRoot>
        );
        expect(screen.getByText('Profile Photo')).toBeInTheDocument();
        expect(screen.getByAltText('Profile Photo')).toHaveStyle({ width: '100%' });
        expect(screen.getByAltText('Profile Photo')).toHaveAttribute('src', 'test.jpg');
        expect(screen.getByText('Save')).toBeInTheDocument();
        // await waitFor(() => {
        //     expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
        // });
        const zoomInButton = screen.getByTestId('zoomInButton');
        expect(zoomInButton).toBeInTheDocument();
        const zoomOutButton = screen.getByTestId('zoomOutButton');
        expect(zoomOutButton).toBeInTheDocument();

    });

    it('handles zoom in and zoom out', () => {
        const showUploadImageModal = true;
        const setShowUploadImageModal = jest.fn();
        const openUploadImageModal = jest.fn();
        const closeUploadImageModal = jest.fn();
        const handleImageChange = jest.fn();
        const zoomLevel = 100;
        const setZoomLevel = jest.fn();
        const newImage = 'test.jpg';
        const handleSaveImage = jest.fn();
        const handleZoomIn = jest.fn();
        const handleZoomOut = jest.fn();
        const handleSliderChange = jest.fn();
        const minZoom = 50;
        const maxZoom = 200;
        const handleDeleteModel = jest.fn();

        render(
            <RecoilRoot>
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    setShowUploadImageModal={setShowUploadImageModal}
                    openUploadImageModal={openUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                />
            </RecoilRoot>
        );
        const zoomInButton = screen.getByTestId('zoomInButton');
        const zoomOutButton = screen.getByTestId('zoomOutButton');
        fireEvent.click(zoomInButton);
        expect(handleZoomIn).toHaveBeenCalledTimes(1);
        fireEvent.click(zoomOutButton);
        expect(handleZoomOut).toHaveBeenCalledTimes(1);
    });

    it('handles image save', async () => {
        const showUploadImageModal = true;
        const setShowUploadImageModal = jest.fn();
        const openUploadImageModal = jest.fn();
        const closeUploadImageModal = jest.fn();
        const handleImageChange = jest.fn();
        const zoomLevel = 100;
        const setZoomLevel = jest.fn();
        const newImage = 'test.jpg';
        const handleSaveImage = jest.fn();
        const handleZoomIn = jest.fn();
        const handleZoomOut = jest.fn();
        const handleSliderChange = jest.fn();
        const minZoom = 50;
        const maxZoom = 200;
        const handleDeleteModel = jest.fn();

        render(
            <RecoilRoot>
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    setShowUploadImageModal={setShowUploadImageModal}
                    openUploadImageModal={openUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                />
            </RecoilRoot>
        );
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(handleSaveImage).toHaveBeenCalled();
        });
    });

    it('handles delete model', async() => {
        const showUploadImageModal = true;
        const setShowUploadImageModal = jest.fn();
        const openUploadImageModal = jest.fn();
        const closeUploadImageModal = jest.fn();
        const handleImageChange = jest.fn();
        const zoomLevel = 100;
        const setZoomLevel = jest.fn();
        const newImage = 'test.jpg';
        const handleSaveImage = jest.fn();
        const handleZoomIn = jest.fn();
        const handleZoomOut = jest.fn();
        const handleSliderChange = jest.fn();
        const minZoom = 50;
        const maxZoom = 200;
        const handleDeleteModel = jest.fn();

        render(
            <RecoilRoot>
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    setShowUploadImageModal={setShowUploadImageModal}
                    openUploadImageModal={openUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                />
            </RecoilRoot>
        );
        // await waitFor(() => {
        //     const deleteButton = screen.getByText('Delete');
        //     expect(deleteButton).toBeInTheDocument();
        //     fireEvent.click(deleteButton);
        // },{timeout:500});
        // expect(handleDeleteModel).toHaveBeenCalledWith(true);
    });


});