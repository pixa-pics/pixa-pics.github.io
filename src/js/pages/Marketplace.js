import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
import Paper from '@material-ui/core/Paper';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import History from "@material-ui/icons/History";
import Image from "@material-ui/icons/Image";
import Message from "@material-ui/icons/Message";
import PersonAdd from "@material-ui/icons/PersonAdd"
import Person from "@material-ui/icons/Person"
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
import Hashtag from '../icons/Hashtag';
import LinkBox from '../icons/LinkBox';
import PixaDollar from "../icons/PixaDollar";
import PixaCoin from "../icons/PixaCoin";
import {avatars, imagesFeed, imagesProfile} from "../utils/demoData";

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
import ImageQuadTree from "../utils/quadtree"
import PixelArtPolygonizer from "../utils/polygonize"
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from "@material-ui/icons/CloudDownload";

import CanvasPos from "../components/canvaspixels/utils/CanvasPos"
import { createLocalBlob } from "../utils/objectURL";
import HexGrid from "../icons/HexGrid";
import get_svg_in_b64 from "../utils/svgToBase64";

import pool from "../utils/worker-pool";
import JSLoader from "../utils/JSLoader";
import actions from "../actions/utils";
import HexagonThree from "../icons/HexagonThree";
import {createSVG} from "../utils/vtracer";
import Fireplace from "@material-ui/icons/Fireplace";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import TrendingUp from "@material-ui/icons/TrendingUp";
import TimeIcon from "@material-ui/icons/Timer";
import CameraIcon from "@material-ui/icons/Camera";

