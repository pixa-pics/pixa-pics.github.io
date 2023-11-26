import React from "react";
import { withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import actions from "../actions/utils";

import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import History from "@material-ui/icons/History";
import Image from "@material-ui/icons/Image";
import Message from "@material-ui/icons/Message";

const styles = theme => ({
    root: {
        textAlign: "center",
        overflow: "overlay",
        maxHeight: "100%",
    },
    profileCard: {
        backgroundColor: "#fafafa",
        width: 1152,
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
        maxWidth: "100%",
        position: "relative",
        margin: "32px auto 16px auto",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        "&:hover": {
            boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
        }
    },
    profileBanner: {
        width: "100%",
        height: 256,
        position: "relative",
        "&:hover > div > h3": {
            filter: "opacity(0)"
        },
        "&:hover > div > p": {
            filter: "opacity(0)"
        },
    },
    profileBannerImage: {
        width: "100%",
        height: "100%",
        background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAA0CAMAAABy1dzKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURaPW9oWypldrhPX031Gx81uCk26Xn2m87t3q9iah9qfRtJzAlmmcde7dtEuDbeXGlbCRd1/hoPIAAAOMSURBVFjD7ZbretsgDIYVD0zqJrPv/2qHJXQCkSZbtv6Zni7m9PFKMsKDj28z+I8mK9+GLqV80N8/Rhdjb0KkFHfA98tfQ/OvssD3HflP4LxjfWKTGAkfba5D+7B/n81bpmbS4D6ibe+96JHo4MBNwryHnJ4yEDKC3oJOr6D1XL2D/Qq6TO370P2NcL/v/oaY3BtP4W3Ce5OqwEOQEH3fU8TWYnoUOm35DLrwcjp+yp4Wk6nSkOzYDxOuy/FR/+4+7tYI7os0QysdEnancPlp/f1k72mT0ALMHOySCeUlS+nY9/uxH3IzfwT31MdDMmdR0dcr/UODqUvpOGrKb1uaXpNfBc15BCWTIRTm6DPj91tQKmgPamnYCThiRdchqANMl0wQudo93UbwD7RX4MARw9XA6VfmzPrjCG+HH2IwreQg6ga8GjajWzb84UTDEgvInm0kJUi4wXmzQ4ZNm9USO0KyYVt3ywyNR2RkX0c2B/IEuqvjMkn4yG1hs0fttGkOld2Rhe3fUogu19ioXKLQKe79KA/RmvAeTgcYTF2FcDegOrxQv0D7wC2ZLg/KNsRHTNAg6Kbb+UMSo8cX3KHrGQPJrEdJH8xobTIa2RROgB4CLR1YI1a0ec3yti26mV5HczRHCjH5CvatmlgFaRp2Ri76oLiGKIv7MPVox3DBwsRoz/QYzctMfRCjvz+9tUl4ZEHYMGQX6N4q55bmIwnu8rKR9z4FvkVsaP8PAIs2GaaiGq+xS7UNzRU0aesozpvdMJ72tVbtRl/vog6L1layEtosbtAaJh8r2cXApSISWC23LnpYrHb4RKCzdeacR61BrWzbxmM1Kyp3Wiu2aqs16I2dPefIaVx9WXPOpNhQvdEGLTryedTW5sWqT3GkBcnPKc7cvDQHt0x62tBtwPnptSh26li7QSg2CduW5ju/rG01G4xafT+qjrWg4syDOJ9V3+CiWT181K7ZqSdaYB/5tbIws0lz1RUX0+61TszqSAvMqvOLX1+7SzUaOp9tF0bkNdIyzKpjLfAcrRRU0+kQsiWcVX0JtHnx6kibG9ost73aX7S1UOIkrH517sWijrXQGixeRPvZjBomqoXSTPuN2k9ni1inXSrazWmePm/Nqv58mGULv7Be66m8w5IjbUV7p1oMWXTGTO5biEbLLEf9WY2GRm1eQP0RU4dRbGzxhhr1DUE3ZrOGR5Ze/Atgf5Vlt4TeBQAAAABJRU5ErkJggg==)",
        backgroundSize: "cover",
        backgroundPosition: "50% 90%",
    },
    profileBannerOverlay: {
        position: "absolute",
        top: 0,
        let: 0,
        width: "100%",
        height: "100%",
        transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        opacity: 1,
        background: "linear-gradient(to top, #000000a1 5%, #00000085 25%, #00000045 50%, #ffffff00 75%)",
        "@media (max-width: 700px)": {
            background: "linear-gradient(to bottom, #000000a1 5%, #00000085 25%, #00000045 50%, #ffffff00 75%)",
        },
        "&:hover": {
            opacity: "0"
        }
    },
    profileImage: {
        cursor: "pointer",
        height: 224,
        width: 224,
        background: "url(data:image/png;base64,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)",
        borderRadius: "50%",
        position: "absolute",
        left: "auto",
        marginLeft: 169,
        top: 224,
        transform: "translate(-50%, -50%)",
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        zIndex: 1,
        "&:hover": {
            boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
        }
    },
    profileInformation: {
        padding: "72px 16px 24px 16px",
        marginTop: 96,
        width: "100%",
        position: "relative",
        zIndex: 0,
    },
    profileName: {
        color: "white",
        pointerEvents: "none",
        margin: 0,
        left: 310,
        position: "absolute",
        fontSize: "48px",
        bottom: 40,
        transform: "translateY(0px)",
        transition: "filter 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        filter: "opacity(1)",
        "@media (max-width: 700px)": {
            left: "32px",
            top: "16px",
            bottom: "inherit",
        },
    },
    profileDescription: {
        color: "white",
        pointerEvents: "none",
        left: 318,
        margin: "12px 0px 12px 0px",
        position: "absolute",
        fontSize: "18px",
        bottom: 0,
        transform: "translateY(0px)",
        transition: "filter 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        filter: "opacity(1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 555,
        "@media (max-width: 700px)": {
            display: "none"
        },
    },
    profileCards: {
        width: 1152,
        maxWidth: "100%",
        margin: "32px auto 16px auto",
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
    },
    mediaCard: {
        width: "100%",
        position: "relative",
        marginBottom: 24,
        borderRadius: "4px",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        "&:hover": {
            boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
        }

    },
    media: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        position: "relative"
    },
    mediaOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 4,
        transition: "filter 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        background: "linear-gradient(to top, #000000a1 5%, #00000085 25%, #00000045 50%, #ffffff00 75%)",
        filter: "opacity(0)",
        "&:hover": {
            filter: "opacity(1)"
        }
    },
    mediaTitle: {
        fontSize: "16px",
        fontWeight: "bold",
        position: "absolute",
        margin: 14,
        bottom: 0,
        left: 0,
        color: "white",
    },
    profileTabs: {
        position: "absolute",
        left: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        contain: "paint size style layout",
        animationFillMode: "both",
        animationName: "$menu",
        animationDuration: "175ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "0ms",
        height: 72,
        display: "grid",
        "& .MuiTabs-scroller": {
            overflowY: "hidden",
        },
        "& .MuiTab-root": {
            minWidth: "auto",
            flex: "auto",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#050c4c",
        }
    },
    profileTab: {
        "@media (max-width: 700px)": {
            "& .MuiTab-wrapper": {
                fontSize: "10px",
            },
        },
        "@media (max-width: 400px)": {
            "& .MuiTab-wrapper": {
                fontSize: "9px",
            },
        },
        backgroundColor: "#fafafa",
            color: "#050c4c",
            transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .275s",
            "&.Mui-selected": {
            fontWeight: "bold",
                backgroundColor: "#dfddf2",
                color: "#050c4c",
                transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .175s",
                borderRadius: "4px 4px 0px 0px",
        },
        "&:hover": {
            fontWeight: "bold",
                backgroundColor: "#e8e6f5",
                color: "#050c4c",
                transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .175s",
                borderRadius: "4px 4px 0px 0px",
        },
        "&:first-child": {
            borderRadius: "0px 4px 0px 0px",
        },
        "&:last-child": {
            borderRadius: "4px 0px 0px 0px",
        },
        "& .MuiTab-wrapper": {
            fontSize: "11px",
        },
        "& .MuiTab-wrapper svg": {
            width: 32,
                height: 32,
                contentVisibility: "auto",
        }
    },
    mediaPriceUnavailable: {
        fontSize: "16px",
        fontWeight: "bold",
        position: "absolute",
        margin: 14,
        bottom: 0,
        right: 0,
        color: "white",
        textDecoration: "line-through"
    },
    mediaPriceAvailable: {
        fontSize: "16px",
        fontWeight: "bold",
        position: "absolute",
        margin: 14,
        bottom: 0,
        right: 0,
        color: "white",
    },
});

