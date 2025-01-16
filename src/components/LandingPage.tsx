import { DemoSimulation } from "./mainComponents/DemoSimulation";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Fade, Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  restaurants,
  home_brands,
  chef_partners,
} from "./homepageComponents/data/partnersData";
import { motion } from "framer-motion";
import CommonButton from "./homepageComponents/CommonButton";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface TitleComponentProps {
  title1: string;
  title2: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  badgeStyle?: React.CSSProperties;
}

interface LandingPageState {
  playVideo: boolean;
  loaded: boolean;
  tab: number;
  roadmapTab: number;
  emailVerifiTried: boolean;
  tvl: number;
  staked: number;
  web3Toggle: boolean;
}

interface ExploreCardProps {
  img: string;
  imgSize: number;
  title: string;
  sub_title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  color?: string;
  url?: string;
}

interface StarSvgProps {
  color?: string;
  size?: string | number;
  style?: React.CSSProperties;
}
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontFamily: "'Rubik'",
    fontWeight: 900,
    fontSize: 72,
    lineHeight: "100%",
    color: "#FDFFF5",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: {
      fontSize: 60,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 40,
    },
  },
  heading2: {
    fontFamily: "'Rubik'",
    fontWeight: 900,
    fontSize: 140,
    lineHeight: "90%",
    [theme.breakpoints.down("lg")]: {
      fontSize: 120,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 72,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 56,
    },
    [theme.breakpoints.down(400)]: {
      fontSize: 50,
    },
  },
  sub_heading: {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: "120%",
    textAlign: "center",
    color: "#FDFFF5",
    opacity: 0.8,
    position: "relative",
    zIndex: 1,
    fontFamily: "'Rubik'",
    [theme.breakpoints.down("lg")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  description: {
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  tab: {
    fontFamily: "Rubik",
    fontWeight: 600,
    fontSize: 20,
    textAlign: "center",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    gap: "8px",
    width: "max-content",
    height: "52px",
    borderRadius: "16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      padding: "5px 10px",
      height: "40px",
      borderRadius: "10px",
    },
  },
  roadmap_tab: {
    width: "100%",
    height: "80px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0px 8px 28px rgba(0, 0, 0, 0.25)",
    borderRadius: "24px 24px 0px 0px",
    fontFamily: "'Rubik'",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "100%",
    [theme.breakpoints.down("md")]: { gap: "5px", fontSize: 20 },
    [theme.breakpoints.down("sm")]: {
      gap: "3px",
      fontSize: 12,
      padding: 0,
      height: "40px",
      borderRadius: "10px 10px 0 0",
    },
  },
  bg_orare: {
    background:
      "linear-gradient(106.65deg, rgba(255, 255, 255, 0.07) -16.06%, rgba(255, 255, 255, 0.02) 135.43%)",
    opacity: 0.4,
    filter: "blur(1px)",
    borderRadius: "50%",
    position: "absolute",
  },
}));

