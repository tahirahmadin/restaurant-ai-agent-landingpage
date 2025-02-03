import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      style={{
        width: "100%",
        height: 200,
        background: "#161810",
        borderTop: "5px solid #fff",
        borderBottom: "5px solid #fff",
        padding: md ? "5%" : "0 7%",
        display: "flex",
        alignItems: "center",
        justifyContent: sm ? "space-around" : "space-between",
        flexDirection: sm ? "column" : "row",
        gap: sm ? "25px" : "0",
      }}
    >
      <Link to="/" style={{ width: sm ? 156: "100%" }}>
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_logo.svg"
          alt="FoodVerse Gobbl"
          width={156}
          height={56}
          style={{
            objectFit: "contain",
          }}
        />
      </Link>

      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <a href="https://x.com/gobblfood" target="_blank">
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/xIcon.svg"
              alt="Gobbl"
              width={sm ? 28 : 40}
              height={sm ? 28 : 40}
            />
          </a>
          <a href="https://t.me/gobblnews" target="_blank">
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/footer_icons/telegramIcon.svg"
              alt="Gobbl"
              width={sm ? 28 : 40}
              height={sm ? 28 : 40}
            />
          </a>

          <a href="https://www.linkedin.com/company/gobbl" target="_blank">
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/linkedInIcon.svg"
              alt="FoodVerse"
              width={sm ? 28 : 40}
              height={sm ? 28 : 40}
            />
          </a>
        </Box>
        <Typography
          style={{
            fontFamily: "'Karla'",
            fontWeight: 600,
            fontSize: sm ? 12 : 20,
            lineHeight: "110%",
            textAlign: "right",
            color: "#FFFFFF",
          }}
        >
          Copyright © 2025.
          <br />
          All rights reserved by Gobbl
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