class Marketplace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _settings: JSON.parse(props.settings),
            tabValue: 0,
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

        actions.jamy_update("flirty");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    handleTabChange = (event, number) => {
        this.setState({tabValue: number}, () => {
            this.forceUpdate();
        })
    }

    render() {

        const { classes, tabValue } = this.state;

        return (
            <div className={classes.root}>
                <Card className={classes.profileCard} elevation={4}>
                    <div className={classes.profileBanner}>
                        <div className={classes.profileBannerOverlay}></div>
                        <div className={classes.profileBannerImage+" pixelated"}>
                            <h3 className={classes.profileName}>Sophia Julio</h3>
                            <p className={classes.profileDescription}>
                                Crypto Crusader | Educator with a Heart | Dog Mom Extraordinaire... Join me!
                            </p>
                        </div>
                    </div>
                    <div className={classes.profileImage+" pixelated"}></div>
                    <CardContent className={classes.profileInformation}>
                        <Tabs className={classes.profileTabs}
                              variant="fullWidth"
                              indicatorColor="primary"
                              textColor="primary"
                              selectionFollowsFocus={true}
                              value={tabValue}
                              onChange={this.handleTabChange}>
                            <Tab className={classes.profileTab} label={"pictures"} icon={<Image />} />
                            <Tab className={classes.profileTab} label={"comments"} icon={<Message />} />
                            <Tab className={classes.profileTab} label={"history"} icon={<History />} />
                            <Tab className={classes.profileTab} label={"followers"} icon={<ArrowDownward />} />
                            <Tab className={classes.profileTab} label={"following"} icon={<ArrowUpward />} />
                            <Tab className={classes.profileTab} label={"wallet"} icon={<AccountBalanceWallet />} />
                        </Tabs>
                    </CardContent>
                </Card>
                <div className={classes.profileCards}>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{384: 1, 768: 2, 1152: 3}}
                        gutter={"16px"}
                    >
                        <Masonry style={{gap: 24}}>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Business Roses"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Business Roses</span>
                                    <span className={classes.mediaPriceUnavailable}>150 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Gold Doberman"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Gold Doberman</span>
                                    <span className={classes.mediaPriceAvailable}>100 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Crystal Castle"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Crystal Castle</span>
                                    <span className={classes.mediaPriceAvailable}>100 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Portrait Sophia"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Portrait Sophia</span>
                                    <span className={classes.mediaPriceUnavailable}>175 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAuCAMAAACF+R5pAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA/UExURfS+hJQtNeyGWvLPl/Cjam4oMdlwSqpCQrRNP9JiTBYUHzAZJlMdLJZOQA4QXpJ6bRtLwcZ9XhEQM/LCl/DXpiZXb7oAAATeSURBVEjHfZeJoqowDEQpdkmlCFX//1vfTNKyel+uCyocpmm2Ozz+b9XXOs81BrxIrDPeA21WC/rR8XM8WM7Df5BDjVFCSLMIMSLzjjNz3fBNPlB/Yz8DmSKAljmpKGUqNJSwmx6b6DkbON+xH/wB6L2PMks1dYlLbOsNHVrCXAfe3QwaoDd3sQ0L2AfGEx7RiwclkiIq5WqlTGG4mse5lKpUw3ak3tdLjDVgjyCvhMOSCw/LNE2hDnfzvqp/sznh89mhHn/ig58pU/11hpJZ0i+kH0c/xiBNLLH9N/1Z6NR5X3rZBKvOlH9CyQU2hx27/YhH9C5i04uqVCIN3EIktJxRu1HsCKbkhu02Eiqjw0pm3ekGDYZMSURG/5eNsJh7HOxY3k9GAVT9qgppkzGJhVpc3KTdxWp45XzFRkBxbXKyhRGQLiGHUgPblVHfqG/ctW75dcNmEccNcz1/QLLU7HKT+YKG93xIVrWduvsWYvVkR9d2kPtlYcfntvJo1PgXNtlTD7tYDa1u3EP9tp8n/R4nuYctk5M1apmeYFF/zi7nGirqIANEfdNPtfc7Vv2ujjphwUQGVJRcnMpaUgsOJpc0qgHeHK32C6tbGo8+KArNaa41LKSFVHgz4JOFc1Pcrol/YaPsDoNUbE6oOTnUHLgCj+kJf0BsKhN8Tu8oN13F5nMuHrS6Jy+fQ4Ks59kmVkbg8ZiaJ9KZesKOB7cGUB0j+Mo0e08gu0lfkTFXsSdscwGllidOx54T+obZ6/v9er2mTfNkekNhmEsL3zhesAfqRNcFwJ9v4z0NyeeBXAKeWtscxWpi+At23OOqaBZgz96LkQBd7Sgsy3IAcxuDODwlMyMiQGdsltTcqmlErwZFwJ6vdV1N6kJ7TY37puTpmXShwPkbVgy7ZT6oM7HrysWfseQewKJh1qiGfWxiRWtUS3hGbVhqXQhcbb9W3sGwgdy3uYHFM+iW+Y6N2nTo2YY1qKTp+SK1VsV2wTgw7ILIKnv5cWnTiq3H1nW1xEorhThCgMEFxL6X9WCdujD+SqvLzIgsseeUTTUfxWYLA6Xm6JC3DbusywVba2It4EjnQivz6EdbB2LBGvzjgkXFSM8Jx/WLyeQLvWtTuL4CPkacxXoTtKI79uPx1NrYgYePYbVe0gUJafKcrDtgMd/v18IB7l3r95v5rVIToptdKsZrF87q20cLhByJxSEml8Qo0d6PGvttNtSaxzEnzJGAFglt9dc+j3Qbvn5zAmq4Ewvkz5fz3kC2JiOANK6fNAduoAfYgm9DA7GPPRBwnXBuocTMfn0oSdCPXeLq8YawRlCxIkb/YyRR7GPQ3UPu6gTAeLOZgBVJnZGBKvSmchkEDMTEzY2/Bh11AtXSy7n5k3L3Lmp1AmRRKCO7ZWJK1xA4qfVNbeY8YVi9UxssrFpmxxRsXb7lzEYd/HDDwsRiLYvNQIc5R/3QpgebB1LribE74McIqViLhN4xKGCfInXcomKtfE0twazZR+qJ29QOPo5tlDpRe1DsvtjGDMuBnXnD+j575BZWZ+4wjoc5y6aBeFX6Q+3nMNJkS5nLDF8P47Ai78yzXFawsWHVi3JX2xod77sPtMPtnOFYE6zpmNpRJ8kf2OMa9Z+hC9Rf1No/UH7os/9fWP/jo/9TrObAPxz/YTl6AlQKAAAAAElFTkSuQmCC"
                                    title="Eye Sophia"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Eye Sophia</span>
                                    <span className={classes.mediaPriceUnavailable}>100 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Blood Tempest"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Blood Tempest</span>
                                    <span className={classes.mediaPriceAvailable}>125 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Buddha Galaxy"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Buddha Galaxy</span>
                                    <span className={classes.mediaPriceAvailable}>100 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Peachy Classy"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Peachy Classy</span>
                                    <span className={classes.mediaPriceAvailable}>75 USDPixa</span>
                                </div>
                            </div>
                            <div className={classes.mediaCard}>
                                <img
                                    className={classes.media + " pixelated"}
                                    src="data:image/png;base64,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"
                                    title="Fashion Cop"
                                >
                                </img>
                                <div className={classes.mediaOverlay}>
                                    <span className={classes.mediaTitle}>Fashion Cop</span>
                                    <span className={classes.mediaPriceUnavailable}>75 USDPixa</span>
                                </div>
                            </div>
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