const TitleComponent: React.FC<TitleComponentProps> = ({
  title1,
  title2,
  style,
  titleStyle,
  badgeStyle,
}) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      style={{
        width: "fit-content",
        height: md ? (sm ? 120 : 140) : 190,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
        maxWidth: "100%",
        ...style,
      }}
    >
      <h2
        className={classes.heading}
        style={{
          textAlign: "left",
          whiteSpace: "nowrap",
          ...titleStyle,
        }}
      >
        {title1}
      </h2>
      <Box
        style={{
          width: "100%",
          maxWidth: "600px",
          height: md ? (sm ? 55 : 70) : 85,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: md ? "10px" : "15px",
          padding: md ? "0 15px" : "0 25px",
          background: "#66FF99",
          border: "1px solid #66FF99",
          borderRadius: "12px",
          transform: sm ? "rotate(6deg)" : "rotate(8deg)",
          marginTop: sm ? "12px" : "17px",
          marginLeft: sm ? "-3%" : "-7%",
          ...badgeStyle,
        }}
      >
        <svg
          width={sm ? "22" : "31"}
          height={sm ? "23" : "32"}
          viewBox="0 0 31 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1353 30.9745C10.8074 30.8803 10.5141 30.6926 10.2913 30.4343C10.0685 30.176 9.92576 29.8584 9.88061 29.5203L9.09122 23.5486C8.74624 20.9245 7.41864 18.529 5.3764 16.8459L0.737164 13.0164C0.474212 12.799 0.280387 12.5097 0.179445 12.1837C0.0785038 11.8578 0.0748309 11.5095 0.168878 11.1816C0.262925 10.8536 0.450606 10.5602 0.708916 10.3373C0.967226 10.1144 1.28494 9.97167 1.62312 9.92668L7.59413 9.13677C10.2137 8.79149 12.6052 7.46645 14.2871 5.42844L18.121 0.782527C18.3385 0.519691 18.6279 0.325946 18.9537 0.224995C19.2795 0.124045 19.6277 0.120265 19.9557 0.214124C20.2837 0.308273 20.5772 0.495998 20.8003 0.754338C21.0233 1.01268 21.1663 1.33043 21.2116 1.66875L21.9997 7.64C22.3457 10.262 23.6735 12.6549 25.7151 14.3357L30.3602 18.1698C30.6232 18.3871 30.817 18.6765 30.9179 19.0024C31.0189 19.3283 31.0225 19.6766 30.9285 20.0046C30.8344 20.3326 30.6468 20.626 30.3885 20.8489C30.1301 21.0718 29.8124 21.2145 29.4743 21.2595L23.5036 22.0481C20.8803 22.3929 18.4856 23.7205 16.8031 25.7628L12.9705 30.4091C12.7525 30.6714 12.4629 30.8645 12.137 30.9649C11.8111 31.0653 11.463 31.0686 11.1353 30.9745Z"
            fill="#0000FF"
          />
        </svg>
        <h2
          className={classes.heading}
          style={{
            color: "#161810",
            whiteSpace: "nowrap",
          }}
        >
          {title2}
        </h2>
        <svg
          width={sm ? "22" : "31"}
          height={sm ? "23" : "32"}
          viewBox="0 0 31 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1353 30.9745C10.8074 30.8803 10.5141 30.6926 10.2913 30.4343C10.0685 30.176 9.92576 29.8584 9.88061 29.5203L9.09122 23.5486C8.74624 20.9245 7.41864 18.529 5.3764 16.8459L0.737164 13.0164C0.474212 12.799 0.280387 12.5097 0.179445 12.1837C0.0785038 11.8578 0.0748309 11.5095 0.168878 11.1816C0.262925 10.8536 0.450606 10.5602 0.708916 10.3373C0.967226 10.1144 1.28494 9.97167 1.62312 9.92668L7.59413 9.13677C10.2137 8.79149 12.6052 7.46645 14.2871 5.42844L18.121 0.782527C18.3385 0.519691 18.6279 0.325946 18.9537 0.224995C19.2795 0.124045 19.6277 0.120265 19.9557 0.214124C20.2837 0.308273 20.5772 0.495998 20.8003 0.754338C21.0233 1.01268 21.1663 1.33043 21.2116 1.66875L21.9997 7.64C22.3457 10.262 23.6735 12.6549 25.7151 14.3357L30.3602 18.1698C30.6232 18.3871 30.817 18.6765 30.9179 19.0024C31.0189 19.3283 31.0225 19.6766 30.9285 20.0046C30.8344 20.3326 30.6468 20.626 30.3885 20.8489C30.1301 21.0718 29.8124 21.2145 29.4743 21.2595L23.5036 22.0481C20.8803 22.3929 18.4856 23.7205 16.8031 25.7628L12.9705 30.4091C12.7525 30.6714 12.4629 30.8645 12.137 30.9649C11.8111 31.0653 11.463 31.0686 11.1353 30.9745Z"
            fill="#0000FF"
          />
        </svg>
      </Box>
    </Box>
  );
};

const ExploreCard: React.FC<ExploreCardProps> = ({
  img,
  imgSize,
  title,
  sub_title,
  description1,
  description2,
  description3,
  description4,
  color,
  url,
}) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "286px",
        height: sm ? 180 : lg ? 300 : 315,
        background:
          "linear-gradient(241.27deg, rgba(255, 255, 255, 0.08) -5.59%, rgba(255, 255, 255, 0) 100%)",
        filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
        borderRadius: sm ? "20px" : "24px",
        border: `1px solid #686868`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: sm ? "10px" : "20px",
        padding: sm ? "5% 5% 8%" : "75px 20px",
        transition: "all 0.3s ease",
        transform: "translateY(0)",
        "&:hover": {
          transform: sm ? "translateY(-15px)" : "translateY(-30px)",
          border: `1px solid #695204`,
          boxShadow: `0 3px 20px 1px #695204`,
        },
      }}
    >
      <img
        src={img}
        alt="Gobbl AI"
        width={imgSize}
        height={imgSize}
        style={{
          minWidth: imgSize,
          minHeight: imgSize,
          top: sm ? -60 : -140,
          zIndex: 1,
          position: "absolute",
        }}
      />
      <Typography
        style={{
          width: "85%",
          maxWidth: sm ? 150 : "100%",
          fontFamily: "Rubik",
          fontWeight: 700,
          fontSize: sm ? 20 : 32,
          lineHeight: "100%",
          textAlign: "center",
          color: "#fff",
          margin: sm ? "35px auto 0" : "auto auto 0",
        }}
      >
        {title}
      </Typography>
      <Typography
        className={classes.description}
        style={{
          textAlign: "center",
          lineHeight: "120%",
          fontSize: sm ? 12 : 18,
          color: "#FF9CFF",
          fontWeight: 500,
          marginTop: sm ? "-5px" : "-10px",
        }}
      >
        {sub_title}
      </Typography>
      <Typography
        className={classes.description}
        style={{
          textAlign: "center",
          lineHeight: "120%",
          fontSize: sm ? 12 : 18,
          height: sm ? 75 : 127,
        }}
      >
        {description1}
        <br />
        {description2}
        <br />
        {description3}
        <br />
        {description4}
      </Typography>
      \
    </Box>
  );
};

