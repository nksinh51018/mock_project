import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);

export interface MenuProps {

}

const Menu: React.FC<MenuProps> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [showServiceMenu, setShowServiceMenu] = useState<Boolean>(false);
    const [showRepairMenu, setShowRepairMenu] = useState<Boolean>(false);
    const handleShowServiceMenu = () => {
        if(showServiceMenu === false) {
            setShowServiceMenu(true);
        }
        else {
            setShowServiceMenu(false);
        }
    }
    const handleShowRepairMenu = () => {
        if(showRepairMenu === false) {
            setShowRepairMenu(true);
        }
        else {
            setShowRepairMenu(false);
        }
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={handleShowRepairMenu}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={"Phiếu sửa chữa"} />
                        <Icon>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </Icon>
                    </ListItem>
                    <List style={showRepairMenu ? { display: "block" } : { display: "none" }}>
                        <ListItem button onClick={() => history.push("/repair")}>
                            <ListItemText primary={"Danh sách phiếu sửa chữa"} style={{textAlign:"center"}}/>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/new-repair")}>
                            <ListItemText primary={"Thêm phiếu sửa chữa"} style={{textAlign:"center"}}/>
                        </ListItem>
                    </List>
                </List>
                <List>
                    <ListItem button onClick={handleShowServiceMenu}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={"Dịch vụ"} />
                        <Icon>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </Icon>
                    </ListItem>
                    <List style={showServiceMenu ? { display: "block" } : { display: "none" }}>
                        <ListItem button onClick={() => history.push("/service")}>
                            <ListItemText primary={"Danh sách dịch vụ"} style={{textAlign:"center"}}/>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/new-service")}>
                            <ListItemText primary={"Thêm dịch vụ"} style={{textAlign:"center"}}/>
                        </ListItem>
                    </List>
                </List>
                <List>
                    <ListItem button>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={"Linh kiện"} />
                        <Icon>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </Icon>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default Menu;
