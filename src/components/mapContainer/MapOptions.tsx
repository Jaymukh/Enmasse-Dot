import '../../App.css';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { MdBookmarks } from 'react-icons/md';
import WIPDrawer from './WIPDrawer';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import Select, { SelectSize } from '../ui/select/Select';

interface MapOptionsProps {
    handleCountryChange: () => void;
    handleStateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDistrictChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    global: boolean;
    countries: any;
    states: any;
    districts: any;
    selected: any
}

function MapOptions({
    handleCountryChange,
    handleStateChange,
    handleDistrictChange,
    global,
    states,
    districts,
    selected
}: MapOptionsProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    

    const openWIPDrawer = (title: string) => {
        setOpen(true);
        setTitle(title);
    };
    const closeWIPDrawer = () => {
        setOpen(false);
        setTitle('');
    };

    return (
        <div className='d-flex justify-content-around align-items-center border-bottom bg-white mx-0' style={{ height: '7.5vh' }}>
            <div className='col-xl-7 col-md-7 justify-content-start d-flex flex-wrap h-100'>
                <div className='select-right-margin py-1' style={{ width: '10vw' }}>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.transparent}
                        // onClick={handleGlobal}
                        classname='h-100 text-start'
                    >
                        Global
                    </Button>
                </div>
                
                        <div className='select-right-margin py-1 h-100' style={{ width: '10vw' }}>
                            <p className='country-text ms-2 '>COUNTRY</p>
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.transparent}
                                onClick={handleCountryChange}
                                classname='h-auto text-start px-2'
                            >
                                {global ? 'SELECT' : 'India'}
                            </Button>
                        </div>
                   
                {!global && selected.country ? (
                    <div className='select-right-margin ms-2 py-1 h-100'>
                        <p className='country-text mx-1'>STATE</p>
                        <Select
                            options={states}
                            onChange={handleStateChange}
                            value={selected.state}
                            labelKey='name'
                            valueKey='geo_id'
                            size={SelectSize.medium}
                            placeholder='SELECT'
                        />
                    </div>
                ) : (
                    ''
                )}
                {!global && selected.state ? (
                    <div className='select-right-margin ms-2 py-1 h-100'>
                        <p className='country-text mx-1'>DISTRICT</p>
                        <Select
                            options={districts}
                            onChange={handleDistrictChange}
                            value={selected.district}
                            labelKey='name'
                            valueKey='geo_id'
                            size={SelectSize.medium}
                            placeholder='SELECT'
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className='col-xl-5 col-md-5 d-flex flex-wrap justify-content-end align-items-center'>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.default}
                    variant={ButtonVariant.transparent}
                    classname='m-0 h-auto'
                    onClick={() => openWIPDrawer("Download data")}
                >
                    <FiDownload className='me-2' fontSize={15} />
                    Download data
                </Button>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.default}
                    variant={ButtonVariant.transparent}
                    classname='m-0 h-auto'
                    onClick={() => openWIPDrawer("Download data")}
                >
                    <MdBookmarks className='me-2' fontSize={15} />
                    Bookmarks
                </Button>
            </div>
            {open && <WIPDrawer open={open} title={title} closeWIPDrawer={closeWIPDrawer} />}
        </div>
    );
}

export default MapOptions;
