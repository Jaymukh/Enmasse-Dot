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
    handleGlobal: () => void;
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
    handleGlobal,
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
        <div className='d-flex justify-content-start align-items-center border-bottom bg-white mx-0' style={{ height: '6.25vh' }}>
            <div className='col-xl-7 col-md-7 justify-content-start d-flex flex-wrap h-100'>
                <div className='select-right-margin py-0 h-100 px-3'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                        // onClick={handleGlobal}
                        classname='h-100 text-start ps-0 py-0'
                    >
                        Global
                    </Button>
                </div>                
                <div className='select-right-margin py-0 h-100 d-flex flex-column align-items-start'>
                    <p className='country-text m-0 text-start ps-2'>Country</p>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                        // onClick={handleCountryChange}
                        classname='h-auto text-start ps-2 pb-3'
                    >
                        {global ? 'Select' : 'India'}
                    </Button>
                </div>                   
                {!global && selected.country ? (
                    <div className='select-right-margin py-0 h-100'>
                        <p className='country-text m-0 text-start ps-2'>State</p>
                        <Select
                            options={states}
                            onChange={handleStateChange}
                            value={selected.state}
                            labelKey='name'
                            valueKey='geo_id'
                            size={SelectSize.medium}
                            placeholder='Select'
                            classname='text-start'
                        />
                    </div>
                ) : (
                    ''
                )}
                {!global && selected.state ? (
                    <div className='select-right-margin py-0 h-100'>
                        <p className='country-text m-0 text-start'>District</p>
                        <Select
                            options={districts}
                            onChange={handleDistrictChange}
                            value={selected.district}
                            labelKey='name'
                            valueKey='geo_id'
                            size={SelectSize.medium}
                            placeholder='Select'
                            classname='text-start'
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* <div className='col-xl-5 col-md-5 d-flex flex-wrap justify-content-end align-items-center'>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    classname='m-0 h-auto'
                    onClick={() => openWIPDrawer("Download data")}
                >
                    <FiDownload className='me-2' fontSize={15} />
                    Download data
                </Button>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    classname='m-0 h-auto'
                    onClick={() => openWIPDrawer("Download data")}
                >
                    <MdBookmarks className='me-2' fontSize={15} />
                    Bookmarks
                </Button>
            </div> */}
            {open && <WIPDrawer open={open} title={title} closeWIPDrawer={closeWIPDrawer} />}
        </div>
    );
}

export default MapOptions;
