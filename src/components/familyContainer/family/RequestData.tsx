import React, { useEffect, useState } from 'react';
import Drawer from '../../ui/Drawer';
import '../../../App.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Input } from '../../ui/input/Input';
import { toast } from 'react-toastify';

interface RequestDataProps {
    requestDataDrawerOpen: boolean,
    handleRequestDataDrawer: (requestDataDrawerOpen: boolean) => void;
}

export default function RequestData({ requestDataDrawerOpen, handleRequestDataDrawer }: RequestDataProps) {

    const [payloadData, setPayloadData] = useState<{ name: string, email_id: string, message: string }>({ name: '', email_id: '', message: '' });

    const handleChangeData = (e: any) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'message') {
            const wordLimit = 250;
            const words = value.split(/\s+/).filter((word: any) => word !== '');

            if (words.length > wordLimit) {
                // Truncate the input to the word limit
                const truncatedInput = words.slice(0, wordLimit).join(' ');
                setPayloadData({ ...payloadData, [name]: truncatedInput });
            }
            else {
                setPayloadData({ ...payloadData, [name]: value });
            }
        }
        else {
            setPayloadData({ ...payloadData, [name]: value });
        }
    };

    const handleSendClick = () => {
        if (payloadData.name && payloadData.email_id && payloadData.message) {
            console.log(payloadData);
            handleRequestDataDrawer(false);
        }
        else {
            toast.error('All fields are mendatory!');
        }
    };

    return (
        <Drawer
            id='request-data'
            title='Request Data'
            isOpen={requestDataDrawerOpen}
            toggleFunction={handleRequestDataDrawer}
        >
            <div className='d-flex justify-content-center flex-column'>
                <p className=' text-start'>If you like to request a data for “Place name”, fill the following form and send request. We will notify you once the data have been updated.</p>
                <h6 className='mt-1 font-87-5 text-start'>Name*</h6>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={payloadData.name}
                    name='name'
                    onChange={(e) => handleChangeData(e)}
                />
                <h6 className='mt-1 font-87-5 text-start'>Email*</h6>
                <Input
                    type="email"
                    placeholder="Enter your Email ID"
                    value={payloadData.email_id}
                    name='email_id'
                    onChange={(e) => handleChangeData(e)}
                />
                <h6 className='mt-1 font-87-5 text-start'>Message*</h6>
                <textarea
                    value={payloadData.message}
                    name='message'
                    onChange={(e) => handleChangeData(e)}
                    placeholder="Type your request message (Max 250 words)"
                    style={{ height: '10rem' }}
                    className='fs-13 p-3 rounded'
                />
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleSendClick()}
                    classname='my-3 height-3'
                >
                    Send Message
                </Button>
            </div>
        </Drawer>
    );
}