const StarSvg: React.FC<StarSvgProps> = ({ color, size, style }) => {
  const theme: Theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <svg
      className="star"
      width={size ? size : md ? "16" : "32"}
      height={size ? size : md ? "16" : "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", zIndex: 0, ...style }}
    >
      <path
        d="M15.9972 32C15.6561 31.9998 15.3225 31.9002 15.0371 31.7134C14.7517 31.5265 14.5269 31.2605 14.3903 30.9479L11.9855 25.4252C10.9306 22.9978 8.99416 21.0611 6.56709 20.006L1.05202 17.6037C0.739339 17.4672 0.473261 17.2425 0.286397 16.957C0.0995322 16.6715 1.35528e-07 16.3377 1.32697e-07 15.9966C1.29867e-07 15.6554 0.0995321 15.3216 0.286397 15.0361C0.473261 14.7506 0.739339 14.5259 1.05202 14.3894L6.57399 11.9843C8.99687 10.9304 10.9305 8.99746 11.9855 6.57479L14.3903 1.05208C14.5269 0.739479 14.7517 0.473481 15.0371 0.286628C15.3225 0.0997753 15.6561 0.000168638 15.9972 -1.32703e-07C16.3385 7.57583e-05 16.6724 0.0996276 16.9581 0.286476C17.2437 0.473324 17.4687 0.73937 17.6055 1.05208L20.009 6.57479C21.0643 8.99981 23.0002 10.9341 25.426 11.9871L30.948 14.3922C31.2607 14.5287 31.5267 14.7534 31.7136 15.0389C31.9005 15.3243 32 15.6581 32 15.9993C32 16.3405 31.9005 16.6743 31.7136 16.9598C31.5267 17.2452 31.2607 17.47 30.948 17.6064L25.426 20.0102C22.9994 21.0647 21.0634 23.001 20.009 25.428L17.6055 30.9507C17.4683 31.2629 17.2431 31.5283 16.9575 31.7147C16.6719 31.901 16.3382 32.0002 15.9972 32Z"
        fill={color ? color : "#D1FF19"}
      />
    </svg>
  );
};

