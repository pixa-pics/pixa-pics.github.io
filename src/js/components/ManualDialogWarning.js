import React from "react";
import { withStyles } from "@material-ui/core";

import {Backdrop} from "@material-ui/core";

const styles = theme => ({
    backdrop: {
        zIndex: 3000,
        color: "#2f2e41",
        contain: "paint size style layout",
        backgroundColor: "#f0ffff66",
    },
    backdropContent: {
        display: "block",
        textAlign: "center",
        imageRendering: "optimizespeed",
        textRendering: "optimizespeed",
    },
    backdropContentImage: {
        width: "100%",
        maxWidth: "min(900px, 75%)",
        animation: "$warn-dialog-image-enter 1600ms ease-out 0ms",
        animationFillMode: "both",
        userSelect: "none",
        cursor: "pointer",
        "@global": {
            "@keyframes $warn-dialog-image-enter": {
                "0%": {transform: "scale(6)", filter: "opacity(0)", webkitFilter: "opacity(0)"},
                "50%": {transform: "scale(6)", filter: "opacity(0)", webkitFilter: "opacity(0)"},
                "75%": {transform: "scale(3)", filter: "opacity(.25)", webkitFilter: "opacity(.25)"},
                "100%": {transform: "scale(1)", filter: "opacity(1)", webkitFilter: "opacity(1)"},
            }
        }
    },
    backdropContentHelper: {
        animation: "$warn-dialog-helper-enter 2000ms ease-out 200ms",
        animationFillMode: "both",
        "@global": {
            "@keyframes warn-dialog-helper-enter": {
                "0%": {filter: "opacity(0)", webkitFilter: "opacity(0)"},
                "100%": {filter: "opacity(1)", webkitFilter: "opacity(1)"},
            }
        }
    },
    backdropContentHint: {
        animation: "$warn-dialog-hint-enter 2500ms ease-out 500ms",
        animationFillMode: "both",
        "@global": {
            "@keyframes warn-dialog-hint-enter": {
                "0%": {filter: "opacity(0)", webkitFilter: "opacity(0)"},
                "100%": {filter: "opacity(1)", webkitFilter: "opacity(1)"},
            }
        }
    },
});


class ManualDialogWarning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            open: props.open,
            src: props.src,
            text: props.text,
            secondary: props.secondary,
            timeout: props.timeout || 0,
        };
    };

    componentWillReceiveProps(new_props) {

        if(new_props.open && !this.state.open) {
            const { timeout, open } = this.state;

            if(timeout && open) {

                setTimeout(() => {this._on_request_close()}, timeout);
            }
        }
        this.setState({...new_props});
    }

    componentDidMount() {

    }

    _on_request_close = () => {

        if(this.props.onClose) {

            this.props.onClose();
        }else {

            this.setState({open: false});
        }
    }

    render() {

        const {
            classes,
            open,
            src,
            text,
            secondary
        } = this.state;

        return (
            <Backdrop className={classes.backdrop} open={open} transitionDuration={0} onClick={() => {this._on_request_close()}}>
                <div className={classes.backdropContent}>
                    <div className={classes.backdropContentHelper}>
                        <h1>{text}</h1>
                        <h2>{secondary}</h2>
                    </div>
                    <img src={src} className={classes.backdropContentImage}/>
                    <div>
                        <span className={classes.backdropContentHint}>Click anywhere to exit</span>
                    </div>
                </div>
            </Backdrop>
        );
    }
}

export default withStyles(styles)(ManualDialogWarning);
