import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Navigation);