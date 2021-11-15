
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,

    useParams,
    useRouteMatch
} from "react-router-dom";
import AddService from '../../Add Service/AddService';
import MakeAdmin from './Admin/MakeAdmin';
import ManageService from '../../Add Service/Manage services/ManageService';
import useAuth from '../../Hooks/useAuth';
import MyOrder from '../Orders/MyOrder';
import AdminRoute from '../../Login/Admin route/AdminRoute';
import Reviews from '../Review/Reviews';
import AddReview from '../Review/AddReview';
import Payment from './Payment/Payment';
import ManageOrder from '../../Add Service/Manage services/Manage Order/ManageOrder';

const drawerWidth = 240;
function Dashboard(props) {
    let { path, url } = useRouteMatch();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { admin, logOut, isLoading } = useAuth()


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>

            <Toolbar />

            <Divider />
            {!admin &&
                <List>

                    <Link to={`${url}/myorders`}>
                        <Button sx={{ m: 2 }} color='inherit'>My orders</Button>
                    </Link> <br />
                    <Link to={`${url}/reviews`}>
                        <Button color='inherit'>Add a Review</Button>
                    </Link> <br />
                    <Link to={`${url}/payment`}>
                        <Button color='inherit'>Payment</Button>
                    </Link>


                </List>}
            {admin && <Box>
                <Link to={`${url}/makeadmin`}>
                    <Button sx={{ pb: 4 }} color='inherit'>make an admin</Button>
                </Link> <br />
                <Link to={`${url}/addservice`}>
                    <Button color='inherit'>Add a Service</Button>
                </Link> <br />
                <Link to={`${url}/manageservice`}>
                    <Button color='inherit'>Manage services</Button>
                </Link> <br />
                <Link to={`${url}/manageorder`}>
                    <Button color='inherit'>Manage Order</Button>
                </Link>
            </Box>
            }


            <Button onClick={logOut} color="inherit">Log Out</Button>



        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={path}>
                        <h3>welcome to Dashboard</h3>
                    </Route>
                    <Route path={`${path}/addservice`}>
                        <AddService></AddService>
                    </Route>
                    <Route path={`${path}/payment`}>
                        <Payment></Payment>
                    </Route>
                    <Route path={`${path}/reviews`}>
                        <AddReview></AddReview>
                    </Route>
                    <AdminRoute path={`${path}/makeadmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageorder`}>
                        <ManageOrder></ManageOrder>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageservice`}>
                        <ManageService></ManageService>
                    </AdminRoute>
                    <Route path={`${path}/myorders`}>
                        <MyOrder></MyOrder>
                    </Route>
                </Switch>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;