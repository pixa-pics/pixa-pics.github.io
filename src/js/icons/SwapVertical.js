import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class SwapVertical extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(SwapVertical);