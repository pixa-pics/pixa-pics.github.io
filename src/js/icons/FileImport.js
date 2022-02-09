import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class FileImport extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M6,2C4.89,2 4,2.9 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13M10.05,11.22L12.88,14.05L15,11.93V19H7.93L10.05,16.88L7.22,14.05" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(FileImport);