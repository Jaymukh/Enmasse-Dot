import React, { useState } from 'react';
import Drawer from '../../ui/Drawer';
import '../../../App.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Input } from '../../ui/input/Input';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedUserState, User, geoJsonState, spinnerState, errorState } from "../../../states";
import { useCIFService } from '../../../services';
import { Heading, TypographyType, TypographyColor } from '../../ui/typography/Heading';

interface RequestDataProps {
    requestDataDrawerOpen: boolean,
    handleRequestDataDrawer: (requestDataDrawerOpen: boolean) => void;
}

export default function RequestData({ requestDataDrawerOpen, handleRequestDataDrawer }: RequestDataProps) {
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const geoJSON = useRecoilValue(geoJsonState);
    const cifService = useCIFService();
    const setSpinner = useSetRecoilState(spinnerState);
    const setError = useSetRecoilState(errorState);

    const [payloadData, setPayloadData] = useState<
        { email_id: string, name: string, company: string, message: string, geo_name: string, purpose: string }>
        ({ email_id: loggedUser?.email_id, name: loggedUser?.name, company: loggedUser?.company, message: '', geo_name: geoJSON?.rootProperties?.Name, purpose: 'Request Data' });

    const handleChangeData = (e: any) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

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

    };

    const handleSendClick = () => {
        // setPayloadData({ ...payloadData, geo_name: geoJSON?.rootProperties?.Name });

        if (payloadData.message) {
            setSpinner(true);
            console.log(payloadData);
            cifService.sendEmail(payloadData).then((response: any) => {
                if (response) {
                    setError({ type: 'Success', message: response.message });
                    handleRequestDataDrawer(false);
                }
                setSpinner(false);
            })
                .catch((error: any) => {
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    setError({ type: 'Error', message: errorMsg });
                    setSpinner(false);
                });
        }
        else {
            setError({ type: 'Error', message: 'Write something!' });
        }
    };

    return (
        <Drawer
            id='request-data'
            title={`Request Data  (${geoJSON?.rootProperties?.Name})`}
            isOpen={requestDataDrawerOpen}
            toggleFunction={handleRequestDataDrawer}
        >
            <div className='d-flex justify-content-center flex-column'>
                <p className=' text-start'>{`If you like to request a data for “${geoJSON?.rootProperties?.Name}”, fill the following form and send request. We will notify you once the data have been updated.`}</p>
                <Heading
                    title='Name*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='mt-1 text-start'
                />
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={loggedUser.name}
                    disabled={true}
                />
                <Heading
                    title='Email*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='mt-1 text-start'
                />
                <Input
                    type="email"
                    placeholder="Enter your Email ID"
                    value={loggedUser.email_id}
                    disabled={true}
                />
                <Heading
                    title='Message*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='mt-1 text-start'
                />
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