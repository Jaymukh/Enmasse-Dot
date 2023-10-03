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
            <div className="offcanvas-header pt-4 pb-0 px-4">
                <Heading
                    title={title}
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='px-1'
                />
                <button
                    type="button"
                    className="btn-close text-reset mx-1"
                    onClick={() => toggleFunction(false)}
                    aria-label="Close"
                />
            </div>
            <div className="offcanvas-body">
                {children}
            </div>
        </div>
    )
}

export default Drawer;