const NextArrow: React.FC<ArrowProps> = (props) => {
  const theme: Theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <Button
        style={{
          position: "absolute",
          top: -5,
          right: md ? -5 : -15,
          minWidth: md ? 30 : 40,
          maxWidth: md ? 30 : 40,
          minHeight: md ? 30 : 40,
          maxHeight: md ? 30 : 40,
          background: "#2B2D25",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          border: "1px solid #fff",
          zIndex: 5,
        }}
      >
        <ArrowRightIcon style={{ fontSize: 32, color: "#fff" }} />
      </Button>
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = (props) => {
  const theme: Theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <Button
        style={{
          position: "absolute",
          top: -5,
          left: md ? -5 : -15,
          minWidth: md ? 30 : 40,
          maxWidth: md ? 30 : 40,
          minHeight: md ? 30 : 40,
          maxHeight: md ? 30 : 40,
          background: "#2B2D25",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          border: "1px solid #fff",
          zIndex: 5,
        }}
      >
        <ArrowLeftIcon style={{ fontSize: 32, color: "#fff" }} />
      </Button>
    </div>
  );
};
export const LandingPage = () => {
  const classes = useStyles();

  const theme: Theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down(380));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const [playVideo, setPlayVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState(1);
  const [roadmapTab, setRoadmapTab] = useState(1);
  const [emailVerifiTried, setEmailVerifiTried] = useState(false);
  const [tvl, setTvl] = useState(0);
  const [staked, setStaked] = useState(0);
  const [web3Toggle, setWeb3Toggle] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: sm ? 2 : lg ? 4 : 6,
    rows: sm ? 2 : 1,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => setLoaded(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <Box
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <Box style={{ width: "100%", background: "#000" }}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: sm ? "column" : "row",
              gap: sm ? "25px" : "5px",
              padding: md ? "50px 5% 0" : lg ? "7% 5% 0" : "7% 7% 0",
              position: "relative",
              maxWidth: sm ? "100%" : 1600,
              margin: "0 auto",
            }}
          >
            <Box
              style={{
                width: "100%",
                position: "relative",
                maxWidth: sm ? 370 : "100%",
                margin: "0 auto",
                zIndex: 2,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  gap: sm ? "15px" : "35px",
                  marginBottom: "15px",
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_logo.svg"
                  alt="Gobbl AI"
                  style={{
                    minWidth: md ? 140 : 240,
                    height: md ? 60 : 100,
                    objectFit: "contain",
                  }}
                />
                <h1
                  style={{
                    fontFamily: "'Rubik'",
                    fontWeight: 900,
                    fontSize: sm ? 54 : "96px",
                    lineHeight: "120%",
                    color: "#64FF99",
                    marginTop: sm ? "-7px" : "-15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  AI
                  <span style={{ opacity: 0 }}> gobbl</span>
                </h1>
              </Box>
              <Typography
                variant="body1"
                style={{
                  fontWeight: 500,
                  fontSize: md ? 18 : lg ? 20 : 25,
                  lineHeight: "110%",
                  color: "#FDFFF5",
                  maxWidth: 480,
                  marginTop: "25px",
                  marginBottom: sm ? "50px" : "75px",
                }}
              >
                Transform your Restaurant with new employees. Introducing AI for
                Food.
              </Typography>
              <StarSvg
                size={md ? 12 : 20}
                color="#66FF99"
                style={{
                  top: "-15%",
                  left: sm ? "-3%" : "-8%",
                }}
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <motion.div
                initial={{
                  x: 200,
                }}
                animate={{
                  x: 0,
                }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  duration: 1.5,
                }}
                style={{
                  marginTop: "auto",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                <motion.div
                  initial={{
                    x: -5,
                  }}
                  animate={{
                    x: 5,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    type: "spring",
                    bounce: 0.5,
                    duration: 1.5,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/banner_gobbl.png"
                    alt="Gobbl AI"
                    width={560}
                    height={1190}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </motion.div>
              </motion.div>
              <Box
                style={{
                  position: "absolute",
                  top: sm ? -110 : -150,
                  right: sm ? -50 : -90,
                  width: sm ? 350 : 650,
                  height: sm ? 350 : 650,
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(46, 73, 211, 0.6) 0%, rgba(84, 56, 211, 0) 100%)",
                  zIndex: 0,
                }}
              />
              <StarSvg
                size={md ? 10 : 16}
                color="#66FF99"
                style={{
                  top: "-25%",
                  right: sm ? 0 : "-8%",
                  animationDuration: "0.8s",
                }}
              />
              <StarSvg
                size={md ? 20 : 28}
                style={{
                  top: 0,
                  right: sm ? "10%" : "5%",
                  animationDuration: "1.2s",
                }}
              />
              <StarSvg
                size={md ? 12 : 20}
                style={{
                  bottom: "45%",
                  left: sm ? "15%" : "22%",
                  animationDuration: "0.6s",
                }}
              />
            </Box>
            <Box
              style={{
                position: "absolute",
                zIndex: 3,
                width: "100%",
                height: 0,
                bottom: sm ? -1 : -3,
                left: 0,
                borderBottom: sm ? "1px solid #fff" : "3px solid #fff",
              }}
            />
          </Box>
          <section className={isMobile ? "py-8" : "py-16"}>
            <div className="max-w-[1800px] mx-auto px-8 md:px-12 lg:px-16">
              <div
                className={`h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden`}
              >
                <DemoSimulation />
              </div>
            </div>
          </section>
        </Box>
      </Box>

      {/* first_foodchain */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#161810",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: "#000",
            padding: md ? (sm ? "50px 5%" : "75px 5%") : "7% 5% 5%",
          }}
        >
          <Box
            style={{
              width: "100%",
              maxWidth: "1440px",
              margin: "0 auto",
              display: "flex",
              alignItems: sm ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              flexDirection: sm ? "column" : "row",
              gap: sm ? "25px" : "75px",
              position: "relative",
            }}
          >
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: sm ? 0.4 : 0.8 }}
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                top: md ? -30 : -30,
                left: md ? "-30%" : "-100px",
                zIndex: 0,
              }}
            >
              <motion.div
                variants={{
                  offscreen: {
                    x: -200,
                    y: -200,
                  },
                  onscreen: {
                    x: -30,
                    y: -30,
                    transition: {
                      type: "spring",
                      bounce: 0.5,
                      duration: 1.5,
                    },
                  },
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/shushi.png"
                  alt="Gobbl AI"
                  width={sm ? 220 : 300}
                  height={sm ? 220 : 300}
                  style={{
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            </motion.div>
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/food_with_ai.svg"
              alt="Gobbl AI - Powering food with AI"
              width={600}
              height={450}
              style={{
                pointerEvents: "none",
                userSelect: "none",
                width: sm ? "100%" : "50%",
                maxHeight: 290,
                height: "100%",
                zIndex: 0,
              }}
            />
            <Box style={{ width: sm ? "100%" : "50%" }}>
              <Typography
                variant="body1"
                className={classes.sub_heading}
                style={{
                  width: "100%",
                  maxWidth: 390,
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                Gobbl is creating essential AI infrastructure for restaurants
                that thinks like your best manager.
                <br />
                <br />
                We are replacing static systems across the board with self
                learning systems that will reshape the modern restaurant.
              </Typography>
            </Box>
            <StarSvg style={{ top: 0, right: 0, animationDuration: "1.2s" }} />
            <StarSvg
              size={md ? 12 : 20}
              color="#66FF99"
              style={{
                top: sm ? "-10%" : "-15%",
                right: "8%",
                animationDuration: "0.8s",
              }}
            />
            <StarSvg
              size={md ? 12 : 20}
              color="#66FF99"
              style={{ top: "-25%", left: "32%" }}
            />
            <StarSvg
              size={md ? 12 : 20}
              color="#66FF99"
              style={{ top: "50%", left: "-1%", animationDuration: "0.6s" }}
            />
            <StarSvg
              style={{
                bottom: sm ? "-15%" : "-30%",
                left: sm ? "15%" : "25%",
                animationDuration: "1.2s",
              }}
            />
            <StarSvg
              size={md ? 12 : 20}
              color="#66FF99"
              style={{
                bottom: "-84%",
                left: "-3%",
                animationDuration: "0.8s",
              }}
            />
          </Box>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: md ? -60 : -140,
              right: md ? 0 : -15,
              zIndex: 0,
            }}
          >
            <motion.div
              variants={{
                offscreen: {
                  x: 280,
                  y: -280,
                },
                onscreen: {
                  y: 0,
                  x: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.5,
                    duration: 1.5,
                  },
                },
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/shushi_plate.svg"
                alt="Gobbl AI"
                width={md ? 100 : lg ? 220 : 290}
                height={md ? 100 : lg ? 220 : 290}
                style={{
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </motion.div>
        </Box>

        {/* how */}
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#161810",
            position: "relative",
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
            alt="Gobbl AI"
            width={2000}
            height={2000}
            style={{
              pointerEvents: "none",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              padding: md ? (sm ? "50px 0" : "75px 5%") : "7%",
            }}
          >
            <Box
              style={{
                width: "100%",
                maxWidth: "1440px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: sm ? "25px" : "75px",
                position: "relative",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "5px",
                  padding: sm ? "0 5%" : 0,
                  // flexDirection: sm ? "column" : "row",
                }}
              >
                <h2
                  className={classes.heading2}
                  style={{ color: "#64FF99", height: sm ? 42 : 115 }}
                >
                  HOW
                </h2>
                <Typography
                  variant="h3"
                  className={classes.sub_heading}
                  style={{
                    fontWeight: 600,
                    fontSize: sm ? 16 : 32,
                    lineHeight: "100%",
                    maxWidth: 390,
                    textAlign: "left",
                  }}
                >
                  does AI make your
                  <br />
                  restaurant <span style={{ color: "#FF9CFF" }}>better?</span>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/how_ai.webp"
                  alt="Gobbl AI"
                  width={1440}
                  height={517}
                  loading="eager"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* the ai_agent */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          padding: md ? (sm ? "50px 5%" : "75px 5%") : "7%",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            // minHeight: "100vh",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: sm ? "flex-start" : "center",
              justifyContent: "space-between",
              flexDirection: sm ? "column" : "row-reverse",
              gap: "10px",
              position: "relative",
            }}
          >
            <TitleComponent
              title1="The AI"
              title2="Agents"
              style={{ alignItems: sm ? "flex-start" : "flex-end" }}
              titleStyle={{
                paddingRight: !sm ? "15px" : 0,
                paddingLeft: sm ? "15px" : 0,
              }}
              badgeStyle={{
                transform: sm ? "rotate(-5.5deg)" : "rotate(7deg)",
                marginTop: sm ? "-5px" : "-15px",
                zIndex: 1,
              }}
            />
            <Typography
              variant="body1"
              className={classes.sub_heading}
              style={{ maxWidth: 460, textAlign: "left", fontWeight: 400 }}
            >
              AI powered Agents are set to take over from static systems.
              Creating restaurants that think, learn, and grow smarter every
              day.
            </Typography>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: lg ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
              placeItems: "center",
              gap: "10px",
              rowGap: lg ? (sm ? "60px" : "120px") : "20px",
              paddingTop: md ? 80 : "12%",
            }}
          >
            <ExploreCard
              img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/roadmap1.png"
              imgSize={sm ? 95 : 170}
              title="ORDER"
              sub_title="Intuitive food ordering"
              description1="Deploy self-learning"
              description2="voice & chat agents to"
              description3="accept orders using"
              description4="natural language"
            />
            <ExploreCard
              img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap2.png"
              imgSize={sm ? 110 : 200}
              title="OPERATE"
              sub_title="Kitchen AI Cockpit"
              description1="Transform backend ops"
              description2="into a synchronized dance"
              description3="of preparation, cooking,"
              description4="and dispatch"
            />
            <ExploreCard
              img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap3.png"
              imgSize={sm ? 100 : 200}
              title="DELIVER"
              sub_title="Managing the last mile"
              description1="Slash delivery costs with"
              description2="AI-powered route"
              description3="optimization that learns"
              description4="and adapts in real-time"
            />
            <ExploreCard
              img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap4.png"
              imgSize={sm ? 110 : 200}
              title="INTEGRATE"
              sub_title="with partner systems"
              description1="Connect to any platform,"
              description2="anywhere, through"
              description3="intelligent APIs that speak"
              description4="every system's language"
            />
          </Box>
          <Box
            style={{
              position: "absolute",
              width: lg ? (sm ? 160 : 250) : 318,
              height: lg ? (sm ? 160 : 250) : 318,
              right: "-25%",
              bottom: "-20%",
              background: "#40FFF4",
              opacity: 0.6,
              filter: "blur(212px)",
            }}
          />
        </Box>
      </Box>

      {/* meet_gobbl */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#161810",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
          }}
        />
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
          }}
        />
        <Box
          style={{
            width: "100%",
            height: "100%",
            padding: md ? (sm ? "50px 5%" : "75px 5%") : "7%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box
            style={{
              width: "100%",
              maxWidth: "1440px",
              margin: "0 auto",
              // minHeight: "100vh",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: sm ? "flex-start" : "space-between",
                flexDirection: sm ? "column" : "row",
                gap: "10px",
                position: "relative",
              }}
            >
              <TitleComponent
                title1="Meet"
                title2="$GOBBL"
                badgeStyle={{
                  transform: sm ? "rotate(-5.5deg)" : "rotate(-6deg)",
                  marginTop: sm ? "-10px" : "-23px",
                  marginLeft: "1%",
                  zIndex: 1,
                }}
              />
              <Typography
                variant="body1"
                className={classes.sub_heading}
                style={{
                  maxWidth: 540,
                  textAlign: "left",
                  fontWeight: 400,
                  marginTop: sm ? 0 : "35px",
                }}
              >
                Building a decentralized ecosystem where network value is
                distributed to those who fuel its growth
              </Typography>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: sm ? "25px" : undefined, // Use ternary operator instead
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/meet_gobbl.webp"
                alt="Gobbl AI"
                width={1150}
                height={600}
                loading="eager"
              />
            </Box>
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
              alt="Gobbl AI"
              width={sm ? 36 : 72}
              height={sm ? 36 : 72}
              className={classes.bg_orare}
              style={{
                top: sm ? "10%" : "20%",
                right: sm ? "10%" : "15%",
                animation: "zoom_rotate 2.2s ease-in-out infinite 0.5s",
              }}
            />
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
              alt="Gobbl AI"
              width={sm ? 28 : 56}
              height={sm ? 28 : 56}
              className={classes.bg_orare}
              style={{
                opacity: 0.2,
                top: "-5%",
                left: "18%",
                animation: "zoom_rotate 2.2s ease-in-out infinite 1s",
              }}
            />
            {!sm && (
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
                alt="Gobbl AI"
                width={96}
                height={96}
                className={classes.bg_orare}
                style={{
                  opacity: 0.6,
                  top: "18%",
                  left: "-3%",
                  animation: "zoom_rotate 2.2s ease-in-out infinite 1.5s",
                }}
              />
            )}
            {!sm && (
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
                alt="Gobbl AI"
                width={72}
                height={72}
                className={classes.bg_orare}
                style={{
                  opacity: 0.4,
                  bottom: "-15%",
                  left: "12%",
                  animation: "zoom_rotate 2.2s ease-in-out infinite 2s",
                }}
              />
            )}
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
              alt="Gobbl AI"
              width={sm ? 28 : 56}
              height={sm ? 28 : 56}
              className={classes.bg_orare}
              style={{
                opacity: 0.2,
                bottom: "-5%",
                left: sm ? "-5%" : "32%",
                animation: "zoom_rotate 2.2s ease-in-out infinite 2.5s",
              }}
            />
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
              alt="Gobbl AI"
              width={sm ? 48 : 96}
              height={sm ? 48 : 96}
              className={classes.bg_orare}
              style={{
                opacity: 0.6,
                bottom: "-15%",
                right: 0,
                animation: "zoom_rotate 2.2s ease-in-out infinite 3s",
              }}
            />
            {!sm && (
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
                alt="Gobbl AI"
                width={56}
                height={56}
                className={classes.bg_orare}
                style={{
                  opacity: 0.2,
                  top: "40%",
                  right: "0%",
                  animation: "zoom_rotate 2.2s ease-in-out infinite 3.5s",
                }}
              />
            )}
            <Box
              style={{
                position: "absolute",
                width: lg ? (sm ? 160 : 250) : 318,
                height: lg ? (sm ? 160 : 250) : 318,
                top: "-20%",
                left: "-20%",
                background: "#C9F41B",
                opacity: 0.6,
                filter: "blur(212px)",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* food_partners */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
            // zIndex: 3
          }}
        />
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
            // zIndex: 3,
          }}
        />
        <Box
          style={{
            width: "100%",
            height: "100%",
            padding: md ? (sm ? "50px 5%" : "75px 5%") : "7%",
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              width: "100%",
              maxWidth: "1440px",
              margin: "0 auto",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              style={{
                width: sm ? "100%" : "90%",
                display: "flex",
                alignItems: sm ? "flex-start" : "center",
                justifyContent: "space-between",
                flexDirection: sm ? "column-reverse" : "row",
                gap: "10px",
                position: "relative",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="body1"
                className={classes.sub_heading}
                style={{
                  maxWidth: 420,
                  textAlign: "left",
                  fontWeight: 400,
                  marginBottom: sm ? "15px" : 0,
                }}
              ></Typography>
              <TitleComponent
                title1="Food"
                title2="Partners"
                titleStyle={{
                  paddingLeft: "25px",
                }}
                style={{
                  alignItems: sm ? "flex-start" : "center",
                }}
                badgeStyle={{
                  transform: sm ? "rotate(-5.5deg)" : "rotate(5deg)",
                  marginTop: sm ? "-6px" : "-4px",
                  marginRight: "auto",
                  zIndex: 1,
                }}
              />
            </Box>
            <Box style={{ width: "100%", padding: sm ? 0 : "5% 0 0" }}>
              <Box
                style={{
                  width: "100%",
                  maxWidth: "678px",
                  height: md ? 60 : 84,
                  boxSizing: "border-box",
                  background:
                    "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                  borderRadius: sm ? "12px" : "16px",
                  padding: "1px",
                  margin: "0 auto",
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    borderRadius: sm ? "12px" : "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: sm ? 0 : "10px",
                    padding: sm ? "0 7px" : "0 15px",
                  }}
                >
                  <Button
                    sx={{
                      fontFamily: "Rubik",
                      fontSize: 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      height: "52px",
                      borderRadius: "16px",
                      fontWeight: tab === 1 ? 800 : 600,
                      opacity: tab === 1 ? 1 : 0.56,
                      background: tab === 1 ? "#D1FF19" : "transparent",
                      color: tab === 1 ? "#161810" : "#FDFFF5",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                        padding: "5px 10px",
                        height: "40px",
                        borderRadius: "10px",
                      },
                    }}
                    onClick={() => setTab(1)}
                  >
                    BRANDS
                  </Button>
                  <Button
                    sx={{
                      fontFamily: "Rubik",
                      fontSize: 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      borderRadius: "16px",
                      fontWeight: tab === 2 ? 800 : 600,
                      opacity: tab === 2 ? 1 : 0.56,
                      background: tab === 2 ? "#D1FF19" : "transparent",
                      color: tab === 2 ? "#161810" : "#FDFFF5",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                        padding: "5px 10px",
                        height: "40px",
                        borderRadius: "10px",
                      },
                    }}
                    onClick={() => setTab(2)}
                  >
                    CHEFS
                  </Button>
                  <Button
                    sx={{
                      fontFamily: "Rubik",
                      fontSize: 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      borderRadius: "16px",
                      fontWeight: tab === 3 ? 800 : 600,
                      opacity: tab === 3 ? 1 : 0.56,
                      background: tab === 3 ? "#D1FF19" : "transparent",
                      color: tab === 3 ? "#161810" : "#FDFFF5",
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                        padding: "5px 10px",
                        height: "40px",
                        borderRadius: "10px",
                      },
                    }}
                    onClick={() => setTab(3)}
                  >
                    RESTAURANTS
                  </Button>
                  <Link to="/partners">
                    <Button
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: 20,
                        textAlign: "center",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        gap: "8px",
                        width: "max-content",
                        borderRadius: "16px",
                        opacity: 0.56,
                        background: "transparent",
                        color: "#FDFFF5",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 12,
                          padding: "5px 10px",
                          height: "40px",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      VIEW ALL
                    </Button>
                  </Link>
                </Box>
              </Box>

              {tab === 1 && (
                <Box
                  style={{
                    width: "100%",
                    paddingTop: "5%",
                    display: "grid",
                    gridTemplateColumns: sm
                      ? "repeat(auto-fill,minmax(130px, 1fr))"
                      : md
                      ? "repeat(auto-fill,minmax(160px, 1fr))"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {home_brands.map((brand, i) => (
                    <Box
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <Box
                        style={{
                          boxSizing: "border-box",
                          background:
                            "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                          borderRadius: sm ? "20px" : "24px",
                          padding: "1px",
                        }}
                      >
                        <img
                          src={brand.image}
                          alt="Gobbl AI"
                          width={170}
                          height={175}
                          style={{
                            borderRadius: sm ? "20px" : "24px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 16 : 20,
                          lineHeight: "120%",
                          textAlign: "center",
                          color: "#FDFFF5",
                          opacity: 0.8,
                        }}
                      >
                        {brand.description}
                        <br />
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                          }}
                        >
                          {brand.description2}
                        </span>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {tab === 2 && (
                <Box
                  style={{
                    width: "100%",
                    paddingTop: "5%",
                    display: "grid",
                    gridTemplateColumns: md
                      ? "repeat(auto-fill,minmax(160px, 1fr))"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {chef_partners.map((chef, i) => (
                    <Box
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <Box
                        style={{
                          boxSizing: "border-box",
                          background:
                            "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                          borderRadius: sm ? "20px" : "24px",
                          padding: "1px",
                        }}
                      >
                        <img
                          src={chef.image}
                          alt="Gobbl AI"
                          width={175}
                          height={175}
                          style={{
                            maxHeight: 175,
                            objectFit: "cover",
                            borderRadius: sm ? "20px" : "24px",
                            objectPosition: "top",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 16 : 20,
                          lineHeight: "120%",
                          textAlign: "center",
                          color: "#FDFFF5",
                          opacity: 0.8,
                        }}
                      >
                        {chef.description}
                        <br />
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                          }}
                        >
                          {chef.description2}
                        </span>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {tab === 3 && (
                <Box
                  style={{
                    width: "100%",
                    paddingTop: "5%",
                    display: "grid",
                    gridTemplateColumns: md
                      ? "repeat(auto-fill,minmax(160px, 1fr))"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {restaurants.map((restaurant, i) => (
                    <Box
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <Box
                        style={{
                          boxSizing: "border-box",
                          background:
                            "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                          borderRadius: sm ? "20px" : "24px",
                          padding: "1px",
                        }}
                      >
                        <img
                          src={restaurant.image}
                          alt="Gobbl AI"
                          width={175}
                          height={175}
                          style={{
                            borderRadius: sm ? "20px" : "24px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 16 : 20,
                          lineHeight: "120%",
                          textAlign: "center",
                          color: "#FDFFF5",
                          opacity: 0.8,
                        }}
                      >
                        {restaurant.description}
                        <br />
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                          }}
                        >
                          {restaurant.description2}
                        </span>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* meet_foodies */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#161810",
          padding: md ? (sm ? "50px 5%" : "75px 5%") : "7%",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="Gobbl AI"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            // minHeight: "100vh",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: sm ? "flex-start" : "center",
              justifyContent: "space-between",
              flexDirection: sm ? "column" : "row",
              gap: "10px",
              position: "relative",
            }}
          >
            <TitleComponent
              title1="Meet the"
              title2="Foodies"
              titleStyle={{
                paddingLeft: "25px",
              }}
              badgeStyle={{
                transform: sm ? "rotate(-5.5deg)" : "rotate(-6deg)",
                marginTop: sm ? "-2px" : "-8px",
                marginLeft: lg ? "0%" : "5%",
                zIndex: 1,
              }}
            />
            <Typography
              variant="body1"
              className={classes.sub_heading}
              style={{
                maxWidth: 500,
                textAlign: "left",
                fontWeight: 400,
              }}
            ></Typography>
          </Box>
          <Box
            style={{
              width: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: sm ? "10px" : "75px",
              padding: md ? "50px 0" : "5%",
            }}
          >
            <Box
              style={{
                position: "relative",
                width: md ? 185 : 260,
                height: md ? 248 : 367,
                padding: md ? "10px 5px 5px" : "25px 15px 15px",
                borderRadius: md ? "16px" : "24px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                gap: md ? "5px" : "10px",
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/team_frame1.svg"
                alt="Gobbl AI"
                width={260}
                height={367}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
                alt="Gobbl AI"
                style={{
                  width: md ? 120 : 172,
                  height: md ? 120 : 172,
                }}
              />
              <Typography
                variant="body1"
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: md ? 24 : 32,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#FF9CFF",
                }}
              >
                Supreet
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 400,
                  fontSize: md ? 14 : 24,
                  lineHeight: md ? "100%" : "140%",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                CO-FOUNDER
              </Typography>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: md ? "15px" : "25px",
                  marginTop: md ? 0 : "5px",
                }}
              >
                <a href="https://twitter.com/supreetraju" target="_blank">
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/twitter.svg"
                    alt="Gobbl AI"
                    width={md ? 24 : 36}
                    height={md ? 24 : 36}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/supreetraju/"
                  target="_blank"
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/linkedIn.svg"
                    alt="Gobbl AI"
                    width={md ? 24 : 36}
                    height={md ? 24 : 36}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </a>
              </Box>
            </Box>
            <Box
              style={{
                position: "relative",
                width: md ? 185 : 260,
                height: md ? 248 : 367,
                padding: md ? "10px 5px 5px" : "25px 15px 15px",
                borderRadius: md ? "16px" : "24px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                gap: md ? "5px" : "10px",
              }}
            >
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/team_frame1.svg"
                alt="Gobbl AI"
                width={180}
                height={250}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_coin.webp"
                alt="Gobbl AI"
                style={{
                  width: md ? 120 : 172,
                  height: md ? 120 : 172,
                }}
              />
              <Typography
                variant="body1"
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: md ? 24 : 32,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#FF9CFF",
                }}
              >
                Gaurav
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 400,
                  fontSize: md ? 14 : 24,
                  lineHeight: md ? "100%" : "140%",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                CO-FOUNDER
              </Typography>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: md ? "15px" : "25px",
                  marginTop: md ? 0 : "5px",
                }}
              >
                <a href="https://twitter.com/gaurav_gupta9" target="_blank">
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/twitter.svg"
                    alt="Gobbl AI"
                    width={md ? 24 : 36}
                    height={md ? 24 : 36}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/gauravgupta99/"
                  target="_blank"
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/linkedIn.svg"
                    alt="Gobbl AI"
                    width={md ? 24 : 36}
                    height={md ? 24 : 36}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 1 }}
          style={{
            position: "absolute",
            top: md ? "23%" : "20%",
            right: 0,
            zIndex: -1,
          }}
        >
          <motion.div
            variants={{
              offscreen: {
                x: 250,
              },
              onscreen: {
                x: 10,
                transition: {
                  type: "spring",
                  bounce: 0.35,
                  duration: 1.5,
                },
              },
            }}
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/popcorn1.svg"
              alt="Gobbl AI"
              width={md ? 90 : 300}
              height={md ? 90 : 300}
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <motion.div
            variants={{
              offscreen: {
                x: -280,
              },
              onscreen: {
                x: -10,
                transition: {
                  type: "spring",
                  bounce: 0.35,
                  duration: 1.5,
                },
              },
            }}
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/newhome/popcorn2.png"
              alt="Gobbl AI"
              width={md ? 105 : 330}
              height={md ? 105 : 330}
            />
          </motion.div>
        </motion.div>
      </Box>

      {/* request_for_demo */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#5438D3",
          padding: md ? (sm ? "50px 5% 0" : "75px 5% 0") : "7% 7% 0",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            // minHeight: "100vh",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexDirection: sm ? "column" : "row",
            gap: sm ? "50px" : "25px",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: md ? (sm ? "50px" : "75px") : "7%",
            }}
          >
            <Typography
              variant="body1"
              style={{
                fontFamily: "'Rubik'",
                fontWeight: 900,
                fontSize: sm ? 40 : 50,
                lineHeight: "100%",
                color: "#64FF99",
              }}
            >
              Ready or not, AI come!
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontFamily: "'Karla'",
                fontWeight: 600,
                fontSize: sm ? 20 : "25px",
                lineHeight: "110%",
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
              }}
            >
              Shape the future of your restaurant with the our Co-Pilot
            </Typography>
            <a href="https://forms.gle/VuR6zz3kxB4skbep6" target="_blank">
              <CommonButton
                style={{
                  marginTop: sm ? "25px" : "50px",
                }}
                btnBgStyle={{
                  width: sm ? 280 : 330,
                }}
                btnStyle={{
                  width: sm ? 280 : 330,
                  fontSize: sm ? 20 : 25,
                }}
              >
                REQUEST FOR DEMO
              </CommonButton>
            </a>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: sm ? "50px" : "5%",
            }}
          >
            <motion.div
              initial={{
                y: 200,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 1.5,
              }}
              style={{
                marginTop: "auto",
                zIndex: 1,
                position: "relative",
              }}
            >
              <motion.div
                initial={{
                  x: sm ? 5 : -5,
                }}
                animate={{
                  x: sm ? -5 : 5,
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  type: "spring",
                  bounce: 0.5,
                  duration: 1.5,
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_meet.webp"
                  alt="Gobbl AI"
                  style={{
                    width: "fit-content",
                    maxHeight: 223,
                    marginBottom: sm ? "-3px" : 0,
                  }}
                />
              </motion.div>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
