import * as React from 'react';
import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    Link,
    useHistory
} from "react-router-dom";
import { UserContext } from '../../App';
import { useEffect } from 'react';



export default function Nav() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [logSwitch, setLogSwitch] = React.useState(false);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const history = useHistory();

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const SignOut = () => {

        if (logSwitch) {

            setLoggedInUser([
                {
                    isSignedIn: false,
                    name: '',
                    mail: '',
                    password: '',
                    img: '',
                    success: false,
                    createDate: '',

                }
            ])
            setLogSwitch(!logSwitch);
        }
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (loggedInUser.name) {
            setLogSwitch(true);
        }
    }, [loggedInUser])

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            {
                !logSwitch &&
                <MenuItem onClick={() => history.push("/signup")}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Sign Up</p>
                </MenuItem>
            }
            {logSwitch &&
                <MenuItem onClick={() => SignOut()}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Sign Out</p>
                </MenuItem>
            }
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                style={{ background: '#e3f2fd', color: 'black' }}
                position="static"

            >
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h3 >
                            Management System
                        </h3>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            !logSwitch &&
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => { history.push('/signup') }}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        }
                        {
                            logSwitch &&
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => SignOut()}
                                color="inherit"
                            >
                                <LogoutIcon />
                                <br />
                                <span style={{ fontSize: 10 }}>Sign Out</span >

                            </IconButton>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}


