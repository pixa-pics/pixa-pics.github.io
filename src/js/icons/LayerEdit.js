import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class LayerEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SvgIcon {...this.props}>
                <path d="M4.63 10.27L3 9L12 2L19.94 8.17L12.5 15.61L12 16L4.63 10.27M10 18.94V18.11L10.59 17.53L10.63 17.5L4.62 12.81L3 14.07L10 19.5V18.94M21.7 12.58L20.42 11.3C20.21 11.09 19.86 11.09 19.65 11.3L18.65 12.3L20.7 14.35L21.7 13.35C21.91 13.14 21.91 12.79 21.7 12.58M12 21H14.06L20.11 14.93L18.06 12.88L12 18.94V21Z" />
            </SvgIcon>
        );
    }
}

export default withStyles(styles)(LayerEdit);