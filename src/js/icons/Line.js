import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Line extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M15,3V7.59L7.59,15H3V21H9V16.42L16.42,9H21V3M17,5H19V7H17M5,17H7V19H5" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Line);