import React from "react";
import JOYSON from "joyson";
import withStyles from "@material-ui/core/styles/withStyles";
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

import {t} from "../utils/t";
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
import {avatars, imagesFeed, imagesProfile, comments, followers, following} from "../utils/demoData";

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
import Info from "@material-ui/icons/Info";
import {FloranceCaptionerAPI} from "../utils/AI";
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
        background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWYAAACWBAMAAAAf7T+IAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURU90dH6Iq7O/3/T091lLXZekxM/T6eLo8zE5Umt8kFKohVRQUgxv3noAACAASURBVHjadFhNbxs5EqUHkA3NyfS6nfFtTE+rN1c1YJ4nUAIf1Z1QGucUt1dksLcRIfIcrJPVUV4gG/RtMIB3Af/KfVXsluQZLCHYrf5gP7569aoo8UWpxjrnYhq+LMtY4l8seeh0Ltjg7FectXd0hw4WI9iIJ0OMu/u2A3ds50sj2iY3xlRyTifxjFYYdfl/R4wKDyj6W4/wujs6GWwZhVUjnEig6STm08Actw/ivV5bF8KHozIG63EC9+MIf2wMCXK689kLexb6yzaXPGqvaU14z7LKTN0viha9VDwu8WW31rExtVLEEc91dedF0zTWjmwiWvfshr2Xe02YXSPegjwXeXrmGbPYPaRMajcD3dFjxgQ4bReGRmW8LgrP94HovKCQxh3e7dgL0VglopnWLWY64fZo0nHvEDcCQLgRHgT7baSJZfucW58ejZpjATk5x8hp0RaqwMiKUi9VTJgvpIlqB9jsBn8v0sugDbqWiMZMWhDkRnXi8P5PmKEF0O7ih+GgDAtX9vd4nHPPJNw9FRlyErxzPK8urV1UhlGTllVRlsT1Mq9xrNSSAcvzTTscDsVmuDnIgLhI+QCS6aKsc4DGS2xkzJb1ss9ZLONOzgisW4rhN21rvwcQoJnVuPdUFxiimaYMIRBmvMjmicCsl6qCJlZ1AbirOWE6Hm42jHlDn00GDRP9eW3qHIgzHM04yhGYSSmEOxA/9M6yt44ktKTNGzF8G26+Af82GLFTrI9/xhzsIstGZC0j6APasuA4A+a57xa5LMqluSjIFJRpBeEkzGKzGYpWbEQGyEbVJq/z6iTPFXjOGbP2CTNiY12X5JFAx7uYJk8I3I9DMdULUZR7RNvIebFnGDotEzNZRxhrorewJJScwgvUBcHFMuNYQRn1WNXFqjpvCeqGQDPsoTkWoihyQmwIsqyrOldmdMfGJjiGlpDHcs+iPcnS94FeCTETcTqIyaR22ckCic/OcWLYVSUr9gmkWbDNBeFlo6ObirgEZjD4F2W+ripomGScBpTRDko9/S6SmvK8rnJAzgmymjlN7xfOPic6kRY8ybiDFZrhwALw5ogykr2L4fXq0VvQniADdFgSQGlmcWFsyDvAGTLOU6RU1GoJnQ4K00YjNqB5ixnfhm9p9uQduarBcbI/Y52GC2tBUCnJRzb6BFkz5uCTAYDJ5aGL0+HRqp2X+6XNd1mqycD3MaPMXBBiYyhQoaO7kjVM7ZI4GcdyCd7EZT59MQXHG3ZbIpnEPBQoKqtK0GiHJrlg25oZJEHJ5AUsF2+C3Y0iJxgnnw4+EUhhjjceUoY0hulEB1tvSwnlbkLtsXoqjZYrXnYGN23AMXnw0hjS2mVBmAut6koMxmZokH3i0C5w+8zaIQALMShXJGgB/JsHmkfStwFKP4i+06VAs0GpQy/rYs11kAhOBhDzI70ainkQR0kKIe5MIpUSkn4y5+Rv8VeQjMJcBHsBVdRUHFYGvlaUStHxJWQqRJ0LQ2RahszmZdVGiHlkkgnykCGfn58/tDMF43DWay3UiCtDbEbO9wW41BRgziVnm2mxonkWgpwkxJ2it3mnWf0Un86TL8jWTI0ew8gTldNy8oJqtc+pm1gx5EG+YcgNFTmUiWa0oPiLQeTTgiCD5qySWIc4bDDjCGXKR4HkY2pDw8U7ZVOnSvrYGwhZHOow/RfjS/72zD+SjuA7usdcsRVfhUpmqSx7NcdKAZgqMhxjChT19OuxOBSH2QkRvKjkG8ugiSKG3DJkI9uHh4e2Ac24CiVbkQyDKYq7Hotodmy0ixZC3jjQfLnX/Dyr2eAYBck632MOUlbZvHQLatt0BE5qKzwMGZ6LKkKIAXmA/7apZOq3mlv5qpGvVHNBVzfDthUt16Fzppm7kRH3GISZidZBFUnRBCHwB+AW06OVMG9jmA66SkJEM/i91i9Qv4QqdcWY3YreFcJYnsRtp0yNEHcOJj8W8EBAhj4O7cfPM2qCZjCu28lZ89PPZ/YDpNxBxuLleaIZNdFwj+aBeZQUHdBJ98WaOGZ5AKq7mcEY4HXUV1PFDvGPrRHCgS0BwkZNNQ5vYWyzUELQXaFHFUYrxC0HEB/MiKKMEu3Q/vCa+kwDbNnop9e1mkzgetDFJkFGAopjMg16dpb6fqGYaM5CRaA1dcehoAhDG4uB4+53IZ7epnaEvJysTW+Rc+0hqLx9wUFEQGdBIxFBL7eoGpJQPWLXrfVXgD+rricTgmnvpXx3dgudTL7YDyCZtAyPl7KV55LsIDTGpkcJc5PEwS0pM+0aLn8YM8d9vL15evLJBzV3oHvlmm1PB8hcE2YQviLIMDcuXyUvDlWPumJQe8C9qaaY3WZW3l+v19f32cx+XE/eWHsK9OtZgwR8SLsa2R7gkdT7WOf/gLkM2wIOmnkD5fgCJaJ5/5i0zlxSMeKK2TNNG0Uqo6lnvpVmUZYXGYkY3RuRPSbEeQv+3C7RSwDtBphef4an/yxPZr+Y5mWPWJ63L6Xv93z+OWYY7lXXRcPYA+/3KNq8/TPvn8x/tzLARSqd3b6kK+NwdM3rxGOgeV5qohltuy+WRdRjo6i0te23xLvmmn9FmCcTAv3a3l6v5frT5N788vldvoW8+U6c9QXMdyaVMDtagSZBc7sUG6QfXu5T8Tbm6emx9N2WnIClC88SkTa3jvfitzJDFVmZJWGm3bNSesyOjNrmdhUJ9giw1JbI0zXs4poX8Kpaf/nbqx5z+/Dy4Y53jAhwX8g6nnkJlnbg3DGNYBuAliAvvn98/1h0zTVV6sDeostnmg6Rn7FugSZ0Dmm88B09aDxjDl0Q5sNou5whpwLNJHmrJDg+a9byAsd/VXbx6U2VIIvmwNMbQVO483qrjVGnZ1LeCIlIs1wRz91e9P1v783v7AeIKR5D9UjNkt81SroMLjDm0G1UzWXfR8Gdi3w6ZNAv2HUSy+X44/2r1GVenF6vT2dWntjGfFZnn+xZRF2Ubfvvl2kLTQFE1d5ipjY0Nc3bfZbVLqQ9AKzzafb946zbxehu71Im590qGvMGxgxlYBSQxq6TWs5jfYwqwe1Qv+/FJCfr+/6XgUpe30+yW3mSX5t3//hkPyEHljfioEFPjOYwNWt9XIVCb+IcS2xJSdhQrNxVJC/UDPk/T78NkiHE8sqn3wm6HyX2doJsjdZR3ZByXl6cpDSldm/8YsX1uIVrBfo9KC28PF1/QU/fg17fTyan8of7yfU/rVzPoXrsb440VSpHK6SObucbljADdBhxN4i/dzq49AMW0u/vT4+jbrva78b5xyMykP5U1AzZ3kru8GttsH8qeGU+jrP6mDPwDIsiY0qdpP8fl1bT2zZ2RelWntReDVPJkXcxp5QHWU1BJA/ISgqeU7UrUzHlSVapNCLT3UQP5gO6agLCQ3TlFGkD7VIgbQD/yp5z76Nk1Ehs+EPi4eX9OOfc12/fy2zU9BiiAO2UyN+jHBMSscUjAEcms5VWCHgXZ5B9ZKoo1zWqkW0jGeFPvbDqonh1+Z9SmD9dG7PcKUFnql0RogeUHIJMZnK6kwHoBZ6vB4fx6/svpQD3vPD0smv7cas2jEqnPrJDWsdkVVy0z550OVQ5HbCk6SHOpYaZySE+CnNjoa3LQc0V858vt6aFRHbncnX+lqGokvo7GahyLRBuzhJxHtdXKEBysyMZSyhWddDcW5vsTKMk7wNw06BTr6bTtnSlk+t4SJOMw6pkw3KaG9SD1H8mW4+0PY+S7IkWJd6w/lfoZexRpb/rn2q4XTBoEImTWJVqdoX/eGx+zWD7NCJNO+r8HWXgCNPVRbqDTGne2hy3PDrBlFmAI4Tr1vIiX4tw8yGfwetwE0bizFY3GuEeiOSvxebyL4HSGN6bECSVYKJ0a5I8+qYiBU5Im0HmMkPIyAkSUPwTpXTk5b6VuCpmI5glM3gjaTxEZuSYMNN2ep25SrQpLqqmGvmudqpIIpNUVIVrhZwsTkNhvYo2VeHuuBlEXW0bhlHDlvfAbF6rcMX3VyEXvTiFKQvwgVMbx8vtabM0eYf5d21sEwzsoXAPZPXkfebRo5jASGglPdIWMMBldvMDdSFxTkDuklNxLfHLaL/+h7zS6avUwA3zyDipKHpmMgA5ugb5Jf7+ctu2TxNPMqeQJdChMvjFDNTDQ8toAH1SFH2rlGlqkxdoAzqTQg3R+tYpFglLxSuqipgXI1Rg8h2JWuUoXa8+8XEKcxPJXZV3LGf1uVzGZC5XA/E98burnXM8gzL59vD261Y6StOXhwPUAfOQrEMkQd7Xbmeb57/NJKH1Warj3bm1UcIaGNG495rPo4SY0W/9z1Hhzz9VzofI6kZiO8kyaV10jSisqFehNyXMOxbCh397+29/d3nR8SvjH6cBMpLhTFp1bO0kPUOftgGz3KLywMqEYEW5TIHZbIbJy7wA5GTpHWXKOZ5PNBfMIcE1CbZX9+KNopmgf4X3IboX2d3Fwqu59PKt6y9NRtW9YM41Hd6J8ZQjxnheiPZ3SGTVQrUaiUiNQFWieBMyerRGq0YBUtkzRatqP/PnkcpsfSwa6Kozb9nlOSAIWq1amkTm6o536rKwfvE+cAEd+9p6H3/fbjG3TQy0RT6YMjesPQPmMHFJzaQRVXqvIAGzEeKLUlotSKBFD0EmQcH+2lyhCCV/XWfOyRAz2upomCvRjjUzZZmwTunPyO+z4GhzZEuMjNA6evBsd+b3QDroMKNhCOYfOcPt9PmSQ1dciOAWO14sYB6EQK9GIw3zKf4KZHTl/Pn+qZeiM27nClS7jZzq7WpVCOgZyYdPZqchB3Yyt+4qt1bMXr/WSOVnKfPZ8tOZmJEDCbptltlSo+S3mxqvO5/o+CaegWegAvPZYjHSXVf29PDyszNX+5WXSdtlg2HAKVIMf2KCbc7EYDIK1iSRIbHm6N+ZPGHNRcyVGjsUOw5Irxe56MGflDChc8QtJ2JbZgFoqQsjH6rR+yj+yIULOtwqno3qhUrlp1FvfIls5uyrtDWFmr8rThh0IgEryWUAclKvU7TkUx8gm255sBSu0nlQ6qCZt8RcrtCeJ3H/uWwFiomdxJiEtg0MjPGpnbSPTi1EeX8Pgc7jWb6JR2KugbB/jqzdf/3fe8yFmhdzodvxiw5v0j5t1ieDgewqw5ov8IeRKgN5HHy4RgjdbktLGSSYF0k+RQqLAwbMmCoN7YNpWGzyrlF6dSdwELWoAGY82SQ93uzNhIk68zn6gur95pzFWtE4cp0RatzOwzUMW627SoGsZnw8k667VCd4uZ0l20Efui7rAlmBS6Z9e/ZMOSVGITBDaFm7DFszPmq51vatopOLyYCNKt7cDFYVs9k/jSI0dXt2j1PrCUCXSx+0hTPaLAUE28FKdne8aR1kx5vNP3N6V6HQ3HYnIIZJx1TE2qv8m6YpOdH6smeFGMR7McYtkqMURSSyyolBtewmWTTrj8XJizd78/SURsHtDyAItv2TsCOxOsulC/atcZ3VL5BrDKN0tzvND+i6bGi2ffJKXumFBK4TMjtMJ/KA+k3fEvNCdsOLRcrpj/KLh/3GztUOJ/ty4YmpGnXR4GLMdCyObyYzvDp5tO/GUXTba8q5eiBS48bo9baQ5cf1quDmP1F6VpzfkNkjyKDLvhNnS3VyujLQ3NpuxYfX5VbsJ7qoBejJsMGn0NBx35L+mTR9BivKL8bq2PT209l8/SiKevbwtjf9w1d9XzE7SxM2ssYHoeK1YdBq2QidTF9uNgeMM/T15uZeR0kkh3UP3+3xddmtTeHtM1mZLTSzkBnoGpNmMoCUtVXgONpwlsbp4gaYi2/Hsmw8tveL2bxGoA57455t/x5sWMMzBaXbXVIJHmO/KhYPowPqaTVQNgeI88ENcG/uHOOosu2aRp8ue3vXMd8elYuUlCHRSibmeDgdEvOLsO3laQCWlHZO9o081zjfAHORlF/Gt59tY9vmuRexYjDFSzB9hqdbW3GPMK+yq3mdMhc2AfTxhub8DeXqJ5RYuEvhgabcNQwnC1PORARSm8U2yqB1cTxp2/7wXd8+72aoSA2nrZMcJ8oLK1z9Y2+/KNJR2UxBqn7T9L5yPaHnB1jvu9MYFV2XI1mDz84J8ABQO9AMOsL84sky+DGUJsvM3D3loccrsidgg4p5NRDMnUc3bS8mLTBPlt2jqoP3qQcrTDSIe2KcfrR7wJwsru24Nx1HrSyuWIJ8hTBkdXMq2VFWmGtlkchGjJ8IOo830jaA+1R9Fz5Okcim289JLhvdKzjqSZYgJnAR6g8f/bb4MQfLayfB9tUFmo7OmgQtivO+rAB6vQ8s/tEza8fRZ3tdC4syplbKLCRUJjXDXF2BhuSzhwR7E3GrHnIasUaco7DkEGaXbQ9MhB6pq9OslMGSxPadMqwt5kGeDxtgtkFdSOzU2xYfGX2j6Eucrd0DZZg//FXETvfLL9ymuBDmQPQ7clFUdYykvp+y4Hhw4Yag97jJC6DnwUPNdOR7nUaa295rrgv5XxQQrO+SvMOMtxg+SyG8G6TI81F3y8GrUBvKIzcuPuBPj8d2EwPzTw85UKbX16/n3nXcU0DX+nDy+MjUJ5d1NUvlBAPX1QeRHG4JlvFmX4SBJqM6o67rkYiTfiMtr6pXOQhSk5wEzJSUfbJn1CLYg4xCx8NRpCuhXXnJDcb54x/t5sNgNn/DgQLOMv4mctuzUlUZuGS9Qvm5Op2b6io92Ghq6C4doBklDtQq04NKsuXPAo/UxkFPzT0Jxjm66Cq/P3wPoZEKZnL+uN80DUCj4zXzKpyHktQIYHzIjUFsj+3xZlCkryMMFECOIs0GKdnulNdKvGXz53hZuxlbBHuxLk0BGdlxzP3YA91f6SJBCKHZHcGhEhXeQXbryzSP2/dHZdIdSQFmCfN0GhfThkRLPf7uaStmyY24P36pmHl92wBy1Dvzh+KE+C7IIkW8Kxnmxw91u8tjAWHVe7DHxIhjF/b4bqdaxe72QldqUweuxHtBnL8/Kks9LhHrJKRKweiGxirCORh2zKzbEFRdbvQmATNHStsQw+GXKKQF/fO6UC+cUwJhrtbR/38gr1mCHx4Yvw2zDyeEtiafyYB5oYfMDPVunrxDEV5MRFUpZmtB7eykOLOTuZhlng60GJxKtTQ3ji2zA5iTHuq4+dvh5+h/ZFtBj9vWEX4yuIalk55Aru1bl1nSSE4F1lldyebZ0boXkV3K2T3ZXC/Z9tREsXTegjGInrSA3UI+KXXUxDznUCB/rt/MPFIyKmSV2NFKnz7Om/lm5uMAsv9nG9DlUgx9j/gAn2Tj4rupBdoiZisRK/HPeOdc8HJUWnZU1LJVpnOU1TDfGeMSzzbdGdOcaTfWNJeZAHNlnpayFi7mrJbs4kwdeIgNaA7wfAvMU1wag86KgvqZjSA0fAyZZy2nV6eHyzJbfUryiiObUwe3FVRxaTUtIk7yHHcaNKimXVNpJUhCzatPmNmLwJhd7lsyFJa4kAkf09zOVMYSG8M4+TF6iG8KnYZfcGqwTRplbFOyTA/l5Jffpp/n7dFrIVMFJFuR0vcX4nXsqj3X8EIwl7xuRHMfLshrMT9dJpNJ7QWz3GpwvcOcZqCfY4j3JIuy60OV9lC70cc+hFRKsvSLhmci0K/Pvv8gH/2SrhpOyMju1IL+Py/W+6CZ5DVX8LVCsbHzxM7lYS1sgnlR5GRB9K0S+HYSPNBp57tkYeeCYHPOmNneCRbGe67POUquc7t23umLM8YcIJZ+WVTmmfUIn8jpo+s2k8SD1HLNtLaALWLZ8vwLZWI3lrPDG5oRLJadZCkWuW/DrnjpfVPXnoUMYlzBrJ+cu1k1qe7zMLDkcX9rnixUT5v12ugkOaMDlAZV/fWf/TeF2A14pfzahgaPL0h+HvxuLTDZWbbe5zwrrlf9cs/y2lp7regW4HkYJB6PQfKXHgL6pmOZZoyCOZmkx5Ob+xJS1O+wfmaxBp7NehUlno5vKQYC8+/vjouv6a39IizZMHPNdXVElTsPkTDu0IKSzxxzvNplu/ez68vtxXNuAMfLnXyVSYF0pARbwpeG9aGHRjv2LMuU6Gi6UWnjmtQ31X3KW2JEI7JJlpYn4Dlavz3z9EXMm4XgH2GoXsUpr3TzEBqX1w+IUvqrTF0D2x2qJvzYZlnTcfy+aWaXWXZZtpVkwapCRuQ8JbE8F75wSvsi3zuvnqKm+C1kwgyeXT0Z+cJzSXmeDQMk2BCwShHmHnRCzGEb3Anzp8aoQXYNnnNIJMkx5O3Tqn/wgpxudNzeM1WXTfOR6k+zIsQF/riddQWkpZlyXGHN9DSXb/U9b+U8cyjNCgczY9bAHLuTm/T65lAMAXQGqNMvWXsp3TtbKygO4jlDgk7zF+a4jlfb2SzMw0flLsegV+y/I8xTtWkkAJumgXx+32zwH81/Fpf0r9JKXfZ0tJ5SyhcLUe55J5Ul65/baYyFHHOngmcESHqUFt2D3qPkgaPqDc/WEUTS9IxHK2l6FPngWQ1o4pjni4WMkOcC+u60TzQ3/Ra0UhtECmHdCuQtlzza4ndLReKqVeFFEXituuco9g7zjL4IiyOhGZhvQDb0RmZ9cUvBTO46vK8aDs9QCTS33xlhdvNjnIqHansd0rh030P+Qt2FJjpQm8GmAw3Uz5pB0zynwCDEVrnaxfjSmot5ikTrzDyx6Z6PDx6HuZkhXITlCWFmya/FzYFPvhrP7aisLNhPq7Tbf6v62pMxR5YmeoRzS1Eb+rzeYqd7yanrlDhe3Rk0qln1twJ6oxq1vWSSt5dc3Rfcts1POmnEvYIvAU0Ory44+A2eHpkssIEBPUcinCSSrnkb9Ii181w6f+66wbN21yv6cud4yhJqCY9oP7cagPKwMw+wi+Jq/AKY1Ts+fB8Hgnk62DzLsmsKi82BFCue6s/3b54Q4y+FRp54XpuMPS+l4E/c+I+/SWAAJRl4J1Ucu7Wu37wyvswyTym3yz77SjCrvkezaoqwNEnOTQ39/KP2joK0kCkqXxlS7tdTxd3jKL/cMNEraJNGkfnn8qN6bkfExXJnUZecLHt0PI4oW9iduOaJ4Jf618ruUFCsKVUD8xPzoB49CAv3/iPkyWXIpnK2uiwsZgpl8IyXe9nU5eW+mEt5sTwXNwAbFZcv+md8ScOgGQD0BU0jcQpBcqYOCJ9lWmrKrv9FOaLQkGjGB4VkhJnxUaFVcSWQawahHxiq6CN3VryiRUdR+qUvJg22cSg9XCsHAB3mGW9o8K2j/tsIbThqMc87Q8lfNCM5RXDc8hTzcoPoEBn9zHmPLH3AOY4xn7ZLkzwUj9NywQatPGCfnyhxkmv06sckIhkxhXEmPH9TV6Ojp8WrWSFx5ZOyyqnTRK6Lhw8jMg3SXo49DKz6TdXzEpqXtuabsHUTvHKM0qBpGQw2zZbmCtGkQt7Y3LXJgV/VjhZsB8fwfWQ0m+Pkbpl2TfPYmP/WFjLnlAdVnCF1JDF4Ft9ASIPIkLzTgK36Qx0hNoYTYMb5S7JzAI4mEYq6Bwrpeys+NeIXPPm95H0vy6eD/sZxiCCzUQfRXqIQFzI+Iw9t5efNY5BIlsued2t/m0l/+5V3bW0b+6CuvG9QC58Qz0QzDZnxj8+SG2VipSNH3SLV0Bwp06MX9NuILxQaMJoG2hm1ZAP1d1NjoE7w/R59oTZ9uijgZ/CTuWo34NZAvUTlD1umc3HkWgdothN8bY1lv4mR/EeYay9DvIDnUWEtJTzxfVSQ9Y/CM1KxfluZtecXgQ5Sig0KMIS6oUFYj+bLqYzy06UrPOMPf0XTuKnQh0WDzeRN10S1cOiok7LHEzGsdyku/f/bumjfVsV7mI2XxMD8clQcMtHiw6P8ES4UgjnCjwPM+I0e+hzmjo8FzQ3ouZ1YetODo3vG9AI6R34ArYH/uWGqr04+Fc1jiGRR9nlCa7EWMm1a/3TSGUDm+5hZa/BYhjDreGLCl17olrk9Upwu8aOoYXXUGjG8vsV3G2XZsbEPxjpUZvdQ3tBqAkDI6fypxqiv2iUtWoS9LSYghwvoTrIb4OVUPxZ82+OVXa3MT7q7/6iVrUx7BiE4TI3nH4pjv0CHmYdInbxvDRmzE92LVLSaGNJIwxhv+RfdPfhWGO0w3J5WSH/TykRewLGBjsWpGkchbVi+PvEXL/g2sQAdkEdnb9ZK2jydy35Iror89T5mERyQdvXf8+MgdA8X/hVNWHPLdagicy+KHIfFSXbeo1nRXkPNKV6DTulMVsqxclGv1ZbqCQLj55Nd2Rvv8gFJDORjz0uoXM8+veXJ3nzR2YTI9EV1RT6PZkn1jVv/wT8O/PPDIpRN91iCBLHhTJSDD2eJ5PboIt4+BLxbxqWURyvHnp2zajqr4PmhUr20mDZUDT60C+LuRM1tVC/yJIF4I//abL7vpbeDnjGvojlHZiLjuKYQZjojhNl4vvsUPR5n+TmvtsNSmWjigOyaQsNzuTP73DbRtxTNaujQZLo9QPcmzPMKFyS9hqb58Hi+1/h1d9TKDWY+B9hGmcEBJ5Uu7hfWuDK3XtkxdBFjJp3WYjaTmCwdqOCHYiVcSniAZ1OpyJlIonEjxiyjb4KtNb5Uz2uXHdkFIEfeGvmPqv8v1fcnj9mVtOcQtpYSwv86wWOofoo+e721OzfZ39oBjb1/D6/OZLRotGf7Qsojdeya+BypWrdXRsYBCFCkWJwjvhnENTKAuhC8Xqt0u9XBBd4X2Xzl8Rrzcq7H2sq3nYOtaO82m48Js9qY1AraE74fmL7jouxMSfw92fFFh1Awk5WKisTkxpzXP6RP7J3OLWZlKoSz5fkty9fE7qAMAZfUoSTO9LCuoo03VDFn3KD5avxVO1nf7d9FuBKDr73MQ41Uf/uwXLZ4x60QKfdCfA8zc8OY0bbgp/aSWmbJjBmXF6FcOQhn05eshmrxPzau57dx4woPW8pZKto5bQAAF09JREFU+TQjiMLytmSWMtpTEAfrK+Wd9cp7Moklk/RkMeIoyMmIGxnwyduqgdCTBDhAdXPRTQr4r+z33sxI8qZCgsC2pHz8+Pje935NrKRStmhhnRxdutDkBtVqod/p0Soc3cOV4Do+/+vnfo50N91/YvzO6UlB33GnP3MD8ba0xP2Obbueuc76I57LdRRZ6/CYv1kOeKoVuQRHQ7EI70jnaF4I0eQhNuvQUr0SG1zJBpGEGA7pb/dLHeaR0Od0CWVWVKc7N7DbwXI9QPx0JfCwEORdXrml+ca5F3pr2+fColbbNiEnLVq/aaZA36PpYa6ZMc/LHJjHyzxf8xtzWEU4UoXaVofWG81Mq2eLXD3jdJ4wbxTNtUQV82x3g26e7DMx6Adqn+ujJ/sKdvpr5/yuj7+M2sJh9jyrqs/54OjMTKCYXJbTpGXapGK5BBFQ+SGIjknPITLGirRzvFbOR4cishE1B26dg/J/nW96JC/LrDriYe3ZzS5AuI44pPQXJA30ojx6ehLByezJ8tPxZGAKutc7zCQx7cTM4swA8xmNZtsBXMOY2W4EiF6xAelgHakk5rEGy3SM/zV9WX9Bm0b3oc71+YY8zPCiN6fRqflsr9bsM0H8+yBI8911RP7icB/kq2u77G5fRtEqta1uWP/EkwqJYvVFM6/6zMojO6AlluOcTAfxG4+jhUw0F7YHxf0+GbCXBugxPn4upc4Xm3VJ11wIgJ77nM8/eXawy8ynuOAHfCk9y0+Znu/Jk1eguSlc4WsPM8Fejs2H/uliNLBLnFxKJcyCzX0L+TyGIyvJnsmVENVr2VW4xblQz8d60emHOqQGKJWkixSgy70OvjtHgqm/hdB9DO3U6tunu3DH3+3kCdFsKo/ZSjOHOX2DOzAw01HPyiM+ugB+Y8luI89zOxEbUD8oSlz3GrjhPoJuF8kXlMYzGH5HriCrNg+rX8vUFFUiynlp3KzRfFe+Bc10nZx7ISs+ud57OF3tn57D61fJ5Iy3NG21rnKzehZ0MjSQSLgPp25DydrGYkxMuI0FCNJQ94hmXoaLg7JdgeuuANOhtpPJAvYMS+kK8StVnUrVAejZze9ft0KM848cHQ6PD2/cyiy3DXkC1M62mcHUYlZbnqPtxHxtaItz1ND0j5ulKcmeKdwsrRKEo9MEuWcDddwZZlW2EqorAhlI6rLg4nIoU0q5QoAeJiqCvyvntStieOww59srFq74yDL/6o9eq1ILbs7VPA4vX75qB1O7DctEvyl8SYyfwkGrDJXzwPKQaaZfD4W2mNksAGsDvPQAImoDMiWcw4sgDgSiN+4H+1AgGd0jrufiUNFBAm1R9dqhMZ/yTHFUwKCEfr039ezOQOEFreMvM5OYPtU9XCmXvNPWmNMBmfryjIc8GndCB+lnn/vlAUg+X+NuK1cB7CDzJAFdv1AywIuJ5tsRBt8ihwTf/5bIWeoqKo5at1428+U58wM5du6ci/AYweXx8j9bV8fvndFWGlD1GY01Dlq4rzzkpFEDM/4bO4ysbuxRAKRFbaWMEN9rjhws7VcIMFXB2WsQVEIFaxlLviH89rBzzyzKUVkmER0HcrRj2k18UHVdUMDi5B3/eb3r3Z/M2LhPWnq+nlsGmWjqbG6PZxngjy/Htg1gMWd8DwRJDMlfzPOMajsW9EsiqLdUSBlkIBmYEdEWXPkIc/qH0ptulNZFWeFij1rXHPcFXHLOgsFSlxSfmtE69THNRc7cSErNmN9YhFzPZTt2ZZEMf5vq72uLuTK+ogUtylUMxDWYpg8jSsKaexeqkiLKpBK9CylXUubbh5W5DuHKNusqa6tMJWC63Fa6+HX17oGlIUyDPnZ3c+wOsZm5Xqdp68qoenJqF1SoBgLM6baQM4Qx93/+fugw197VpbYSAJlcwkHwXYSPk1AaQSajCwTAqIDPiAIppARIp2nd63xDszXDopQw6fLHkkXu1u3p/NE1tajn/vfvXrm8wJ39MzdtW08G9UvX30x5smALOU17oHlpvjEeMxkHt/tcOgLb3VUxSOLdw4f1qH8QJMCsgrgLzDn7DQouISmaTcSfTSfw0UlQHaW1PeLAeb0ra8k8fJqHb6+5M+QCzzX9VANzzzz39bGMMRsfpLPEGH3Gm8gNe+aGIOPjKVUDCi4BBD5PlYgscd4rIZSUSjxmEUvk6KTBF+5J3JBbIk/aRolMZFT+lA1994SV3ke80RKtxcPbG4vYHQZFr3piVGuWW2apnTN0e2rkKcx0AW835J/BKlXS6LsbQbGZ+KAHMOaDGKoihGQuSlWUplEB2UYMzHItmF1rHOM7TtTVsM1KGLQs151q2GuNP4KEmP6BNMrhAyxkDNv+ze1N3vDsFsURUxHmsX2wrAGkqX/U0mxo9M/1ZId5MJzx9TbWJIKt1IaC06pALpL0oKE3SLMulIhJjna7INo68/ESlAv2MVFdNllUq4M4qGp1VDNobgrM5g/HX/C8zYIu88wqkr0hstbUZpCZD6kH7cZzU38Sy3Tc1sm05HBCmFOb3s8oDHdVZHephT0jgH4XTaCTKNvOJBwHpVbBai14Uf+uu9JLRJiAFKuqmrqE7uj8CcZR9H7yA4Qzbp2SXXwcw6bHi51TscvjMI0GDrhuP7g68SegYRr9M9yIaernjAfeoQix3pXn/MK9RJpdw/eB5xIhsIPfBGFcdCUU0grOoxvrf6h7bteoqIWHrhLZroPqMjqqa8bLrcCb1zCNx/EdRcK33Oy203rWelqTDBSew9Ot332K2Uy0Kds9zFHj0m/BdYE4jv1Ew2YVclysEh6XVYHqIIQHMldRvBpryKX4/i6IR5nMLeYMmKOJzISssuDr0h5dxtNX8zB/fAj5MXw4oP4bVf9TZ/FNhrCtyHNsK/Je1TtJ9/6MfOHUHwVWRD753ZUTfTxR/LCJoIwoeAtABu0hgvu6WGkNIS2Cfr6+7xUwDsZclgUiT/leRvUIlLtvrsxteMuyTojHB63fXf7GXpCL/4y5GZhBW09P0z2idzTTGRFtrQYvUz5mhHnmC5vNhUtV491QlCs1B/a8DFr/o0gDMR2twgVVG2EogTyt+iNa8mDMnVIO3qvO16Oy2IYxcxWeXSIELg4fBRcrfKeQzkOgztkE5tyaafr/MRvoI5jzoMjcdDRhttcr/MAVySN76Iyrk4NpvBkkC1v7QDSUhBk8yzhXo+wijyAByyqLkk5dHFwEnTovCzrZwxg6k0SM//nfY0qBOFXRB+4JNNQqHOLm474PKqPTPdto9kxDD+HAYT5+x0H93ja6v9ia3GrjK/tc5ifaOTGE1CPMtLAA1PfrPoyDpxlgGRNg/kMx6pR51c8s0a0htfFufquv2KHnB24W2I7aEWbgMQ5z8+kzCBk3Mi004z5m26WEbVh4vMwc7MaQpdUePqDDNmSwAealxu1XQiLEnFZhQLcoUz3C3MlGQamLDVUmyrqq/kLB5LOb23cQHge+g/VjaoNOM8TNHxntMZtmtz1hQ6KZnpo2VdXkKWauwILDjasZBfEaVk2hvKs02A49XLaXzrewDZph61UF/N95MMr6QUUN8rj3Aq650+YSmN9UmYV3qZFyLw7+/HZ++UyLqXcKNjWAPqua0XTUVO3oE6v4HxlX09s2dkXJgG5HXukJpBDuTEJkAP8KUnhWqaxEQmQn3YmQGGCWRsfeTgIio+5EQC6gnWukU8C/sufcR8qORwvDsRPk8PK8e++5H0/uS6tBjaopALiZD5VvYDZD43cvx67/Jum8HIrVHbo+o96Z+B4x/6baFIrLtlPbiXAIGXa6YuUVny52Gph9GTog7M+Peu/cO8n8l+fY0WdQJtqEVVhuFttoV73FHEtfG07uBtTIJ+Vmfp4J67nBep1kD4PAIuoRQNtS9dKWzxKY8Ob0Cel0lhY/p16txuPu5E64jSOY4Zn9i8gZl4nrhWVV9cNHj/qv4fbyj/rDfdNXrvoMrgmLstoudAxsafiSyp1tHTXbuIl24MV2UXoD5qE2afWLnW3fJKewsGnp06HXXP2YvmcT80WhWgRIaJexO4fjyMvc9yIEIAhDx8qTpdHM5U7s+ajj7R9NePW3Ponv78ocMOOUVdv0TORXTq+i3kYQ3BGz6r2aN4yOGzvvB/2Brz1oy34V0/EHTpHn7ciLshRpHGXLPE9Yeu1Y4VCHMnKTPEm5L7IzYRCv8raePTX0JPEZ9GdpfldlNWvmjYSUN0YmNWKWw6pc7abuwkvNjLHq/XN4b2UJIDn6XOTgVC7LZnJjzWk4nTKyFOStpYr1F2jtMWLjTaA7MfO4hGcvSjdZaWNnITS5F9ffo9hyPobDhpJJhOIIqsqFZyir9Tx+wwwqQXgUfFGTYLpdqL5piESOpAsmd8DcMZg4pq6+N6BTpJlyZcZIioxic/gGBcxe8K8XzJCNHVxGzt1DwexHkMZnYXjbhN/D2aV+MtWJpo91VNF5o7c1MVdvEzoRMAvEdqTOQdwCc9o3WD0+t/pAOxOXP3J0lpwcmhrJmwN2wAcCkjQ2ZdE+jDyV8fuEeTMwp8B86sTM/gFSzE3XOjfetDoftu/lKkvMmm3vFuq6DnNkdFq9wty8hgzGAHO8UbXaAbPuMeN/xT/37sFncWcHgm4tubajRfbmiKGVJa2KvriTe36GM1m6HQ4Esmob3FBemF+AGrYXALOr3QhRO64GFHXsXD85zQtmWop7gtMNXnpdlwgsbzDz8i+KQEjjSeht2uaMueAVtHVJv6ETLsQQdNYKmQU0tRZUNeS2rZjeUS3mwAxyEHPOPhHPYMGbFmHmQj2sUydxo57PdS+g9X+L4ke3AG4AsztbeLtd8WfMQo1U6FwF042OXf2lxwxThdHkNqLfsA6WT9Ckc2L7DvODY3pWW2MWQCS0HEEbYLbzTkJ8vuxf2YENF2DW6SmaRKFxEUaN6H41//yRgZdS6e2NVwOzGlQ3k2RjZlDjhpcGenE+Ddxg6AOquDaLCjn8M8SVLaAdcXUdQbc2smMeQ5DDxl842RY7WFmb2OCA8sVhAvMBUdMnZM/31olO04gZSMgYwtwgDHWM9PelnMVibMyK4naWTqv6B8wsbMWSXm15xeUGtKtyHctSkGBu+qq4lWTcRulBZ8zQbeuIn7GNbO6cdJngjZeWKcwm9nuGbGnN2saHy9MDM7RwGkG1rSxzNzNfefIDL1bO6l0o5Zdgk4IDRXMWefI8ghl5E2c/uMENMofpvsdcszzmQQBYIzo3AD0A9AEHMBlBZsOgMLTgGqsEqbNyuqO5z0Mn2VIcJh6po+rtmJ4gzBCz/xB45er58n/3A0k/Dsuyoh+sG85iNREE6exPmE2h1uQaIJBCTrJTeqZ7zF4T7vAceBzLOjItx1E7AHcmUsjy6fjc1AyiOiLEl/4wBddmia8meL3+yUK2LcU97ux7SKtcL/j3yrr8nvz6/BdWHMPrj7BfVPQlzciy5kDzOSrdCXQL60hv7BwKNRaGGhESu4VgJqGnYRgUDK41gB7F0mOYV/o1MDRAZ7rTF7QNkjcHfJbfIDCyXqihz7ki3Quyk4xsHj0XzznJHy6fH7P28fFRcFzPhz1qGntlZTcFbBiV68keCvVHzL2dq54ak7oE5ptZZuZnEARjzyy2WH4H0JnQuK+7Sl9Qt8txCkZZiVqzZYGfm1EZoG6X/omgX80xR3kCzKkuVMI6KHLYxye2H6/nsFbR33wbznR7xcmqSLkNMCOta6rXmOXecnoNuBfFAbdA3ax1j/l2ElS1FNcs8viInzsOVZR1LntmbeeAxgm9sIdXkZzrIAe8A+R5RdSrGnHICq+jBWY/kZoiHv8dgV7dnK8TKotorcu4qOq7KHd3+2lJO8dvMe+oUMJ4NwHrY+XO16nB7NUQsTUXPxpz+LSpGiaHw8jk0qTtcsyuEBQUzLxnqjyA/okP0KnzBn0RQaykuW7dNPKTZ+tZs+0vmGfz127jas5OzgdijvaLstm9iHSW5Hj/ML0G+ZJXwNwod7FODZ+9eFPRfdPOY4J29i1nY5Px4WANZtaMzOAzzZwl54k++j38cqT8ATTOGF62vdKtkwautp6djA5U7Du7GdpmPGHRHECKO3ypNvu4ZMr/gjkymKsdb8FE/txEkN1u7Gb9cNz9cFk8tNXYZlE7wwe6yrLHsr9ID+gwfo+18tbZb17xcqu7UpCyeuR3pAfIyisLFI6g0+q0c2WhHa/tKjpHErniXvgBqxcxMlQ13e5j8ODMZnEb3GGCQmE433FXvdnAPbs9N6af70Jp1MPODpsHbPxx3nI0tjpk+5Ya46QdHPwGVl5l7YVp2g6bLzKmgCPp8YYUNspyX3s8eWl3lIX2REf/MHOxUlUuS1/mZENavYkKYHb3u7p5sbOEwZxjy+LpoLspC3PlBm5qpuOmzV1sqHTHvoHOEKzlY9k2QSurO+g2ZWMe6gT5HusctmfunIfPcNm0x0GUzIVOLz8uVym9RXrkQrt+dxVeM4ab6W486NGGd5YLLxhoCheY8bTg8/QVZras6OmaMGp6zBD3NwZz0dwaySB5HTulvPQCwBFblGnJd0ecwRH3VhwmoBY7sV7BW1g4egcAbpt0ql+tLH394KhWt77PhXbn67vr+Jc6UqZkUpE6ZkKoDPmIxXzW6G/EXDXTsO4vzZPh67Da6D4nRFhRSm8EM15tGN8OJxaOGGB5BIXRVCYG9Aiii0vUMDjwSqizy3iYBy7r8V6mNVn/LZW7zBMXmF1XRPC3pyiMgrHlQJt1BO3DzhEyAFhSMG+b998kTDfFcC0EMGsmseKdY6lyAPM86M9gKiPQRv9YSJbpM/gBbscaG9Cs23aIKXCDlgLBS2V7YxpaMmdEpQCn1B7G2fSDm/6EeO8cE+v5+9evT7umdq3/+Bpak9Ow/vFg50bxwNCVF+zez03My19lfGC716wrIxthfWTpi02PeUoBMdg5I9T9gBoMJmj7BDszBT3IDoU18hQSPxiaK0bITznC6wL0SeitnGWuVaazNKVmyH7//e+/hv/UVq4OSwhGGPrTcXkQxHhhk6hyg837bzFrAs3mxbnkglmLF45jYIbbgp1/Jua0qodeQNP3uznkkJHQe8cwg/lSZlpqPJe0McSIhZSWXQofLiOAw9vLjGPugM1fSA0HmLnQvqjqJtOXnBUw4/XBESdaukvLBwBq/1/U1fO0DgRB+ylIPKpcdFiktEXyO2J0QRe6i2Ij6GIl5g8gaoRcXIklUqSDguLxK9/M3sW0SZHJem5nP27XhbL7jHtkwrhc3EUDbmT75SlJQJQESXFG+iFlfL9E5PNJ+AJok4jjYLYC0DI23dPO44k7khxQFF4rBlfY4IR77KGWB2VLyyETbX74R37uX547c/YPB2KlZAR7ilCA8dTq8LBua98qP8vwrPNTmT/sVKtcu7lp1ifM4FwdS3BlqEIGHxOa/7GUBIa8vv8VXYGFLTkDavTkuEtzRcxOsRvM+odhDuZD0XfUjZhFlnZxIQPt39e8BPQFb3i+kFxSEXSvPt6nxaGo7a32eYYTuM22XOkWPL82lWJDopKDOW/Z/15HzEvWfwc7jxDEJzg9BA3/QT4n0ujxVp4KvAbiVOD9A5zEnEJnoJ4IRejapZAz4p4RKmd3FzIIILeLM8h7r7s+9MOmcNtmNU5h6PkVMBcZ4olm0vxe+QXmy72eQNcHM5sZuEwUNd8gEM3cJKGu6EMZyXehcMQbBExJjke4jwXUvVfsqsBDVyqEf5QbHRuyLDF4mT/qGGVffMJJw9zfgDwds22Vihade15rgaHnu1b7N9NUFBA11Gq1cdneTKpGxo9ajQ+WM2U2/Imn32kX3hcViHEPIjJYxShJFn12UqzRpPi4l3w3da4augBJquNR4B4HOZBWWj74DuDN66Pi5W/AT6UtTdBQVBi6zolZF8gdd7fbIYrxxs1zc1kzg3LZrgTmmw0HYwM1Bm4U/wEj/oi/Vx1XjwAAAABJRU5ErkJggg==)",
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
    profileWallet: {
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
    walletCards: {
        width: "100%",
        display: "flex",
        textAlign: "left",
        "@media (max-width: 1000px)": {
            display: "initial",
        },
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
    },
    titleWallet: {
        color: "#43e",
        fontSize: 14,
        marginRight: 72,
        marginBottom: 8
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    }
});

