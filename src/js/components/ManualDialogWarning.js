import React from "react";
import ManualWarning from "../icons/ManualWarning";
import { withStyles } from "@material-ui/core";

import {Backdrop} from "@material-ui/core";
import get_svg_in_b64 from "../utils/svgToBase64Worker";
import TimeAgo from "javascript-time-ago";

const styles = theme => ({
    backdrop: {
        zIndex: 3000,
        color: "#fff",
        contain: "contents",
    },
    backdropContent: {
        display: "block",
        textAlign: "center",
        imageRendering: "optimizespeed",
        textRendering: "optimizespeed",
    },
    backdropContentImage: {
        width: "100%",
        maxWidth: 900,
        animation: "$enter 800ms linear 0ms",
        userSelect: "none",
        cursor: "pointer",
        "@global": {
            "@keyframes enter": {
                "0%": {transform: "scale(6)", filter: "opacity(0)"},
                "50%": {transform: "scale(6)", filter: "opacity(0)"},
                "75%": {transform: "scale(3)", filter: "opacity(.25)"},
                "100%": {transform: "scale(1)", filter: "opacity(1)"},
            }
        }
    }
});


class ManualDialogWarning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            open: props.open,
            updated: props.updated || Date.now(),
            _svg: null,
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
    }

    componentDidMount() {

        get_svg_in_b64(<ManualWarning ago={new TimeAgo(document.documentElement.lang).format(Date.now())}/>, (svg) => {

            this.setState({_svg: svg});
        });
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
            _svg
        } = this.state;

        return (
            <Backdrop className={classes.backdrop} transitionDuration={0} open={open} onClick={() => {this._on_request_close()}}>
                <div className={classes.backdropContent}>
                    {_svg && <img src={_svg} className={classes.backdropContentImage}/>}
                </div>
            </Backdrop>
        );
    }
}

export default withStyles(styles)(ManualDialogWarning);
