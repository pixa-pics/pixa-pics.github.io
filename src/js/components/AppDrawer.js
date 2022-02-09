import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";

import DrawerContent from "../components/DrawerContent";


const styles = theme => ({
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    drawer: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    drawerPaper: {
        width: 256,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        border: 0
    },
    drawerContainer: {
        overflow: "auto"
    }
});


class AppDrawer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            classes: props.classes,
            logged_account: props.logged_account
        };
    };

    componentWillReceiveProps(new_props) {
        this.setState(new_props);
    }

    render() {

        const { classes, pathname, logged_account } = this.state;
        
        return (
            <Box elevation={4}>
                <Drawer keepMounted={true} className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <DrawerContent logged_account={logged_account} pathname={pathname} onClose={() => {}}/>
                    </div>
                </Drawer>
            </Box>
        );
    }
}

export default withStyles(styles)(AppDrawer);
