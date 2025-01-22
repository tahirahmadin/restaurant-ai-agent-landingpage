import React, { useEffect, useState } from "react";
import {
  mediaArticles,
  mediaVideos,
} from "./homepageComponents/data/mediaData";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CommonButton from "./homepageComponents/CommonButton";

const MediaPage = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [videos, setVideos] = useState(md ? 10 : 9);
  const [articles, setArticles] = useState(md ? 10 : 9);

  useEffect(() => {
    if (md) {
      setVideos(10);
      setArticles(10);
    }
  }, [md]);

  return (
    <div className="media">
      {/* videos */}
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#161810",
          position: "relative",
        }}
      >
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="FoodVerse"
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
            height: "50%",
          }}
        />
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="FoodVerse"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
          }}
        />
        <div className="media_container">
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "7%",
            }}
          >
            <Box
              style={{
                width: "100%",
                height: md ? (sm ? 120 : 140) : 190,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  whiteSpace: "nowrap",
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
                }}
              >
                Watch our
              </Box>
              <Box
                style={{
                  width: "100%",
                  maxWidth: 700,
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
                  transform: "rotate(-6deg)",
                  marginTop: "0px",
                  zIndex: 2,
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
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    fontFamily: "'Rubik'",
                    fontWeight: 900,
                    fontSize: 58,
                    lineHeight: "100%",
                    color: "#161810",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 48,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 42,
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 36,
                    },
                  }}
                >
                  Media Interactions
                </Box>
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
          </Box>
          <div className="media_cards">
            {mediaVideos.slice(0, videos).map((video, i) => (
              <div className="media_card" key={i}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#161811",
                    borderRadius: sm ? "16px" : "25px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: sm ? "15px" : "20px",
                    padding: sm ? "10px 10px 35px" : "20px 20px 60px",
                  }}
                >
                  <img
                    src={video.thumb}
                    alt={video.platform}
                    className="media_thumb"
                    width={313}
                    height={200}
                    style={{ minWidth: "100%" }}
                  />
                  <div>
                    <img
                      src={video.logo}
                      alt={video.platform}
                      className="media_logo"
                      width={80}
                      height={80}
                    />
                    <p>{video.platform}</p>
                  </div>
                  <a href={video.url} target="_blank" className="card_cta">
                    <span>VIEW FULL VIDEO</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {mediaVideos.length >= videos && (
            <button
              className="media_more"
              onClick={() => setVideos(videos + (md ? 10 : 9))}
            >
              SEE MORE
            </button>
          )}
        </div>
      </Box>

      {/* articles */}
      <div className="media_articles">
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="FoodVerse"
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
            height: "50%",
          }}
        />
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/htp/noisebg.png"
          alt="FoodVerse"
          width={2000}
          height={2000}
          style={{
            pointerEvents: "none",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "50%",
          }}
        />
        <div className="media_container">
          <Box
            style={{
              width: "fit-content",
              maxWidth: 494,
              height: md ? (sm ? 50 : 65) : 80,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: md ? "10px" : "15px",
              padding: md ? "0 15px" : "0 25px",
              background: "#FF9CFF",
              border: "1px solid #FF9CFF",
              borderRadius: "12px",
              transform: "rotate(6deg)",
              zIndex: 2,
              marginBottom: sm ? "20px" : "0px",
              marginLeft: "auto",
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
            <Box
              sx={{
                whiteSpace: "nowrap",
                fontFamily: "'Rubik'",
                fontWeight: 900,
                fontSize: 50,
                lineHeight: "100%",
                color: "#161810",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                [theme.breakpoints.down("lg")]: {
                  fontSize: 42,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 36,
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: 32,
                },
              }}
            >
              News Updates
            </Box>
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
          <div className="media_cards">
            {mediaArticles.slice(0, articles).map((article, i) => (
              <div className="media_card" key={i}>
                <img
                  src={article.logo}
                  alt="FoodVerse Article"
                  className="article_logo"
                  width={208}
                  height={80}
                />
                <img
                  src={article.article}
                  alt="FoodVerse Article"
                  className="article_Image"
                  width={308}
                  height={228}
                />
                <a href={article.url} target="_blank" className="card_cta">
                  <span>READ ARTICLE</span>
                </a>
              </div>
            ))}
          </div>
          {mediaArticles.length >= articles && (
            <button
              className="media_more"
              onClick={() => setArticles(articles + (md ? 10 : 9))}
            >
              SEE MORE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