const styles = theme => ({
    root: {
        textAlign: "center",
        overflow: "overlay",
        maxHeight: "100%",
    },
    feed: {
        maxWidth: 1134,
        margin: "32px auto 64px auto",
    },
    tagFeedWrapper: {
        marginRight: 256,
        "@media (max-width: 1200px)": {
            marginRight: 0,
            display: "float"
        }
    },
    tagFeed: {
        maxWidth: 1134,
        margin: "32px auto 64px auto",
        "@media (max-width: 1200px)": {
            maxWidth: 1152,
            margin: "32px 24px 64px 24px",
        }
    },
    paperTabs: {
        float: "left",
        "&.MuiPaper-root": {
            background: "#060e23",
        },
        "& .MuiTab-root": {
            minWidth: 56,
            minHeight: 56
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#fff !important"
        },
        "& .MuiTab-root.MuiTab-textColorPrimary": {
            color: "rgba(255,255,255,0.88)"
        },

        "& .MuiTab-root.Mui-selected.MuiTab-textColorPrimary": {
            color: "#ffffffff"
        },
        display: "block"
    },
    fab: {
        display: "none",
        "@media (max-width: 1200px)": {
            marginLeft: 8,
            float: "left",
            display: "block"
        }
    },
    paperTabsWrapper: {
        position: "fixed",
        zIndex: 2,
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        width: "max-content"
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
        background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAAAhBAMAAABQGJapAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURW0tFufQZtiOLi8RD/fz5apmOV4AAAKASURBVEjHjZaLbcQgDIYtPAG0AxhnARo2qLr/TLUN5HglCieddEfy8fP7AeAg2/jxPjAzgWOQkSGnOnOGQI4Y8/1IKK9z9ASsDAKgOuPlfxkALAxhYm5UmXDXYzbmFcDe9pWqqtoTVSyLWPlCU3BR2W2lpo4ahGovk+01f7BRuWBGiKBGjT4Q5KehVDHAV0nQPy1YlUuVCpWaWaiP0GarDxuqYeVfpxMo0Wq7jo+hKtTQUaedmbf6EW+E+rztmcqVasEehoiNshfFYkbYBGb3W6lsVNJ98kxVDzSaJB6kgXolAW61itQYhGpJtMTWGzayzACmB61TCqjUSl0dKGI9B2B1dgXgA5UrdY4WNrFlQVhAiTbeqq1RUoCtOFcHjuaBUbGoPW61Vq8TSvnJ9qNRaaa6gNUDjWRNZveLBk+rAZfW0zaolaBU3mjNkluSWmDJlT9az5tQoVJjLMbpiwvVMD9cCqxRq7547KmHUjmWHWrHcLztGmesPbHfr/sO2/iLa0r1lephoA6vWJNxY2rdaE1Fa6MGMYDvO5xk3ajt2dfLVnJ8p3XXndMMw0/BnpYC3MZFTY8ddNXpOiElX1k7AXPgt1pTnNc0EWlo2qzVZWCmdy30nNc9j64OSnsNsSTBeyrMHpVaxa696hH7norbFjAeOdKzokot58EL6qVw9J1ppIZGjXop2FDTXusxPLBS7eDmUgevD7z8NSYW9yta1653n3LL2CdWmhPt/B12cw7GSrgKNU7UOcl5nHHff0NzSWpB6oqrUgOvt4wuGn66WfVa0ZbtbomNKodzKYIbql6t6N5XVCz24WpU32prV6t6D9wcE62YaKkSo2rMNA3oHyXswn26lJknAAAAAElFTkSuQmCC)",
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
        background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABFCAMAAAAxbzuVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABpUExURVIZSHaZiOnNid/PhrV/Sunqr+ioezwYPr4+Re7CicXkqCA2b+OIb8SXVVhgZW1TY1wrSJ9jRdnZiMmrZeIle22BcsQyRcStjslgV76IeJ+IezyIpohNPnY4PIAOPHwkOeztxIicciITNUOFmEYAAAdJSURBVFjDjZiJduo4EESNJG8BL7KwMR47Nvz/R05VS15Ycmb65CUkgZvqUqklXhRtlaL2hy8/Plb0n3V42vfn/xcs/X+cX1R6oH3/S6+kP0G/vx/tfrCOJn37g55zvV6/mfdpQPQXKMh5IX1ZjLeX/wGSB9dPVPTu3P7wlVOjwJlqKYqqt/pg7R7z8xHEp1vDKgr5MoP0W3+ydtJXr/FMEEgqnFZaE8X2jNHxsizxEm+sjfSS7HQDjdZY4xwgsS9j2N61xw8bfq+NR20+vVi8fcO+rB3HkZpIc3GsRNR1ZrvCdkSlB9JnuCAJoLFHWfCsDaqEdKVYj7J1nR5Jwa0DHr2ZPstyVtLTLN9ivaJQ7E/X6TtpR/ia+j5L8jygZjTq6Je77qqceHUk1VUoQYTHWbaBcq3yYgoyOgYBH0ZQWEJB/UhF9Y7alKGzfiPlutDKTnbSi449yffX6Aao4SdUlG6krepVklLszukRCzi6GP2p0B9AyjVIg3YbaWtpDy9Al2QFAWXMNDrnEMlGT56EdDSqIapxB5Jfyzr8REhJckTZAuUWWK7jeSOhNBfQBNLPRwnITrMBihxAANIoI/3BKId91MSiCaLi76TTlGXzNM+wfAwxYMyVVmZkqtwdJAXrsJRaSMXjDxJA8wxd/UVrryof2d5kVUzT9bVzjbKSVrbHT4F0CluU38Y/LUiZVL/6hOXDQNBqiVXsluVaFEpPPveadH3zpMfpZweB1GdrXRIVWOjPaXEKPc3XoiFJyYahpgdfGcU/p3e/s26OnimkXS4qsMYRvms7yqszrS26KwJJ64FK2B01nfiV1olF0Tg06XPuL5cQBey8acR0QTea6iTkC4OJmafNSmJjp0CM0xyans/nbbinXMBgltEwpyhg1cgmx8LInm5kvLhN0098Ov2cTrT+J8/ZX3oGJvPpFBSVKN0ohSVU2L/aqIWWG2iKlZDoEzEk4QFeRMuRJ69HrSQMXRRnskOrRhmZo0uhF8mG13Qo6UUWbucIalIwZsR65SNIiABIYhS2zHLzpCPozpclSdjCR9LFIkMaYy/PixGiSCo01GjsFk1UdARdvCsXFrbw3lueJL0ZlUm6rMsRJSTV8IhouPnk+EEyj6RExRvpQlK+ckDKzAV9J12O84BnKTqz2Hjaj4TTKwlPZHeBlGxjM/Go7BeHRJb3hZypJPmBQNQHibsNe3dFJQdSfqF9eZ/wXIb5DfeO/oMEVNdl+OMbKTmQ8qwTEvONHGhdMFcCam6n0yvpNHcUJaqS5FUUQV2eqImgiCSeMAg8B575ILUdrCBmJR1QXRamOopDRdN3JL+gqsc76cREJltvu+v+Ab4f5R5kFVLeIK2IUwGvamiqXkB91+PpR9Lq1EV+kRHkbKEK9NY4B1JB0kRSdWT9dl2fXL6QLn2NR90Mu50ZmUznYlcgmwW7o0/3+8Zq2xYkrF72jkKa+irB7JsJajRgGrcoCGuUJ5lTZO5kBVBbdX3/TmJd+vn+izzRJHDQlC4aDINC8wBrmtFQk6AAA6i8QlLyZpSA+jo9V9mEHaex9koQOEj5xYE0DIEksLYs29/fLgukyxsoPQ8dTiu5cWIOgIC5hznqqGmApmFHVVCVCWnfep7T92lajWOGRfO3Tyfnu2KmYt5ZBuTpdrsfWd2uKRQwMG6c6mnKoWkyHJ8EFYZZKBbuluHRgrSxypJ3MAn4KwfwfrrXOUjG6o3EE7SQId448wApB2vwpDILu3fD9Osozk1F0sT9FkDIpeWJgIHwoKZhoCyy4Pg2CA4YSgpnjMWGw1UjKMKNxcZy0dDGdyes4TYgBdmX6nYS87STZLagt0Xjpd6n26263doH6hsK+ydRggKpQHd2A1kHmyCp3Uk3KmoBqz44XXcREmd6X3OOGFv4aQdQw1Eut8voVlZ3ksq2BAkNtngLMc87pxNNIgr3RMP1AsMSZBbEMm6mCqf/M7q17X1AwW58gFTCsvYkd3IP6uT6k8utLKuxYMUKQi4Bck+p6N4O9xvElaEe7QMK0yptVxDbWy9SyZM3CxEl8jAGXBpIDObQDoEjXj08KRVStoryqKwesUuEIyMcgyFNNxKW7r6iSvb3aKGxWmbfWxZIHhWNk5ELKy52vEhNMtbToKkCaUMJDTtwKctAyo6kfJpGyyTIdRF3fjkhDNZuqOi3JHyvtFrK8/k8Z68of7TP6A0nCvI0TqmZpimQkPCyKoeKPaGxktZ7DopHXLi8bqikPp9HG/MWZGszVRVV4Uvk2pKmcNNh2SQLKwek7RocUCDJL1LrcPlJJ4s3PaII7+98lpgCWTb820FHVBJQ5/M/rPOztpN/Z8l7sBnTSGb46nT5KF9AO6kX1DwHEFlSNd8oG1Nb+gTQIBipSrffSGxwPoJWmP8PDjtWURsksTX6vSzn76SMnPMK2Fl28u/rkIJSPCIKvi1/krygw+8C6jkaT7rtIYL3y3Ls7UgSRW/lRaUQ9UzTfwFE0tJZ5VwSWwAAAABJRU5ErkJggg==)",
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
    drawerHashtag: {
      "& .MuiDrawer-paper": {
          width: 256,
          background: "white",
          contain: "style size paint layout",
          boxShadow: "-2px 0px 4px 0px rgb(0 0 0 / 20%), -4px 0px 5px 0px rgb(0 0 0 / 14%), -6px 0px 10px 0px rgb(0 0 0 / 12%)",
          maxHeight: "100%",
          height: "100%",
      }
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
    profileFollowers: {
        width: 1152,
        maxWidth: "100%",
        margin: "32px auto 16px auto",
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
    },
    profileFollowing: {
        width: 1152,
        maxWidth: "100%",
        margin: "32px auto 16px auto",
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
    },
    profileComments: {
        width: 1152,
        maxWidth: "100%",
        margin: "32px auto 16px auto",
        "@media (max-width: 1260px)": {
            margin: "24px 16px 16px 16px",
            maxWidth: "calc(100% - 32px)",
        },
    },
    mediaCard: {
        contain: "paint style layout",
        cursor: "pointer",
        width: "100%",
        maxWidth: "100vw",
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
    tabSort: {
        "& .MuiTab-root": {
            minWidth: 64
        }
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
            mainTabValue: 0,
            tabTagValue: 0,
            drawerHashtagOpen: true,
            isMobile: true,
            tagValue: "selfie",
            avatars: avatars,
            imagesFeed: imagesFeed,
            imagesProfile: imagesProfile,
            categories: [
                {name: "photo", star: true}, {name: "selfie", star: true}, {name: "drawing", star: true}, {name: "illustration", star: true},
                {name: "portrait", star: false},{name: "school", star: false},{name: "landscape", star: false},{name: "animal", star: false},{name: "nature", star: false},{name: "city", star: false},{name: "sexy", star: false},{name: "artistic", star: false},{name: "realistic", star: false},{name: "welcome", star: false},{name: "gaming", star: false},{name: "party", star: false},{name: "friends", star: false},{name: "fantasy", star: false}
            ],
            tabsValue: 0,
            actions: [
                { icon: <Person />, name: 'Profile', action: this.handleTabChange.bind(this) },
                { icon: <Hashtag />, name: 'Explore', action: this.handleTabChange.bind(this) },
                { icon: <Group />, name: 'Communities', action: this.handleTabChange.bind(this) },
                { icon: <CameraIcon />, name: 'Editor', action: this.goToEditor.bind(this) },
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
                animation-duration: 325ms;
                animation-delay: 25ms;
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
                  4.3% { transform: matrix3d(0.12, 0, 0, 0, 0, 0.271, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.3); will-change: transform, filter; }
                  8.61% { transform: matrix3d(.64, 0, 0, 0, 0, .818, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.7); will-change: transform, filter; }
                  12.91% { transform: matrix3d(1.16, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.9); will-change: transform, filter; }
                  17.22% { transform: matrix3d(1.25, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  28.33% { transform: matrix3d(1.04, 0, 0, 0, 0, 1.031, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  39.44% { transform: matrix3d(.98, 0, 0, 0, 0, .991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  61.66% { transform: matrix3d(1.01, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  83.98% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: initial; } 
            }
            @keyframes canvanimationscan { 
                  0% { top: -50%; mix-blend-mode: screen; }
                  100% { top: 100%; mix-blend-mode: none; } 
            }`;

        var canvas_style = document.createElement("style");
        canvas_style.innerHTML = style;
        canvas_style.id = "media-style";
        document.head.appendChild(canvas_style);
        window.addEventListener("resize", this.updateDimension);
        this.setState({_h_svg: createLocalBlob(get_svg_in_b64(<HexGrid color={"rgba(1,17,255,0.1)"}/>)),_h_svg_size: `${Math.ceil(.5*200)}px ${Math.ceil(.5*229.3)}px`}, () => {
            this.forceUpdate(() => {
                this.updateDimension();
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

    goToEditor = () => {

        actions.load_with("");
    };

    updateDimension = () => {
        this.setRefFromLeft(null);
        let documentElement = document.documentElement,
            body = document.body || document.getElementsByTagName('body')[0],
            _window_width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = window.innerHeight|| documentElement.clientHeight || body.clientHeight;

        const _less_than_1280w = Boolean(_window_width < 1280);
        this.setState({
            isMobile: _less_than_1280w
        });
    }

    handleTabChange = (event, number) => {
        this.setState({tabValue: number}, () => {
            this.forceUpdate();
        })
    }
    handleTabTagChange = (event, number) => {
        this.setState({tabTagValue: number}, () => {
            this.forceUpdate();
        })
    }

    handleMainTabChange = (event, number) => {
        this.setState({mainTabValue: number}, () => {
            this.forceUpdate();
        })
    }

    toggleFavoriteAtIndex = (index) => {

        let imagesProfile = this.state.imagesProfile;
        imagesProfile[index].favorite = !imagesProfile[index].favorite;

        this.setState({imagesProfile}, () => {
            this.forceUpdate();
        })
    };

    requestForceUpdate = () => {

        this.forceUpdate();
    };

    renderMedia = (type, data, imageData) => {

        this.setState({renderingMenuAnchorEl: null}, () => {
            this.forceUpdate();
        });
        URL.revokeObjectURL(this.state.src);
        const callback = (second_image_data) => {
            let third_canvas = document.createElement("canvas");
            third_canvas.width = second_image_data.width;
            third_canvas.height = second_image_data.height;
            let third_canvas_ctx = third_canvas.getContext("2d");
            third_canvas_ctx.putImageData(second_image_data, 0, 0);
            let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
            this.setState({src: base64_out, type: "png"}, () => {
                this.forceUpdate();
            })
        };

        switch (type) {
            case "pixelated":
                actions.trigger_voice("vision_deactivated");
                this.setState({src: this.state.openedMediaData.src, type: "png"}, () => {
                    this.forceUpdate();
                })
                break;
            case "crt":
                JSLoader(() => import("../utils/crt")).then(({crt}) => {
                    crt(data, Math.sqrt(1280*720) / Math.sqrt(data.width*data.height) | 0, pool).then(callback);
                });
                break;
            case "hex":
                actions.trigger_loading_update(0);
                JSLoader( () => import("../utils/hexagonrender")).then((obj) => {
                    obj.hexagonrender(data, Math.sqrt(4096*2160) / Math.sqrt(data.width*data.height) | 0, false).then((out) => {
                        this.setState({src: out, type: "png"}, () => {
                            this.forceUpdate();
                            actions.trigger_loading_update(66);
                            JSLoader(() => import("../utils/png_quant")).then(({png_quant}) => {
                                png_quant(out, 30, 100, 3, pool).then((out2) => {
                                    URL.revokeObjectURL(this.state.src);
                                    this.setState({src: out2, type: "png"}, () => {
                                        this.forceUpdate();
                                        actions.trigger_loading_update(100);
                                        actions.trigger_voice("enhanced");
                                    });
                                });
                            });
                        })
                    });
                });
                break;
            case "svg":
                actions.trigger_loading_update(0);
                actions.trigger_voice("processing");
                JSLoader( () => import("../utils/xBRZ")).then((obj) => {
                    obj.default(data, 6, pool).then((imageData) => {
                        createSVG(imageData).then((url) => {
                            this.setState({src: url, type: "svg"}, () => {
                                actions.trigger_loading_update(75);
                                actions.trigger_voice("vision_activated");
                                this.forceUpdate();
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    let svgString = event.target.result;
                                    JSLoader(() => import("svgo/dist/svgo.browser")).then(({optimize}) => {

                                        svgString = optimize(svgString, {
                                            // optional but recommended field
                                            path: 'path-to.svg',
                                            // all config fields are also available here
                                            multipass: true,
                                            mergePaths: true,
                                            mergeStyles: true,
                                            collapseGroups: true,
                                            reusePaths: true,
                                            plugin: ["multipass", "mergePaths", "collapseGroups", "reusePaths", "mergeStyles"],
                                        }).data;

                                        URL.revokeObjectURL(this.state.src);
                                        this.setState({
                                            src: "data:image/svg+xml;base64," + window.btoa(svgString),
                                            type: "svg"
                                        }, () => {
                                            this.forceUpdate();
                                            actions.trigger_loading_update(100);
                                            actions.trigger_voice("enhanced");
                                        });
                                    });
                                };
                                fetch(url).then(function (response) {
                                    response.blob().then(function (blob) {
                                        reader.readAsText(blob);
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case "tree":
                actions.trigger_loading_update(0);
                actions.trigger_voice("processing");
                var imageQuadTreeCircle = new ImageQuadTree({shape: "circle"});
                imageQuadTreeCircle.loadImage(data).then((url) => {
                    URL.revokeObjectURL(this.state.src);
                    this.setState({src: url, type: "svg"}, () => {
                        actions.trigger_loading_update(100);
                        actions.trigger_voice("vision_activated");
                        this.forceUpdate();
                    });
                })
                break;

            case "poly":
                actions.trigger_loading_update(0);
                actions.trigger_voice("processing");
                var pixelArtPolygonizer = new PixelArtPolygonizer({size: Math.sqrt(4096*2160) / Math.sqrt(imageData.width*imageData.height) | 0});
                pixelArtPolygonizer.processImage(data, true).then((url) => {
                    URL.revokeObjectURL(this.state.src);
                    this.setState({src: url, type: "svg"}, () => {
                        actions.trigger_loading_update(100);
                        actions.trigger_voice("vision_activated");
                        this.forceUpdate();
                    });
                })
                break;
        }

    };
    openMediaCard = (img) => {

        actions.trigger_sfx("navigation_selection-complete-celebration");
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

        URL.revokeObjectURL(this.state.src);
        actions.trigger_sfx("state-change_confirm_down");
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
    toggleHashtagDrawer = () => {
        this.setState({drawerHashtagOpen: !this.state.drawerHashtagOpen});
    }
    toggleFavoriteTag = (item) => {
        let tags = this.state.categories;
        for(var i = 0; i < tags.length; i++){
            let tag = tags[i];
            if(tag.name === item.name){
                tags[i].star = !tag.star;
            }
        }

        this.setState({categories: tags}, () => {
            this.forceUpdate();
        });
    }
    selectTag = (item) => {

        this.setState({tagValue: item.name}, () => {
            this.forceUpdate();
        });
    }
    download = (src, title, artist, type) => {
        let ext = type || (src.startsWith("data:image/jpeg") ? "jpeg": src.startsWith("data:image/svg+xml;base64,") ? "svg": "png");
        let a = document.createElement("a"); //Create <a>
        a.download = `PIXAPICS-${title}-${artist}.${ext}`; //File name Here
        a.href = src;
        a.click();
        a.remove();
    }
    handleRenderingMenuOpen = (event) => {
        this.setState({renderingMenuAnchorEl: event.currentTarget}, () => {
            this.forceUpdate();
        })
    };
    handleRenderingMenuClose = () => {
        this.setState({renderingMenuAnchorEl: null}, () => {
            this.forceUpdate();
        })
    };
    render() {

        const { classes, tabValue, tagValue, renderingMenuAnchorEl, imagesProfile, isMobile, imagesFeed, mainTabValue, categories, tabTagValue, actions, history, openedMediaData, openedMediaDataData, _h_svg_size, _h_svg, src, type, drawerHashtagOpen, openedDrawer } = this.state;

        const {canvas_wrapper, device_pixel_ratio, scale, canvas_event_target} = this.canvas_pos.get_state();
        const screen_zoom_ratio = this.canvas_pos.get_screen_zoom_ratio();
        const {box_shadow, will_change} = this.canvas_pos.get_style();
        const {transform_rotate, filter, background_image} = this.canvas_pos.get_perspective_state();
        return (
            <div className={classes.root}>
                {mainTabValue === 0 && <Fade in={true} timeout={600}>
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
                </Fade>}
                {mainTabValue === 0 && tabValue === 0 && <div className={classes.profileCards}>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{266: 1, 532: 2, 800: 3, 1152: 4}}
                        gutter={"16px"}
                    >
                        <Masonry style={{gap: 24}}>
                            {
                                imagesProfile.map((img, index) => {

                                    return (<Grow in={true} timeout={600+index*300} key={index}>
                                                <div className={classes.mediaCard}>
                                                    <img
                                                        className={classes.media + " pixelated"}
                                                        src={img.src}
                                                        title={img.name}
                                                        style={img.nsfw ? {filter: "blur(14px)"}: {}}
                                                    ></img>
                                                <div className={classes.mediaOverlay} >
                                                    <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} onClick={() => {this.openMediaCard(img)}}></div>
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
                {mainTabValue === 0 && tabValue === 1 && <div className={classes.profileComments}>
                    <List style={{width: "100%"}}>
                        {avatars.slice(0, 50).map((avatar, i) => {
                            return (
                                <Fade in timeout={i*125}>
                                <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                    <ListItemAvatar>
                                        <Avatar className={"pixelated"} alt="Sophia Julio's friend" src={"data:image/png;base64,"+avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Commented on the post XYZ recently"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                                {" — Thinking about all the benefits you will get with our platform…"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </Fade>
                            );
                        })}
                    </List>
                </div>}
                {mainTabValue === 0 && tabValue === 2 && <div className={classes.profileHistory}>
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
                {mainTabValue === 0 && tabValue === 3 && <div className={classes.profileFollowers}>
                    <List style={{width: "100%"}}>
                        {avatars.slice(50, 100).map((avatar, i) => {
                            return (
                            <Fade in timeout={i*125}>
                                <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                    <ListItemAvatar>
                                        <Avatar className={"pixelated"} alt="Ali Connor" src={"data:image/png;base64,"+avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Ali Connor"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Follower
                                                </Typography>
                                                {" — Blockchain enthusiast, I am involved into this platform because I like the social features it has."}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </Fade>
                            );
                        })}
                    </List>
                </div>}
                {mainTabValue === 0 && tabValue === 4 && <div className={classes.profileFollowing}>
                    <List style={{width: "100%"}}>
                        {avatars.slice(100, 150).map((avatar, i) => {
                            return (
                                <Fade in timeout={i*125}>
                                    <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                        <ListItemAvatar>
                                            <Avatar className={"pixelated"} alt="Ali Connor" src={"data:image/png;base64,"+avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Ali Connor"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Following
                                                    </Typography>
                                                    {" — Blockchain enthusiast, I am involved into this platform because I like the social features it has."}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </Fade>
                            );
                        })}
                    </List>
                </div>}
                {mainTabValue === 1 && <h1>My Feed</h1>}
                    {mainTabValue === 1 && <Fade in timeout={300}>
                    <ResponsiveMasonry
                        className={classes.feed}
                        columnsCountBreakPoints={{266: 1, 532: 2, 800: 3, 1152: 4}}
                        gutter={"16px"}
                    >
                        <Masonry style={{gap: 24}}>
                            {
                                imagesFeed.map((img, index) => {

                                    return (<Grow in={true} timeout={600+index*300} key={index}>
                                        <div className={classes.mediaCard}>
                                            <img
                                                className={classes.media + " pixelated"}
                                                src={img.src}
                                                title={img.name}
                                                style={img.nsfw ? {filter: "blur(14px)"}: {}}
                                            ></img>
                                            <div className={classes.mediaOverlay} >
                                                <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} onClick={() => {this.openMediaCard(img)}}></div>
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
                </Fade>
                }
                {mainTabValue === 2 && <div>
                    <SwipeableDrawer className={classes.drawerHashtag} style={{width: 256, zIndex: 1}} onClose={this.toggleHashtagDrawer} open={(!isMobile) || (isMobile && drawerHashtagOpen)} variant={isMobile ? "temporary": "persistent"} anchor={isMobile ? "left": "right"} disableBackdropTransition={!isMobile}>
                        <Tabs style={{position: "fixed", background: "#ededff", overflow: "overlay", maxHeight: "100%", width: 256, right: 0, top: 0}}
                              className={classes.tabSort}
                              indicatorColor="secondary"
                              textColor="secondary"
                              centered fullWidth
                              selectionFollowsFocus={true}
                              value={tabTagValue}
                              onChange={this.handleTabTagChange}>
                            <Tab icon={<TimeIcon/>}/>
                            <Tab icon={<Fireplace/>}/>
                            <Tab icon={<TrendingUp/>}/>
                            <Tab icon={<SentimentSatisfied/>}/>
                        </Tabs>
                        <List style={{position: "fixed", overflow: "overlay", maxHeight: "100%", width: 256, right: 0, top: 48}}>
                            {
                                categories.sort((itemA, itemB) => (itemA.star ? "A": "B").concat(itemA.name).localeCompare((itemB.star ? "A": "B").concat(itemB.name))).map((item) => {

                                    return (
                                        <ListItem key={item.name} button style={tagValue === item.name ? {backgroundColor: "#ededff"}: {}}>
                                            {item.star ?
                                                <ListItemIcon onClick={() => {this.toggleFavoriteTag(item)}}>
                                                    <Star color={"primary"}/>
                                                </ListItemIcon>:
                                                <ListItemIcon onClick={() => {this.toggleFavoriteTag(item)}}>
                                                    <StarBorder color={"primary"}/>
                                                </ListItemIcon>
                                            }
                                            <ListItemText onClick={() => {this.selectTag(item)}} primary={"# "+item.name.toLocaleUpperCase()} />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </SwipeableDrawer>
                </div>}
                <div className={classes.paperTabsWrapper}>
                    <Paper className={classes.paperTabs}>
                        <Tabs
                            value={mainTabValue}
                            onChange={this.handleMainTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            {actions.map((action, i) => (
                                <Tab
                                    className={classes.actionButton}
                                    key={action.name}
                                    icon={action.icon}
                                    onClick={(event, i) => { action.action(event, i) }}
                                />
                            ))}
                        </Tabs>
                    </Paper>
                </div>
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
                                      position: "absolute",
                                      boxShadow: box_shadow,
                                      zIndex: 1,
                                      filter: filter,
                                      transform: transform_rotate,
                                      left: scale.move_x|0,
                                      top: scale.move_y|0,
                                      margin: 0,
                                      width: openedMediaDataData.width | 0,
                                      height: openedMediaDataData.height | 0,
                                      minWidth: screen_zoom_ratio * scale.current * openedMediaDataData.width | 0,
                                      maxWidth: screen_zoom_ratio * scale.current * openedMediaDataData.width + 1 | 0,
                                      minHeight: screen_zoom_ratio * scale.current * openedMediaDataData.height | 0,
                                      maxHeight: screen_zoom_ratio * scale.current * openedMediaDataData.height + 1 | 0,
                                      contain: "paint size style layout",
                                      pointerEvents: "none"
                        }}>
                            <img className={"pixelated"} src={src} style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", contain: "paint size style layout"}}/>
                            <div style={{mixBlendMode: "screen", filter: "opacity(0.33)", background: background_image, maskImage: `url('${src}')`, maskMode: "alpha", maskSize: "cover", pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", contain: "paint size style layout"}}></div>
                        </Card>
                    </div>}
                    <div className={classes.leftFromDrawer} style={{zIndex: 10, pointerEvents: "all"}} ref={this.setRefFromLeft} >
                        <div style={{position: "fixed", top: 16, left: 16}}>
                            <IconButton style={{color: "#ffffff"}} onClick={this.handleRenderingMenuOpen}>
                                <Icon><HexagonThree/></Icon>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={renderingMenuAnchorEl}
                                keepMounted
                                open={Boolean(renderingMenuAnchorEl)}
                                onClose={this.handleRenderingMenuClose}
                            >
                                <MenuItem onClick={() => {this.renderMedia("pixelated", openedMediaDataData.data)}}>Squared</MenuItem>
                                <MenuItem onClick={() => {this.renderMedia("crt", openedMediaDataData.data)}}>Old Screen (CRT)</MenuItem>
                                <MenuItem onClick={() => {this.renderMedia("svg", openedMediaDataData.data)}}>Illustration</MenuItem>
                                <MenuItem onClick={() => {this.renderMedia("hex", openedMediaDataData.data)}}>Hexagon</MenuItem>
                                <MenuItem onClick={() => {this.renderMedia("tree", openedMediaData.src)}}>Quadratic Tree</MenuItem>
                                <MenuItem onClick={() => {this.renderMedia("poly", openedMediaData.src, openedMediaDataData.data)}}>Polygonal</MenuItem>
                            </Menu>
                        </div>
                        <div style={{position: "fixed", right: window.innerWidth > 800 ? 400: 14, top: 16}}>
                            <IconButton style={{color: "#ffffff"}} onClick={() => {this.download(src, openedMediaData.name, "sophia.julio", type)}}><Icon><CloudDownload/></Icon></IconButton>
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
