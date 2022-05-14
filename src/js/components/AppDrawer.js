import React from "react";
import { withStyles } from "@material-ui/core";
import {Tooltip, Toolbar, Drawer, Box, Fade} from "@material-ui/core";
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
        backgroundImage: `linear-gradient(95deg, rgb(0 2 15 / 86%) 50%, rgb(73 66 109 / 66%) 60%, hsl(232deg 88% 3%) 80% calc(80% - 32px)), url(/src/images/Self.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(50% + 16px) calc(100% - 0px)",
        backgroundSize: "calc(100% + 96px)",
        contain: "layout paint size style",
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
                        <Fade in={true} timeout={400}>
                            <Tooltip classes={{popper: "green"}}
                                     title={"Using companies for analytics only with providers headquartered in Switzerland or the EU and by experts on privacy such as ours in strict regulations like FADP (CH) and GDPR (EU), we're also committed to not killcode what it intended with logical code that needs to tells any host anything, it just runs well locally without connection, why try harder?"}>
                                <div style={{
                                    position: "fixed",
                                    bottom: 12,
                                    left: 12,
                                    color: "#ffffff75",
                                    userSelect: "none"
                                }}><span>Online-self privacy heroes...</span></div>
                            </Tooltip>
                        </Fade>
                    </div>
                </Drawer>
            </Box>
        );
    }
}

export default withStyles(styles)(AppDrawer);
