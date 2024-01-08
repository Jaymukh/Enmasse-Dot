import React from 'react';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Button, ButtonSize, ButtonTheme, ButtonVariant } from './button/Button';

interface DrawerProps {
    id: string;
    title: string;
    isOpen: boolean;
    toggleFunction: (isOpen: boolean) => void;
    children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ id, title, isOpen, toggleFunction, children }) => {
    return (
        <div className={`offcanvas offcanvas-end h-100 drawer-shadow border-0 overflow-auto ${isOpen ? 'show' : ''}`} id={id}>
            <div>
                <div className="d-flex flex-row justify-content-between align-items-center m-0 py-0">
                    <Heading
                        title={title}
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='p-0 text-start pe-3 m-0'
                    />
                    <Button
                        theme={ButtonTheme.dark}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                        onClick={() => toggleFunction(false)}
                        type='button'
                        classname='btn-close text-reset my-0 w-auto px-2 py-0'
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