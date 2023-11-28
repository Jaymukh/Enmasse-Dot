import React from 'react';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';

interface DrawerProps {
    id: string;
    title: string;
    isOpen: boolean;
    toggleFunction: (isOpen: boolean) => void;
    children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ id, title, isOpen, toggleFunction, children }) => {
    return (
        <div className={`offcanvas offcanvas-end h-100 drawer-shadow border-0 ${isOpen ? 'show' : ''}`} id={id}>
            <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Heading
                        title={title}
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='p-0 text-start pe-3 m-0'
                    />
                    <button
                        type="button"
                        className="btn-close text-reset m-0 p-0"
                        onClick={() => toggleFunction(false)}
                        aria-label="Close"
                    />
                </div>
                <div className="my-3" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Drawer;