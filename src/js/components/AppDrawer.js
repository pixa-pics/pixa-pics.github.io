import React from "react";
import { withStyles } from "@material-ui/core";
import {Toolbar, Drawer, Box} from "@material-ui/core";
import DrawerContent from "../components/DrawerContent";

import actions from "../actions/utils";

const styles = theme => ({
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    drawer: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        "& > div > div": {
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 175ms",
            opacity: .75,
        },
        "& > div:hover > div": {
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 175ms",
            opacity: 1,
        },
    },
    drawerHome: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        "& > div > div": {
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 175ms",
            opacity: 1,
        },
    },
    drawerPaper: {
        width: 256,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        border: 0,
        backgroundImage: `linear-gradient(95deg, #00020f66 40%, #67698033 60%, #010310ff 85% calc(100% - 32px)), url(/src/images/super_${Date.now()%2 ? "woman": "man"}.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(50% + 16px) calc(100% - 0px)",
        backgroundSize: "calc(100% + 96px)",
    },
    drawerContainer: {
        overflow: "auto"
    },
});


class AppDrawer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            classes: props.classes
        };
    };

    componentWillReceiveProps(new_props) {
        this.setState(new_props);
    }

    trigger_share = () => {

        actions.trigger_share();
    };

    render() {

        const { classes, pathname } = this.state;
        
        return (
            <Box elevation={4}>
                <Drawer keepMounted={true} className={pathname === "/" ? classes.drawerHome: classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <DrawerContent pathname={pathname} onClose={() => {}} />
                        <div style={{
                            position: "fixed",
                            bottom: 12,
                            left: 12,
                            color: "#48488B",
                            userSelect: "none"
                        }}><span>Awaiting the privacy...<br />hero you are within.</span></div>
                    </div>
                </Drawer>
            </Box>
        );
    }
}

export default withStyles(styles)(AppDrawer);
