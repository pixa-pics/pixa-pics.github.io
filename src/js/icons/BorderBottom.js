
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class BorderBottom extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M5,15H3V17H5M3,21H21V19H3M5,11H3V13H5M19,9H21V7H19M19,5H21V3H19M5,7H3V9H5M19,17H21V15H19M19,13H21V11H19M17,3H15V5H17M13,3H11V5H13M5,3H3V5H5M9,3H7V5H9" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(BorderBottom);