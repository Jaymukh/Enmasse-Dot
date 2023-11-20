import { useState } from 'react';
import Drawer from '../ui/Drawer';
import '../../App.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { toast } from 'react-toastify';
import { useRecoilValue } from "recoil";
import { loggedUserState, User, geoJsonState } from "../../states";

interface RequestLayersProps {
    requestLayersDrawerOpen: boolean,
    handleRequestLayersDrawer: (contactUsDrawerOpen: boolean) => void;
}

export default function RequestLayers({ requestLayersDrawerOpen,   handleRequestLayersDrawer}: RequestLayersProps) {
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const geoJSON = useRecoilValue(geoJsonState)

    const [payloadData, setPayloadData] = useState<{ message: string, geo_name: string, purpose: string }>({ message: '', geo_name: geoJSON?.rootProperties?.Name, purpose: 'Request Layers' });

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
        if (payloadData.message) {
            console.log(payloadData);
            handleRequestLayersDrawer(false);
        }
        else {
            toast.error('Write a message!');
        }
    };

    return (
        <Drawer
            id='request-layers'
            title={`Request Layers - ${geoJSON?.rootProperties?.Name}`}
            isOpen={requestLayersDrawerOpen}
            toggleFunction={handleRequestLayersDrawer}
        >
            <div className='d-flex justify-content-center flex-column'>
                <p className=' text-start'>We are working on developing layers that will help analyze opportunities better.To request layers, fill the following form. We will notify you once the layers have been updated.</p>
                <h6 className='mt-1 font-87-5 text-start'>Name</h6>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={loggedUser.name}
                    disabled={true}
                />
                <h6 className='mt-1 font-87-5 text-start'>Email</h6>
                <Input
                    type="email"
                    placeholder="Enter your Email ID"
                    value={loggedUser.email_id}
                    disabled={true}
                />
                <h6 className='mt-1 font-87-5 text-start'>Message</h6>
                <textarea
                    value={payloadData.message}
                    name='message'
                    onChange={(e) => handleChangeData(e)}
                    placeholder="Type your request message (Max 250 words)"
                    style={{height: '10rem'}}
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