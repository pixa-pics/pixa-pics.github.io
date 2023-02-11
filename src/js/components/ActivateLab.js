import React from "react";
import { withStyles } from "@material-ui/core/styles"

import {Dialog, Button, DialogContent, Typography, DialogActions} from "@material-ui/core";
import LabActivate from "../icons/LabActivate";
import actions from "../actions/utils";

const styles = theme => ({
    dialogMobileFullscreen: {
        "& .MuiPaper-root": {
            background: "transparent",
            backgroundSize: "contain",
            contentVisibility: "auto",
            contain: "paint style layout",
        },
        "& .MuiBackdrop-root": {
            background: "#01030fbf",
        }
    },
    dialogContentContainer: {
        marginTop: 16,
        height: 666,
        [theme.breakpoints.up("lg")]: {
            display: "inline-flex",
        },
        display: "grid",
    }
});


class ActivateLab extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            keepMounted: props.keepMounted || false,
            open: props.open
        };
    };

    setSt4te(st4te, callback) {

        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i]+"";
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    componentDidMount() {

        actions.trigger_loading_update(100);

    }

    componentWillReceiveProps(new_props) {

        const open_changed = this.st4te.open !== new_props.open;
        if(
            open_changed
        ) {

            this.setSt4te(new_props, () => {

                this.forceUpdate();

                if(open_changed) {
                    if(this.st4te.open) {

                        try {
                            var video = document.getElementById("presentation-video");
                            video.pause();
                        } catch(e){}

                    }else {

                        try {
                            var video = document.getElementById("presentation-video");
                            video.play();
                        }catch(e){}
                    }
                }
            });
        }
    }

    _resume_video = () => {

        try {
            var video = document.getElementById("tutorial-video");
            video.play();
        }catch(e){}
    };

    render() {

        const {
            classes,
            open,
            keepMounted,
        } = this.st4te;

        return (
            <Dialog open={open}
                    className={classes.dialogMobileFullscreen}
                    maxWidth={"xl"}
                    onClose={this.props.onClose}
                    onClick={this.props.onClose}
                    disablePortal={false}
                    keepMounted={keepMounted}>
                    <LabActivate style={{height: "min(75vh, 75vw)", width: "min(75vh, 75vw)", margin: "auto"}}/>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ActivateLab);
