import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Download extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Download);