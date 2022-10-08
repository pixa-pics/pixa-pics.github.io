import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core";

const styles = theme => ({});

class ImageFilter extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d=" M 19.941 7.791 L 18.77 5.067 L 15.937 3.814 L 18.77 2.588 L 19.941 0 L 21.113 2.588 L 23.946 3.814 L 21.113 5.067 L 19.941 7.791 Z  M 19.941 24 L 18.77 21.385 L 15.937 20.159 L 18.77 18.933 L 19.941 16.182 L 21.113 18.933 L 23.946 20.159 L 21.113 21.385 L 19.941 24 Z  M 7.982 19.805 L 5.476 14.438 L 0 11.986 L 5.476 9.535 L 7.982 4.195 L 10.516 9.535 L 15.964 11.986 L 10.516 14.438 L 7.982 19.805 Z " />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(ImageFilter);