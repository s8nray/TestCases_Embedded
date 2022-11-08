import React from 'react';
import {Redirect} from 'react-router-dom'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Sidebar from './sidebar';


class Header extends React.Component {
    constructor(props) {
        super(props)
        
    }

    onLogin = () => (
         <Redirect to="/"/>
    )

    render() {
        return (
            <>
                <AppBar position="static" style={{ background: "#1167b1"}}>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Sidebar />
                    </IconButton>
            
                    <Typography variant="h6" 
                        component="div" sx={{ flexGrow: 1 }}>
                        FAST
                    </Typography>
                    <Button color="inherit"   onClick={event =>  window.location.href='/'}>Logout</Button>
                    </Toolbar>
                </AppBar>
                
            </>
        );
    }
}

export default Header;