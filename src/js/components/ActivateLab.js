import React from "react";
import { withStyles } from "@material-ui/core/styles"

import {Dialog} from "@material-ui/core";
import LabActivate from "../icons/LabActivate";
import actions from "../actions/utils";
import RestrictedArea from "../icons/RestrictedArea";

const styles = theme => ({
    dialogMobileFullscreen: {
        "& .MuiPaper-root": {
            background: "transparent",
            backgroundSize: "contain",
            contentVisibility: "auto",
            contain: "paint style layout",
            boxShadow: "none",
            overflow: "hidden"
        },
        "& .MuiBackdrop-root": {
            background: "rgba(1,3,15,0.9)",
        },
        "& svg:first-child": {
            filter: "drop-shadow(0px 0px 24px #0c00ffaa) drop-shadow(0px 0px 12px #0a00db55) drop-shadow(0px 0px 6px #0900bb66) drop-shadow(0px 0px 3px #07008f77)"
        }
    },
    "@keyframes glitch": {
        "0%": { opacity: ".10"},
        "25%": { opacity: "0"},
        "50%": { opacity: ".80"},
        "75%": { opacity: "0"},
        "100%": { opacity: ".90"},
    },
    activateSVG: {
        cursor: "pointer",
        animationFillMode: "both",
        animationName: "$glitch",
        animationDuration: "250ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "150ms",
    },
    restrictedSVG: {
        animationFillMode: "both",
        animationName: "$glitch",
        animationDuration: "250ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "50ms",
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
            open: props.open
        };
    };

    setSt4te(st4te, callback) {
        "use strict";
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
            var video = document.getElementById("activation-video");
            video.play();
        }catch(e){}
    };

    render() {

        const {
            classes,
            open
        } = this.st4te;

        return (
            <React.Fragment>
                <Dialog open={open}
                        className={classes.dialogMobileFullscreen}
                        maxWidth={"xl"}
                        onClose={this.props.onClose}
                        disablePortal={false}
                        keepMounted={false}>
                    <LabActivate className={classes.activateSVG} style={{height: "min(75vh, 75vw)", width: "min(75vh, 75vw)", margin: "auto"}} onClick={this.props.onClose}/>
                    <video width="480" height="480" style={{cursor: "pointer", transform: "translateZ(10px)", maxWidth: "20%", maxHeight: "20%", position: "fixed", left: "5%", top: "0%", mixBlendMode: "multiply", clipPath: "circle(50% at 50% 50%)"}} autoPlay={open} id="activation-video" onClick={this._resume_video}>
                        <source src="/src/videos/activation.mp4" type="video/mp4"/>
                    </video>
                    <RestrictedArea className={classes.restrictedSVG} style={{height: "auto", width: "100%", position: "fixed", bottom: "0%"}}/>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ActivateLab);
