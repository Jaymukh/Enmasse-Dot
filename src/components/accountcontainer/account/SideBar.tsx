import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HelpIcon from '@mui/icons-material/Help';
import * as Constants from '../../../utils/constants/Constants';
import { useRecoilValue } from "recoil";
import { visiblePanelState } from '../../../states';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';

interface SideBarProps {
    handleVisiblePanel: (index: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ handleVisiblePanel }) => {
    const visiblePanel = useRecoilValue(visiblePanelState);

    return (
        <div className='account-sidebar col-3 p-0 pe-3 h-100'>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }} className="h-100 full-height d-flex flex-column justify-content-between w-100" style={{ height: '81.5vh' }}>
                <List component="nav" aria-label="main mailbox folders" className='my-0 p-0'>
                    {Constants.sidebarData.map((data, index) => (
                        <ListItem className='p-0 m-0' divider key={index}>
                            <ListItemButton
                                selected={index === visiblePanel}
                                onClick={() => handleVisiblePanel(index)}
                            >
                                <ListItemIcon>
                                    {data.icon}
                                </ListItemIcon>
                                <ListItemText primary={data.option} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <div className='justify-content-start'>
                    <Button
                        theme={ButtonTheme.secondary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                    >
                        <HelpIcon className='mx-1 mb-1 color-black ' />
                        Help & Support
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default SideBar;
