import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import actions from "../actions/utils";
import Fade from "@material-ui/core/Fade";

const styles = theme => ({
    root: {
        backgroundColor: "#000",
        color: "#fff",
        position: "absolute",
        width: "100%",
        "& a": {
            color: "#fff",
        },
        "& section > div": {
            display: "block"
        },
        overflow: "scroll",
        maxHeight: "100%",
        "& h1": {
            fontSize: "48px"
        },
        "& h2": {
            fontSize: "32px"
        },
        "& h3": {
            fontSize: "21px"
        },
    },
    inner: {
        minHeight: "calc(100% - 64px)",
        height: "100%",
        position: "relative",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
        textAlign: "left",
        margin: "32px auto",
        maxWidth: "800px",
        "@media (max-width: 832px)": {
            margin: "32px 16px",
            maxWidth: "calc(100% - 32px)",
        }
    },
    video: {
        aspectRatio: "16 / 9",
        width: "100%",
        height: "100%",
        margin: "auto",
    }
});

class Unknown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes
        };
    };

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    componentDidMount() {

        actions.jamy_update("annoyed");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    render() {

        const { classes } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <Fade in timeout={350}>
                        <div>
                            <div>
                                <h1><span class="highlight">PIXA'S</span> OMNIBUS</h1>
                            </div>
                            <nav>
                                <ul>
                                    <li><a href="#autonomous">Autonomous</a></li>
                                    <li><a href="#viable-system">Viable System</a></li>
                                </ul>
                            </nav>
                            <p>Hello everyone!</p>
                            <p>To address the multifaceted challenges of managing Pixa, we present our revolutionary solution: the Systemic Control Tower. This groundbreaking user interface, designed using systemic and cybernetic principles, serves as a central hub where everything can be seen, analyzed, discussed, and reported.</p>
                            <p>It empowers witnesses to be voted on, proposals to be made regarding the decentralized fund, and allows users to govern the platform collaboratively. This Omnia Omnibus approach enables every user to play a vital role in the dynamic governance process, ensuring that everyone has something valuable to contribute.</p>
                            <p>The Systemic Control Tower provides access to system attributes such as price feeds and metrics, as well as disruption reports and alerts. Additional features like Governance Action's Levier empower stakeholders to make impactful decisions by voting to elect 21 top witnesses, ensuring adaptability and resilience within the Decentralized Autonomous Organization.</p>
                            <p>It includes sections for User Discussions, Witness Voting, Fund Proposals, APR rate correction, Functionality Discussions, and governance dispute resolution. This innovative control panel is designed to help Pixa thrive for generations, enabling it to survive and evolve for over 1,000 years.</p>
                        </div>
                    </Fade>
                    <Fade in timeout={700}>
                        <video className={classes.video} width="1280" height="720" controls autoplay="true">
                            <source src="/src/videos/omnibus.mp4" type="video/mp4"/>
                        </video>
                    </Fade>
                    <Fade in timeout={1050}>
                        <div class="menu">
                            <h2>Autonomous</h2>
                            <a href="#user-discussions">User Discussions</a><br/>
                            <a href="#witness-voting">Witness Voting</a><br/>
                            <a href="#fund-proposals">Fund Proposals</a><br/>
                            <a href="#functionality-discussions">Functionality Discussions</a><br/>

                            <h2>Viable System</h2>
                            <a href="#system-attributes">System Attributes</a><br/>
                            <a href="#system-state">System State</a><br/>
                            <a href="#system-metrics">System Metrics</a><br/>
                            <a href="#system-goals">System Goals</a><br/>
                            <a href="#system-events">System Events</a><br/>
                            <a href="#system-steering">System Steering</a><br/>
                        </div>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Unknown);
