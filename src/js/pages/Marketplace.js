import React from "react";
import {Backdrop, Divider, ListItem, Tooltip, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Pagination from '@material-ui/lab/Pagination';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import History from "@material-ui/icons/History";
import Image from "@material-ui/icons/Image";
import Message from "@material-ui/icons/Message";
import PersonAdd from "@material-ui/icons/PersonAdd"
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import KeyboardArrowDownOutlined from "@material-ui/icons/KeyboardArrowDownOutlined"
import KeyboardArrowUpOutlined from "@material-ui/icons/KeyboardArrowUpOutlined"
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import CloseIcon from '@material-ui/icons/Close';
import Group from '@material-ui/icons/Group';
import Icon from '@material-ui/core/Icon';
import ImageEditIcon from '../icons/ImageEdit';
import SquareRoundedIcon from '../icons/SquareRounded';
import GamePadRoundIcon from '../icons/GamePadRound';
import StarCircleIcon from '../icons/StarCircle';
import Hashtag from '../icons/Hashtag';
import LinkBox from '../icons/LinkBox';
import PixaDollar from "../icons/PixaDollar";
import PixaCoin from "../icons/PixaCoin";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

import Drawer from '@material-ui/core/Drawer';

import {getImageDataFromBase64} from "../utils/computeMediaPost"
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import CanvasPos from "../components/canvaspixels/utils/CanvasPos"
import { createLocalBlob } from "../utils/objectURL";
import HexGrid from "../icons/HexGrid";
import get_svg_in_b64 from "../utils/svgToBase64";

import pool from "../utils/worker-pool";
import JSLoader from "../utils/JSLoader";
import actions from "../actions/utils";
import xbrz from "../utils/xBRZ";
import HexagonThree from "../icons/HexagonThree";
import CloudDownload from "@material-ui/icons/CloudDownload";

const styles = theme => ({
    root: {
        textAlign: "center",
        overflow: "overlay",
        maxHeight: "100%",
    },
    profileCard: {
        borderRadius: "4px",
        backgroundColor: "#fafafa",
        width: 1152,
        "@media (max-width: 800px)": {
            margin: "24px 0px 16px 0px !important",
            maxWidth: "100% !important",
            borderRadius: "0px !important",
        },
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
        cursor: "pointer",
        width: "100%",
        height: 256,
        position: "relative",
        "&:hover > div > h1": {
            bottom: "-60px",
            opacity: 0,
            transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "&:hover > div > p": {
            bottom: "-40px",
            opacity: 0,
            transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
    },
    profileBannerImage: {
        width: "100%",
        height: "100%",
        background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAABCBAMAAABKnkKvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURWPd9g1KrD/T9g2QxynP9hLG6THv9g0wjuDu9Ojvcg1xz+qIbqTm9hnG9hC89m+l3dQAAAQZSURBVFjD7ZQ9j9tGEIb3Lo4RpBusbSEwHBg6Q7Wp0fLai2Ooc5EslnAtHtmrUuuSOKRImcM1PhgGnHQpBTdOl+LKdP4J/hOej12K0ukMS2EqZ+yjyP149p13hjRPewrzX4GGnXj07xQ92Y9khtc17EVaB+nOzvPeICYNt8Wj3UFPhnuRNkBPb+JsxqdBm/XfhWQ+K6/PCDPsKf4HfdkgisO+QNvisC+Q6Q20K9zsE72BtpE/Of/O9BR/LX/thfPNy/vnL/oBwfK3fkAH73uR1Lw8+LDsBXR2cL+X3Jqzbx/cADrcFfT9dtBw+HAXr5szc7kFpB+Gh7uCzm941XYGLW/4Vl0brWvEvI5R8CXwTVEFAtWX58vqZx2udEFR0YaqrHWokLX1uKwNUFjE2iOHz71DFyq+b5qzcHnxtgo05apAwTd0cSU6WogaTn8YlEZq2Y+Bf533TdP88d3Fn1gzgAYL0hri2hrTJt4zro/QxAFayCcWhecpF0RRc3n+9q7MOvRBJZCcFAFXkRvKC2yOa1FgXtSs6PeLu4GEBAwVCSpQj3BeEyg9y8mPVqnxH83Segq1APE5gV77Dp58IuEkiLJs3eDrSEBdiXRcTjYEdss9b158/QqLumkwlHENnUIe+HgfoqmqSKiOtjupSYhUkR/ekKpfjJQq+RLFkBmS0mw8Q8woJWP5V52pKmohP2JdMTWOd7e5XLUPruCWCaGtmKKQnSFQZjPppDyEjiGFx5O/m+bq6sqY9ULIsdmYrALM+BIHjfYUQdhGMpR+qEToTk9i65O3ZWo8Sr3Ea2DLbEOej450DXU7FQa5fFwhOs7GgrNamg8Fu1uOZxl38axDA1bE9bfjMhXOy2oyw2eYWSkXdRX77FfbQIV0woxn3eTBEsZ5rhn3lJRaAFq44BUGuKYGYh+NS3LcsnkALmx6MIr2lxsDG6xOTai84SdgIeS237YaQV6obkraRAySJysDltuW/qd3HCD6TVMYBcVndSl+grQhdUcmA1s0XLcEmTlpEwXbdvaknNDzFHTrvYmcM4J0nmbQSrhzqkOYr/VSTA1P+YkyBGzfmNXHpdTKzFBh29UbMUDPzmIq6YFHobvLWkoJGNXak7xmRXx4poM21SKD9eZLH2Qal6UAndNgMGePpj/S7aTkCVo2XX3D29rI+0nT0yyVvNtAsKBgReT2Ke/Sq8X1LklEdR0PYDMUAwODqSipOseLudV2aQv2jP5JVqCSeeNCAjTPwWJuOGfGAn7F239ISxZzzAbxuBYrqExkzOVi8SRyKbUpyOgc8NZqK/CbkJDQbSr6BmadHECZ5JHosce6fjEfiDpEpbA+iPQkVdSeIOfD/sUhIwtI4UCObq2ht+BWxmtJZxQ/h38eQMsC3fAYj8XrxUe3WvlXGd1tzgAAAABJRU5ErkJggg==)",
        backgroundSize: "cover",
        backgroundPosition: "50% 75%",
    },
    profileBannerOverlay: {
        position: "absolute",
        borderRadius: "4px",
        top: 0,
        let: 0,
        width: "100%",
        height: "100%",
        transition: "filter 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms",
        filter: "opacity(1)",
        background: "linear-gradient(to top, #000000a1 5%, #00000085 25%, #00000045 50%, #ffffff00 75%)",
        "@media (max-width: 800px)": {
            background: "linear-gradient(to bottom, #000000a1 5%, #00000085 25%, #00000045 50%, #ffffff00 75%)",
        },
        "&:hover, &:active": {
            filter: "opacity(0)",
            transition: "filter 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
        },
    },
    "@global": {
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(1)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
        "@keyframes float": {
            "0%": {
                paddingBottom: "0px"
            },
            "50%": {
                paddingBottom: "5px"
            },
            "100%": {
                paddingBottom: "0px"
            },
        },
        "@keyframes sparkle": {
            "0%": {
                boxShadow: "0rem 0rem 0 0rem #ff8080, 0rem 0rem 0 0rem #ff1200, 0rem 0rem 0 0rem #ff6f6f, 0rem 0rem 0 0rem rgba(0, 0, 0, 0.26), 0rem 0rem 0 0rem #ff3073, 0rem 0rem 0 0rem #ff80b5, 0rem 0rem 0 0rem #ff8097, 0rem 0rem 0 0rem #ff8080, 0rem 0rem 0 0rem #ff9280, 0rem 0rem 0 0rem #ff8080, 0rem 0rem 0 0rem #ff3131, 0rem 0rem 0 0rem #ff5151, 0rem 0rem 0 0rem #ff0958, 0rem 0rem 0 0rem #ff8080",
            },
            "75%": {
                boxShadow: "0.32476rem -3rem 0 -0.1875rem #ff8080, -0.32476rem -2.625rem 0 -0.1875rem #ffed80, 2.54798rem -1.61656rem 0 -0.1875rem #ffed80, 1.84982rem -1.89057rem 0 -0.1875rem #a4ff80, 2.85252rem 0.98418rem 0 -0.1875rem #a4ff80, 2.63145rem 0.2675rem 0 -0.1875rem #80ffc8, 1.00905rem 2.84381rem 0 -0.1875rem #80ffc8, 1.43154rem 2.22414rem 0 -0.1875rem #80c8ff, -1.59425rem 2.562rem 0 -0.1875rem #80c8ff, -0.84635rem 2.50595rem 0 -0.1875rem #a480ff, -2.99705rem 0.35095rem 0 -0.1875rem #a480ff, -2.48692rem 0.90073rem 0 -0.1875rem #ff80ed, -2.14301rem -2.12438rem 0 -0.1875rem #ff80ed, -2.25479rem -1.38275rem 0 -0.1875rem #ff8080",
            },
            "100%": {
                boxShadow: "0.32476rem -3rem 0 -0.1875rem #ff808000, -0.32476rem -2.625rem 0 -0.1875rem #ffed8000, 2.54798rem -1.61656rem 0 -0.1875rem #ffed8000, 1.84982rem -1.89057rem 0 -0.1875rem #a4ff8000, 2.85252rem 0.98418rem 0 -0.1875rem #a4ff8000, 2.63145rem 0.2675rem 0 -0.1875rem #80ffc800, 1.00905rem 2.84381rem 0 -0.1875rem #80ffc800, 1.43154rem 2.22414rem 0 -0.1875rem #80c8ff00, -1.59425rem 2.562rem 0 -0.1875rem #80c8ff00, -0.84635rem 2.50595rem 0 -0.1875rem #a480ff00, -2.99705rem 0.35095rem 0 -0.1875rem #a480ff00, -2.48692rem 0.90073rem 0 -0.1875rem #ff80ed00, -2.14301rem -2.12438rem 0 -0.1875rem #ff80ed00, -2.25479rem -1.38275rem 0 -0.1875rem #ff808000",
            },
        },
        "@keyframes sparklewhite": {
            "0%": {
                boxShadow: "0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem rgba(0, 0, 0, 0.26), 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff, 0rem 0rem 0 0rem #ffffff",
            },
            "75%": {
                boxShadow: "0.32476rem -3rem 0 -0.1875rem #ffffff, -0.32476rem -2.625rem 0 -0.1875rem #ffffff, 2.54798rem -1.61656rem 0 -0.1875rem #ffffff, 1.84982rem -1.89057rem 0 -0.1875rem #ffffff, 2.85252rem 0.98418rem 0 -0.1875rem #ffffff, 2.63145rem 0.2675rem 0 -0.1875rem #ffffff, 1.00905rem 2.84381rem 0 -0.1875rem #ffffff, 1.43154rem 2.22414rem 0 -0.1875rem #ffffff, -1.59425rem 2.562rem 0 -0.1875rem #ffffff, -0.84635rem 2.50595rem 0 -0.1875rem #ffffff, -2.99705rem 0.35095rem 0 -0.1875rem #ffffff, -2.48692rem 0.90073rem 0 -0.1875rem #ffffff, -2.14301rem -2.12438rem 0 -0.1875rem #ffffff, -2.25479rem -1.38275rem 0 -0.1875rem #ff8080",
            },
            "100%": {
                boxShadow: "0.32476rem -3rem 0 -0.1875rem #ffffff00, -0.32476rem -2.625rem 0 -0.1875rem #ffffff00, 2.54798rem -1.61656rem 0 -0.1875rem #ffffff00, 1.84982rem -1.89057rem 0 -0.1875rem #ffffff00, 2.85252rem 0.98418rem 0 -0.1875rem #ffffff00, 2.63145rem 0.2675rem 0 -0.1875rem #ffffff00, 1.00905rem 2.84381rem 0 -0.1875rem #ffffff00, 1.43154rem 2.22414rem 0 -0.1875rem #ffffff00, -1.59425rem 2.562rem 0 -0.1875rem #ffffff00, -0.84635rem 2.50595rem 0 -0.1875rem #ffffff00, -2.99705rem 0.35095rem 0 -0.1875rem #ffffff, -2.48692rem 0.90073rem 0 -0.1875rem #ffffff00, -2.14301rem -2.12438rem 0 -0.1875rem #ffffff00, -2.25479rem -1.38275rem 0 -0.1875rem #ffffff00",
            }
        }
    },
    profileImage: {
        cursor: "pointer",
        height: 224,
        width: 224,
        background: "url(data:image/png;base64,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)",
        borderRadius: "50%",
        position: "absolute",
        left: 154,
        top: 224,
        margin: 0,
        transform: "translate(-50%, -50%) scale(1)",
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        animation: "$float 1000ms infinite cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transformOrigin: "center",
        zIndex: 1,
        "&:hover": {
            boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
            transform: "translate(-50%, -50%) scale(1.05)",
        },
        "& .MuiBadge-badge": {
            backgroundColor: '#51d106',
            color: '#ffffff',
            boxShadow: `0 0 2px 4px #51d106`,
            width: 36,
            height: 36,
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "18px",
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 0.7s infinite cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid #51d10699',
                content: '""',
            },
            '&::before': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.7s infinite cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid #51d106ee',
                content: '""',
            }
        },
        "@media (max-width: 800px)": {
            width: 192,
            height: 192,
            left: 128,
            top: 192,
            "& .MuiBadge-badge": {
                width: 32,
                height: 32,
                fontSize: "16px"
            }
        },
        "@media (max-width: 532px)": {
            width: 156,
            height: 156,
            left: 96,
            top: 168,
        }
    },
    profileInformation: {
        padding: "156px 16px 24px 16px",
        margin: 0,
        width: "100%",
        position: "relative",
        zIndex: 0,
    },
    profileInformationOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    profileInformationButtons: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    followButton: {
        margin: "16px 4px 8px 8px"
    },
    linkButton: {
        margin: "16px 4px 8px 4px",
    },
    settingButton: {
        margin: "16px 16px 8px 4px",
        transform: "rotate(0deg)",
        transition: "transform 720ms linear 0ms",
        "&:hover": {
            transform: "rotate(-72deg)",
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "9px !important",
            },
        },
    },
    profileName: {
        color: "white",
        pointerEvents: "none",
        margin: 0,
        left: 297,
        position: "absolute",
        fontSize: "48px",
        bottom: 40,
        transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        opacity: 1,
        "@media (max-width: 800px)": {
            left: "32px",
            top: "16px",
            bottom: "inherit",
        },
    },
    profileDescription: {
        color: "white",
        pointerEvents: "none",
        left: 305,
        margin: "12px 0px 12px 0px",
        position: "absolute",
        fontSize: "18px",
        bottom: 0,
        opacity: 1,
        transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 555,
        "@media (max-width: 800px)": {
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
    profileHistory: {
        width: 1152,
        maxWidth: "100%",
        margin: "32px auto 16px auto",
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
    },
    mediaCard: {
        cursor: "pointer",
        width: "100%",
        position: "relative",
        marginBottom: 24,
        borderRadius: "4px",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        "&:hover": {
            boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
        }

    },
    media: {
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        position: "relative"
    },
    mediaOverlay: {
        overflow: "hidden",
        "& > .top": {
            position: "absolute",
            textAlign: "left",
            left: 4,
            "& > button, & > button:nth-child(1), & > button:nth-child(2), & > button:nth-child(3), ": {
                opacity: 0,
                marginTop: -40,
                padding: 8,
            },
            "& > button:nth-child(1)": {
                transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 75ms",
            },
            "& > button:nth-child(2)": {
                transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 50ms",
            },
            "& > button:nth-child(3)": {
                transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 25ms",
            },
            "& > button": {
                transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }
        },
        "& > .bottom": {
            bottom: "-60px",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            opacity: 0
        },
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        transition: "filter 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        background: "linear-gradient(to top, #000000cc 25px,  #000000b8 50px, #00000096 75px, #0000001a 125px, #00000000 185px), linear-gradient(to bottom, #000000cc 20px,  #000000b8 35px, #00000096 45px, #0000001a 75px, #00000000 105px)",
        filter: "opacity(0)",
        "&:hover, &:active": {
            filter: "opacity(1)",
            "& > .top": {
                textAlign: "left",
                "& > button, & > button:nth-child(1), & > button:nth-child(2), & > button:nth-child(3), ": {
                    marginTop: 0,
                    opacity: 1,
                },
                "& > button:nth-child(1)": {
                    transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 25ms",
                },
                "& > button:nth-child(2)": {
                    transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 50ms",
                },
                "& > button:nth-child(3)": {
                    transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 75ms",
                },
                "& > button": {
                    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }
            },
            "& > .bottom": {
                bottom: 0,
                opacity: 1
            }
        }
    },
    mediaTitle: {
        position: "absolute",
        margin: 0,
        bottom: 0,
        left: 0,
        color: "white",
        textAlign: "left"
    },
    mediaTitleAuthor: {
        fontSize: "16px",
        fontWeight: "inherit",
        margin: "4px 0px 12px 12px",
        display: "block",
        "@media (max-width: 800px)": {
            fontSize: "14px",
        }
    },
    mediaTitleName: {
        fontSize: "21px",
        fontWeight: "bold",
        margin: "0px 0px 0px 12px",
        display: "block",
        "@media (max-width: 800px)": {
            "& .MuiTab-wrapper": {
                fontSize: "18px !important",
            },
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "16px !important",
            },
        },
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
        "@media (max-width: 800px)": {
            "& .MuiTab-wrapper": {
                fontSize: "10px !important",
            },
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "9px !important",
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
                borderRadius: "6px 6px 0px 0px",
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
    mediaMoney: {
        position: "absolute",
        margin: 12,
        bottom: 0,
        right: 0,
        color: "white",
        textAlign: "right",
        "& svg": {
            height: 24,
            width: 24,
            marginBottom: -4
        }
    },
    mediaPriceUnavailable: {
        color: "#ff3333",
        fontSize: "21px",
        fontWeight: "bold",
        "@media (max-width: 800px)": {
            "& .MuiTab-wrapper": {
                fontSize: "18px !important",
            },
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "16px !important",
            },
        },
    },
    mediaPriceAvailable: {
        fontSize: "21px",
        fontWeight: "bold",
        color: "#66ff33",
        "@media (max-width: 800px)": {
            "& .MuiTab-wrapper": {
                fontSize: "18px !important",
            },
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "16px !important",
            },
        },
    },
    mediaValue: {
        fontSize: "16px",
        fontWeight: "inherit",
        margin: "0px",
        display: "block",
        textDecoration: "none",
        "@media (max-width: 800px)": {
            "& .MuiTab-wrapper": {
                fontSize: "14px !important",
            },
        },
        "@media (max-width: 532px)": {
            "& .MuiTab-wrapper": {
                fontSize: "12px !important",
            },
        },
    },
    votes: {
        position: "absolute",
        margin: 0,
        top: 8,
        left: 8,
        "& .MuiIconButton-root": {
            color: "#fff",
            "&:hover::after": {
                content: `""`,
                position: "absolute",
                marginTop: 8,
                marginRight: 8,
                width: 8,
                height: 8,
                borderRadius: "100%",
                transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                animation: "$sparklewhite 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                animationFillMode: "both",
            }
        }
    },
    favoriteTrue: {
        position: "absolute",
        color: "#ff1200",
        margin: 0,
        width: "48px !important",
        top: 16,
        right: "12px !important",
        left: "auto !important",
        borderRadius: "100%",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&::after": {
            content: `""`,
            position: "absolute",
            top: 20,
            right: 20,
            width: 8,
            height: 8,
            borderRadius: "100%",
            transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            animation: "$sparkle 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            animationFillMode: "both",
        }
    },
    favoriteFalse: {
        position: "absolute",
        color: "#ffffff",
        margin: 0,
        width: "48px !important",
        top: 16,
        right: "12px !important",
        left: "auto !important",
        borderRadius: "100%",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    iconCount: {
        color: "white",
        marginLeft: 4,
        fontSize: "16px",
    },
    location: {
        color: "#05009d",
        position: "absolute",
        top: "72px",
        right: "24px"
    },
    actions: {
        position: "fixed",
        bottom: 16,
        right: 16,
        "& .MuiButtonBase-root.MuiFab-root": {
            borderRadius: 8,
        }
    },
    actionButton: {
        borderRadius: 4,
        "&.MuiSpeedDialAction-fab, &.MuiSpeedDialAction-fab .MuiSvgIcon-root": {
            color: "white",
            width: 48,
            height: 48,
            padding: 14
        }
    },
    timeLine: {
      "& .MuiTimelineOppositeContent-root.MuiTimelineItem-oppositeContent": {
          maxWidth: 96
      }
    },
    timeLineTime: {
        fontWeight: "bold"
    },
    timeLineDescription: {
        color: theme.palette.primary,
        textAlign: "left"
    },
    drawerPaper: {
        position: "absolute",
        "@media (max-width: 800px)": {
            width: "100% !important",
        },
        width: 384,
        textAlign: "left",
        "& h1": {
            display: "block",
            margin: "12px auto"
        },
        "& h2": {
            display: "block",
            margin: "8px 16px"
        },

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        "&.MuiBackdrop-root": {
            backgroundColor: "rgba(1,2,18,0.92)",
        },
        "& .MuiIconButton-root": {
            color: "white"
        }
    },
    leftFromDrawer: {
        position: "absolute",
        left: 0,
        top: 0,
        display: "block",
        height: "100%",
        width: "100% !important",
        pointerEvents: "none",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        perspective: 200,
    },
    fullCard: {
        borderRadius: 8
    },
    colors: {
        flexFlow: "wrap",
        placeContent: "stretch flex-start",
        margin: "8px 14px 8px 14px"
    },
    drawer: {

    },
    list: {
        "& .MuiListItem-container": {
            lineHeight: 32,
            height: 32
        },
        "& .MuiListItemText-root span": {
            fontWeight: "bold",
        },
        "& .MuiListItemSecondaryAction-root": {
            color: theme.palette.secondary.main
        },
        "& svg": {
            height: "24px",
            verticalAlign: "middle"
        }
    }
});

class Marketplace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _settings: JSON.parse(props.settings),
            tabValue: 0,
            images: [
                {
                    src: "data:image/png;base64,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",
                    name: "2KAude",
                    money: <PixaCoin/>,
                    price: 2000,
                    value: 66.9,
                    sold: false,
                    favorite: true,
                },
                {
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAACuBAMAAADDtO44AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURWcgOqEpQRcUN+XTs+WrdstNSdrexOm+mWIZO9xpSN96ZzwfSsQoOx6bvJI9OxdxvkPSgJgAAA9gSURBVGjetNddaFvXHQDw/1Uqczd1qa5BnfNBJt9kwsHL0u4qEnkp7nws9/rB6GY5CcpMcH2V07g0gyItdwl7uHUXqq4lJEbKdj1jKLUxEWGMPISBMKZbPqkeRh/MXkTkNh4rAz1ssDfj/c+5Vx9OrJt1sPuQIOv+9P8459xzLqj/yxWF/xNjjE19Y8bENfXNWIzFE6y2A/RlMcaKtK6u1Z5xvoy9SYcbC3V4qfbvte3OjzFmlRp41eE7R2rb4/kwxuL6fKOxMXIWQH0qTz+WJWRho7E+Mg7ojmxz3RljZny8Md5oPCEEobryX7EYMzW8f3yjUY+Tkd0QWOksrytjjEAG7CAye5yQdCBwhw/Ic1n2dZ04C7J6ogFReIEE1FAUAs143dhBNpHSdAebPwPo1ENkBOBLzH3Kl8XeuZuK6wtnQYagkpYDA4FDAAFVDTBfxh4RTdMXdkOElmkkkrbtX70RiKrRfjdcNzZdHDY1ne6GDStvWWM0LNsjQ2pAhZhftJhDtIR2fCEqLeeYpllkLM1TnBmwe/yiHSpijhqOctC6yLQksiXhnsMuOcPITtYhuJxAlh8tl6ixWjs/AF/6MaeISjtWB2ohw2Blahira6wADdadxZxhjGbGBTN5MGooimDgy3SsLTcJcMbSMEcMpgj2Vwj+rTvLFosYLXH6KzjNGTbEcNkkBHt8mEOQDScmwchxVnZZjU0GfhjrzqbdaMcupt1oojTB1Oip7uySQ7C2bGaSWlZOS45uY1NdmcPZW4ylz+S0Nvse1nbEXQM7shiy4USCAZzOaRZ28nKTXahFfZjuFIdTLJgOLmNHEizZwVR/RhLnfjFCl3GumGm1X3RSEUztykwdk8zO35WoxedYsldVFXGxFT/GdAwG89URPke05LuG50K3VUySdWXHCZmU//xLHQc96VQfqgV0khKOqiu1Ly50Zw5JzcL9apFgR66DGlOjJ9T+fVj0BV9WJMw+MF+9nx9NmJcx0qAqRaQ9qnp7s/YF685+Q86v1w9Xf5InOTP+yczWPwcKkfAsfuPHYmY8VW+ksxN382QUZySo8kw4kplVp45u1WpsyoddJXZCe5QnJJckQwEbpAjFaMjW/Jj5JC4fHNYJ0YlFXjcAWWY2tLq16e0fO7E7JjmvHZejuVvIioSUlTAANWYH/VmPmRrSXpFV7cVlojuOw0c6svzqbMWfMXbxijYE6q7qgzxnwg0fm61sbW2usa6PIGay97XdV9XDDz+wiKe+m3tVfR7Lsl053HZjhfeTGO46Z3uH3963usUb2Z1pb2oEZPzyoOaxyH3t7V5emnc+2YHFmDap6fCG+q8fPNDyRDDj5Vff3dfuyM7R4q9kx//+WzXWr2hx4pQwWCTT29/rsm4bVdRMpOO45conBvpwavGWGAbtVXHYmjnumKTJKFkAiJ6K9n1qkTnHwGj0p5XnslQPWQj2vfcA5A84w+d/pvpoEPvfzHEnxljylJ7+EN4r1iUpT8oONfZ8Vq1+zvvvc8CIsXdM/SwErtC6FD6p3yzRyO8qKi8NB7v7caaHncs6sjGjZJA9GEOmTFSr1cEtf8bMUna+DgOnlyLB/fKZmyUjQvdX99/mbMqP3dXvHYbbKiulw/KvnRKlilH9/Lkscd+5lw5IWn6aqnKBUmpE+mawj8hUP3bDmZVm9mj5442QGpXQRWBw5XHNlx1k09PzL0JU0/LZYtD4k3pl7qahDN6ubT6u/bg762fTjnNthm++WfJ19bOAurccMfat1jZrNZ9j6CQjDsh4dtXyJpm/fsUIq9iTfbVa7XHtR36s6NQT4qDF4kNBWjJ6v28oR1Ft+UXrMfUbjCtk00N7x0q4cF46ioVhNNaVxVLTCaHw0cqyx84QnZZAWdkU0RLdmHiBwm5wZZmMfcsil2iJ4imZs1QXhmdv7AUmaBEySpAFk3myhCOXfpld2GwtgKcYrplRK5cUCq8sYy/w4x1OL6qEKu673LOMMdxiLHERPAsuxhOpXZzhIqDGgX9UKqs7PbnwJQ8L8liZZuZeSyW+bWGV3JXougKhysqzGxUzhRK1EczLOX7DDFrWKMmXeXkNRQmHKpU7T22LMZYk/IjFL+vntLFBz32lBzFXwsNN0LPr+MCESoWvng6Gb3luLH6oWMLXPfqzJ3q9XF7ELPGoTM/yh3oYE2XbmdnB6PqBDfraSV1ynMXRPOFNaXCGr3IhPD51sqTVcnnMqLGxkBmvbziL2JSbtNRYb7KVTsaD4dTgI5DTLuNP89fS8fRGZjGXHFtyK+PbKkBlrZMlvUFGqOl40wFkI9eCXy9rgileMBtCd6ZaLIYNwRN4WUBraR0EK13bnVnW4mNL95qVyYUCrHYwk4+x47huSQGJZ7lxTcIk82N8sIXizK60Gc9xjOKWy8eJUCxCFHcNNop8VmJpAE0WWmszzFHP8A2+7DFJZAlBPGIQ3HXCLVYI3WkykWOJR8OBIuS6jHcIZgczgnlKMHtlssl4HzPKNqaIaBLFz7daDDirNJnoI+0TWc6RMaNge8UBTGCWv28zUdxfPMZzXDLCe1ymG9hmdwjAjszxaADtcC0WewtnSMmAD0WWRA/jd6IndRsimSJnst0K12KMv0fSJlscQVYQbJ2zOc54/Ga4kNdJJtazAh8783TCWbzZVxBZ8hxBwT/cWpfbTC6E/gBe+/ksVyBYvYerevGWjN8JZvOjJP6OxwrbmMixZCi2jIufPpor2eIO7MlVcQKdcxTBsCwJZ0uLWbw0RcFCkGWc69BkPJqSycx7zLb54pFdJqbIkmB8nlPH8JjSsHHclQjuA6JY8TcFZHAZf3bj20+fjTngCctJtxjeglk+omGPSd5CgI4cMQc3XLjNgGdJSx6TpeYS96ZIGV+1CrYti0Vsb2OYpRfN7mRujvixAA/BFrmDmBSKsi7+lw4YgslYqbfIwZ3Gl6lgYPNUbI9JHsN7xfjjrGozt4/8dfBjLrzZIP7Fct1PvP98xXzUwfg0/gQ/7a/ek9vzHCQernN14g+6jP/R7aMiGO2Y5qCIcB2IM7nFMMfRJZc9LLSY7bFwB7Plj1qt5H28LF50lWqhxfjAgjsnvCeBYJUWEzk2WVlu5dhk4TYD+Y8t1pFj6D9tmc9rG0cUx0cENW4FYRcjUOtcbDdyS+hpjQU9hXqLsE4SeAsCHUxsFPCpEMFSn2RCqUA9BGo1rOxDQyuK9mSEbdoOwjJUNCJ76qGXon+jt0Dfj5nZXdn2RUj67Pc7b978eE9f/jJUYpguAvM94bKtMRtW4TPfx0kDrbey8vNm22AWaGTivRj9JzCVWCAmL7adHeUJxZbSGL5/Lo7VxKFHxKKZvNg/eKLEMuiRMSuByRijxAKxU+k6B0FBTRp5TGFt3A0wZxVmxLa3Tvp0GFEoYAegZycxyRi85ZepqxG9lBeOG/QH6IWGhDHQljoaa2tMeZydAvbF2mEIn7IRHMzxA8J0/Dvdc52UnPxRIKUDl9NmWBUd+oTSM+PZapS8cclzPd+VHouN1vFK2wxrS98T1mHsRmO4ByawUImpk+fwjDsqBZr3Bzhua0lj7RgbKDHTYmGMl2c2jXVjDMUaWgyxG/LISZanKC911Gx3r//WU4kb4ywYGax1E3tsL2Ljpx1OSkFipwmMBleg3avDWIE9is64+fSTGJvFHhGLItgpO5QtBiNxuP5AzaMxLyG2VmwFgFkwcpjeY4PRMhhBabSa4fmGejUhprClY48wjGQnU2Cx7hhvkrbC8kmxteImYFYWTmQ4kI7hav0QNmmFfYbXZI1BQNYWMOFW6jGGpyF6lPMkFiU9rq0h5rQq9QZgbaVGYgpbZSw/S3ok7IXjhoR9W+81IsEUnKHvCLMIi2ZvU/VKKZg6rjsM4JBbyvYBmwg+CLRaPsPYaAH7quRibQ/u3u8PoeLm4wfjTxVHtkrY6UKX8QyqCFQD7CMXsQmfXd0xV7TZKp4oM7lQ0v64iTf4YAo73gfuzhnJ4VLX2CMPsWC0WAk72MoJpnkhdt1AYbD7d681VrsDK2JrHTG4Lu+CKruEs4aShLAqLJzT0WK9iA0gxk7gBWBvMEV+g1XDtVsP7x+nt8RK1EuLbibZMrhFl7DntmVXF8J1T1SFvFsMsVmZumrEdcdStwaw5hSj2xR14M6ixpQxWhK563819ugWVmzuw1wHjOU/9BkDZSs3nmvsU8Ru/57FGHz3T40FUU1IU6x/HCxgTQy+xs6iXb+lX3sgp7HVQRprkkWNBdFfJTXOoNer5camN7PTqKYqYRZzd4Ys8YoeQmTds6TBvqlPRMpiibGQ5X7Y5ILO7UORWZXX2uVh76VIi1HB6CrsVUthbghczsht9qrJSlg1E7Bg5uoj/guHXhW3ScYGMUZNiJKS48ElMCihayaWmzsGu6LWhaMK1FCplVvwz9zQWxn9x3KtisHQoqN7HoBBLdeP+xIoZ1t6xp8ZTIkR16JuQD3ocw/EZ+Pha1uqqduo/CTSYtpmCNgJdyUUV3ltQ16S3IarsJGhlBxg0a5+DPdPBvaKnJOcxh5fpTDfLYewQfadmHPdowEMbkytRo3JBEXdknKl1/CC2DZ1a7yaktPY1QLWKlcGDW+awo7wFycOykbrCWKPi/u3sZ7B2DaoedYKBWVdYSmxBPY8DlI5DKFkyZHLImPao5oFxMLB1JtsGZMYW1QTtOoUpjxuxZgP3/EmpcRMHkEyI4aZojAltoBNo89ZX3kcYFdUoMviwdd3Yi5j+1sKc91WiF2kPLZ05k3GTBy3tKcyRLuhMSzTII5DbN0KK4edNcLec+4IZL0RRdtbmOCxWM3LWOiSsWT4943HWhTdQywW8/LVDE1B8wBDsp+abPgaeuzZgDmx2AA9VrEdB3nZBLUifPQ8lZF+WPc8wJb5KUiRmAeYwO6fxnwTEp1HNTuaIMYWeWQelkvymjG07ycXGzUIb+zozbJDGydQgRETUr7D34YBM607onxMI7iRRyvL3LkNwyGLUR8ppzAnxny2hN11wHL3KR6GqnILD0O5J4q0np6bXatCPUy8ree+wzeURU+JITYHbN3RjUJaVpjpdbp82rn7LIZUQ4txTPbEPcZob2txOkypDLS7f2DflSxCPOgSgzdoOZr/sycgIqZPqykSK+R+V4cGUTWu6NoQSsQcOPs0VeZ5ZbFC7hJHyrFHi1xGYLsXMZ9ambinpijb6l7+qnKR3+MKqY1dYsbMcQSx77FF+Fb3MqT0eOjhwJSYwv4HIVYeXLv1hKQAAAAASUVORK5CYII=",
                    name: "What about...",
                    money: <PixaCoin/>,
                    price: 301,
                    value: 19.25,
                    sold: false,
                    favorite: true,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "Walk In Nature",
                    money: <PixaCoin/>,
                    price: 200,
                    value: 14.01,
                    sold: false,
                    favorite: true,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "Gold Doberman",
                    money: <PixaCoin/>,
                    price: 150,
                    value: 14.22,
                    sold: false,
                    favorite: false,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "Crystal Castle",
                    money: <PixaCoin/>,
                    price: 110,
                    value: 19.96,
                    sold: true,
                    favorite: true,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "My Portrait",
                    money: <PixaDollar/>,
                    price: 170,
                    value: 88.14,
                    sold: false,
                    favorite: false,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "Sunshine Pink",
                    money: <PixaCoin/>,
                    price: 150,
                    value: 2.33,
                    sold: false,
                    favorite: false,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "BUddha Head",
                    money: <PixaDollar/>,
                    price: 90,
                    value: 12.19,
                    sold: true,
                    favorite: false,
                },
                {
                    src: "data:image/png;base64,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",
                    name: "Peach n Classy",
                    money: <PixaDollar/>,
                    price: 70,
                    value: 5.43,
                    sold: true,
                    favorite: false,
                }
            ],
            isSpeedDialOpen: false,
            actions: [
                { icon: <StarCircleIcon />, name: 'Feed' },
                { icon: <FavoriteOutlined />, name: 'Saved' },
                { icon: <Hashtag />, name: 'Explore' },
                { icon: <Group />, name: 'Communities' }
            ],
            openedMediaData: null,
            openedMediaDataData: {},
            history: [
                {
                    time: "11:36 AM",
                    event: "Commented on @lena666's post named \"A Dance History\""
                },
                {
                    time: "11:34 AM",
                    event: "Bought an NFT from @caspericks (USDPIXA 76.00)!"
                },
                {
                    time: "11:31 AM",
                    event: "Transferred 26.50 PIXACOIN to @lena666 with a memo."
                },
                {
                    time: "10:56 AM",
                    event: "Received 24.50 PIXACOIN from @jah.math."
                },
                {
                    time: "10:44 AM",
                    event: "Modified a comment on @lena666's post named \"A Great Paradox\""
                },
                {
                    time: "10:41 AM",
                    event: "Commented on @lena666's post named \"A Great Paradox\""
                },
                {
                    time: "10:36 AM",
                    event: "UpVoted (100%) on @lena666's post named \"A Great Paradox\""
                },
                {
                    time: "08:00 AM",
                    event: "Claimed reward for posting 20.55 PIXAPOWER and 12.69 USDPIXA."
                },
                {
                    time: "07:56 AM",
                    event: "Commented on @primerz's post named \"Follow MeStory\""
                }
            ],
            openedDrawer: (window.innerWidth < 800) ? false: true
        };
        this.canvas_pos = Object.create(CanvasPos).from(32,  32,  0.666,  0, 0, 0);
    };

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    componentDidMount = () => {
        this.canvas_pos.set_notifiers(
            this.requestForceUpdate,
            this.closeMediaCard
        );
        this.canvas_pos.set_boolean_move_on_click(true);
        this.canvas_pos.set_perspective(true);
        this.canvas_pos.init_speed_interval();
        actions.jamy_update("flirty");
        window.addEventListener("resize", () => {this.setRefFromLeft()});

        var style = `.Canvas-Wrapper-Overflow.Shown {
                animation-name: canvanimation;
                transform-origin: center center !important;
                animation-fill-mode: both;
                animation-duration: 350ms;
                animation-delay: 0ms;
                animation-timing-function: linear;
            }
            .Canvas-Wrapper-Overflow .Canvas-Wrapper::after {
                content: "";
                position: fixed;
                width: 100%;
                background: linear-gradient(to top, #ffffff00 0%, #1700ff14 14%, #1700ff57 21%, transparent);
                height: 50%;
                left: 0;
                z-index: 2;
                top: 100%;
            }
            .Canvas-Wrapper-Overflow.Shown .Canvas-Wrapper::after {
                animation-name: canvanimationscan;
                animation-fill-mode: both;
                animation-duration: 675ms;
                animation-delay: 525ms;
                animation-timing-function: linear;
            }
            .Canvas-Wrapper-Overflow.Not-Shown {
                animation-name: canvanimation;
                transform-origin: center center !important;
                animation-fill-mode: both;
                animation-duration: 300ms;
                animation-delay: 50ms;
                animation-timing-function: linear;
                animation-direction: reverse;
            }
            @keyframes canvanimation { 
                  0% { transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.0); will-change: transform, filter; }
                  4.3% { transform: matrix3d(0.136, 0, 0, 0, 0, 0.271, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.2); will-change: transform, filter; }
                  8.61% { transform: matrix3d(.729, 0, 0, 0, 0, .818, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.8); will-change: transform, filter; }
                  12.91% { transform: matrix3d(1.146, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.9); will-change: transform, filter; }
                  17.22% { transform: matrix3d(1.22, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  28.33% { transform: matrix3d(1.046, 0, 0, 0, 0, 1.031, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  39.44% { transform: matrix3d(.988, 0, 0, 0, 0, .991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  61.66% { transform: matrix3d(1.002, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  83.98% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: initial; } 
            }
            @keyframes canvanimationscan { 
                  0% { top: -50% }
                  100% { top: 100% } 
            }`;

        var canvas_style = document.createElement("style");
        canvas_style.innerHTML = style;
        canvas_style.id = "media-style";
        document.head.appendChild(canvas_style);
        window.addEventListener("resize", this.updateDimension);
        this.setState({_h_svg: createLocalBlob(get_svg_in_b64(<HexGrid color={"rgba(1,17,255,0.1)"}/>)),_h_svg_size: `${Math.ceil(.5*200)}px ${Math.ceil(.5*229.3)}px`}, () => {
            this.forceUpdate(() => {

            })
        });

        setTimeout(() => {
            this.forceUpdate(() => {
                this.setRefFromLeft(null);
            });
        }, 1000);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    updateDimension = () => {
        this.setRefFromLeft(null);
    }

    handleTabChange = (event, number) => {
        this.setState({tabValue: number}, () => {
            this.forceUpdate();
        })
    }

    toggleFavoriteAtIndex = (index) => {

        let images = this.state.images;
        images[index].favorite = !images[index].favorite;

        this.setState({images}, () => {
            this.forceUpdate();
        })
    };

    handleSpeedDialClose = () => {

        this.setState({isSpeedDialOpen: false}, () => {
            this.forceUpdate();
        })
    };
    handleSpeedDialOpen = () => {

        this.setState({isSpeedDialOpen: true}, () => {
            this.forceUpdate();
        })
    };

    requestForceUpdate = () => {

        this.forceUpdate();
    };

    renderMedia = (type, data, colors) => {

        const callback = (second_image_data) => {
            let third_canvas = document.createElement("canvas");
            third_canvas.width = second_image_data.width;
            third_canvas.height = second_image_data.height;
            let third_canvas_ctx = third_canvas.getContext("2d");
            third_canvas_ctx.putImageData(second_image_data, 0, 0);
            let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
            this.setState({src: base64_out}, () => {
                this.forceUpdate();
            })
        };

        switch (type) {
            case "pixelated":
                this.setState({src: this.state.openedMediaData.src}, () => {
                    this.forceUpdate();
                })
                break;
            case "xbrz":
                JSLoader( () => import("../utils/xBRZ")).then((obj) => {
                    obj.default(data, 6, pool).then(callback);
                });
                break;
            case "hex":
                JSLoader( () => import("../utils/hexagonrender")).then((obj) => {
                    obj.hexagonrender(data, 12, true).then((out) => {
                        this.setState({src: out}, () => {
                            this.forceUpdate();
                        })
                    });
                });
                break;
            case "svg":

                //var url = depixelize(data, 12, 0.70);
                //var b64 = "data:image/svg+xml;base64," + btoa(svg_source);

                 /*this.setState({src: url}, () => {
                    this.forceUpdate();
                });*/
                JSLoader( () => import("../utils/xBRZ")).then((obj) => {
                    obj.default(data, 6, pool).then((imageData) => {
                        JSLoader( () => import("../utils/image_tracer")).then(({image_tracer}) => {
                            var scale = 6;
                            image_tracer(imageData, {
                                // Palette
                                pal: colors.map((c) => {
                                    const r = parseInt(c.slice(1, 3), 16);
                                    const g = parseInt(c.slice(3, 5), 16);
                                    const b = parseInt(c.slice(5, 7), 16);
                                    const a = parseInt(c.slice(7, 9), 16);
                                    return {r, g, b, a};
                                }),
                                // Tracing
                                corsenabled : false,
                                ltres : scale,
                                qtres : scale,
                                pathomit : scale,
                                rightangleenhance : false,

                                // Color quantization
                                colorsampling : 2,
                                numberofcolors : 512,
                                mincolorratio : 0,
                                colorquantcycles : 1,

                                // Layering method
                                layering : 0,

                                // SVG rendering
                                strokewidth : Math.ceil(scale/2),
                                linefilter : true,
                                scale : 1,
                                roundcoords : 2,
                                viewbox : true,
                                desc : false,
                                lcpr : 0,
                                qcpr : 0,

                                // Blur
                                blurradius : scale,
                                blurdelta : scale*4

                            }, pool).then((svg_source) => {

                                this.setState({src: "data:image/svg+xml;base64," + window.btoa(svg_source)}, () => {
                                    this.forceUpdate();
                                })
                            });
                        });
                    });
                });
        }

    };
    openMediaCard = (img) => {

        this.setState({openedMediaData: img, src: img.src}, () => {
            this.forceUpdate();
            getImageDataFromBase64(img.src).then((data) => {
                this.canvas_pos.set_sizes(data.width, data.height);
                this.canvas_pos.set_current_scale_default();
                this.setState({openedMediaDataData: data}, () => {
                    this.forceUpdate();
                })
            });
        });
    };

    closeMediaCard = () => {

        this.setState({openedMediaData: null}, () => {
            this.forceUpdate();
        })
    };

    setRefFromLeft = (element) => {

        if(element != null || this.state.refleft != null) {

            this.setState({refleft: element || this.state.refleft}, () => {

                var wx = window.innerWidth;
                const rect = this.state.refleft.getBoundingClientRect();
                const _canvas_container_width = wx > 800 ? rect.width - 384: rect.width;
                const _canvas_container_height = rect.height || 0;
                const _canvas_container_left = rect.left || 0;
                const _canvas_container_top = rect.top || 0;
                this.canvas_pos.set_canvas_container(_canvas_container_top, _canvas_container_left, _canvas_container_height, _canvas_container_width);
                if(element){
                    element.addEventListener("wheel", this._canvas_pos_handle_wheel, {passive: false});
                    element.addEventListener("pointerdown", this._canvas_pos_handle_pointer_down, {passive: false});
                    element.addEventListener("pointermove", this._canvas_pos_handle_pointer_move, {passive: false});
                    element.addEventListener("pointerup", this._canvas_pos_handle_pointer_up, {passive: false});
                    element.addEventListener("pointercancel", this._canvas_pos_handle_pointer_up, {passive: false});
                    element.addEventListener("pointerout", this._canvas_pos_handle_pointer_up, {passive: false});
                    element.addEventListener("pointerleave", this._canvas_pos_handle_pointer_up, {passive: false});
                }
            });
        }
    };

    _canvas_pos_handle_wheel = (event) => {
        "use strict"; this.canvas_pos.handle_wheel(event);
    };
    _canvas_pos_handle_pointer_down = (event) => {
        "use strict"; this.canvas_pos.handle_pointer_down(event);
    };
    _canvas_pos_handle_pointer_move = (event) => {
        "use strict"; this.canvas_pos.handle_pointer_move(event);
    };
    _canvas_pos_handle_pointer_up = (event) => {
        "use strict"; this.canvas_pos.handle_pointer_up(event);
    };
    edit = (b64) => {
        actions.load_with(b64);
    }
    toggleDrawer = () => {
        this.setState({openedDrawer: !this.state.openedDrawer});
    }
    download = (src, title, artist) => {
        let ext = src.startsWith("data:image/jpeg") ? "jpeg": src.startsWith("data:image/svg+xml;base64,") ? "svg": "png";
        let a = document.createElement("a"); //Create <a>
        a.download = `PIXAPICS-${title}-${artist}.${ext}`; //File name Here
        a.href = src;
        a.click();
        a.remove();
    }
    render() {

        const { classes, tabValue, images, isSpeedDialOpen, actions, history, openedMediaData, openedMediaDataData, _h_svg_size, _h_svg, src, openedDrawer } = this.state;

        const {canvas_wrapper, device_pixel_ratio, scale, canvas_event_target} = this.canvas_pos.get_state();
        const screen_zoom_ratio = this.canvas_pos.get_screen_zoom_ratio();
        const {box_shadow, will_change} = this.canvas_pos.get_style();
        const {transform_rotate, filter, background_image} = this.canvas_pos.get_perspective_state();
        return (
            <div className={classes.root}>
                <Fade in={true} timeout={600}>
                    <Card className={classes.profileCard} elevation={4}>
                        <div className={classes.profileBanner}>
                            <div className={classes.profileBannerOverlay}></div>
                            <div className={classes.profileBannerImage+" pixelated"}>
                                <h1 className={classes.profileName}>Sophia Julio</h1>
                                <p className={classes.profileDescription}>
                                    Crypto Crusader | Educator with a Heart | Dog Mom Extraordinaire... Join me!
                                </p>
                            </div>
                        </div>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            className={classes.profileImage + " pixelated"}
                            badgeContent={"76"}
                        >
                        </Badge>
                        <CardContent className={classes.profileInformation}>
                            <div className={classes.profileInformationOverlay}>
                                <div className={classes.location}>
                                    <span>Zermatt, Glacier Paradise, Switzerland</span>
                                </div>
                                <div className={classes.profileInformationButtons}>
                                    <IconButton color={"primary"} className={classes.followButton}><PersonAdd/></IconButton>
                                    <IconButton color={"primary"} className={classes.linkButton}><Icon><LinkBox/></Icon></IconButton>
                                    <IconButton color={"primary"} className={classes.settingButton}><SettingsSharpIcon/></IconButton>
                                </div>
                            </div>
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
                </Fade>
                {tabValue === 0 && <div className={classes.profileCards}>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{266: 1, 532: 2, 800: 3, 1152: 4}}
                        gutter={"16px"}
                    >
                        <Masonry style={{gap: 24}}>
                            {
                                images.map((img, index) => {

                                    return (<Grow in={true} timeout={600+index*300} key={index}>
                                                <div className={classes.mediaCard}>
                                                    <img
                                                        className={classes.media + " pixelated"}
                                                        src={img.src}
                                                        title={img.name}
                                                    ></img>
                                                <div className={classes.mediaOverlay} onClick={() => {this.openMediaCard(img)}} >
                                                    <div className={classes.votes + " top"}>
                                                        <IconButton><AutorenewSharpIcon/><span className={classes.iconCount}>14</span></IconButton>
                                                        <IconButton><KeyboardArrowUpOutlined/><span className={classes.iconCount}>88</span></IconButton>
                                                        <IconButton><KeyboardArrowDownOutlined/><span className={classes.iconCount}>0</span></IconButton>
                                                    </div>
                                                    <IconButton className={"top " + (img.favorite ? classes.favoriteTrue: classes.favoriteFalse)} onClick={ () => {this.toggleFavoriteAtIndex(index)}}>{img.favorite ? <FavoriteOutlined/>: <FavoriteBorder/>}</IconButton>
                                                    <span className={classes.mediaTitle + " bottom"}>
                                                        <span className={classes.mediaTitleName}>{img.name}</span>
                                                        <span className={classes.mediaTitleAuthor}>@sophia.julio</span>
                                                    </span>
                                                    <span className={classes.mediaMoney + " bottom"}>
                                                        <span className={classes.mediaValue}>$ {img.value}</span>
                                                        <span className={img.sold ? classes.mediaPriceUnavailable: classes.mediaPriceAvailable}>{img.price} {img.money}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Grow>);
                                })
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                    <Pagination count={10} disabled />
                </div>}
                {tabValue === 2 && <div className={classes.profileHistory}>
                    <Timeline align="left">
                        {
                            history.map((event, index) => {

                                return (<Fade in timeout={index*150} key={index}>
                                        <TimelineItem className={classes.timeLine}>
                                            <TimelineOppositeContent>
                                                <Typography color="textPrimary" className={classes.timeLineTime}>{event.time}</Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography className={classes.timeLineDescription}>{event.event}</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                </Fade>);
                            })
                        }
                    </Timeline>
                </div>}
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.actions}
                    hidden={false}
                    icon={<SpeedDialIcon />}
                    onClose={this.handleSpeedDialClose}
                    onOpen={this.handleSpeedDialOpen}
                    open={isSpeedDialOpen}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            className={classes.actionButton}
                            key={action.name}
                            icon={action.icon}
                            onClick={this.handleSpeedDialClose}
                        />
                    ))}
                </SpeedDial>
                <Backdrop className={classes.backdrop} style={{
                    backgroundImage: `url("${_h_svg}")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: _h_svg_size,
                    textRendering: "optimizespeed",
                    imageRendering: "optimizespeed"
                }} open={openedMediaData != null}>
                    {(openedMediaData && openedMediaDataData) &&
                        <div style={{pointerEvents: "none"}} className={"Canvas-Wrapper-Overflow Shown " + classes.leftFromDrawer}>
                        <Card className={classes.fullCard + " Canvas-Wrapper"}
                              style={{
                                  background: "transparent",
                                  boxShadow: box_shadow,
                                  zIndex: 1,
                                  filter: filter,
                                  transform: transform_rotate,
                                  marginLeft: scale.move_x|0,
                                  marginTop: scale.move_y|0,
                                  width: openedMediaDataData.width | 0,
                                  height: openedMediaDataData.height | 0,
                                  minWidth: screen_zoom_ratio * scale.current * openedMediaDataData.width | 0,
                                  maxWidth: screen_zoom_ratio * scale.current * openedMediaDataData.width + 1 | 0,
                                  minHeight: screen_zoom_ratio * scale.current * openedMediaDataData.height | 0,
                                  maxHeight: screen_zoom_ratio * scale.current * openedMediaDataData.height + 1 | 0,
                                  contain: "paint size style layout"
                        }}>
                            <img className={"pixelated"} src={src} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", contain: "paint size style layout"}}/>
                            <div style={{filter: "opacity(0.25)", background: background_image,  position: "fixed", top: 0, left: 0, width: "100%", height: "100%", contain: "paint size style layout"}}></div>
                        </Card>
                    </div>}
                    <div className={classes.leftFromDrawer} style={{zIndex: 10, pointerEvents: "all"}} ref={this.setRefFromLeft} >
                        <div style={{position: "fixed", top: 16, left: 16}}>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.renderMedia("pixelated", openedMediaDataData.data)}}><Icon><SquareRoundedIcon/></Icon></IconButton>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.renderMedia("xbrz", openedMediaDataData.data)}}><Icon><GamePadRoundIcon/></Icon></IconButton>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.renderMedia("hex", openedMediaDataData.data, openedMediaDataData.colors)}}><Icon><HexagonThree/></Icon></IconButton>
                        </div>
                        <div style={{position: "fixed", right: window.innerWidth > 800 ? 400: 14, top: 16}}>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.download(src, openedMediaData.name, "sophia.julio")}}><Icon><CloudDownload/></Icon></IconButton>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.edit(openedMediaData.src);}}><Icon><ImageEditIcon/></Icon></IconButton>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.closeMediaCard();}}><Icon><CloseIcon/></Icon></IconButton>
                        </div>
                        <div style={{position: "absolute", bottom: 16, left: 16}}>
                            <Tooltip title={"14 Reposts"}>
                                <IconButton><Icon><AutorenewSharpIcon/></Icon></IconButton>
                            </Tooltip>
                            <Tooltip title={"88 UpVotes"}>
                                <IconButton><Icon><KeyboardArrowUpOutlined/></Icon></IconButton>
                            </Tooltip>
                            <Tooltip title={"0 DownVote"}>
                                <IconButton><Icon><KeyboardArrowDownOutlined/></Icon></IconButton>
                            </Tooltip>
                        </div>
                        <div style={{position: "absolute", bottom: 16, right: 16, display: window.innerWidth >= 800 ? "none": "block"}}>
                            <Button style={{color: "white", fontWeight: "bold"}} onClick={() => {this.toggleDrawer(openedMediaData.src);}}>Details</Button>
                        </div>

                    </div>
                    {(openedMediaData && openedMediaDataData) && <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor={window.innerWidth >= 800 ? "right": "bottom"}
                        open={openedDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <IconButton onClick={this.toggleDrawer} style={{display: window.innerWidth >= 800 ? "none": "block", color: "#060e23", width: 64, height: 64, position: "fixed", right: 4, top: 4}}><CloseIcon/></IconButton>
                        <h1>{openedMediaData.name}</h1>
                        <h2>{(openedMediaDataData.colors || []).length} Colors</h2>
                        <div className={classes.colors}>
                            {
                                (openedMediaDataData.colors || []).map((color, key) => {

                                    return (<Tooltip title={color} key={key}>
                                        <IconButton
                                            disableRipple={true}
                                            onClick={(event) => {this.props.onClick(event, color)}}
                                            style={{
                                                background: color,
                                                width: 24,
                                                height: 24,
                                                borderRadius: "2px",
                                                margin: 4
                                            }}>
                                        </IconButton>
                                    </Tooltip>);
                                })
                            }
                        </div>
                        <h2>Description</h2>
                        <p style={{textAlign: "justify", margin: "8px 16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h2>State</h2>
                        <List dense={true} className={classes.list}>
                            <ListItem divider>
                                <ListItemText primary="Created:"/>
                                <ListItemSecondaryAction>
                                    Just now
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Author:"/>
                                <ListItemSecondaryAction>
                                    @sophia.julio
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Status:"/>
                                <ListItemSecondaryAction style={{color: openedMediaData.sold ? "red": "green"}}>
                                    {openedMediaData.sold ? "Sold": "For sale!"}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Price:"/>
                                <ListItemSecondaryAction>
                                    {openedMediaData.price} {openedMediaData.money}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Dimension:"/>
                                <ListItemSecondaryAction>
                                    {openedMediaDataData.width}x{openedMediaDataData.height}
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        <Button style={{fontWeight: "bold", margin: "8px 16px 32px 16px", backgroundColor: "rgb(0 28 255 / 25%)", color: "#001238", width: "calc(100% - 32px)"}} color={"primary"}>BUY NOW</Button>
                    </Drawer>}
                </Backdrop>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
