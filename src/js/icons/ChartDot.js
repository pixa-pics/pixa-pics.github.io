import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class ChartDot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    isolation: "isolate",
                }}
                viewBox="0 0 20 20"
                width={20}
                height={20}
                x={this.props.cx - 10}
                y={this.props.cy - 10}
            >
                <g>
                    <circle
                        vectorEffect="non-scaling-stroke"
                        cx={10}
                        cy={10}
                        r={10}
                        fill={this.props.dotColor}
                        fillOpacity={0.33}
                    />
                    <circle
                        vectorEffect="non-scaling-stroke"
                        cx={10}
                        cy={10}
                        r={6}
                        fill={this.props.dotColor}
                    />
                    <circle
                        vectorEffect="non-scaling-stroke"
                        cx={10}
                        cy={10}
                        r={4.5}
                        fill="#FFF"
                    />
                </g>
            </svg>
        );
    }
}

export default withStyles(styles)(ChartDot);