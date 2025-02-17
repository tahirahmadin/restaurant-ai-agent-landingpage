import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Grow,
  IconButton,
  Badge,
  Theme,
  Avatar,
  Drawer,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

import {
  CheckCircle,
  Close,
  Dashboard,
  East,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Login,
  Menu,
  West,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
  linkItems: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  paper: {
    top: 0,
    left: "unset !important",
    right: 0,
    width: "75vw",
    maxWidth: 460,
    borderRadius: "0",
    backgroundColor: "#11302F",
    transformOrigin: "16px -1px !important",
    paddingTop: 5,
    overflow: "hidden",
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "flex-start",
      alignItems: "center",
      maxWidth: 180,
      margin: "0 auto",
      maxHeight: "35px",
    },
  },
  buttonConnect: {
    backgroundColor: theme.palette.primary.main,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "black",
    },
  },
  nav_icon: {
    marginBottom: "5px",
    objectFit: "contain",
  },
  nav_text: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: "92%",
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 9,
      marginTop: "10px",
    },
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const theme = useTheme();

  // Responsive
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  // States
  const [loaded, setLoaded] = useState(false);

  //Local:: Hook to update loaded
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  //Local:: Hook to update loaded
  useEffect(() => {
    if (pathname) {
      if (pathname != "/") {
        // setPlayOpen(true);
      }
    }
  }, [loaded]);

  return (
    <Box
      pr={md ? 1 : 1.5}
      bgcolor="secondary.main"
      style={{
        width: "100%",
        zIndex: 101,
        position: "relative",
        left: 0,
        right: 0,
        transition: "0.3s all linear",
        height: md ? 60 : 70,
      }}
    >
      <nav
        style={{
          width: "100%",
          minHeight: md ? 60 : 70,
          height: "100%",
          color: theme.palette.primary.contrastText,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: !md ? "25px" : 0,
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link
            to="/"
            style={{
              minWidth: 90,
              padding: 0,
              backgroundColor: "#000",
              position: "relative",
              zIndex: 4,
              margin: md ? "0 15px" : "0 25px",
            }}
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_logo.svg"
              alt="FoodVerse logo"
              width={90}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </Link>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: sm ? "15px" : "25px",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/home.png"
                alt="FoodVerse Project"
                className={classes.nav_icon}
                width={28}
                height={28}
              />
              <Typography
                style={{
                  fontSize: md ? 9 : 12,
                  lineHeight: "90%",
                  fontWeight: 400,
                  color: pathname === "/" ? "#64FF99" : "#fff",
                }}
              >
                HOME
              </Typography>
            </Link>
            <Link
              to="/partners"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/partners.png"
                alt="FoodVerse Project"
                className={classes.nav_icon}
                width={28}
                height={28}
              />
              <Typography
                style={{
                  fontSize: md ? 9 : 12,
                  lineHeight: "90%",
                  fontWeight: 400,
                  color: pathname === "/partners" ? "#64FF99" : "#fff",
                }}
              >
                PARTNERS
              </Typography>
            </Link>
            <Link
              to="/media"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/media.png"
                alt="FoodVerse Project"
                className={classes.nav_icon}
                width={28}
                height={28}
              />
              <Typography
                style={{
                  fontSize: md ? 9 : 12,
                  lineHeight: "90%",
                  fontWeight: 400,
                  color: pathname === "/media" ? "#64FF99" : "#fff",
                }}
              >
                MEDIA
              </Typography>
            </Link>

            {/* <Link
            to="https://onerare.gitbook.io/docs"
            target="_blank"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/whitepaper.png"
              alt="FoodVerse Project"
              className={classes.nav_icon}
              width={28}
              height={28}
            />
            <Typography
              style={{
                fontSize: md ? 9 : 12,
                lineHeight: "90%",
                fontWeight: 400,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              WHITEPAPER
            </Typography>
          </Link> */}
          </Box>
        </Box>
        <a href="https://global.gobbl.ai" target="_blank">
          <Button
            style={{
              fontFamily: "Rubik",
              fontSize: sm ? 10 : 14,
              textAlign: "center",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: sm ? "5px 10px" : "10px 20px",
              gap: "8px",
              width: "max-content",
              borderRadius: 12,
              fontWeight: 600,
              background: "#00e6a5",
              color: "#000000",
            }}
          >
            Try Gobbl{" "}
          </Button>
        </a>
      </nav>
    </Box>
  );
};

export default Navbar;
