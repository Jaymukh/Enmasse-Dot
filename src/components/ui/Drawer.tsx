import React from 'react';

const Drawer = ({ id, title, isOpen, toggleFunction, children }) => {
    return (
        <div className={`offcanvas offcanvas-end h-100 drawer-shadow border-0 ${isOpen ? 'show' : ''}`} id={id}>
            <div className="offcanvas-header pt-4 pb-0 px-4">
                <h5 className='fs-21 px-1'>{title}</h5>
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