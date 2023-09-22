import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import * as Constants from '../../../utils/constants/Constants';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { visiblePanelState } from '../../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';


const SideBar = () => {
    const visiblePanel = useRecoilValue(visiblePanelState);
    const setVisiblePanel = useSetRecoilState(visiblePanelState);

    return (
        <div className='account-sidebar col-3 p-0 pe-3 h-100'>
            <div className="h-100 bg-white full-height d-flex flex-column justify-content-between w-100" style={{ height: '81.5vh' }}>
                <List component="nav" aria-label="main mailbox folders" className='my-0 p-0'>
                    {Constants.sidebarData.map((data, index) => (
                        <ListItem className='p-0 m-0' divider key={index}>
                            <ListItemButton
                                selected={index === visiblePanel}
                                onClick={() => setVisiblePanel(index)}
                            >
                                <ListItemIcon>
                                    {data.icon}
                                </ListItemIcon>
                                <ListItemText primary={data.option} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* <div className='justify-content-start'>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                    >
                        <HelpIcon className='mx-1 mb-1 color-black ' />
                        Help & Support
                    </Button>
                </div> */}
            </div>
        </div>
    );
}

export default SideBar;
