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
            <div className="offcanvas-header p-0">
                <Heading
                    title={title}
                    type={TypographyType.h3}
                    colour={TypographyColor.dark}
                    classname='p-0'
                />
                <button
                    type="button"
                    className="btn-close text-reset m-0 p-0"
                    onClick={() => toggleFunction(false)}
                    aria-label="Close"
                />
            </div>
            <div className="offcanvas-body px-0">
                {children}
            </div>
        </div>
    )
}

export default Drawer;