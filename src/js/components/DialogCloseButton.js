import React from "react";
import { withStyles } from "@material-ui/core/styles"

import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close"

const styles = theme => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 10,
    },
});


class DialogCloseButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes
        };
    };

    render() {

        const { classes } = this.state;

        return (
            <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.onClick}>
                <CloseIcon />
            </IconButton>
        );
    }
}

export default withStyles(styles)(DialogCloseButton);
