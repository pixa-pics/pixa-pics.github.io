import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import BarChartIcon from "@material-ui/icons/BarChart";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import ReceiptIcon from "@material-ui/icons/Receipt";

import { HISTORY } from "../utils/constants";

const styles = theme => ({

    AppBar: {
        position: "relative",
        zIndex: 1202,
        [theme.breakpoints.up("md")]: {
            borderRadius: 4
        }
    },
    appBarContainer: {
        position: "fixed",
        width: "100%",
        zIndex: "1300",
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(2),
            width: "calc(100% - 32px)"

        }
    },
    tabs: {
        "& .MuiTab-root": {
            minWidth: "auto"
        },
        "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.contrastText
        }
    },
    tab: {
        paddingTop: 14,
        [theme.breakpoints.up("md")]: {
            fontWeight: "bold",
            color: theme.palette.disabled,
            "&.Mui-selected": {
                color: "inherit"
            },
            minHeight: "inherit",
            "& .MuiTab-wrapper": {
                flexDirection: "inherit",
            },
            "& svg.MuiSvgIcon-root:first-child": {
                margin: "0px 12px 0px 0px",
            }
        },
        [theme.breakpoints.down("sm")]: {
            minHeight: "inherit",
            "& .MuiTab-wrapper": {
                flexDirection: "inherit",
            },
            "& .MuiTab-wrapper *": {
                display: "none"
            },
            "& .MuiTab-wrapper *:first-child": {
                display: "inherit"
            }
        },
    }
});

const VIEW_NAMES = [
    "balance",
    "transactions",
    "charts",
    "send",
    "receive"
];

class AppTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            tabs: props.tabs,
            classes: props.classes,
            _history: HISTORY,
            _view_name_index: VIEW_NAMES.indexOf(props.pathname.split("/")[3] || "") === -1 ? 0: VIEW_NAMES.indexOf(props.pathname.split("/")[3] || ""),
            _view_names: VIEW_NAMES
        };
    };

    componentDidMount() {

    }

    componentWillReceiveProps(new_props) {

        const { pathname, _view_names } = this.state;
        const new_pathname = new_props.pathname;
        const view_name = new_pathname.split("/")[3] || "";

        if(pathname !== new_pathname) {

            const _view_name_index = _view_names.indexOf(view_name) === -1 ? 0: _view_names.indexOf(view_name);
            this.setState({_view_name_index, pathname: new_pathname});
        }
    }

    _get_tab_props = (index) => {

        return {
            id: `coin-tab-${index}`,
            "aria-controls": `coin-tabpanel-${index}`,
        }
    };

    _handle_view_name_change = (event, view_name_index) => {

        const { _history, _view_names } = this.state;

        const pathname = _history.location.pathname;
        const _coin_id = pathname.split("/")[2] || "";
        const _view_name = _view_names[view_name_index] || "balance";
        const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

        const new_pathname = "/coins/" + _coin_id + "/" + _view_name;
        _history.push(new_pathname);
        this.setState({_view_name_index});
    };

    render() {

        const { classes, _view_names, pathname, _history, tabs, _view_name_index } = this.state;

        return (
            <div className={classes.appBarContainer}>
                <AppBar position="static" className={classes.AppBar}>
                    <Tabs value={_view_name_index}
                          onChange={this._handle_view_name_change}
                          variant="fullWidth"
                          selectionFollowsFocus
                          className={classes.tabs}>
                        <Tab {...this._get_tab_props(0)} icon={<AccountBalanceIcon />} label={<span>{t("words.balance", {TUC: true})}</span>} className={classes.tab}/>
                        <Tab {...this._get_tab_props(1)} icon={<ReceiptIcon />} label={<span>{t("words.transactions", {TUC: true})}</span>} className={classes.tab} />
                        <Tab {...this._get_tab_props(2)} icon={<BarChartIcon />} label={<span>{t("words.charts", {TUC: true})}</span>} className={classes.tab} />
                        <Tab {...this._get_tab_props(3)} icon={<CallMadeIcon />} label={<span>{t("words.send", {TUC: true})}</span>} className={classes.tab} />
                        <Tab {...this._get_tab_props(4)} icon={<CallReceivedIcon />} label={<span>{t("words.receive", {TUC: true})}</span>} className={classes.tab} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppTabs);
