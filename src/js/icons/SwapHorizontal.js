import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class SwapHorizontal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(SwapHorizontal);