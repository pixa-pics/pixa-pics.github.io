import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Mirror extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M8.29 10.28L11.53 7.03L12.59 8.09L9.35 11.34L8.29 10.28M8.7 14.61L14.36 8.95L15.42 10L9.76 15.67L8.7 14.61M18 3V21H6V3H18M20 1H4V23H20V1Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Mirror);