import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class SquareSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M10,14V10H14V14H10Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(SquareSmall);