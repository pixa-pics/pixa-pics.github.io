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
            opacity: 1,
        },
    },
    drawerPaper: {
        width: 256,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        border: 0,
        backgroundSize: "calc(100% + 96px)",
        contain: "layout paint size style",
        "&::before": {
            position: "absolute",
            opacity: 0.1,
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            content: `' '`,
            backgroundPosition: "25% 100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundImage: `url()`,
            zIndex: -1,
        },
    },
    drawerContainer: {
        overflow: "auto"
    },
    drawerPrivacyHint: {
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: 8,
        color: "#ffffff",
        userSelect: "none",
        "& > p": {
            opacity: 0,
            fontWeight: "bold",
            paddingBottom: 12,
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 350ms",
        },
        "&:hover > p": {
            opacity: .777,
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 350ms",
        }
    }
});


class AppDrawer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            know_the_settings: props.know_the_settings,
            language: String(props.language),
            classes: props.classes,
        };
    };

    shouldComponentUpdate() {

        return false;
    }

    componentDidMount() {

        this.forceUpdate();
    }

    componentWillReceiveProps(new_props) {

        if(this.state.language !== new_props.language || this.state.know_the_settings !== new_props.know_the_settings) {

            this.setState({know_the_settings: new_props.know_the_settings, language: String(new_props.language)}, () => {

                this.forceUpdate();
            });
        }
    }

    trigger_share = () => {

        actions.trigger_share();
    };

    render() {

        const { classes, language } = this.state;
        
        return (
            <Box elevation={4}>
                <Drawer ModalProps={{disablePortal: true, keepMounted: true}} className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <DrawerContent language={language} onClose={() => {}} />
                        <Fade in={true} timeout={400}>
                            <div className={classes.drawerPrivacyHint}>
                                <p style={{fontSize: "0.777em"}}>Cutting off annoying details is free while on the journey! Easily becoming a lighter adventure, using a sanitized online-self's image tends to honor one's real beauty stronger.<br/><br/>THIS APP: Is in your hands only, doesn't sniff network requests, and is neutral just like Switzerland.</p>
                                <h4 style={{color: "#ffffffff", marginBottom: 0}}>Online-self's image doesn't matters? This is madness!</h4>
                            </div>
                        </Fade>
                    </div>
                </Drawer>
            </Box>
        );
    }
}

export default withStyles(styles)(AppDrawer);