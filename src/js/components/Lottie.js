import React from "react";
import JSLoader from "../utils/JSLoader";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
    player: {
        display: "inline-flex",
        verticalAlign: "inherit",
    }
});

class Lottie extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            style: props.style,
            loop: props.loop || false,
            hover: props.hover || false,
            autoplay: props.autoplay || false,
            path: props.path  || props.src || "",
            id: props.id || Date.now().toString(16),
        };
    };

    _set_ref = (comp) => {

        const {loop, autoplay, path, hover, id} = this.state;

        JSLoader( () => import("lottie-web/build/player/lottie_svg")).then((lottie) => {
            lottie.loadAnimation({
                container: comp,
                loop: loop,
                autoplay: autoplay,
                path: path,
                hover: hover
            });
        });
    }

    componentWillUnmount() {

        JSLoader( () => import("lottie-web/build/player/lottie_svg")).then((lottie) => {

            lottie.destroy(this.state.id);
        });
    }

    render() {

        const { classes, style } = this.state;
        const { id } = this.state;

        return (
            <div className={classes.player} style={style} ref={this._set_ref} id={id}></div>
        );
    }
}

export default withStyles(styles)(Lottie);
