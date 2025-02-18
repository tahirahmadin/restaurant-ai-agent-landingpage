import { DemoSimulation } from "./mainComponents/DemoSimulation";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Fade, Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  restaurants,
  home_brands,
  chef_partners,
} from "./homepageComponents/data/partnersData";
import { motion, useInView } from "framer-motion";
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
  delay?: number;
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

const ExploreCard: React.FC<ExploreCardProps> = ({
  img,
  imgSize,
  title,
  sub_title,
  description1,
  description2,
  description3,
  description4,
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
        borderRadius: sm ? "12px" : "24px",
        border: `1px solid #686868`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: sm ? "5px" : "20px",
        padding: sm ? "5% 5% 8%" : "75px 20px",
        transition: "all 0.3s ease",
        transform: "translateY(0)",
        "&:hover": {
          transform: sm ? "translateY(0px)" : "translateY(-50px)",
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
          top: sm ? -20 : -140,
          zIndex: 1,
          position: "absolute",
        }}
      />
      <Typography
        style={{
          width: "100%",
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
          fontSize: sm ? 12 : 20,
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
          fontSize: sm ? 12 : 20,
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
    </Box>
  );
};

const ExploreCardsComponent = () => {
  const classes = useStyles();
  const [animation, setAnimation] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prevState) => {
        if (
          (!prevState.card1 &&
            !prevState.card2 &&
            !prevState.card3 &&
            !prevState.card4) ||
          prevState.card4
        ) {
          return { card1: true, card2: false, card3: false, card4: false };
        } else if (prevState.card1) {
          return { card1: false, card2: true, card3: false, card4: false };
        } else if (prevState.card2) {
          return { card1: false, card2: false, card3: true, card4: false };
        } else if (prevState.card3) {
          return { card1: false, card2: false, card3: false, card4: true };
        }

        return prevState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "center",
        gap: "10px",
        rowGap: "35px",
        paddingTop: 50,
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 125,
          background:
            "linear-gradient(241.27deg, rgba(255, 255, 255, 0.08) -5.59%, rgba(255, 255, 255, 0) 100%)",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          borderRadius: "20px",
          border: `1px solid #686868`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          transition: "all 0.3s ease",
        }}
        onClick={() =>
          setAnimation((prevState) => ({
            ...prevState,
            card1: true,
            card2: false,
            card3: false,
            card4: false,
          }))
        }
      >
        <Box
          style={{
            width: "100%",
            height: animation.card1 ? 33 : 110,
            display: "flex",
            justifyContent: "center",
            transition: "height 0.3s linear",
          }}
        >
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/roadmap1.png"
            alt="Gobbl AI"
            width={95}
            height={110}
            style={{
              minWidth: 95,
              minHeight: 110,
              objectFit: "contain",
              zIndex: 1,
              marginTop: "-25px",
              transform: animation.card1
                ? "scale(0.6) translateY(-50px)"
                : "scale(1) translateY(0px)",
              transition: "all 0.3s linear",
            }}
          />
        </Box>
        <Box
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            style={{
              width: "100%",
              maxWidth: 140,
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "100%",
              textAlign: "center",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            ORDERING
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 12,
              color: "#FF9CFF",
              fontWeight: 500,
              transform: animation.card1
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Intuitive food ordering
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 10,
              height: 75,
              transform: animation.card1
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Deploy self-learning
            <br />
            voice & chat agents to
            <br />
            accept orders using
            <br />
            natural language
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: 150,
          height: 125,
          background:
            "linear-gradient(241.27deg, rgba(255, 255, 255, 0.08) -5.59%, rgba(255, 255, 255, 0) 100%)",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          borderRadius: "20px",
          border: `1px solid #686868`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          transition: "all 0.3s ease",
        }}
        onClick={() =>
          setAnimation((prevState) => ({
            ...prevState,
            card1: false,
            card2: true,
            card3: false,
            card4: false,
          }))
        }
      >
        <Box
          style={{
            width: "100%",
            height: animation.card2 ? 33 : 110,
            display: "flex",
            justifyContent: "center",
            transition: "height 0.3s linear",
          }}
        >
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap2.png"
            alt="Gobbl AI"
            width={110}
            height={110}
            style={{
              minWidth: 110,
              minHeight: 110,
              objectFit: "contain",
              zIndex: 1,
              marginTop: "-25px",
              transform: animation.card2
                ? "scale(0.6) translateY(-50px)"
                : "scale(1) translateY(0px)",
              transition: "all 0.3s linear",
            }}
          />
        </Box>

        <Box
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            style={{
              width: "100%",
              maxWidth: 140,
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "100%",
              textAlign: "center",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            ANALYTICS
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 12,
              color: "#FF9CFF",
              fontWeight: 500,
              transform: animation.card2
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Cultivate Customers
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 10,
              height: 75,
              transform: animation.card2
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Recieve actionable
            <br />
            insights into sales and
            <br />
            trends to create strategies
            <br />
            for customer retention
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: 150,
          height: 125,
          background:
            "linear-gradient(241.27deg, rgba(255, 255, 255, 0.08) -5.59%, rgba(255, 255, 255, 0) 100%)",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          borderRadius: "20px",
          border: `1px solid #686868`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          transition: "all 0.3s ease",
        }}
        onClick={() =>
          setAnimation((prevState) => ({
            ...prevState,
            card1: false,
            card2: false,
            card3: true,
            card4: false,
          }))
        }
      >
        <Box
          style={{
            width: "100%",
            height: animation.card3 ? 33 : 110,
            display: "flex",
            justifyContent: "center",
            transition: "height 0.3s linear",
          }}
        >
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap3.png"
            alt="Gobbl AI"
            width={110}
            height={110}
            style={{
              minWidth: 110,
              minHeight: 110,
              objectFit: "contain",
              zIndex: 1,
              marginTop: "-25px",
              transform: animation.card3
                ? "scale(0.6) translateY(-50px)"
                : "scale(1) translateY(0px)",
              transition: "all 0.3s linear",
            }}
          />
        </Box>

        <Box
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            style={{
              width: "100%",
              maxWidth: 140,
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "100%",
              textAlign: "center",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            MARKETING
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 12,
              color: "#FF9CFF",
              fontWeight: 500,
              transform: animation.card3
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Automate Campaigns
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 10,
              height: 75,
              transform: animation.card3
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Run targeted campaigns
            <br />
            and promotions to attrct
            <br />
            users, based on trends&
            <br />
            inventory
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: 150,
          height: 125,
          background:
            "linear-gradient(241.27deg, rgba(255, 255, 255, 0.08) -5.59%, rgba(255, 255, 255, 0) 100%)",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          borderRadius: "20px",
          border: `1px solid #686868`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          transition: "all 0.3s ease",
        }}
        onClick={() =>
          setAnimation((prevState) => ({
            ...prevState,
            card1: false,
            card2: false,
            card3: false,
            card4: true,
          }))
        }
      >
        <Box
          style={{
            width: "100%",
            height: animation.card4 ? 33 : 110,
            display: "flex",
            justifyContent: "center",
            transition: "height 0.3s linear",
          }}
        >
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap4.png"
            alt="Gobbl AI"
            width={110}
            height={110}
            style={{
              minWidth: 110,
              minHeight: 110,
              objectFit: "contain",
              zIndex: 1,
              marginTop: "-25px",
              transform: animation.card4
                ? "scale(0.6) translateY(-50px)"
                : "scale(1) translateY(0px)",
              transition: "all 0.3s linear",
            }}
          />
        </Box>
        <Box
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            style={{
              width: "100%",
              maxWidth: 140,
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "100%",
              textAlign: "center",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            INTEGRATIONS
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 12,
              color: "#FF9CFF",
              fontWeight: 500,
              transform: animation.card4
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            with partner systems
          </Typography>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
              lineHeight: "100%",
              fontSize: 10,
              height: 75,
              transform: animation.card4
                ? "translateY(0px)"
                : "translateY(25px)",
            }}
          >
            Connect to any platform,
            <br />
            anywhere, through
            <br />
            intelligent APIs that speak
            <br />
            every system's language
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ArchitectureComponent = () => {
  const [animation, setAnimation] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prevState) => {
        if (
          (!prevState.tab1 &&
            !prevState.tab2 &&
            !prevState.tab3 &&
            !prevState.tab4) ||
          prevState.tab4
        ) {
          return { tab1: true, tab2: false, tab3: false, tab4: false };
        } else if (prevState.tab1) {
          return { tab1: false, tab2: true, tab3: false, tab4: false };
        } else if (prevState.tab2) {
          return { tab1: false, tab2: false, tab3: true, tab4: false };
        } else if (prevState.tab3) {
          return { tab1: false, tab2: false, tab3: false, tab4: true };
        }

        return prevState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 1,
        gap: "15px",
      }}
    >
      <Typography
        style={{
          width: "fit-content",
          height: 42,
          background: "#FF9CFF",
          borderRadius: "50px",
          fontFamily: "'Rubik'",
          fontWeight: 900,
          fontSize: 24,
          lineHeight: "120%",
          fontVariant: "all-small-caps",
          color: "#000000",
          padding: "0 25px 5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        ARCHITECTURE
      </Typography>

      <Box
        style={{
          width: 330,
          height: 150,
          overflow: "hidden",
          paddingTop: "5px",
        }}
      >
        {/* tabs */}
        <Box style={{ width: "100%", height: 80, display: "flex" }}>
          <Box
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={() =>
              setAnimation((prevState) => ({
                ...prevState,
                tab1: true,
                tab2: false,
                tab3: false,
                tab4: false,
              }))
            }
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/base_arc_mobile.webp"
              alt="Gobbl AI"
              style={{
                width: 43,
                height: 45,
                objectFit: "contain",
                position: "absolute",
                transform: animation.tab1
                  ? "scale(1.6) translateY(-2px)"
                  : "scale(1)",
                transition: "all 0.3s linear",
                zIndex: 1,
              }}
            />
            {animation.tab1 && (
              <svg
                width="96"
                height="99"
                viewBox="0 0 96 99"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: -2,
                  right: -16,
                }}
              >
                <path
                  d="M0.00108594 21.6206C0.00108596 16.7974 3.44387 12.6615 8.18705 11.7865L67.626 0.822206C73.0738 -0.182721 78.3005 3.43267 79.2818 8.8848L95.5026 99.0018L0.00108574 96.5004L0.00108594 21.6206Z"
                  fill="#161810"
                />
              </svg>
            )}
          </Box>
          <Box
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={() =>
              setAnimation((prevState) => ({
                ...prevState,
                tab1: false,
                tab2: true,
                tab3: false,
                tab4: false,
              }))
            }
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/protein_mobile.webp"
              alt="Gobbl AI"
              style={{
                width: 57,
                height: 45,
                objectFit: "contain",
                position: "absolute",
                transform: animation.tab2
                  ? "scale(1.5) translateY(-5px)"
                  : "scale(1)",
                transition: "all 0.3s linear",
                zIndex: 1,
              }}
            />
            {animation.tab2 && (
              <svg
                width="109"
                height="99"
                viewBox="0 0 109 99"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: -2,
                  right: -21,
                }}
              >
                <path
                  d="M0.00212581 22.8945C0.00209476 18.0398 3.48895 13.8863 8.27037 13.0456L81.1934 0.223362C86.6173 -0.73033 91.7915 2.88079 92.767 8.30078L109.003 98.5001L0.00260946 98.4997L0.00212581 22.8945Z"
                  fill="#161810"
                />
              </svg>
            )}
          </Box>
          <Box
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={() =>
              setAnimation((prevState) => ({
                ...prevState,
                tab1: false,
                tab2: false,
                tab3: true,
                tab4: false,
              }))
            }
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/veggies_mobile.webp"
              alt="Gobbl AI"
              style={{
                width: 58,
                height: 45,
                objectFit: "contain",
                position: "absolute",
                transform: animation.tab3
                  ? "scale(1.5) translateY(-5px)"
                  : "scale(1)",
                transition: "all 0.3s linear",
                zIndex: 1,
              }}
            />
            {animation.tab3 && (
              <svg
                width="113"
                height="99"
                viewBox="0 0 113 99"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: -2,
                  right: -24,
                }}
              >
                <path
                  d="M0.00112453 23.6522C0.00112392 18.815 3.46345 14.6712 8.22365 13.8114L83.2957 0.251634C88.6773 -0.720412 93.8416 2.81083 94.8883 8.17842L112.501 98.4985L0.00113405 98.5005L0.00112453 23.6522Z"
                  fill="#161810"
                />
              </svg>
            )}
          </Box>
          <Box
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={() =>
              setAnimation((prevState) => ({
                ...prevState,
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: true,
              }))
            }
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/sauce_mobile.webp"
              alt="Gobbl AI"
              style={{
                width: 48,
                height: 45,
                objectFit: "contain",
                position: "absolute",
                transform: animation.tab4
                  ? "scale(1.6) translateY(-2px)"
                  : "scale(1)",
                transition: "all 0.3s linear",
                zIndex: 1,
              }}
            />
            {animation.tab4 && (
              <svg
                width="106"
                height="92"
                viewBox="0 0 106 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: -2,
                  right: -4,
                }}
              >
                <path
                  d="M105.995 10.9566C105.995 4.72551 100.358 0.0117955 94.2256 1.11438L23.556 13.8198C19.5841 14.5339 16.4306 17.5655 15.5606 21.5062L-0.00275755 92.001L105.995 92.0007L105.995 10.9566Z"
                  fill="#161810"
                />
              </svg>
            )}
          </Box>
        </Box>
        {/* content */}
        {animation.tab1 && (
          <Box
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#161810",
              borderRadius: "12px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "15px",
                padding: "0 15px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: 16,
                  lineHeight: "120%",
                  fontVariant: "all-small-caps",
                  color: "#FFFFFF",
                }}
              >
                APPLICATION
              </Typography>
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: 10,
                  lineHeight: "120%",
                  textAlign: "right",
                  fontVariant: "all-small-caps",
                  color: "#64FF99",
                }}
              >
                USER INTERACTION LAYER
              </Typography>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                padding: "5px 10px 10px",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Customer Interface
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Restaurant Interface
              </Typography>
            </Box>
          </Box>
        )}
        {animation.tab2 && (
          <Box
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#161810",
              borderRadius: "12px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "15px",
                padding: "0 15px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: 16,
                  lineHeight: "120%",
                  fontVariant: "all-small-caps",
                  color: "#FFFFFF",
                }}
              >
                INTELLIGENCE
              </Typography>
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: 10,
                  lineHeight: "120%",
                  textAlign: "right",
                  fontVariant: "all-small-caps",
                  color: "#64FF99",
                }}
              >
                LLM PROCESSING LAYER
              </Typography>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                padding: "5px 10px 10px",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Food Domain LLMs
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Restaurant LLMs
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Network LLMs
              </Typography>
            </Box>
          </Box>
        )}
        {animation.tab3 && (
          <Box
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#161810",
              borderRadius: "12px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "15px",
                padding: "0 15px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: 16,
                  lineHeight: "120%",
                  fontVariant: "all-small-caps",
                  color: "#FFFFFF",
                }}
              >
                MODELS
              </Typography>
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: 10,
                  lineHeight: "120%",
                  textAlign: "right",
                  fontVariant: "all-small-caps",
                  color: "#64FF99",
                }}
              >
                MODEL INFRASTRUCTURE
              </Typography>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                padding: "5px 10px 10px",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Edge Intelligence
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Model Registry
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Training
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Inference
              </Typography>
            </Box>
          </Box>
        )}
        {animation.tab4 && (
          <Box
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#161810",
              borderRadius: "12px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "15px",
                padding: "0 15px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: 16,
                  lineHeight: "120%",
                  fontVariant: "all-small-caps",
                  color: "#FFFFFF",
                }}
              >
                DATA
              </Typography>
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 700,
                  fontSize: 10,
                  lineHeight: "120%",
                  textAlign: "right",
                  fontVariant: "all-small-caps",
                  color: "#64FF99",
                }}
              >
                VECTOR DATABASE LAYER
              </Typography>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                padding: "5px 10px 10px",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Customer Vectors
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Restaurant Vectors
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Network Vectors
              </Typography>
              <Typography
                style={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "14px",
                  fontFamily: "'Figtree'",
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: "center",
                  lineHeight: "90%",
                  padding: "0 3px",
                  fontVariant: "all-small-caps",
                  color: "#EDEDED",
                }}
              >
                Training Sets
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const draw = {
  offscreen: { pathLength: 0, opacity: 0 },
  onscreen: (i: number) => {
    const delay = i * 0;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
export const LandingPage = () => {
  const classes = useStyles();

  const theme: Theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down(380));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down(1370));

  const [playVideo, setPlayVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState(1);
  const [roadmapTab, setRoadmapTab] = useState(1);
  const [emailVerifiTried, setEmailVerifiTried] = useState(false);
  const [tvl, setTvl] = useState(0);
  const [staked, setStaked] = useState(0);
  const [web3Toggle, setWeb3Toggle] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const friesRef = useRef(null);
  const friesIsInView = useInView(friesRef);
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
                  gap: sm ? "10px" : "35px",
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
                Transform Food Ordering with new employees. Introducing AI for
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
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/food_with_deAi.svg"
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
                Gobbl is transforming how restaurants connect with customers-
                making food discovery personal, intuitive, and effortless.
                <br />
                <br />
                Our technology powers the world’s first autonomous food network,
                with AI agents working like your best employees- from ordering
                to analytics.
                <br />
                <br />
                Get ready for the Agentic era in Food.
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
              padding: md
                ? sm
                  ? "50px 0"
                  : "75px 5% 0"
                : lg
                ? "7%"
                : "7% 7% 10%",
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
                  alignItems: sm ? "center" : "flex-end",
                  justifyContent: "center",
                  gap: sm ? 0 : "5px",
                  padding: sm ? "0 5%" : 0,
                  flexDirection: sm ? "column" : "row",
                }}
              >
                <h2
                  className={classes.heading2}
                  style={{ color: "#fff", height: md ? 60 : 115 }}
                >
                  De<span style={{ color: "#64FF99" }}>AI</span>
                </h2>
                <Typography
                  variant="h3"
                  className={classes.sub_heading}
                  style={{
                    fontWeight: 600,
                    fontSize: sm ? 18 : 24,
                    lineHeight: sm ? "110%" : "100%",
                    maxWidth: 390,
                    textAlign: "left",
                  }}
                >
                  The Future of Food
                  <br />
                  Ordering is here
                </Typography>
              </Box>
              {sm && (
                <Box
                  style={{
                    width: "100%",
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-140px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // y: 50,
                          // scale: 0,
                          x: -85,
                          y: -95,
                        },
                        onscreen: {
                          x: -85,
                          y: -95,
                          scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: 148,
                        height: 76,
                        background: "#000000",
                        border: "0.5px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                        borderRadius: "12px",
                        padding: "5px 3px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 900,
                          fontSize: "14px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                          textAlign: "center",
                        }}
                      >
                        AI AGENTIC FRAMEWORK
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "110%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          textAlign: "center",
                        }}
                      >
                        Connecting users & restaurants with a simple chat
                        interface
                      </Typography>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-140px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // y: 50,
                          // scale: 0,
                          x: 85,
                          y: -95,
                        },
                        onscreen: {
                          x: 85,
                          y: -95,
                          scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: 148,
                        height: 76,
                        background: "#000000",
                        border: "0.5px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                        borderRadius: "12px",
                        padding: "5px 3px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 900,
                          fontSize: "14px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                          textAlign: "center",
                        }}
                      >
                        RECLAIMING THE CUSTOMER
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "110%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          textAlign: "center",
                        }}
                      >
                        Restaurants reclaim the customer from aggregators for
                        more profits, more control
                      </Typography>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-140px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // y: 50,
                          // scale: 0,
                          x: -85,
                          y: 240,
                        },
                        onscreen: {
                          x: -85,
                          y: 240,
                          scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: 148,
                        height: 76,
                        background: "#000000",
                        border: "0.5px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                        borderRadius: "12px",
                        padding: "5px 3px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 900,
                          fontSize: "14px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                          textAlign: "center",
                        }}
                      >
                        DIRECT
                        <br />
                        DISCOVERY
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "110%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          textAlign: "center",
                        }}
                      >
                        Discover new customers as they search for food suited to
                        their preferences
                      </Typography>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-140px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // y: 50,
                          // scale: 0,
                          x: 85,
                          y: 240,
                        },
                        onscreen: {
                          x: 85,
                          y: 240,
                          scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: 148,
                        height: 76,
                        background: "#000000",
                        border: "0.5px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                        borderRadius: "12px",
                        padding: "5px 3px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 900,
                          fontSize: "14px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                          textAlign: "center",
                        }}
                      >
                        personalized
                        <br />
                        for the user
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "110%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          textAlign: "center",
                        }}
                      >
                        Orders suggestions tailored for the user, killing
                        endless scrolling
                      </Typography>
                    </motion.div>
                  </motion.div>

                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/fries.webp"
                    alt="Gobbl AI"
                    width={190}
                    height={190}
                    loading="eager"
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />

                  <motion.svg
                    width="29"
                    height="46"
                    viewBox="0 0 29 46"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 80,
                      marginLeft: "-200px",
                    }}
                  >
                    <motion.path
                      d="M0.666667 2C0.666667 1.26362 1.26362 0.666668 2 0.666668C2.73638 0.666668 3.33333 1.26362 3.33333 2C3.33333 2.73638 2.73638 3.33333 2 3.33333C1.26362 3.33333 0.666667 2.73638 0.666667 2ZM2 32.9785L1.89508 33.2054L1.75 33.1383V32.9785H2ZM2.25 2V32.9785H1.75V2H2.25ZM2.10492 32.7516L28.1049 44.7731L27.8951 45.2269L1.89508 33.2054L2.10492 32.7516Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={4}
                    />
                  </motion.svg>

                  <motion.svg
                    width="37"
                    height="87"
                    viewBox="0 0 37 87"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 80,
                      marginLeft: "200px",
                    }}
                  >
                    <motion.path
                      d="M36.3333 2C36.3333 1.26362 35.7364 0.666664 35 0.666664C34.2636 0.666664 33.6667 1.26362 33.6667 2C33.6667 2.73638 34.2636 3.33334 35 3.33334C35.7364 3.33334 36.3333 2.73638 36.3333 2ZM35 75.7333L35.0723 75.9727L35.25 75.919V75.7333H35ZM0.927734 85.7607C0.795555 85.8006 0.72076 85.9401 0.760674 86.0723C0.800587 86.2044 0.94009 86.2792 1.07227 86.2393L0.927734 85.7607ZM34.75 2V75.7333H35.25V2H34.75ZM34.9277 75.494L0.927734 85.7607L1.07227 86.2393L35.0723 75.9727L34.9277 75.494Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={4.5}
                    />
                  </motion.svg>

                  <motion.svg
                    width="41"
                    height="93"
                    viewBox="0 0 41 93"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 75,
                      marginLeft: "-188px",
                    }}
                  >
                    <motion.path
                      d="M0.666667 91C0.666667 91.7364 1.26362 92.3333 2 92.3333C2.73638 92.3333 3.33333 91.7364 3.33333 91C3.33333 90.2636 2.73638 89.6667 2 89.6667C1.26362 89.6667 0.666667 90.2636 0.666667 91ZM2 17L1.90152 16.7702L1.75 16.8352V17H2ZM2.25 91V17H1.75V91H2.25ZM2.09848 17.2298L40.5985 0.729786L40.4015 0.270214L1.90152 16.7702L2.09848 17.2298Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={5}
                    />
                  </motion.svg>

                  <motion.svg
                    width="43"
                    height="59"
                    viewBox="0 0 43 59"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 75,
                      marginLeft: "188px",
                    }}
                  >
                    <motion.path
                      d="M42.3333 57C42.3333 57.7364 41.7364 58.3333 41 58.3333C40.2636 58.3333 39.6667 57.7364 39.6667 57C39.6667 56.2636 40.2636 55.6667 41 55.6667C41.7364 55.6667 42.3333 56.2636 42.3333 57ZM41 19.5L41.1049 19.2731L41.25 19.3402V19.5H41ZM40.75 57V19.5H41.25V57H40.75ZM40.8951 19.7269L0.895054 1.22691L1.10495 0.773093L41.1049 19.2731L40.8951 19.7269Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={5.5}
                    />
                  </motion.svg>
                </Box>
              )}

              {!sm && (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transform: md
                      ? "scale(0.6)"
                      : lg
                      ? "scale(0.7)"
                      : xl
                      ? "scale(0.85)"
                      : "none",
                    marginTop: md ? "-125px" : lg ? "-10%" : xl ? "-5%" : 0,
                  }}
                >
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-140px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // scale: 0,
                          opacity: 0,
                          x: -480,
                        },
                        onscreen: {
                          opacity: 1,
                          // scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: "330px",
                        height: "176px",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.55)",
                        borderRadius: "25px",
                        padding: "20px 16px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 400,
                          fontSize: "28px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                        }}
                      >
                        AI AGENTIC FRAMEWORK
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "20px",
                          lineHeight: "130%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          marginTop: "10px",
                        }}
                      >
                        Connecting users & restaurants with a simple chat
                        interface
                      </Typography>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "-65px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // scale: 0,
                          opacity: 0,
                          x: 447,
                        },
                        onscreen: {
                          opacity: 1,
                          // scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: "330px",
                        height: "200px",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.55)",
                        borderRadius: "25px",
                        padding: "20px 16px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 400,
                          fontSize: "28px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                        }}
                      >
                        RECLAIMING THE CUSTOMER
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "20px",
                          lineHeight: "130%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          marginTop: "10px",
                        }}
                      >
                        Restaurants reclaim the customer from aggregators for
                        more profits, more control
                      </Typography>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "290px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // scale: 0,
                          opacity: 0,
                          x: -380,
                        },
                        onscreen: {
                          opacity: 1,
                          // scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: "330px",
                        height: "170px",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.55)",
                        borderRadius: "25px",
                        padding: "20px 16px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 400,
                          fontSize: "28px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                        }}
                      >
                        DIRECT DISCOVERY
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "20px",
                          lineHeight: "130%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          marginTop: "10px",
                        }}
                      >
                        Discover new customers as they search for food suited to
                        their preferences
                      </Typography>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.7 }}
                    style={{
                      position: "absolute",
                      marginTop: "410px",
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      variants={{
                        offscreen: {
                          // x: 0,
                          // scale: 0,
                          opacity: 0,
                          x: 355,
                        },
                        onscreen: {
                          opacity: 1,
                          // scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.35,
                            duration: 3,
                            delay: 0.5,
                          },
                        },
                      }}
                      style={{
                        width: "330px",
                        height: "190px",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.55)",
                        borderRadius: "25px",
                        padding: "20px 15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontWeight: 400,
                          fontSize: "28px",
                          lineHeight: "114%",
                          textTransform: "uppercase",
                          color: "#64FF99",
                        }}
                      >
                        personalised for the user
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "'Karla'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "20px",
                          lineHeight: "130%",
                          color: "#FFFCF5",
                          opacity: 0.8,
                          marginTop: "10px",
                        }}
                      >
                        Orders suggestions tailored for the user, killing
                        endless scrolling
                      </Typography>
                    </motion.div>
                  </motion.div>
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/fries.webp"
                    alt="Gobbl AI"
                    width={400}
                    height={400}
                    loading="eager"
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <motion.svg
                    width="152"
                    height="63"
                    viewBox="0 0 152 63"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 170,
                      marginLeft: "-470px",
                    }}
                  >
                    <motion.path
                      d="M108.355 3V2.5H108.612L108.761 2.70872L108.355 3ZM5.66667 3C5.66667 4.47276 4.47276 5.66667 3 5.66667C1.52724 5.66667 0.333328 4.47276 0.333328 3C0.333328 1.52724 1.52724 0.333333 3 0.333333C4.47276 0.333333 5.66667 1.52724 5.66667 3ZM150.594 62.7913L107.948 3.29128L108.761 2.70872L151.406 62.2087L150.594 62.7913ZM108.355 3.5H3V2.5H108.355V3.5Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={4}
                    />
                  </motion.svg>
                  <motion.svg
                    width="109"
                    height="43"
                    viewBox="0 0 109 43"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 190,
                      marginRight: "-440px",
                    }}
                  >
                    <motion.path
                      d="M28.0968 3V2.5H27.8353L27.6862 2.71471L28.0968 3ZM103.333 3C103.333 4.47276 104.527 5.66667 106 5.66667C107.473 5.66667 108.667 4.47276 108.667 3C108.667 1.52724 107.473 0.333333 106 0.333333C104.527 0.333333 103.333 1.52724 103.333 3ZM1.41062 42.2853L28.5074 3.28529L27.6862 2.71471L0.589381 41.7147L1.41062 42.2853ZM28.0968 3.5H106V2.5H28.0968V3.5Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={4.5}
                    />
                  </motion.svg>
                  <motion.svg
                    width="58"
                    height="27"
                    viewBox="0 0 58 27"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 395,
                      marginLeft: "-360px",
                    }}
                  >
                    <motion.path
                      d="M40.4143 24L40.8198 24.2925L40.6702 24.5H40.4143V24ZM5.66666 24C5.66666 25.4728 4.47276 26.6667 3 26.6667C1.52724 26.6667 0.333332 25.4728 0.333332 24C0.333332 22.5272 1.52724 21.3333 3 21.3333C4.47276 21.3333 5.66666 22.5272 5.66666 24ZM57.4056 1.29245L40.8198 24.2925L40.0087 23.7076L56.5944 0.707549L57.4056 1.29245ZM40.4143 24.5H3V23.5H40.4143V24.5Z"
                      stroke="rgba(255, 255, 255, 0.4)"
                      variants={draw}
                      custom={5}
                    />
                  </motion.svg>
                  <motion.svg
                    width="196"
                    height="44"
                    viewBox="0 0 196 44"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    style={{
                      position: "absolute",
                      top: 455,
                      marginRight: "-170px",
                    }}
                  >
                    <motion.path
                      d="M43 41L42.6529 41.3599L42.7982 41.5H43V41ZM190.333 41C190.333 42.4728 191.527 43.6667 193 43.6667C194.473 43.6667 195.667 42.4728 195.667 41C195.667 39.5272 194.473 38.3333 193 38.3333C191.527 38.3333 190.333 39.5272 190.333 41ZM0.652932 0.859922L42.6529 41.3599L43.3471 40.6401L1.34707 0.140078L0.652932 0.859922ZM43 41.5H193V40.5H43V41.5Z"
                      stroke="rgba(255, 255, 255, 0.3)"
                      variants={draw}
                      custom={5.5}
                    />
                  </motion.svg>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* how we gobbl */}
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#000",
            padding: md ? (sm ? "0 5% 25px" : "0 5%") : "0 0 2%",
            position: "relative",
            zIndex: 2,
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
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                marginTop: sm ? "-25px" : md ? "-50px" : "-78px",
              }}
            >
              <Typography
                style={{
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: xs ? 45 : sm ? 48 : md ? 90 : lg ? 120 : 140,
                  lineHeight: "120%",
                  textAlign: "center",
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  WebkitTextFillColor: "#161810",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                how we gobbl
              </Typography>
              <StarSvg
                size={sm ? 16 : 28}
                style={{
                  top: sm ? -15 : 0,
                  right: sm ? "0%" : "10%",
                  animationDuration: "1.2s",
                }}
              />
            </Box>
            {/* {sm && (
              <Box
                style={{
                  width: "100%",
                  height: 450,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.7 }}
                  style={{
                    position: "absolute",
                    top: 130,
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    variants={{
                      offscreen: {
                        rotate: -7,
                      },
                      onscreen: {
                        rotate: 7,
                        transition: {
                          type: "spring",
                          bounce: 0.35,
                          duration: 3,
                          delay: 0.5,
                        },
                      },
                    }}
                  >
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/hwg_chat.webp"
                      alt="Gobbl AI"
                      style={{
                        width: 140,
                        height: 280,
                        objectFit: "contain",
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.7 }}
                  style={{
                    position: "absolute",
                    marginLeft: "-180px",
                    top: 50,
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    variants={{
                      offscreen: {
                        opacity: 0,
                      },
                      onscreen: {
                        opacity: 1,
                        transition: {
                          bounce: 0.35,
                          duration: 3,
                          delay: 0.5,
                        },
                      },
                    }}
                  >
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/user_gobbl_mobile.webp"
                      alt="Gobbl AI"
                      style={{
                        maxWidth: "fit-content",
                        maxHeight: 112,
                        height: "fit-content",
                        objectFit: "contain",
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.7 }}
                  style={{
                    position: "absolute",
                    marginRight: "-200px",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    variants={{
                      offscreen: {
                        opacity: 0,
                      },
                      onscreen: {
                        opacity: 1,
                        transition: {
                          bounce: 0.35,
                          duration: 3,
                          delay: 0.5,
                        },
                      },
                    }}
                  >
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/restro_gobbl_mobile.webp"
                      alt="Gobbl AI"
                      style={{
                        maxWidth: "fit-content",
                        height: 113,
                        objectFit: "contain",
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.svg
                  width="89"
                  height="348"
                  viewBox="0 0 95 394"
                  fill="none"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 1 }}
                  style={{
                    position: "absolute",
                    marginBottom: "-80px",
                  }}
                >
                  <motion.path
                    d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM94.8868 391L92 388.113L89.1132 391L92 393.887L94.8868 391ZM45.6064 3H46.1064C46.1064 2.72386 45.8825 2.5 45.6064 2.5V3ZM45.6064 391H45.1064C45.1064 391.276 45.3302 391.5 45.6064 391.5V391ZM4.59774 3.5C4.87388 3.5 5.09774 3.27614 5.09774 3C5.09774 2.72386 4.87388 2.5 4.59774 2.5V3.5ZM9.92354 2.5C9.64739 2.5 9.42354 2.72386 9.42354 3C9.42354 3.27614 9.64739 3.5 9.92354 3.5V2.5ZM13.119 3.5C13.3952 3.5 13.619 3.27614 13.619 3C13.619 2.72386 13.3952 2.5 13.119 2.5V3.5ZM18.4448 2.5C18.1687 2.5 17.9448 2.72386 17.9448 3C17.9448 3.27614 18.1687 3.5 18.4448 3.5V2.5ZM21.6403 3.5C21.9164 3.5 22.1403 3.27614 22.1403 3C22.1403 2.72386 21.9164 2.5 21.6403 2.5V3.5ZM26.9661 2.5C26.6899 2.5 26.4661 2.72386 26.4661 3C26.4661 3.27614 26.6899 3.5 26.9661 3.5V2.5ZM30.1616 3.5C30.4377 3.5 30.6616 3.27614 30.6616 3C30.6616 2.72386 30.4377 2.5 30.1616 2.5V3.5ZM35.4874 2.5C35.2112 2.5 34.9874 2.72386 34.9874 3C34.9874 3.27614 35.2112 3.5 35.4874 3.5V2.5ZM38.6828 3.5C38.959 3.5 39.1828 3.27614 39.1828 3C39.1828 2.72386 38.959 2.5 38.6828 2.5V3.5ZM44.0086 2.5C43.7325 2.5 43.5086 2.72386 43.5086 3C43.5086 3.27614 43.7325 3.5 44.0086 3.5V2.5ZM45.1064 4.48469C45.1064 4.76084 45.3302 4.98469 45.6064 4.98469C45.8825 4.98469 46.1064 4.76084 46.1064 4.48469H45.1064ZM46.1064 9.43367C46.1064 9.15753 45.8825 8.93367 45.6064 8.93367C45.3302 8.93367 45.1064 9.15753 45.1064 9.43367H46.1064ZM45.1064 12.4031C45.1064 12.6792 45.3302 12.9031 45.6064 12.9031C45.8825 12.9031 46.1064 12.6792 46.1064 12.4031H45.1064ZM46.1064 17.352C46.1064 17.0759 45.8825 16.852 45.6064 16.852C45.3302 16.852 45.1064 17.0759 45.1064 17.352H46.1064ZM45.1064 20.3214C45.1064 20.5976 45.3302 20.8214 45.6064 20.8214C45.8825 20.8214 46.1064 20.5976 46.1064 20.3214H45.1064ZM46.1064 25.2704C46.1064 24.9943 45.8825 24.7704 45.6064 24.7704C45.3302 24.7704 45.1064 24.9943 45.1064 25.2704H46.1064ZM45.1064 28.2398C45.1064 28.5159 45.3302 28.7398 45.6064 28.7398C45.8825 28.7398 46.1064 28.5159 46.1064 28.2398H45.1064ZM46.1064 33.1888C46.1064 32.9126 45.8825 32.6888 45.6064 32.6888C45.3302 32.6888 45.1064 32.9126 45.1064 33.1888H46.1064ZM45.1064 36.1582C45.1064 36.4343 45.3302 36.6582 45.6064 36.6582C45.8825 36.6582 46.1064 36.4343 46.1064 36.1582H45.1064ZM46.1064 41.1071C46.1064 40.831 45.8825 40.6071 45.6064 40.6071C45.3302 40.6071 45.1064 40.831 45.1064 41.1071H46.1064ZM45.1064 44.0765C45.1064 44.3527 45.3302 44.5765 45.6064 44.5765C45.8825 44.5765 46.1064 44.3527 46.1064 44.0765H45.1064ZM46.1064 49.0255C46.1064 48.7494 45.8825 48.5255 45.6064 48.5255C45.3302 48.5255 45.1064 48.7494 45.1064 49.0255H46.1064ZM45.1064 51.9949C45.1064 52.271 45.3302 52.4949 45.6064 52.4949C45.8825 52.4949 46.1064 52.271 46.1064 51.9949H45.1064ZM46.1064 56.9439C46.1064 56.6677 45.8825 56.4439 45.6064 56.4439C45.3302 56.4439 45.1064 56.6677 45.1064 56.9439H46.1064ZM45.1064 59.9133C45.1064 60.1894 45.3302 60.4133 45.6064 60.4133C45.8825 60.4133 46.1064 60.1894 46.1064 59.9133H45.1064ZM46.1064 64.8622C46.1064 64.5861 45.8825 64.3622 45.6064 64.3622C45.3302 64.3622 45.1064 64.5861 45.1064 64.8622H46.1064ZM45.1064 67.8316C45.1064 68.1078 45.3302 68.3316 45.6064 68.3316C45.8825 68.3316 46.1064 68.1078 46.1064 67.8316H45.1064ZM46.1064 72.7806C46.1064 72.5045 45.8825 72.2806 45.6064 72.2806C45.3302 72.2806 45.1064 72.5045 45.1064 72.7806H46.1064ZM45.1064 75.75C45.1064 76.0261 45.3302 76.25 45.6064 76.25C45.8825 76.25 46.1064 76.0261 46.1064 75.75H45.1064ZM46.1064 80.699C46.1064 80.4228 45.8825 80.199 45.6064 80.199C45.3302 80.199 45.1064 80.4228 45.1064 80.699H46.1064ZM45.1064 83.6684C45.1064 83.9445 45.3302 84.1684 45.6064 84.1684C45.8825 84.1684 46.1064 83.9445 46.1064 83.6684H45.1064ZM46.1064 88.6174C46.1064 88.3412 45.8825 88.1174 45.6064 88.1174C45.3302 88.1174 45.1064 88.3412 45.1064 88.6174H46.1064ZM45.1064 91.5867C45.1064 91.8629 45.3302 92.0867 45.6064 92.0867C45.8825 92.0867 46.1064 91.8629 46.1064 91.5867H45.1064ZM46.1064 96.5357C46.1064 96.2596 45.8825 96.0357 45.6064 96.0357C45.3302 96.0357 45.1064 96.2596 45.1064 96.5357H46.1064ZM45.1064 99.5051C45.1064 99.7813 45.3302 100.005 45.6064 100.005C45.8825 100.005 46.1064 99.7813 46.1064 99.5051H45.1064ZM46.1064 104.454C46.1064 104.178 45.8825 103.954 45.6064 103.954C45.3302 103.954 45.1064 104.178 45.1064 104.454H46.1064ZM45.1064 107.423C45.1064 107.7 45.3302 107.923 45.6064 107.923C45.8825 107.923 46.1064 107.7 46.1064 107.423H45.1064ZM46.1064 112.372C46.1064 112.096 45.8825 111.872 45.6064 111.872C45.3302 111.872 45.1064 112.096 45.1064 112.372H46.1064ZM45.1064 115.342C45.1064 115.618 45.3302 115.842 45.6064 115.842C45.8825 115.842 46.1064 115.618 46.1064 115.342H45.1064ZM46.1064 120.291C46.1064 120.015 45.8825 119.791 45.6064 119.791C45.3302 119.791 45.1064 120.015 45.1064 120.291H46.1064ZM45.1064 123.26C45.1064 123.536 45.3302 123.76 45.6064 123.76C45.8825 123.76 46.1064 123.536 46.1064 123.26H45.1064ZM46.1064 128.209C46.1064 127.933 45.8825 127.709 45.6064 127.709C45.3302 127.709 45.1064 127.933 45.1064 128.209H46.1064ZM45.1064 131.179C45.1064 131.455 45.3302 131.679 45.6064 131.679C45.8825 131.679 46.1064 131.455 46.1064 131.179H45.1064ZM46.1064 136.128C46.1064 135.851 45.8825 135.628 45.6064 135.628C45.3302 135.628 45.1064 135.851 45.1064 136.128H46.1064ZM45.1064 139.097C45.1064 139.373 45.3302 139.597 45.6064 139.597C45.8825 139.597 46.1064 139.373 46.1064 139.097H45.1064ZM46.1064 144.046C46.1064 143.77 45.8825 143.546 45.6064 143.546C45.3302 143.546 45.1064 143.77 45.1064 144.046H46.1064ZM45.1064 147.015C45.1064 147.291 45.3302 147.515 45.6064 147.515C45.8825 147.515 46.1064 147.291 46.1064 147.015H45.1064ZM46.1064 151.964C46.1064 151.688 45.8825 151.464 45.6064 151.464C45.3302 151.464 45.1064 151.688 45.1064 151.964H46.1064ZM45.1064 154.934C45.1064 155.21 45.3302 155.434 45.6064 155.434C45.8825 155.434 46.1064 155.21 46.1064 154.934H45.1064ZM46.1064 159.883C46.1064 159.607 45.8825 159.383 45.6064 159.383C45.3302 159.383 45.1064 159.607 45.1064 159.883H46.1064ZM45.1064 162.852C45.1064 163.128 45.3302 163.352 45.6064 163.352C45.8825 163.352 46.1064 163.128 46.1064 162.852H45.1064ZM46.1064 167.801C46.1064 167.525 45.8825 167.301 45.6064 167.301C45.3302 167.301 45.1064 167.525 45.1064 167.801H46.1064ZM45.1064 170.77C45.1064 171.047 45.3302 171.27 45.6064 171.27C45.8825 171.27 46.1064 171.047 46.1064 170.77H45.1064ZM46.1064 175.719C46.1064 175.443 45.8825 175.219 45.6064 175.219C45.3302 175.219 45.1064 175.443 45.1064 175.719H46.1064ZM45.1064 178.689C45.1064 178.965 45.3302 179.189 45.6064 179.189C45.8825 179.189 46.1064 178.965 46.1064 178.689H45.1064ZM46.1064 183.638C46.1064 183.362 45.8825 183.138 45.6064 183.138C45.3302 183.138 45.1064 183.362 45.1064 183.638H46.1064ZM45.1064 186.607C45.1064 186.883 45.3302 187.107 45.6064 187.107C45.8825 187.107 46.1064 186.883 46.1064 186.607H45.1064ZM46.1064 191.556C46.1064 191.28 45.8825 191.056 45.6064 191.056C45.3302 191.056 45.1064 191.28 45.1064 191.556H46.1064ZM45.1064 194.526C45.1064 194.802 45.3302 195.026 45.6064 195.026C45.8825 195.026 46.1064 194.802 46.1064 194.526H45.1064ZM46.1064 199.475C46.1064 199.198 45.8825 198.975 45.6064 198.975C45.3302 198.975 45.1064 199.198 45.1064 199.475H46.1064ZM45.1064 202.444C45.1064 202.72 45.3302 202.944 45.6064 202.944C45.8825 202.944 46.1064 202.72 46.1064 202.444H45.1064ZM46.1064 207.393C46.1064 207.117 45.8825 206.893 45.6064 206.893C45.3302 206.893 45.1064 207.117 45.1064 207.393H46.1064ZM45.1064 210.362C45.1064 210.638 45.3302 210.862 45.6064 210.862C45.8825 210.862 46.1064 210.638 46.1064 210.362H45.1064ZM46.1064 215.311C46.1064 215.035 45.8825 214.811 45.6064 214.811C45.3302 214.811 45.1064 215.035 45.1064 215.311H46.1064ZM45.1064 218.281C45.1064 218.557 45.3302 218.781 45.6064 218.781C45.8825 218.781 46.1064 218.557 46.1064 218.281H45.1064ZM46.1064 223.23C46.1064 222.953 45.8825 222.73 45.6064 222.73C45.3302 222.73 45.1064 222.953 45.1064 223.23H46.1064ZM45.1064 226.199C45.1064 226.475 45.3302 226.699 45.6064 226.699C45.8825 226.699 46.1064 226.475 46.1064 226.199H45.1064ZM46.1064 231.148C46.1064 230.872 45.8825 230.648 45.6064 230.648C45.3302 230.648 45.1064 230.872 45.1064 231.148H46.1064ZM45.1064 234.117C45.1064 234.394 45.3302 234.617 45.6064 234.617C45.8825 234.617 46.1064 234.394 46.1064 234.117H45.1064ZM46.1064 239.066C46.1064 238.79 45.8825 238.566 45.6064 238.566C45.3302 238.566 45.1064 238.79 45.1064 239.066H46.1064ZM45.1064 242.036C45.1064 242.312 45.3302 242.536 45.6064 242.536C45.8825 242.536 46.1064 242.312 46.1064 242.036H45.1064ZM46.1064 246.985C46.1064 246.709 45.8825 246.485 45.6064 246.485C45.3302 246.485 45.1064 246.709 45.1064 246.985H46.1064ZM45.1064 249.954C45.1064 250.23 45.3302 250.454 45.6064 250.454C45.8825 250.454 46.1064 250.23 46.1064 249.954H45.1064ZM46.1064 254.903C46.1064 254.627 45.8825 254.403 45.6064 254.403C45.3302 254.403 45.1064 254.627 45.1064 254.903H46.1064ZM45.1064 257.872C45.1064 258.149 45.3302 258.372 45.6064 258.372C45.8825 258.372 46.1064 258.149 46.1064 257.872H45.1064ZM46.1064 262.821C46.1064 262.545 45.8825 262.321 45.6064 262.321C45.3302 262.321 45.1064 262.545 45.1064 262.821H46.1064ZM45.1064 265.791C45.1064 266.067 45.3302 266.291 45.6064 266.291C45.8825 266.291 46.1064 266.067 46.1064 265.791H45.1064ZM46.1064 270.74C46.1064 270.464 45.8825 270.24 45.6064 270.24C45.3302 270.24 45.1064 270.464 45.1064 270.74H46.1064ZM45.1064 273.709C45.1064 273.985 45.3302 274.209 45.6064 274.209C45.8825 274.209 46.1064 273.985 46.1064 273.709H45.1064ZM46.1064 278.658C46.1064 278.382 45.8825 278.158 45.6064 278.158C45.3302 278.158 45.1064 278.382 45.1064 278.658H46.1064ZM45.1064 281.628C45.1064 281.904 45.3302 282.128 45.6064 282.128C45.8825 282.128 46.1064 281.904 46.1064 281.628H45.1064ZM46.1064 286.577C46.1064 286.3 45.8825 286.077 45.6064 286.077C45.3302 286.077 45.1064 286.3 45.1064 286.577H46.1064ZM45.1064 289.546C45.1064 289.822 45.3302 290.046 45.6064 290.046C45.8825 290.046 46.1064 289.822 46.1064 289.546H45.1064ZM46.1064 294.495C46.1064 294.219 45.8825 293.995 45.6064 293.995C45.3302 293.995 45.1064 294.219 45.1064 294.495H46.1064ZM45.1064 297.464C45.1064 297.74 45.3302 297.964 45.6064 297.964C45.8825 297.964 46.1064 297.74 46.1064 297.464H45.1064ZM46.1064 302.413C46.1064 302.137 45.8825 301.913 45.6064 301.913C45.3302 301.913 45.1064 302.137 45.1064 302.413H46.1064ZM45.1064 305.383C45.1064 305.659 45.3302 305.883 45.6064 305.883C45.8825 305.883 46.1064 305.659 46.1064 305.383H45.1064ZM46.1064 310.332C46.1064 310.055 45.8825 309.832 45.6064 309.832C45.3302 309.832 45.1064 310.055 45.1064 310.332H46.1064ZM45.1064 313.301C45.1064 313.577 45.3302 313.801 45.6064 313.801C45.8825 313.801 46.1064 313.577 46.1064 313.301H45.1064ZM46.1064 318.25C46.1064 317.974 45.8825 317.75 45.6064 317.75C45.3302 317.75 45.1064 317.974 45.1064 318.25H46.1064ZM45.1064 321.219C45.1064 321.496 45.3302 321.719 45.6064 321.719C45.8825 321.719 46.1064 321.496 46.1064 321.219H45.1064ZM46.1064 326.168C46.1064 325.892 45.8825 325.668 45.6064 325.668C45.3302 325.668 45.1064 325.892 45.1064 326.168H46.1064ZM45.1064 329.138C45.1064 329.414 45.3302 329.638 45.6064 329.638C45.8825 329.638 46.1064 329.414 46.1064 329.138H45.1064ZM46.1064 334.087C46.1064 333.811 45.8825 333.587 45.6064 333.587C45.3302 333.587 45.1064 333.811 45.1064 334.087H46.1064ZM45.1064 337.056C45.1064 337.332 45.3302 337.556 45.6064 337.556C45.8825 337.556 46.1064 337.332 46.1064 337.056H45.1064ZM46.1064 342.005C46.1064 341.729 45.8825 341.505 45.6064 341.505C45.3302 341.505 45.1064 341.729 45.1064 342.005H46.1064ZM45.1064 344.974C45.1064 345.251 45.3302 345.474 45.6064 345.474C45.8825 345.474 46.1064 345.251 46.1064 344.974H45.1064ZM46.1064 349.923C46.1064 349.647 45.8825 349.423 45.6064 349.423C45.3302 349.423 45.1064 349.647 45.1064 349.923H46.1064ZM45.1064 352.893C45.1064 353.169 45.3302 353.393 45.6064 353.393C45.8825 353.393 46.1064 353.169 46.1064 352.893H45.1064ZM46.1064 357.842C46.1064 357.566 45.8825 357.342 45.6064 357.342C45.3302 357.342 45.1064 357.566 45.1064 357.842H46.1064ZM45.1064 360.811C45.1064 361.087 45.3302 361.311 45.6064 361.311C45.8825 361.311 46.1064 361.087 46.1064 360.811H45.1064ZM46.1064 365.76C46.1064 365.484 45.8825 365.26 45.6064 365.26C45.3302 365.26 45.1064 365.484 45.1064 365.76H46.1064ZM45.1064 368.73C45.1064 369.006 45.3302 369.23 45.6064 369.23C45.8825 369.23 46.1064 369.006 46.1064 368.73H45.1064ZM46.1064 373.679C46.1064 373.402 45.8825 373.179 45.6064 373.179C45.3302 373.179 45.1064 373.402 45.1064 373.679H46.1064ZM45.1064 376.648C45.1064 376.924 45.3302 377.148 45.6064 377.148C45.8825 377.148 46.1064 376.924 46.1064 376.648H45.1064ZM46.1064 381.597C46.1064 381.321 45.8825 381.097 45.6064 381.097C45.3302 381.097 45.1064 381.321 45.1064 381.597H46.1064ZM45.1064 384.566C45.1064 384.842 45.3302 385.066 45.6064 385.066C45.8825 385.066 46.1064 384.842 46.1064 384.566H45.1064ZM46.1064 389.515C46.1064 389.239 45.8825 389.015 45.6064 389.015C45.3302 389.015 45.1064 389.239 45.1064 389.515H46.1064ZM47.0562 391.5C47.3323 391.5 47.5562 391.276 47.5562 391C47.5562 390.724 47.3323 390.5 47.0562 390.5V391.5ZM51.8889 390.5C51.6127 390.5 51.3889 390.724 51.3889 391C51.3889 391.276 51.6127 391.5 51.8889 391.5V390.5ZM54.7885 391.5C55.0646 391.5 55.2885 391.276 55.2885 391C55.2885 390.724 55.0646 390.5 54.7885 390.5V391.5ZM59.6211 390.5C59.345 390.5 59.1211 390.724 59.1211 391C59.1211 391.276 59.345 391.5 59.6211 391.5V390.5ZM62.5207 391.5C62.7969 391.5 63.0207 391.276 63.0207 391C63.0207 390.724 62.7969 390.5 62.5207 390.5V391.5ZM67.3534 390.5C67.0772 390.5 66.8534 390.724 66.8534 391C66.8534 391.276 67.0772 391.5 67.3534 391.5V390.5ZM70.253 391.5C70.5291 391.5 70.753 391.276 70.753 391C70.753 390.724 70.5291 390.5 70.253 390.5V391.5ZM75.0857 390.5C74.8095 390.5 74.5857 390.724 74.5857 391C74.5857 391.276 74.8095 391.5 75.0857 391.5V390.5ZM77.9853 391.5C78.2614 391.5 78.4853 391.276 78.4853 391C78.4853 390.724 78.2614 390.5 77.9853 390.5V391.5ZM82.8179 390.5C82.5418 390.5 82.3179 390.724 82.3179 391C82.3179 391.276 82.5418 391.5 82.8179 391.5V390.5ZM85.7175 391.5C85.9937 391.5 86.2175 391.276 86.2175 391C86.2175 390.724 85.9937 390.5 85.7175 390.5V391.5ZM90.5502 390.5C90.2741 390.5 90.0502 390.724 90.0502 391C90.0502 391.276 90.2741 391.5 90.5502 391.5V390.5ZM3 3.5H4.59774V2.5H3V3.5ZM9.92354 3.5H13.119V2.5H9.92354V3.5ZM18.4448 3.5H21.6403V2.5H18.4448V3.5ZM26.9661 3.5H30.1616V2.5H26.9661V3.5ZM35.4874 3.5H38.6828V2.5H35.4874V3.5ZM44.0086 3.5H45.6064V2.5H44.0086V3.5ZM45.1064 3V4.48469H46.1064V3H45.1064ZM45.1064 9.43367V12.4031H46.1064V9.43367H45.1064ZM45.1064 17.352V20.3214H46.1064V17.352H45.1064ZM45.1064 25.2704V28.2398H46.1064V25.2704H45.1064ZM45.1064 33.1888V36.1582H46.1064V33.1888H45.1064ZM45.1064 41.1071V44.0765H46.1064V41.1071H45.1064ZM45.1064 49.0255V51.9949H46.1064V49.0255H45.1064ZM45.1064 56.9439V59.9133H46.1064V56.9439H45.1064ZM45.1064 64.8622V67.8316H46.1064V64.8622H45.1064ZM45.1064 72.7806V75.75H46.1064V72.7806H45.1064ZM45.1064 80.699V83.6684H46.1064V80.699H45.1064ZM45.1064 88.6174V91.5867H46.1064V88.6174H45.1064ZM45.1064 96.5357V99.5051H46.1064V96.5357H45.1064ZM45.1064 104.454V107.423H46.1064V104.454H45.1064ZM45.1064 112.372V115.342H46.1064V112.372H45.1064ZM45.1064 120.291V123.26H46.1064V120.291H45.1064ZM45.1064 128.209V131.179H46.1064V128.209H45.1064ZM45.1064 136.128V139.097H46.1064V136.128H45.1064ZM45.1064 144.046V147.015H46.1064V144.046H45.1064ZM45.1064 151.964V154.934H46.1064V151.964H45.1064ZM45.1064 159.883V162.852H46.1064V159.883H45.1064ZM45.1064 167.801V170.77H46.1064V167.801H45.1064ZM45.1064 175.719V178.689H46.1064V175.719H45.1064ZM45.1064 183.638V186.607H46.1064V183.638H45.1064ZM45.1064 191.556V194.526H46.1064V191.556H45.1064ZM45.1064 199.475V202.444H46.1064V199.475H45.1064ZM45.1064 207.393V210.362H46.1064V207.393H45.1064ZM45.1064 215.311V218.281H46.1064V215.311H45.1064ZM45.1064 223.23V226.199H46.1064V223.23H45.1064ZM45.1064 231.148V234.117H46.1064V231.148H45.1064ZM45.1064 239.066V242.036H46.1064V239.066H45.1064ZM45.1064 246.985V249.954H46.1064V246.985H45.1064ZM45.1064 254.903V257.872H46.1064V254.903H45.1064ZM45.1064 262.821V265.791H46.1064V262.821H45.1064ZM45.1064 270.74V273.709H46.1064V270.74H45.1064ZM45.1064 278.658V281.628H46.1064V278.658H45.1064ZM45.1064 286.577V289.546H46.1064V286.577H45.1064ZM45.1064 294.495V297.464H46.1064V294.495H45.1064ZM45.1064 302.413V305.383H46.1064V302.413H45.1064ZM45.1064 310.332V313.301H46.1064V310.332H45.1064ZM45.1064 318.25V321.219H46.1064V318.25H45.1064ZM45.1064 326.168V329.138H46.1064V326.168H45.1064ZM45.1064 334.087V337.056H46.1064V334.087H45.1064ZM45.1064 342.005V344.974H46.1064V342.005H45.1064ZM45.1064 349.923V352.893H46.1064V349.923H45.1064ZM45.1064 357.842V360.811H46.1064V357.842H45.1064ZM45.1064 365.76V368.73H46.1064V365.76H45.1064ZM45.1064 373.679V376.648H46.1064V373.679H45.1064ZM45.1064 381.597V384.566H46.1064V381.597H45.1064ZM45.1064 389.515V391H46.1064V389.515H45.1064ZM45.6064 391.5H47.0562V390.5H45.6064V391.5ZM51.8889 391.5H54.7885V390.5H51.8889V391.5ZM59.6211 391.5H62.5207V390.5H59.6211V391.5ZM67.3534 391.5H70.253V390.5H67.3534V391.5ZM75.0857 391.5H77.9853V390.5H75.0857V391.5ZM82.8179 391.5H85.7175V390.5H82.8179V391.5ZM90.5502 391.5H92V390.5H90.5502V391.5Z"
                    fill="url(#paint0_linear_897_2511)"
                    variants={draw}
                    custom={5.5}
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_897_2511"
                      x1="47.5"
                      y1="3"
                      x2="47.5"
                      y2="391"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFFF19" />
                      <stop offset="1" stop-color="#FF9CFF" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </Box>
            )} */}
            {sm && (
              <Box
                style={{
                  width: "100%",
                  height: 490,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/hwg_mobile.webp"
                  style={{ width: 340, height: 452, objectFit: "contain" }}
                />
              </Box>
            )}
            {!sm && (
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
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: sm ? "15px" : md ? "25px" : "35px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/how_we_gobbl.webp"
                    alt="Gobbl AI"
                    style={{
                      width: "fit-content",
                      height: "100%",
                      maxHeight: 700,
                      objectFit: "contain",
                      marginRight: "-5%",
                      zIndex: 2,
                    }}
                  />
                </Box>
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/user_gobbl.webp"
                  alt="Gobbl AI"
                  style={{
                    maxWidth: "fit-content",
                    maxHeight: sm ? 80 : md ? 160 : lg ? 220 : 350,
                    height: "fit-content",
                    objectFit: "contain",
                    position: "absolute",
                    left: sm ? -42 : md ? -80 : lg ? -60 : -80,
                    top: sm ? "20%" : lg ? "5%" : "15%",
                  }}
                />
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/restro_gobbl.webp"
                  alt="Gobbl AI"
                  style={{
                    maxWidth: "fit-content",
                    maxHeight: sm ? 90 : md ? 180 : lg ? 240 : 360,
                    height: "fit-content",
                    objectFit: "contain",
                    position: "absolute",
                    right: lg ? "2%" : "8%",
                    bottom: sm ? -30 : md ? "-2%" : "-7%",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* the ai_agent */}
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
          {sm && <ExploreCardsComponent />}
          {!sm && (
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
                title="ORDERING"
                sub_title="Intuitive food ordering"
                description1="Deploy self-learning"
                description2="voice & chat agents to"
                description3="accept orders using"
                description4="natural language"
              />
              <ExploreCard
                img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap2.png"
                imgSize={sm ? 110 : 200}
                title="ANALYTICS"
                sub_title="Cultivate Customers"
                description1="Recieve actionable"
                description2="insights into sales and"
                description3="trends to create strategies"
                description4="for customer retention"
              />
              <ExploreCard
                img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap3.png"
                imgSize={sm ? 100 : 200}
                title="MARKETING"
                sub_title="Automate Campaigns"
                description1="Run targeted campaigns"
                description2="and promotions to attract"
                description3="users, based on trends &"
                description4="inventory"
              />
              <ExploreCard
                img="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/newhome/roadmap4.png"
                imgSize={sm ? 110 : 200}
                title="INTEGRATIONS"
                sub_title="with partner systems"
                description1="Connect to any platform,"
                description2="anywhere, through"
                description3="intelligent APIs that speak"
                description4="every system's language"
              />
            </Box>
          )}
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

      {/* architecture */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
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
          {sm && <ArchitectureComponent />}
          {!sm && (
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                zIndex: 1,
                gap: "15px",
              }}
            >
              <Typography
                style={{
                  width: "fit-content",
                  height: sm ? 42 : 60,
                  background: "#FF9CFF",
                  borderRadius: "50px",
                  fontFamily: "'Rubik'",
                  fontWeight: 900,
                  fontSize: sm ? 24 : 32,
                  lineHeight: "120%",
                  fontVariant: "all-small-caps",
                  color: "#000000",
                  padding: "0 25px 5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: sm ? "10px" : "25px",
                }}
              >
                ARCHITECTURE
              </Typography>

              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: sm ? "10px" : "25px",
                }}
              >
                <Box
                  style={{
                    minWidth: 65,
                    width: sm ? 60 : 145,
                    height: sm ? 70 : 120,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/base_arc.webp"
                    alt="Gobbl AI"
                    style={{
                      width: "fit-content",
                      maxHeight: 130,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: sm ? "3px" : "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "15px",
                      padding: "0 15px",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 900,
                        fontSize: sm ? 18 : 30,
                        lineHeight: "120%",
                        fontVariant: "all-small-caps",
                        color: "#FFFFFF",
                      }}
                    >
                      APPLICATION
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 700,
                        fontSize: sm ? 12 : 20,
                        lineHeight: "120%",
                        textAlign: "right",
                        fontVariant: "all-small-caps",
                        color: "#64FF99",
                      }}
                    >
                      USER INTERACTION LAYER
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "100%",
                      height: sm ? "fit-content" : 70,
                      background: "#161810",
                      borderRadius: sm ? "20px" : "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      // flexDirection: sm ? "column" : "row",
                      gap: sm ? "5px" : "25px",
                      padding: sm ? "10px" : "0 20px",
                    }}
                  >
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Customer Interface
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Restaurant Interface
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: sm ? "10px" : "25px",
                }}
              >
                <Box
                  style={{
                    minWidth: 65,
                    width: sm ? 60 : 145,
                    height: sm ? 70 : 120,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/protein.webp"
                    alt="Gobbl AI"
                    style={{
                      width: "fit-content",
                      maxHeight: 116,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: sm ? "3px" : "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "15px",
                      padding: "0 15px",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 900,
                        fontSize: sm ? 18 : 30,
                        lineHeight: "120%",
                        fontVariant: "all-small-caps",
                        color: "#FFFFFF",
                      }}
                    >
                      INTELLIGENCE
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 700,
                        fontSize: sm ? 12 : 20,
                        lineHeight: "120%",
                        textAlign: "right",
                        fontVariant: "all-small-caps",
                        color: "#64FF99",
                      }}
                    >
                      LLM PROCESSING LAYER
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "100%",
                      height: sm ? "fit-content" : 70,
                      background: "#161810",
                      borderRadius: sm ? "20px" : "35px",
                      display: sm ? "grid" : "flex",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: sm ? "5px" : "20px",
                      padding: sm ? "10px" : "0 20px",
                    }}
                  >
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                        gridColumn: "1/4",
                      }}
                    >
                      Food Domain LLMs
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Restaurant LLMs
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Network LLMs
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: sm ? "10px" : "25px",
                }}
              >
                <Box
                  style={{
                    minWidth: 65,
                    width: sm ? 60 : 145,
                    height: sm ? 70 : 120,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/veggies.webp"
                    alt="Gobbl AI"
                    style={{
                      width: "fit-content",
                      maxHeight: 116,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: sm ? "3px" : "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "15px",
                      padding: "0 15px",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 900,
                        fontSize: sm ? 18 : 30,
                        lineHeight: "120%",
                        fontVariant: "all-small-caps",
                        color: "#FFFFFF",
                      }}
                    >
                      MODELS
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 700,
                        fontSize: sm ? 12 : 20,
                        lineHeight: "120%",
                        textAlign: "right",
                        fontVariant: "all-small-caps",
                        color: "#64FF99",
                      }}
                    >
                      MODEL INFRASTRUCTURE
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "100%",
                      height: sm ? "fit-content" : 70,
                      background: "#161810",
                      borderRadius: sm ? "20px" : "35px",
                      display: sm ? "grid" : "flex",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: sm ? "5px" : "20px",
                      padding: sm ? "10px" : "0 20px",
                    }}
                  >
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Edge Intelligence
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Model Registry
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Training
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Inference
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: sm ? "10px" : "25px",
                }}
              >
                <Box
                  style={{
                    minWidth: 65,
                    width: sm ? 60 : 145,
                    height: sm ? 70 : 120,
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/sauce.webp"
                    alt="Gobbl AI"
                    style={{
                      width: "fit-content",
                      maxHeight: 116,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: sm ? "3px" : "5px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "15px",
                      padding: "0 15px",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 900,
                        fontSize: sm ? 18 : 30,
                        lineHeight: "120%",
                        fontVariant: "all-small-caps",
                        color: "#FFFFFF",
                      }}
                    >
                      DATA
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "'Rubik'",
                        fontWeight: 700,
                        fontSize: sm ? 12 : 20,
                        lineHeight: "120%",
                        textAlign: "right",
                        fontVariant: "all-small-caps",
                        color: "#64FF99",
                      }}
                    >
                      VECTOR DATABASE LAYER
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "100%",
                      height: sm ? "fit-content" : 70,
                      background: "#161810",
                      borderRadius: sm ? "20px" : "35px",
                      display: sm ? "grid" : "flex",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: sm ? "5px" : "20px",
                      padding: sm ? "10px" : "0 20px",
                    }}
                  >
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Customer Vectors
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Restaurant Vectors
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Network Vectors
                    </Typography>
                    <Typography
                      style={{
                        width: "100%",
                        height: sm ? 30 : 41,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        background:
                          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.24) -5.59%, rgba(253, 255, 245, 0) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        borderRadius: sm ? "24px" : "32px",
                        fontFamily: "'Figtree'",
                        fontWeight: 400,
                        fontSize: sm ? 12 : 24,
                        textAlign: "center",
                        lineHeight: sm ? "100%" : "120%",
                        fontVariant: "all-small-caps",
                        color: "#EDEDED",
                      }}
                    >
                      Training Sets
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {/* <Box
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
            /> */}
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
              {sm && (
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/meet_gobbl_mobile.webp"
                  alt="Gobbl AI"
                  width={312}
                  height={287}
                  loading="eager"
                />
              )}
              {!sm && (
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/meet_gobbl_new.webp"
                  alt="Gobbl AI"
                  width={1150}
                  height={600}
                  loading="eager"
                />
              )}
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
                    style={{
                      fontFamily: "Rubik",
                      fontSize: sm ? 12 : 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: sm ? "5px 10px" : "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      borderRadius: sm ? "8px" : "16px",
                      fontWeight: tab === 1 ? 800 : 600,
                      opacity: tab === 1 ? 1 : 0.56,
                      background: tab === 1 ? "#D1FF19" : "transparent",
                      color: tab === 1 ? "#161810" : "#FDFFF5",
                    }}
                    onClick={() => setTab(1)}
                  >
                    BRANDS
                  </Button>
                  <Button
                    style={{
                      fontFamily: "Rubik",
                      fontSize: sm ? 12 : 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: sm ? "5px 10px" : "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      borderRadius: sm ? "8px" : "16px",
                      fontWeight: tab === 2 ? 800 : 600,
                      opacity: tab === 2 ? 1 : 0.56,
                      background: tab === 2 ? "#D1FF19" : "transparent",
                      color: tab === 2 ? "#161810" : "#FDFFF5",
                    }}
                    onClick={() => setTab(2)}
                  >
                    CHEFS
                  </Button>
                  <Button
                    style={{
                      fontFamily: "Rubik",
                      fontSize: sm ? 12 : 20,
                      textAlign: "center",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: sm ? "5px 10px" : "10px 20px",
                      gap: "8px",
                      width: "max-content",
                      borderRadius: sm ? "8px" : "16px",
                      fontWeight: tab === 3 ? 800 : 600,
                      opacity: tab === 3 ? 1 : 0.56,
                      background: tab === 3 ? "#D1FF19" : "transparent",
                      color: tab === 3 ? "#161810" : "#FDFFF5",
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
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: md
                      ? "1fr 1fr 1fr"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {home_brands.slice(0, md ? 9 : 10).map((brand, i) => (
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
                          borderRadius: sm ? "12px" : "24px",
                          padding: "1px",
                        }}
                      >
                        <img
                          src={brand.image}
                          alt="Gobbl AI"
                          width={170}
                          height={175}
                          style={{
                            borderRadius: sm ? "12px" : "24px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 12 : 20,
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
                            fontSize: sm ? 12 : 18,
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
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: md
                      ? "1fr 1fr 1fr"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {chef_partners.slice(0, md ? 9 : 10).map((chef, i) => (
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
                          borderRadius: sm ? "12px" : "24px",
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
                            borderRadius: sm ? "12px" : "24px",
                            objectPosition: "top",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 12 : 20,
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
                            fontSize: sm ? 12 : 18,
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
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: md
                      ? "1fr 1fr 1fr"
                      : "repeat(auto-fill,minmax(175px, 1fr))",
                    columnGap: md ? "15px" : "50px",
                    rowGap: md ? "25px" : "35px",
                  }}
                >
                  {restaurants.slice(0, md ? 9 : 10).map((restaurant, i) => (
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
                          borderRadius: sm ? "12px" : "24px",
                          padding: "1px",
                        }}
                      >
                        <img
                          src={restaurant.image}
                          alt="Gobbl AI"
                          width={175}
                          height={175}
                          style={{
                            borderRadius: sm ? "12px" : "24px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Karla",
                          fontWeight: 700,
                          fontSize: sm ? 12 : 20,
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
                            fontSize: sm ? 12 : 18,
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
              title2="Gobblins"
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
              padding: md ? "0 0 50px" : "5%",
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
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/team/supreet.png"
                alt="Gobbl AI"
                style={{
                  width: md ? 120 : 172,
                  height: md ? 120 : 172,
                  borderRadius: "50%",
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
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/team/gaurav.png"
                alt="Gobbl AI"
                style={{
                  width: md ? 120 : 172,
                  height: md ? 120 : 172,
                  borderRadius: "50%",
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
            top: md ? "10%" : "20%",
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
              width={md ? 100 : 300}
              height={md ? 100 : 300}
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
            gap: sm ? 0 : "25px",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: sm ? "center" : "flex-start",
              gap: "15px",
              marginBottom: md ? (sm ? "50px" : "75px") : "7%",
            }}
          >
            <Typography
              variant="body1"
              style={{
                fontFamily: "'Rubik'",
                fontWeight: 900,
                fontSize: sm ? 46 : 50,
                lineHeight: "100%",
                color: "#64FF99",
                textAlign: sm ? "center" : "left",
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
                textAlign: sm ? "center" : "left",
              }}
            >
              Make your restaurant future-ready with Gobbl Smart operations,
              smarter profits.
            </Typography>
            <a
              href="https://forms.gle/VuR6zz3kxB4skbep6"
              target="_blank"
              style={{
                width: sm ? 280 : 330,
              }}
            >
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
