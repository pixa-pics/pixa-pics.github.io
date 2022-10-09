import React from "react";
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
            renderer: props.renderer || "svg",
            loop: props.loop || false,
            hover: props.hover || false,
            autoplay: props.autoplay || false,
            useWebWorker: props.useWebWorker || false,
            path: props.path  || props.src || "",
            id: props.id || Date.now().toString(16),
        };
    };

    _set_ref = (comp) => {

        const {loop, autoplay, useWebWorker, path, hover, renderer, id} = this.state;

        import("lottie-web/build/player/lottie_light").then((lottie) => {
            lottie.loadAnimation({
                container: comp,
                loop: loop,
                autoplay: autoplay,
                useWebWorker: useWebWorker,
                path: path,
                hover: hover,
                renderer: renderer,
            });
        });
    }

    componentWillUnmount() {

        import("lottie-web/build/player/lottie_light").then((lottie) => {

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
