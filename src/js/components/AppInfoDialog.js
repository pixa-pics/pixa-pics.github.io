import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";;
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const styles = theme => ({
    dialog: {
        [theme.breakpoints.down("xs")]: {
            "& .MuiDialog-container .MuiDialog-paper": {
                margin: "0px 0px",
                maxHeight: "100%",
                borderRadius: 0
            },
        }
    },
    dialogBody: {
        overflowY: "auto",
        display: "flex",
        flexDirection: "column"
    },
    breakAllWords: {
        wordBreak: "break-all"
    }
});

class AppInfoDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            open: props.open,
            _view_name_index: 0,
        };
    };

    componentWillReceiveProps(nextProps, nextContext) {

        this.setState(nextProps);
    }

    _on_close = (event) => {

        this.props.onClose(event);
    };

    _handle_view_index_change = (event, _view_name_index) => {

        this.setState({_view_name_index});
    };

    render() {

        const { classes, open } = this.state;
        const { _view_name_index } = this.state;

        return (
            <Dialog
                className={classes.dialog}
                open={open}
                scroll={"paper"}
                onClose={() => {this._on_close()}}
            >
                <DialogTitle>
                    {_view_name_index ? "Terms of Use": "Intellectual Property"}
                </DialogTitle>
                <div className={classes.dialogBody}>
                    <Tabs
                        value={_view_name_index}
                        onChange={this._handle_view_index_change}
                        indicatorColor="primary"
                        variant="fullWidth"
                        selectionFollowsFocus
                    >
                        <Tab label={"Intellectual Property"} />
                        <Tab label={"Terms of Use"} />
                    </Tabs>
                    <DialogContent className={classes.dialogBody} >
                        {_view_name_index ?
                            <DialogContentText>
                                <p>
                                    PIXA.PICS Terms of Use<br/><br/>
                                    Date of Revision: 23 August, 2023<br/>
                                    Carefully read these Terms before using this website ("Website"). By using this Website, you ("You") accept these Terms of Use. If You disagree with these Terms, do not use the Website. Your continued use of this Website after changes to the Terms constitutes your acceptance. Matias Affolter may modify these Terms without notice to You, so please check back frequently. If these Terms are unacceptable at any time, cease all use of this Website.
                                </p>
                                <ul>
                                    <li><b>LIMITATION ON LIABILITY AND DISCLAIMER:</b> <span>PIXA.PICS DISCLAIMS ALL WARRANTIES. NOT LIABLE FOR ANY DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE WEBSITE, EVEN IF ADVISED OF SUCH DAMAGES. NO WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE. IN NO EVENT SHALL PIXA.PICS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, ARISING FROM, IN CONNECTION WITH THE SOFTWARE OR ITS USE OR OTHER DEALINGS WITH THE SOFTWARE.</span></li>
                                    <li><b>Rule of Law and Platform Integrity:</b> <span>Any misuse of the rule of law against Pixa.pics to negate our standing, any illegal or harmful activities against human rights on our platform, or any illegal damage to our platform physically or through subversion of order will be met with appropriate response.</span></li>
                                    <li><b>Intellectual Property Protection:</b> <span>Pixa.pics reserves the right to take legal action against any infringement of intellectual property rights, including but not limited to copyright, trademark, patent, or trade secret violations.</span></li>
                                    <li><b>Content and Conduct Restrictions:</b> <span>Any blasphemous acts or content that disrespects or demeans individuals or communities based on their beliefs are strictly prohibited if they are against human rights. Pixa.pics will act against any behavior that violates this principle, upholding a commitment to respect and protect human rights.</span></li>
                                    <li><b>Governmental Interference:</b> <span>Pixa.pics reserves the right to resist any unwarranted censorship or intervention attempts from governmental bodies that are not in accordance with our terms of use and their crystal clear statements.</span></li>
                                    <li><b>Human Rights Policy:</b> <span>Pixa.pics adheres to all applicable human rights laws and maintains a zero-tolerance policy against activities that violate human rights or ethical standards. This includes, but is not limited to, exploitation, discrimination, or any form of violence or harassment. Even in the name of a belief system or human cause, any outrageous attempt to negate human rights is something we rightfully authorize ourselves to apply the same intolerance that "their" intolerance applies to us if not superior to it, legitimately.</span></li>
                                    <li><b>Disclaimers:</b> <span>Pixa.pics strictly operates with disclosed parties and explicitly disclaims all warranties regarding any actions or obligations not expressly stated within these terms or applicable laws.</span></li>
                                </ul>
                            </DialogContentText>
                            :
                            <DialogContentText>
                                <p>
                                    MIT License Copyright (c) 2021-2023 PIXA.PICS<br/><br/>
                                    Permission is granted, without charge, to any entity obtaining a copy of this software and corresponding documentation files (the "Software"), to deal in the Software without restriction. This includes the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to allow individuals to whom the Software is provided to do so, abiding by the following conditions: The preceding copyright notice and this permission notice must be included in all copies or substantial parts of the Software.<br/><br/>
                                    THE SOFTWARE IS DELIVERED "AS IS", WITHOUT WARRANTY OF ANY FORM, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.<br/>
                                    IN NO EVENT SHALL PIXA.PICS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, ARISING FROM, IN CONNECTION WITH THE SOFTWARE OR ITS USE OR OTHER DEALINGS WITH THE SOFTWARE.
                                </p>
                            </DialogContentText>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this._on_close()}} color="primary" autoFocus>
                           Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AppInfoDialog);