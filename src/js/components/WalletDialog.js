import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField, Divider, DialogActions, DialogContent, Button, Dialog, Typography, MenuItem} from "@material-ui/core";
import SteemPaperWallet from "../utils/paperWallet";

import {t} from "../utils/t";

const styles = theme => ({

});


class WalletDialog extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            keepMounted: props.keepMounted || false,
            open: props.open,
            _username: "",
            _token_number: 666,
            _legal_name: ""
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState(new_props, () => {

            this.forceUpdate();
        });
    }

    _handle_username_text_change = (event) => {

        this.setState({_username: event.target.value.toString()}, () => {

            this.forceUpdate();
        });
    };

    _handle_legal_name_text_change = (event) => {

        this.setState({_legal_name: event.target.value.toString()}, () => {

            this.forceUpdate();
        });
    };

    _download_files = (_username, _legal_name) => {

        // Example usage:
        const wallet = new SteemPaperWallet(this.state._username, this.state._legal_name);
        wallet.generateKeys().then(() => {
            wallet.createPaperWalletImage();
            wallet.createJSONFile();
        });
    };

    render() {

        const {
            classes,
            _username,
            _token_number,
            _legal_name,
            open,
            keepMounted
        } = this.state;

        return (
            <Dialog open={open}
                    fullWidth={true}
                    disablePortal={false}
                    onClose={this.props.onClose}
                    keepMounted={keepMounted}>
                <DialogContent>
                    <Typography component={"h2"} variant={"h6"}>Generate a wallet for Pixagram</Typography>
                    <Divider />
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth={true}
                            label={"User's name"}
                            value={_username}
                            placeholder={"@stafford.beer"}
                            onChange={this._handle_username_text_change}
                        />
                        <TextField
                            fullWidth={true}
                            label={"Legal Name"}
                            value={_legal_name}
                            placeholder={"Stafford Beer"}
                            onChange={this._handle_legal_name_text_change}
                        />
                    </form>
                </DialogContent>
                <DialogActions style={{textAlign: "right"}}>
                    <Button variant="text" color="primary" onClick={() => {this._download_files(_username, _legal_name)}}>DOWNLOAD</Button>
                    <Button variant="contained" color="primary" autoFocus onClick={this.props.onClose}>{t( "words.close" )}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(WalletDialog);
