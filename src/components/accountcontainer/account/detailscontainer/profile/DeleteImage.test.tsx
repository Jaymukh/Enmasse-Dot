import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteImage from './DeleteImage';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

describe('DeleteImage component', () => {
    it('renders with initial data', () => {
        const showDeleteImageModal = true;
        const handleDeleteModel = jest.fn();
        const handleDeleteClick = jest.fn();
        render(
            <MemoryRouter>
                <RecoilRoot>
                    <DeleteImage
                        showDeleteImageModal={showDeleteImageModal}
                        handleDeleteModel={handleDeleteModel}
                        handleDeleteClick={handleDeleteClick}
                    />
                </RecoilRoot>
            </MemoryRouter>
        );
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Do you really want to delete this record? This process cannot be undone.')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('handles delete click', () => {
        const showDeleteImageModal = true;
        const handleDeleteModel = jest.fn();
        const handleDeleteClick = jest.fn();
        render(
            <MemoryRouter>
                <RecoilRoot>
                    <DeleteImage
                        showDeleteImageModal={showDeleteImageModal}
                        handleDeleteModel={handleDeleteModel}
                        handleDeleteClick={handleDeleteClick}
                    />
                </RecoilRoot>
            </MemoryRouter>
        );
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);
        expect(handleDeleteClick).toHaveBeenCalled();
    });

    it('handles cancel click', () => {
        const showDeleteImageModal = true;
        const handleDeleteModel = jest.fn();
        const handleDeleteClick = jest.fn();

        // Act
        render(
            <MemoryRouter>
                <RecoilRoot>
                    <DeleteImage
                        showDeleteImageModal={showDeleteImageModal}
                        handleDeleteModel={handleDeleteModel}
                        handleDeleteClick={handleDeleteClick}
                    />
                </RecoilRoot>
            </MemoryRouter>
        );
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(handleDeleteModel).toHaveBeenCalledWith(false);
    });
});