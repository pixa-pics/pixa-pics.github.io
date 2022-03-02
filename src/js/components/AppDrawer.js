import React from "react";
import { withStyles } from "@material-ui/core";
import {Toolbar, Drawer, Box} from "@material-ui/core";
import DrawerContent from "../components/DrawerContent";

import actions from "../actions/utils";
import get_svg_in_base64 from "../utils/svgToBase64";
import SendToAFriend from "../icons/SendToAFriend";
const SENDTOAFRIEND = get_svg_in_base64(<SendToAFriend />)

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
        backgroundColor: theme.palette.secondary.dark,
        backgroundSize: "100%",
        backgroundPosition: "center",
        color: theme.palette.secondary.contrastText,
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        border: 0,
        "& > div": {
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 175ms",
            opacity: .75,
        },
        "&:hover > div": {
            opacity: 1,
        },
        "& .drawershare": {
            opacity: ".33",
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 300ms",
        },
        "&:hover .drawershare": {
            opacity: "1"
        }
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
                <Drawer keepMounted={true} className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <DrawerContent pathname={pathname} onClose={() => {}}/>
                    </div>
                    <img onClick={this.trigger_share} className={"drawershare"} src={SENDTOAFRIEND} style={{position: "absolute", left: 16, bottom: 16, width: 220, cursor: "pointer"}}/>
                </Drawer>
            </Box>
        );
    }
}

export default withStyles(styles)(AppDrawer);