class Marketplace extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            _settings: JOYSON.unpack(props.settings),
            tabValue: 0,
            mainTabValue: 0,
            tabTagValue: 0,
            drawerHashtagOpen: true,
            isMobile: true,
            tagValue: "selfie",
            avatars: avatars,
            comments: comments,
            followers: followers,
            following: following,
            imagesFeed: imagesFeed,
            imagesProfile: imagesProfile,
            descriptions: [],
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
        this.setst4te({_h_svg: createLocalBlob(get_svg_in_b64(<HexGrid color={"rgba(1,17,255,0.1)"}/>)),_h_svg_size: `${Math.ceil(.5*200)}px ${Math.ceil(.5*229.3)}px`}, () => {
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

    shouldComponentUpdate(nextProps, nextst4te, nextContext) {

        return false;
    }

    goToEditor = () => {

        actions.load_with("");
    };

    setst4te(params, callback) {
        "use strict";
        this.st4te = Object.assign(this.st4te, params);
        if(typeof callback == "function"){
            callback();
        }
    }

    updateDimension = () => {
        this.setRefFromLeft(null);
        let documentElement = document.documentElement,
            body = document.body || document.getElementsByTagName('body')[0],
            _window_width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = window.innerHeight|| documentElement.clientHeight || body.clientHeight;

        const _less_than_1280w = Boolean(_window_width < 1280);
        this.setst4te({
            isMobile: _less_than_1280w
        });
    }

    handleTabChange = (event, number) => {
        this.setst4te({tabValue: number}, () => {
            this.forceUpdate();
        })
    }
    handleTabTagChange = (event, number) => {
        this.setst4te({tabTagValue: number}, () => {
            this.forceUpdate();
        })
    }

    handleMainTabChange = (event, number) => {
        this.setst4te({mainTabValue: number}, () => {
            this.forceUpdate();
        })
    }

    toggleFavoriteAtIndex = (index) => {

        let imagesProfile = this.st4te.imagesProfile;
        imagesProfile[index].favorite = !imagesProfile[index].favorite;

        this.setst4te({imagesProfile}, () => {
            this.forceUpdate();
        })
    };

    requestForceUpdate = () => {

        this.forceUpdate();
    };

    renderMedia = (type, data, imageData) => {

        this.setst4te({renderingMenuAnchorEl: null}, () => {
            this.forceUpdate();
        });
        URL.revokeObjectURL(this.st4te.src);
        const callback = (second_image_data) => {
            let third_canvas = document.createElement("canvas");
            third_canvas.width = second_image_data.width;
            third_canvas.height = second_image_data.height;
            let third_canvas_ctx = third_canvas.getContext("2d");
            third_canvas_ctx.putImageData(second_image_data, 0, 0);
            let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
            this.setst4te({src: base64_out, type: "png"}, () => {
                this.forceUpdate();
            })
        };

        switch (type) {
            case "pixelated":
                actions.trigger_voice("vision_deactivated");
                this.setst4te({src: this.st4te.openedMediaData.src, type: "png"}, () => {
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
                        this.setst4te({src: out, type: "png"}, () => {
                            this.forceUpdate();
                            actions.trigger_loading_update(66);
                            JSLoader(() => import("../utils/png_quant")).then(({png_quant}) => {
                                png_quant(out, 30, 100, 3, pool).then((out2) => {
                                    URL.revokeObjectURL(this.st4te.src);
                                    this.setst4te({src: out2, type: "png"}, () => {
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
                            this.setst4te({src: url, type: "svg"}, () => {
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

                                        URL.revokeObjectURL(this.st4te.src);
                                        this.setst4te({
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
                    URL.revokeObjectURL(this.st4te.src);
                    this.setst4te({src: url, type: "svg"}, () => {
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
                    URL.revokeObjectURL(this.st4te.src);
                    this.setst4te({src: url, type: "svg"}, () => {
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
        const floranceCaptionerAPI = new FloranceCaptionerAPI();
        let descriptions = this.st4te.descriptions || [];
        floranceCaptionerAPI.run(img.src, 3).then((caption) => {
            descriptions[img.name] = caption;
            this.setst4te({descriptions});
        });
        this.setst4te({openedMediaData: img, src: img.src}, () => {
            this.forceUpdate();
            getImageDataFromBase64(img.src).then((data) => {
                this.canvas_pos.set_sizes(data.width, data.height);
                this.canvas_pos.set_current_scale_default();
                this.setst4te({openedMediaDataData: data}, () => {
                    this.forceUpdate();
                })
            });
        });
    };

    closeMediaCard = () => {

        URL.revokeObjectURL(this.st4te.src);
        actions.trigger_sfx("state-change_confirm_down");
        this.setst4te({openedMediaData: null}, () => {
            this.forceUpdate();
        })
    };

    setRefFromLeft = (element) => {

        if(element != null || this.st4te.refleft != null) {

            this.setst4te({refleft: element || this.st4te.refleft}, () => {

                var wx = window.innerWidth;
                const rect = this.st4te.refleft.getBoundingClientRect();
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
        this.setst4te({openedDrawer: !this.st4te.openedDrawer});
    }
    toggleHashtagDrawer = () => {
        this.setst4te({drawerHashtagOpen: !this.st4te.drawerHashtagOpen});
    }
    toggleFavoriteTag = (item) => {
        let tags = this.st4te.categories;
        for(var i = 0; i < tags.length; i++){
            let tag = tags[i];
            if(tag.name === item.name){
                tags[i].star = !tag.star;
            }
        }

        this.setst4te({categories: tags}, () => {
            this.forceUpdate();
        });
    }
    selectTag = (item) => {

        this.setst4te({tagValue: item.name}, () => {
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
        this.setst4te({renderingMenuAnchorEl: event.currentTarget}, () => {
            this.forceUpdate();
        })
    };
    handleRenderingMenuClose = () => {
        this.setst4te({renderingMenuAnchorEl: null}, () => {
            this.forceUpdate();
        })
    };
    render() {

        const { classes, tabValue, tagValue, descriptions, renderingMenuAnchorEl, imagesProfile, isMobile, imagesFeed, mainTabValue, categories, tabTagValue, actions, history, openedMediaData, openedMediaDataData, _h_svg_size, _h_svg, src, type, drawerHashtagOpen, openedDrawer, comments, followers, following } = this.st4te;

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
                                <Tab className={classes.profileTab} label={`followers (${followers.length})`} icon={<ArrowDownward />} />
                                <Tab className={classes.profileTab} label={`following (${following.length})`} icon={<ArrowUpward />} />
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
                        {comments.slice(0, 50).map((comment, i) => {
                            return (
                                <Fade in timeout={i*125}>
                                <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                    <ListItemAvatar>
                                        <Avatar className={"pixelated"} alt="Sophia Julio's friend" src={"data:image/png;base64,"+comment.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`Commented on: "${comment.title}" ${t(comment.date.valueOf(), {mini: false})}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {comment.name}
                                                </Typography>
                                                {" - "+comment.comment}
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
                        {followers.map((person, i) => {
                            return (
                            <Fade in timeout={i*125}>
                                <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                    <ListItemAvatar>
                                        <Avatar className={"pixelated"} alt="Ali Connor" src={"data:image/png;base64,"+person.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={person.name}
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
                                                {" - "+person.biography}
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
                        {following.map((person, i) => {
                            return (
                                <Fade in timeout={i*125}>
                                    <ListItem key={"avatar"+i} alignItems="flex-start" divider={true}>
                                        <ListItemAvatar>
                                            <Avatar className={"pixelated"} alt="Ali Connor" src={"data:image/png;base64,"+person.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={person.name}
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
                                                    {" - "+person.biography}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </Fade>
                            );
                        })}
                    </List>
                </div>}
                {mainTabValue === 0 && tabValue === 5 && <div className={classes.profileWallet}>
                    <div className={classes.walletCards}>
                        <Card style={{margin: "16px 8px"}}>
                            <CardContent style={{position: "relative"}}>
                                <Typography className={classes.titleWallet} color="textSecondary" variant="p" component="p">
                                    Estimated Account Value
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    $436,639.88
                                </Typography>
                                <Tooltip className={{tooltip: classes.tooltip}} title={"The estimated value is based on an average value of PIXA in US dollars."}>
                                    <IconButton style={{position: "absolute", right: 0, top: 0}}><Info/></IconButton>
                                </Tooltip>
                            </CardContent>
                        </Card>
                        <Card style={{margin: "16px 8px"}}>
                            <CardContent style={{position: "relative"}}>
                                <Typography className={classes.titleWallet} color="textSecondary" variant="p" component="p">
                                    Available Liquidity
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    1.112 PIXA
                                </Typography>
                                <Tooltip className={{tooltip: classes.tooltip}} title={"Tradeable tokens that may be transferred anywhere at anytime. PIXA can be converted to PIXA POWER in a process called powering up."}>
                                    <IconButton style={{position: "absolute", right: 0, top: 0}}><Info/></IconButton>
                                </Tooltip>
                            </CardContent>
                        </Card>
                        <Card style={{margin: "16px 8px"}}>
                            <CardContent style={{position: "relative"}}>
                                <Typography className={classes.titleWallet} color="textSecondary" variant="p" component="p">
                                    Account's Influence Token
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    775.15 PIXA POWER<br/>
                                    (+65.90 PIXA POWER)
                                </Typography>
                                <Tooltip className={{tooltip: classes.tooltip}} title={"Influence tokens which give you more control over post payouts and allow you to earn on curation rewards.\n" +
                                    "Part of sophia.julio's PIXA POWER is currently delegated. Delegation is donated for influence or to help new users perform actions on Pixagram. Your delegation amount can fluctuate.\n" +
                                    "HIVE POWER increases at an APR of approximately 2.95%, subject to blockchain variance. See FAQ for details."}>
                                    <IconButton style={{position: "absolute", right: 0, top: 0}}><Info/></IconButton>
                                </Tooltip>
                            </CardContent>
                        </Card>
                        <Card style={{margin: "16px 8px"}}>
                            <CardContent style={{position: "relative"}}>
                                <Typography className={classes.titleWallet} color="textSecondary" variant="p" component="p">
                                    Account's Stable Liquidity Token
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    0.00 PIXA STABLE
                                </Typography>
                                <Tooltip className={{tooltip: classes.tooltip}} title={"Tradeable tokens that may be transferred anywhere at anytime."}>
                                    <IconButton style={{position: "absolute", right: 0, top: 0}}><Info/></IconButton>
                                </Tooltip>
                            </CardContent>
                        </Card>
                        <Card style={{margin: "16px 8px"}}>
                            <CardContent style={{position: "relative"}}>
                                <Typography className={classes.titleWallet} color="textSecondary" variant="p" component="p">
                                    Account's Saved Token
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    0.001 PIXA <br/>
                                    977.50 PIXA STABLE
                                </Typography>
                                <Tooltip className={{tooltip: classes.tooltip}} title={"Balances subject to 3 day withdraw waiting period.\n" +
                                    "PIXA STABLE interest rate: 20.00% APR (as voted by the Witnesses)"}>
                                    <IconButton style={{position: "absolute", right: 0, top: 0}}><Info/></IconButton>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </div>
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
                        <p style={{textAlign: "justify", margin: "8px 16px"}}>{descriptions[openedMediaData.name] || "[Automatic captioning]..."}</p>
                        <h2>Status</h2>
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
