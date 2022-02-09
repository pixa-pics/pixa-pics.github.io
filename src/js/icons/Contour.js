import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Contour extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M22 8V2H16V5.8L14.4 8H9.6L8 5.8V2H2V8H4V16H2V22H8V20H16V22H22V16H20V8H22M11 10H13V12H11V10M4 4H6V6H4V4M6 20H4V18H6V20M16 18H8V16H6V8H7.1L9 10.6V14H15V10.6L16.9 8H18V16H16V18M20 20H18V18H20V20M18 6V4H20V6H18Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(Contour);