import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Paint extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M18,4V3A1,1 0 0,0 17,2H5A1,1 0 0,0 4,3V7A1,1 0 0,0 5,8H17A1,1 0 0,0 18,7V6H19V10H9V21A1,1 0 0,0 10,22H12A1,1 0 0,0 13,21V12H21V4H18Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Paint);