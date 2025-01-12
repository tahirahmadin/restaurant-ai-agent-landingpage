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
        height: sm ? 260 : 220,
        background: "#161810",
        borderTop: "5px solid #fff",
        borderBottom: "5px solid #fff",
        padding: md ? "0 5%" : "0 7%",
        display: "flex",
        alignItems: "center",
        justifyContent: sm ? "center" : "space-between",
        flexDirection: sm ? "column" : "row",
        gap: sm ? "25px" : "0",
      }}
    >
      <Link to="/">
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobbl_logo.svg"
          alt="FoodVerse Gobbl"
          width={143}
          height={50}
          style={{
            objectFit: "contain",
          }}
        />
      </Link>

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
            width={40}
            height={40}
          />
        </a>
        <a href="https://t.me/gobblnews" target="_blank">
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/footer_icons/telegramIcon.svg"
            alt="Gobbl"
            width={40}
            height={40}
          />
        </a>
        <a href="https://discord.gg/7shQgawD2w" target="_blank">
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/footer_icons/discordIcon.svg"
            alt="FoodVerse"
            width={40}
            height={40}
          />
        </a>
        <a href="https://www.linkedin.com/company/gobbl" target="_blank">
          <img
            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/linkedInIcon.svg"
            alt="FoodVerse"
            width={40}
            height={40}
          />
        </a>
      </Box>
      <Typography
        variant=""
        style={{
          fontFamily: "'Karla'",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "110%",
          textAlign: sm ? "center" : "right",
          color: "#FFFFFF",
        }}
      >
        Copyright © 2025.
        <br />
        All rights reserved by Gobbl
      </Typography>
    </Box>
  );
};

export default Footer;
