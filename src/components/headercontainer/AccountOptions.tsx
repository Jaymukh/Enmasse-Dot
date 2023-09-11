import React, { useState } from 'react';
import '../../App.css';
import * as Constants from '../../utils/constants/Constants';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import { MdArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../utils/constants/routeConstants';

interface AccountMenuItem {
  key: number;
  text: string;
  icon: JSX.Element;
}

interface AccountOptionsProps {
  handleVisiblePanel: (index: number) => void;
}

const AccountOptions: React.FC<AccountOptionsProps> = ({ handleVisiblePanel }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickMenuItem = (index: number) => {
    handleVisiblePanel(index);
    handleClose();
    navigate(RouteConstants.profile);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 30, height: 30, fontSize: 16 }}>M</Avatar>
            <MdArrowDropDown className='mx-1' fontSize={25} />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          className='my-0 py-0'
        >
          {Constants.accountMenuItems.map((item: AccountMenuItem, index: number) => (
            <MenuItem key={item.key} onClick={() => handleClickMenuItem(index)} className="menu-font-size">
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              {item.text}
            </MenuItem>
          ))}
          <Divider className='my-0' />
          <MenuItem onClick={handleClose} className="menu-font-size mb-0">
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default AccountOptions;
