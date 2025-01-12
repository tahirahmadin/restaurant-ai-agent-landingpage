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
  toggleHeaderMenuExpanded,
  getUserActivity,
  changeUsername,
  changeUserProfile,
  updateGameBalance,
  getUserGameData,
  updateStakingBalance,
  setLoginPopup,
  setDashboardMenuItem,
} from "../reducers/UiReducer";
import { getUserBalancesData } from "../actions/serverActions";
import ethersServiceProvider from "../services/ethersServiceProvider";

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
import { useServerAuth } from "../hooks/useServerAuth";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxTypes";
import {
  ActivityProps,
  StateBooleanProps,
  UserGameDataInterface,
} from "../utils/interfaces";
import { useOutsideClick } from "../hooks/useOutsideClick";
import TelegramNotificationsPopup from "./TelegramNotificationsPopup";
import { Link, useLocation } from "react-router-dom";

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
  nav_link: {
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0px",
    position: "relative",
    // minWidth: 100,
    width: "100%",
    zIndex: 3,
    minHeight: 60,
    transition: "all 0.4s ease",
    [theme.breakpoints.down("md")]: {
      minHeight: 0,
      flexDirection: "column",
    },
    "&:hover $hover_box": {
      opacity: 1,
      pointerEvents: "visible",
      transform: "translateY(0px)",
    },
  },
  nav_link_logo: {
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    position: "relative",
    minWidth: 60,
    maxWidth: 180,
    paddingBottom: "10px",
    minHeight: 60,
    transition: "all 0.4s ease",
    [theme.breakpoints.down("md")]: {
      minWidth: 100,
      minHeight: 40,
    },
    "&:hover $hover_box": {
      opacity: 1,
      pointerEvents: "visible",
      transform: "translateY(0px)",
    },
  },
  hover_box: {
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    width: 60,
    top: 60,
    left: 0,
    displau: "flex",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 3,
    transition: "all 0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: 86,
      top: 40,
    },
  },
  hover_innerBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
  },
  hover_text: {
    color: "#000",
    fontSize: "12px",
    height: 18,
    fontWeight: 700,
    textTransform: "uppercase",
    textDecoration: "none",
    textAlign: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#d1ff19",
      backgroundColor: "#000",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
      height: 15,
    },
  },
  nav_avatar: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minWidth: 60,
    maxWidth: 60,
    minHeight: 66,
    borderRadius: "40px 40px 0px 0px",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("md")]: {
      minWidth: 40,
      maxWidth: 40,
      minHeight: 40,
      marginLeft: "auto",
    },
    "&:hover": {
      backgroundColor: "#D1FF19",
      // [theme.breakpoints.down("md")]: {
      //   backgroundColor: "transparent",
      // },
    },
    "&:hover $hover_box2": {
      opacity: 1,
      pointerEvents: "visible",
      transform: "translateY(0px)",
      // [theme.breakpoints.down("md")]: {
      //   opacity: 0,
      //   pointerEvents: "none",
      // },
    },
  },
  hover_box2: {
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    width: 180,
    top: 60,
    right: 0,
    displau: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "5px",
    zIndex: -1,
    transition: "all 0.4s ease",
    borderRadius: "0px 0px 10px 10px",
    backgroundColor: "#D1FF19",
    [theme.breakpoints.down("lg")]: {
      width: 140,
      top: 40,
    },
  },
  nav_icon: {
    marginBottom: "5px",
    objectFit: "contain",
  },
  nav_icon_mobile: {
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

type ActivityArrayProps = {
  date: string;
  activities: ActivityProps[];
};

const DashboardMenuComponent = ({
  text,
  children,
  active,
  onClick,
}: {
  text: string;
  children?: ReactNode;
  active?: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}) => {
  return (
    <Box
      style={{
        width: "100%",
        height: 56,
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        userSelect: "none",
        background: active
          ? "radial-gradient(73.54% 129.64% at 65.63% 26.46%, #63FFE3 0%, #8D92FF 100%)"
          : "",
      }}
      onClick={onClick}
    >
      <Box
        style={{
          width: "65%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box
          style={{
            minWidth: 30,
            marginLeft: "auto",
          }}
        >
          {children}
        </Box>
        <Typography
          variant="inherit"
          style={{
            width: "100%",
            marginRight: "auto",
            fontWeight: 500,
            fontSize: 20,
            textTransform: "uppercase",
            color: active ? "#000" : "#FFFFFF",
            marginLeft: "auto",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const Navbar: React.FC = ({
  prelaunch,
  game,
  unloadGame,
}: {
  prelaunch: boolean;
  game?: boolean;
  unloadGame?: any;
}) => {
  const classes = useStyles();
  const { pathname = asPath } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { accountSC, authloaded } = useServerAuth();

  // Redux States
  const username = useAppSelector((reduxState) => reduxState.ui.username);
  const headerMenuExpanded = useAppSelector(
    (reduxState) => reduxState.ui.headerMenuExpanded
  );
  const userActivity = useAppSelector((state) => state.ui.userActivity);
  const balancesFlag = useAppSelector((state) => state.ui.balancesFlag);
  const farmCategories = useAppSelector((state) => state.ui.farmCategories);
  const userGameData = useAppSelector((state) => state.ui.userGameData);
  const profileImage = useAppSelector(
    (reduxState) => reduxState.ui.profileImage
  );
  const selectedDashboardMenuItem = useAppSelector(
    (reduxState) => reduxState.ui.selectedDashboardMenuItem
  );

  // Responsive
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  // States
  const [openNotification, setOpenNotification] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [telegramPopup, setTelegramPopup] = useState(false);
  const [notiBadge, setNotiBadge] = useState(0);
  const [textCopied, setTextCopied] = useState(false);
  const [navLinks, setNavLinks] = useState<StateBooleanProps>({
    market: false,
    kitchen: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [kitchenOpen, setKitchenOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardLinks, setDashboardLinks] = useState<StateBooleanProps>({
    activity: false,
    ingredients: false,
    dishes: false,
    rewards: false,
    tradeHistory: false,
  });
  const [playOpen, setPlayOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [chainOpen, setChainOpen] = useState(false);

  const recipePath = asPath.slice(0, 8) === "/recipes";
  const collectionPath = asPath.slice(0, 12) === "/collections";
  const buyIngredientPath = asPath.slice(0, 16) === "/buy-ingredients";
  const buyDishPath = asPath.slice(0, 11) === "/buy-dishes";

  const playPaths = [
    "/",
    "/games",
    "/farm",
    "/recipes",
    "/collections",
    "/level-lab",
    "/assistant",
    "/buy-ingredients",
    "/buy-dishes",
    "/renting",
    "/live-trader",
    "/how-to-play",
    "/foodfury",
    "/food5",
    "/gobblup",
  ];

  useEffect(() => {
    if (
      playPaths.includes(asPath) ||
      recipePath ||
      collectionPath ||
      buyIngredientPath ||
      buyDishPath
    )
      setPlayOpen(true);
  }, []);

  //Local:: Hook to update loaded
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  //Local:: Hook to update loaded
  useEffect(() => {
    if (asPath) {
      if (asPath != "/") {
        // setPlayOpen(true);
      }
    }
  }, [loaded]);

  //Local:: Hook to update picture
  useEffect(() => {
    if (profileImage) {
      setImageUrl(profileImage);
    }
  }, [profileImage]);

  const ref = useOutsideClick(() => {
    setOpenNotification(false);
    localStorage.setItem("activityTime", Date.now().toString());
  });

  const { logoutUserUniversal } = useServerAuth(true);

  //EXECUTE:: Handle logout user
  const logoutUser = async () => {
    await logoutUserUniversal();
    setDashboardOpen(false);
  };

  const handleClick = async () => {
    game && (await unloadGame());
    setMenuOpen(false);
    !matches && dispatch(toggleHeaderMenuExpanded());
  };

  // Get Game balance
  useEffect(() => {
    async function asyncFn() {
      {
        if (accountSC) {
          let response = await getUserBalancesData(accountSC);
          if (response) {
            await dispatch(updateGameBalance(response.gameBalance));
            await dispatch(
              updateStakingBalance(
                response.stakedBalance + response.lockedBalance
              )
            );
          }
        }
      }
    }
    asyncFn();
  }, [accountSC, balancesFlag]);

  // refetch all queries
  useEffect(() => {
    if (accountSC) {
      dispatch(getUserGameData());
    }
  }, [accountSC]);

  // Logout if anything inappropriate
  useEffect(() => {
    if (userGameData == ({} as never)) {
      logoutUser();
    } else {
      if (userGameData && userGameData.telegram === "") {
        setNotiBadge(1);
      }
    }
  }, [userGameData]);

  useEffect(() => {
    (async () => {
      if (userGameData as UserGameDataInterface) {
        dispatch(changeUsername(userGameData.username as string));
        await ethersServiceProvider.setCurrentHandle(
          userGameData.signUpVia?.handle
        );
        dispatch(changeUserProfile(userGameData.profilePic));
      }
    })();
    return () => {
      console.log("cleaned up");
    };
  }, [userGameData]);

  //FETCH:: Calling API to get Activities
  useEffect(() => {
    if (accountSC) {
      dispatch(getUserActivity());
    }
  }, [accountSC]);

  //Local Function:: Get Image of action
  const getImageForActions = (
    action: string,
    activityData: { tokenId: number }
  ) => {
    let itemImage =
      "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/category/farm_fresh.png";
    let animatedFlag = false;
    if (action === "FARM_ACTIVITY") {
      itemImage = farmCategories[0].img;
      animatedFlag = false;
    } else if (action === "BATCH_BUY_ORDER") {
      itemImage =
        "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/Bulk_Buy.svg";
      animatedFlag = false;
    } else if (action === "BATCH_CREATE_ORDER") {
      itemImage =
        "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/Create_Order.svg";
      animatedFlag = false;
    } else if (action === "BATCH_CANCEL_ORDER") {
      itemImage =
        "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/Cancel_Order.svg";
      animatedFlag = false;
    } else if (action === "LEADERBOARD_REWARD") {
      itemImage =
        "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/nav_icons/rewards.svg";
      animatedFlag = true;
    } else {
      itemImage = `https://onerare-bucket.s3.ap-south-1.amazonaws.com/redketchup/${activityData?.tokenId?.toString()}.png`;
      animatedFlag = true;
    }
    return {
      itemImage,
      animatedFlag,
    };
  };

  // Local Function:: Get Clean Activities
  const activitiesArray = useMemo(() => {
    if (userActivity?.length > 0) {
      let tabWiseActivities = userActivity;
      const activitiesArray: ActivityProps[] = [];
      const uniqueDates: string[] = [];

      tabWiseActivities?.map((activity: any) => {
        if (activity.action != undefined) {
          // Getting image for pools
          let imageOfAction = getImageForActions(
            activity.activityType,
            activity
          );

          const dateString = activity.timeStamp;
          const date = new Date(activity.timeStamp);
          const dateForTime = date.toString();

          const activityDate = dateString.substr(0, 10);

          if (!uniqueDates.includes(activityDate))
            uniqueDates.push(activityDate);

          const time = dateForTime.substr(16, 5);

          const sentence = activity.action;

          activitiesArray.push({
            action: activity.action,
            date: activityDate,
            time: time,
            sentence: sentence,
            image: imageOfAction.itemImage,
            animatedFlag: imageOfAction.animatedFlag,
            activityType: activity.activityType,
          });
        } else {
          if (activity.action === "LEADERBOARD_REWARD") {
            const dateString = activity.timeStamp;
            const date = new Date(activity.timeStamp);
            const dateForTime = date.toString();

            const activityDate = dateString.substr(0, 10);

            if (!uniqueDates.includes(activityDate))
              uniqueDates.push(activityDate);

            const time = dateForTime.substr(16, 5);

            activitiesArray.push({
              action: "LEADERBOARD_REWARD",
              date: activityDate,
              time: time,
              sentence: "You received Leaderboard Reward.",
              image:
                "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/nav_icons/rewards.svg",
              animatedFlag: true,
              activityType: activity.activityType,
            });
          }
        }
      });

      const tempActivityArray: ActivityArrayProps[] = [];
      uniqueDates?.map((uniqueDate: any) => {
        const dateActivity: ActivityArrayProps = {
          date: uniqueDate,
          activities: activitiesArray?.filter(
            (activity) => activity.date === uniqueDate
          ),
        };

        tempActivityArray.push(dateActivity);
      });

      return tempActivityArray;
    } else {
      return [];
    }
  }, [userActivity]);

  const getUserDisplayName = useMemo(() => {
    if (userGameData && userGameData.username) {
      return userGameData.username;
    }
    if (userGameData && userGameData.signUpVia) {
      if (userGameData.signUpVia.via != "METAMASK") {
        return userGameData.signUpVia.handle.slice(0, 13);
      } else {
        return (
          userGameData.signUpVia.handle.slice(0, 4) +
          "..." +
          userGameData.signUpVia.handle.slice(37, 42)
        );
      }
    } else {
      return "User";
    }
  }, [userGameData]);

  const handleNotificationClick = () => {
    dispatch(getUserActivity());

    setOpenNotification(!openNotification);
    setUnreadCount(0);
  };

  return (
    <Box
      pl={md ? 1 : 0}
      pr={md ? 1 : 1.5}
      bgcolor="secondary.main"
      style={{
        width: "100%",
        zIndex: 101,
        position: "fixed",
        left: 0,
        right: 0,
        transition: "0.3s all linear",
        height: md ? 55 : 60,
      }}
    >
      <TelegramNotificationsPopup
        telegramPopup={telegramPopup}
        setTelegramPopup={setTelegramPopup}
      />

      <nav
        style={{
          width: "100%",
          minHeight: md ? 55 : 60,
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
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {md && (
            <Menu
              style={{
                color: "#fff",
                margin: "0 5px",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}
          <Link
            to="/"
            className={classes.nav_link_logo}
            onClick={async () => game && (await unloadGame())}
            style={{
              padding: 0,
              backgroundColor: "#000",
              position: "relative",
              minWidth: md ? 45 : 117,
              maxWidth: md ? 45 : 117,
              zIndex: 4,
            }}
          >
            <img
              src="/assets/nav_icons/gobbl_logo.svg"
              alt="FoodVerse logo"
              width={80}
              height={35}
              style={{
                objectFit: "contain",
                marginLeft: md ? "15px" : 0,
              }}
            />
          </Link>
          {/* NECCESSARY FOR HIDING */}
          {!md && (
            <Box minWidth={md ? "100%" : "75vw"} maxWidth="830px">
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    zIndex: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    className={classes.nav_link}
                    sx={{
                      minWidth: 60,
                      color:
                        projectOpen ||
                        asPath === "/partners" ||
                        asPath === "/media"
                          ? "#64FF99"
                          : "#fff",
                      backgroundColor: "#000",
                    }}
                    onClick={() => {
                      setPlayOpen(false);
                      setProjectOpen(true);
                      setChainOpen(false);
                      handleClick();
                    }}
                  >
                    <img
                      src="/assets/nav_icons/project.png"
                      alt="FoodVerse Project"
                      className={classes.nav_icon}
                      width={26}
                      height={26}
                    />
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.nav_text}
                      style={{
                        fontFamily: "Karla",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: md ? 9 : 12,
                        lineHeight: "92%",
                      }}
                    >
                      Project
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: 0,
                      position: "relative",
                      minWidth: projectOpen ? "260px" : 0,
                      minHeight: "100%",
                      transform: projectOpen
                        ? "scale(1) translateX(0)"
                        : "scale(0.6) translateX(-1000px)",
                      transition: "all 0.3s ease",
                      zIndex: -1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: projectOpen ? "0 5%" : 0,
                      gap: "15px",
                      background: "#000",
                    }}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        left: "2.5%",
                        right: "2.5%",
                        top: 0,
                        width: "95%",
                        height: "100%",
                        background: "#64FF99",
                        opacity: 0.2,
                        transform: "skewX(-10deg)",
                        zIndex: -1,
                      }}
                    />
                    <Link
                      to="/partners"
                      onClick={handleClick}
                      style={{
                        width: "100%",
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
                        variant="inherit"
                        style={{
                          fontSize: md ? 9 : 12,
                          lineHeight: "90%",
                          fontWeight: 400,
                          color: asPath === "/partners" ? "#64FF99" : "#fff",
                        }}
                      >
                        PARTNERS
                      </Typography>
                    </Link>
                    <Link
                      to="/media"
                      onClick={handleClick}
                      style={{
                        width: "100%",
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
                        variant="inherit"
                        style={{
                          fontSize: md ? 9 : 12,
                          lineHeight: "90%",
                          fontWeight: 400,
                          color: asPath === "/media" ? "#64FF99" : "#fff",
                        }}
                      >
                        MEDIA
                      </Typography>
                    </Link>

                    <Link
                      to="https://onerare.gitbook.io/docs"
                      target="_blank"
                      style={{
                        width: "100%",
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
                        variant="inherit"
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
                    </Link>
                  </Box>
                </Box>
                {/* <Box
                    style={{
                      display: "flex",
                      zIndex: 2,
                    }}
                  >
                    <Box
                      className={classes.nav_link}
                      sx={{
                        minWidth: 60,
                        color: chainOpen ? "#64FF99" : "#fff",
                        backgroundColor: "#000",
                      }}
                      onClick={() => {
                        setPlayOpen(false);
                        setProjectOpen(false);
                        setChainOpen(true);
                        handleClick();
                      }}
                    >
                      <img
                        src="/assets/nav_icons/chain.png"
                        alt="Gobbl FoodChain"
                        className={classes.nav_icon}
                        width={28}
                        height={28}
                      />
                      <Typography
                        variant="body2"
                        color="inherit"
                        className={classes.nav_text}
                        style={{
                          fontFamily: "Karla",
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: md ? 9 : 12,
                          lineHeight: "92%",
                        }}
                      >
                        Chain
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: 0,
                        position: "relative",
                        minWidth: chainOpen ? "330px" : 0,
                        minHeight: "100%",
                        transform: chainOpen
                          ? "scale(1) translateX(0)"
                          : "scale(0.6) translateX(-330px)",
                        transition: "all 0.3s ease",
                        zIndex: -1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: chainOpen ? "0 5%" : 0,
                        gap: "15px",
                        background: "#000",
                      }}
                    >
                      <Box
                        style={{
                          position: "absolute",
                          left: "2.5%",
                          right: "2.5%",
                          top: 0,
                          width: "95%",
                          height: "100%",
                          background: "#64FF99",
                          opacity: 0.2,
                          transform: "skewX(-10deg)",
                          zIndex: -1,
                        }}
                      />
                      <Link
                        to="https://bridge.gobbl.io/"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/bridge.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          BRIDGE
                        </Typography>
                      </Link>
                      <Link
                        to="https://explorer.gobbl.io/"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/explorer.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          EXPLORER
                        </Typography>
                      </Link>
                      <Link
                        to="https://faucet.gobbl.io/"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/gobbl_coin.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          FAUCET
                        </Typography>
                      </Link>
                      <Link
                        to="https://status.gobbl.io/"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/status.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          STATUS
                        </Typography>
                      </Link>
                      <Link
                        to="https://rpc.gobbl.io/"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/rpc.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: "#fff",
                          }}
                        >
                          RPC
                        </Typography>
                      </Link>
                    </Box>
                  </Box> */}
                <Box
                  style={{
                    display: "flex",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    className={classes.nav_link}
                    sx={{
                      minWidth: 60,
                      color:
                        playOpen || playPaths.includes(asPath)
                          ? "#64FF99"
                          : "#fff",
                      backgroundColor: "#000",
                    }}
                    onClick={() => {
                      setProjectOpen(false);
                      setPlayOpen(true);
                      setChainOpen(false);
                      handleClick();
                    }}
                  >
                    <img
                      src="/assets/nav_icons/play.png"
                      alt="FoodVerse Project"
                      className={classes.nav_icon}
                      width={36}
                      height={36}
                    />
                    <Typography
                      variant="body2"
                      color="inherit"
                      className={classes.nav_text}
                      style={{
                        fontFamily: "Karla",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: md ? 9 : 12,
                        lineHeight: "92%",
                      }}
                    >
                      Play
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: 0,
                      position: "relative",
                      minWidth: playOpen ? "440px" : 0,
                      height: "100%",
                      transform: playOpen
                        ? "scale(1) translateX(-0px)"
                        : "scale(0.6) translateX(-2000px)",
                      transition: "all 0.3s ease",
                      // zIndex: -1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: playOpen ? "0 5%" : 0,
                      gap: "15px",
                      background: "#000",
                    }}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        left: "2.5%",
                        right: "2.5%",
                        top: 0,
                        width: "95%",
                        height: "100%",
                        background: "#64FF99",
                        opacity: 0.2,
                        transform: "skewX(-10deg)",
                        zIndex: -2,
                      }}
                    />
                    {/* <Link
                        to="/games"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="/assets/nav_icons/games.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={32}
                          height={32}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: asPath === "/games" ? "#64FF99" : "#fff",
                          }}
                        >
                          GAMES
                        </Typography>
                      </Link> */}
                    <Link
                      to="/gobblup"
                      onClick={handleClick}
                      style={{
                        width: "100%",
                        height: "100%",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/assets/nav_icons/gobbl_up.svg"
                        alt="FoodVerse"
                        width={70}
                        height={36}
                        style={{
                          minWidth: 70,
                          marginTop: "13px",
                        }}
                      />
                    </Link>

                    <Link
                      to="/foodfury"
                      onClick={handleClick}
                      style={{
                        width: "100%",
                        height: "100%",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 1,
                      }}
                    >
                      <img
                        src="/assets/nav_icons/foodfury.png"
                        alt="FoodVerse"
                        width={111}
                        height={45}
                        style={{
                          minWidth: 121,
                          marginTop: "5px",
                        }}
                      />
                    </Link>
                    <Link
                      to="/food5"
                      onClick={handleClick}
                      style={{
                        width: "100%",
                        height: "100%",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 1,
                      }}
                    >
                      <img
                        src="/assets/nav_icons/food5.png"
                        alt="FoodVerse"
                        width={86}
                        height={28}
                        style={{
                          minWidth: 96,
                          marginTop: "5px",
                        }}
                      />
                    </Link>
                    <Link
                      to="/legacy"
                      onClick={handleClick}
                      style={{
                        width: "100%",
                        height: "100%",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 1,
                      }}
                    >
                      <Box
                        style={{
                          width: "100%",
                          height: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 1,
                        }}
                      >
                        <img
                          src="/assets/nav_icons/foodverse.svg"
                          alt="FoodVerse"
                          width={64}
                          height={32}
                          style={{
                            minWidth: 64,
                            marginTop: "13px",
                          }}
                        />
                      </Box>
                    </Link>

                    {/* <Link
                        to="/recipes"
                        onClick={handleClick}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          className={classes.nav_link}
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "100%",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                          onMouseEnter={(prevState: any) =>
                            setNavLinks({ ...prevState, kitchen: true })
                          }
                          onMouseLeave={(prevState: any) =>
                            setNavLinks({ ...prevState, kitchen: false })
                          }
                        >
                          <img
                            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/kitchen.png"
                            alt="FoodVerse Project"
                            className={classes.nav_icon}
                            width={28}
                            height={28}
                          />
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: md ? 9 : 12,
                              lineHeight: "90%",
                              fontWeight: 600,
                              color:
                                recipePath ||
                                collectionPath ||
                                asPath === "/recipes" ||
                                asPath === "/collections" ||
                                asPath === "/level-lab" ||
                                asPath === "/assistant"
                                  ? "#64FF99"
                                  : "#fff",
                            }}
                          >
                            KITCHEN
                          </Typography>
                          
                          <Box
                            style={{
                              position: "absolute",
                              left: -171.5,
                              top: 60,
                              width: "390px",
                              height: "38.5px",
                              transition: "all 0.3s ease",
                              // zIndex: -1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0 5%",
                              gap: "15px",
                              border: "none",
                            }}
                            className={classes.hover_box}
                          >
                            <Box
                              style={{
                                position: "absolute",
                                left: "2.5%",
                                right: "2.5%",
                                top: 0,
                                width: "95%",
                                height: "100%",
                                background: "#355440",
                                // opacity: 0.2,
                                transform: "skewX(-10deg)",
                                zIndex: -2,
                              }}
                            />
                            <Box className={classes.hover_innerBox}>
                              <Link
                                to="/recipes"
                                onClick={handleClick}
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      recipePath || asPath === "/recipes"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  COOK DISHES
                                </Typography>
                              </Link>
                              <Link
                                to="/collections"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      collectionPath || asPath === "/collections"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  COLLECTIONS
                                </Typography>
                              </Link>
                              <Link
                                to="/level-lab"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      asPath === "/level-lab"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  LEVEL LAB
                                </Typography>
                              </Link>
                              <Link
                                to="/assistant"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      asPath === "/assistant"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  COOK GPT
                                </Typography>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      </Link> */}

                    {/* <Link
                        to="/buy-ingredients"
                        onClick={handleClick}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          className={classes.nav_link}
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "100%",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                          onMouseEnter={(prevState: any) =>
                            setNavLinks({ ...prevState, kitchen: true })
                          }
                          onMouseLeave={(prevState: any) =>
                            setNavLinks({ ...prevState, kitchen: false })
                          }
                        >
                          <img
                            src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/market.png"
                            alt="FoodVerse Project"
                            className={classes.nav_icon}
                            width={28}
                            height={28}
                          />
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: md ? 9 : 12,
                              lineHeight: "90%",
                              fontWeight: 600,
                              color:
                                buyIngredientPath ||
                                buyDishPath ||
                                asPath === "/buy-ingredients" ||
                                asPath === "/buy-dishes" ||
                                asPath === "/renting" ||
                                asPath === "/live-trades"
                                  ? "#64FF99"
                                  : "#fff",
                            }}
                          >
                            MARKET
                          </Typography>
                          <Box
                            style={{
                              position: "absolute",
                              left: -240.5,
                              top: 60,
                              width: "390px",
                              height: "38.5px",
                              transition: "all 0.3s ease",
                              // zIndex: -1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0 5%",
                              gap: "15px",
                              border: "none",
                            }}
                            className={classes.hover_box}
                          >
                            <Box
                              style={{
                                position: "absolute",
                                left: "2.5%",
                                right: "2.5%",
                                top: 0,
                                width: "95%",
                                height: "100%",
                                background: "#355440",
                                // opacity: 0.2,
                                transform: "skewX(-10deg)",
                                zIndex: -2,
                              }}
                            />
                            <Box className={classes.hover_innerBox}>
                              <Link
                                to="/buy-ingredients"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      buyIngredientPath ||
                                      asPath === "/buy-ingredients"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  BUY INGREDIENTS
                                </Typography>
                              </Link>
  
                              <Link
                                to="/buy-dishes"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      buyDishPath || asPath === "/buy-dishes"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  BUY DISHES
                                </Typography>
                              </Link>
  
                              <Link
                                to="/renting"
                                onClick={handleClick}
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      asPath === "/renting" ? "#64FF99" : "#fff",
                                  }}
                                >
                                  RENT DISHES
                                </Typography>
                              </Link>
  
                              <Link
                                to="/live-trades"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    width: "100%",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "100%",
                                    color:
                                      asPath === "/live-trades"
                                        ? "#64FF99"
                                        : "#fff",
                                  }}
                                >
                                  LIVE TRADES
                                </Typography>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      </Link> */}

                    {/* <Link
                        to="/how-to-play"
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/guide.png"
                          alt="FoodVerse Project"
                          className={classes.nav_icon}
                          width={28}
                          height={28}
                        />
                        <Typography
                          variant="inherit"
                          style={{
                            fontSize: md ? 9 : 12,
                            lineHeight: "90%",
                            fontWeight: 400,
                            color: asPath === "/how-to-play" ? "#64FF99" : "#fff",
                          }}
                        >
                          GUIDE
                        </Typography>
                      </Link> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          {/* {accountSC && (
              <Box hidden={md}>
                <IconButton
                  onClick={() => setTelegramPopup(true)}
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  <Badge badgeContent={notiBadge} color="primary">
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/noti_tele.svg"
                      alt="FoodVerse"
                      width={32}
                      height={32}
                      style={{ marginRight: 5 }}
                    />
                  </Badge>
                </IconButton>
              </Box>
            )} */}
          {/* {accountSC && (
              <Box hidden={md}>
                <IconButton
                  onClick={handleNotificationClick}
                  color="primary"
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 15,
                    fontWeight: "bold",
                  }}
                >
                  <Badge color="primary" badgeContent={unreadCount}>
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/notificationIcon.svg"
                      alt="FoodVerse Notifications"
                      width={24}
                      height={24}
                    />{" "}
                  </Badge>
                </IconButton>
              </Box>
            )} */}
          {/* {activitiesArray.length > 0 && openNotification && (
              <Box
                sx={{
                  position: "absolute",
                  top: 65,
                  width: "100%",
                  maxWidth: 250,
                  marginLeft: "-50px",
                  [theme.breakpoints.down("lg")]: {
                    right: "5%",
                  },
                }}
              >
                <div ref={ref}>
                  <Box
                    sx={{
                      px: 1.2,
                      pb: 1.2,
                      width: "100%",
                      maxWidth: 250,
                      height: "max-content",
                      backgroundColor: "#00FFFF",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        pt: 0.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 700,
                          fontSize: 12,
                          lineHeight: "12px",
                        }}
                      >
                        NOTIFICATIONS
                      </Typography>
                      <Typography
                        onClick={async () => {
                          await handleClick();
                          push("/dashboard#activities");
                        }}
                        style={{
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: 12,
                          lineHeight: "12px",
                        }}
                      >
                        SEE ALL
                      </Typography>
                    </Box>
  
                    {activitiesArray?.length > 0 &&
                      activitiesArray?.slice(0, 1)?.map((item: any) =>
                        item.activities
                          ?.slice(0, 3)
                          ?.map((activity: any, i: number) => (
                            <Box
                              key={i}
                              sx={{
                                mt: 0.5,
                                px: 0.5,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "7px",
                                background:
                                  parseInt(activity.timestamp) * 1000 >
                                  parseInt(
                                    localStorage.getItem("activityTime") as string
                                  )
                                    ? "#FFD9FF"
                                    : "#fff",
                                height: 40,
                              }}
                            >
                              <img
                                src={activity.image}
                                alt="FoodVerse Activity"
                                width={25}
                                height={25}
                                style={{
                                  borderRadius: "50%",
                                }}
                              />
                              <Typography
                                style={{
                                  fontWeight: 400,
                                  fontSize: 11,
                                  lineHeight: "12px",
                                }}
                              >
                                {activity.sentence}
                              </Typography>
                            </Box>
                          ))
                      )}
                  </Box>
                </div>
              </Box>
            )} */}
          {/* {!accountSC ? ( */}
          <Link to="https://t.me/GobblUpBot" target="_blank">
            <Button
              color="primary"
              style={{
                fontWeight: "bold",
                minWidth: sm ? 60 : 200,
                height: sm ? 30 : 40,
                marginRight: sm ? "30px" : "100px",
                borderRadius: "20px",
                background:
                  "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                padding: "1px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  fontFamily: "'Karla'",
                  fontWeight: 700,
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: sm ? "5px" : "10px",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#000",
                  padding: "0 5px",
                }}
              >
                <img
                  src="/assets/nav_icons/gobbl_coin.png"
                  alt="FoodVerse Notifications"
                  width={sm ? 20 : 24}
                  height={sm ? 20 : 24}
                />
                {md ? "Airdrop" : "$Gobbl Airdrop"}
              </Box>
            </Button>
          </Link>

          {!accountSC && (
            <Box>
              <IconButton
                onClick={() => dispatch(setLoginPopup(true))}
                color="primary"
                style={{
                  width: 24,
                  height: 24,
                  marginRight: sm ? "15px" : "15px",
                  fontWeight: "bold",
                }}
              >
                <Button
                  color="primary"
                  style={{
                    fontWeight: "bold",
                    minWidth: sm ? 60 : 100,
                    height: sm ? 30 : 40,
                    marginRight: sm ? "10px" : "100px",
                    borderRadius: "20px",
                    background: "#66FF99",
                    padding: "1px",
                  }}
                >
                  <Box
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      fontFamily: "'Karla'",
                      fontWeight: 700,
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sm ? "5px" : "10px",
                      textTransform: "uppercase",
                      color: "#000000",
                      background: "#66FF99",
                      padding: "0 5px",
                    }}
                  >
                    Login
                  </Box>
                </Button>
              </IconButton>
            </Box>
          )}
          {accountSC && (
            <Link to="legacy">
              <Box>
                <IconButton
                  color="primary"
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: sm ? "15px" : "15px",
                    fontWeight: "bold",
                  }}
                >
                  <Button
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      minWidth: sm ? 60 : 120,
                      height: sm ? 30 : 40,
                      marginRight: sm ? "10px" : "100px",
                      borderRadius: "20px",
                      background: "#66FF99",
                      padding: "1px",
                    }}
                  >
                    <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px",
                        fontFamily: "'Karla'",
                        fontWeight: 700,
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: sm ? "5px" : "10px",
                        textTransform: "uppercase",
                        color: "#000000",
                        background: "#66FF99",
                        padding: "0 5px",
                      }}
                    >
                      {md ? <Dashboard /> : "Dashboard"}
                    </Box>
                  </Button>
                </IconButton>
              </Box>
            </Link>
          )}
        </Box>
        {/* Mobile - main menu */}
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          style={{
            position: "relative",
            zIndex: 100,
          }}
        >
          <Box
            style={{
              paddingTop: "55px",
              width: 75,
              height: "100%",
              background: "#000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflowX: "hidden",
              // overflowY: "auto",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                zIndex: 2,
              }}
            >
              <Box
                className={classes.nav_link}
                sx={{
                  minWidth: 75,
                  background: "#000",
                  color:
                    projectOpen || asPath === "/partners" || asPath === "/media"
                      ? "#64FF99"
                      : "#fff",
                  position: "relative",
                }}
                onClick={() => {
                  setPlayOpen(false);
                  setProjectOpen(true);
                  setChainOpen(false);
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/project.png"
                  alt="FoodVerse Project"
                  className={classes.nav_icon}
                  width={32}
                  height={32}
                />
                <Typography
                  variant="body2"
                  color="inherit"
                  className={classes.nav_text}
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: md ? 9 : 20,
                    lineHeight: "92%",
                    marginTop: "-3px",
                  }}
                >
                  PROJECT
                </Typography>
              </Box>
              {!projectOpen && (
                <Box
                  style={{
                    width: "100%",
                    zIndex: 2,
                    background: "#000",
                    padding: "10px 0 0",
                  }}
                >
                  <Box
                    style={{
                      width: "40px",
                      height: "0px",
                      border: "1px solid #61625c",
                      margin: "0 auto",
                    }}
                  />
                </Box>
              )}
              <Box
                style={{
                  position: "relative",
                  height: projectOpen ? 220 : 0,
                  width: 75,
                  transform: projectOpen
                    ? "translateY(0)"
                    : "translateY(-330px)",
                  transition: "all 0.3s ease",
                  zIndex: -1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: projectOpen ? "15% 0" : 0,
                  gap: "15px",
                  background: "#000",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: "5%",
                    bottom: "5%",
                    left: 0,
                    height: "90%",
                    width: "100%",
                    background: "#64FF99",
                    opacity: 0.2,
                    transform: "skewY(-7deg)",
                    zIndex: -1,
                  }}
                />
                <Link
                  to="/partners"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box
                    onClick={handleClick}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/partners.png"
                      alt="FoodVerse Project"
                      className={classes.nav_icon}
                      width={32}
                      height={32}
                    />
                    <Typography
                      variant="inherit"
                      style={{
                        fontSize: md ? 9 : 12,
                        lineHeight: "90%",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      PARTNERS
                    </Typography>
                  </Box>
                </Link>
                <Link
                  to="/media"
                  onClick={handleClick}
                  style={{
                    width: "100%",
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
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    MEDIA
                  </Typography>
                </Link>

                <Link
                  to="https://onerare.gitbook.io/docs"
                  target="_black"
                  style={{
                    width: "100%",
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
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    WHITEPAPER
                  </Typography>
                </Link>
              </Box>
              {/* <Box
                  className={classes.nav_link}
                  sx={{
                    minWidth: 75,
                    background: "#000",
                    color: chainOpen ? "#64FF99" : "#fff",
                    position: "relative",
                  }}
                  onClick={() => {
                    setPlayOpen(false);
                    setProjectOpen(false);
                    setChainOpen(true);
                  }}
                >
                  <img
                    src="/assets/nav_icons/chain.png"
                    alt="FoodVerse"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="body2"
                    color="inherit"
                    className={classes.nav_text}
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: md ? 9 : 20,
                      lineHeight: "92%",
                      marginTop: "-3px",
                    }}
                  >
                    Chain
                  </Typography>
                </Box> */}
              {/* {!chainOpen && (
                  <Box
                    style={{
                      width: "100%",
                      zIndex: 2,
                      background: "#000",
                      padding: "10px 0 0",
                    }}
                  >
                    <Box
                      style={{
                        width: "40px",
                        height: "0px",
                        border: "1px solid #61625c",
                        margin: "0 auto",
                      }}
                    />
                  </Box>
                )} */}
              <Box
                style={{
                  height: 0,
                  position: "relative",
                  minHeight: chainOpen ? 360 : 0,
                  width: 75,
                  transform: chainOpen ? "translateY(0)" : "translateY(-600px)",
                  transition: "all 0.3s ease",
                  zIndex: -1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: chainOpen ? "15% 0" : 0,
                  gap: "15px",
                  background: "#000",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: "5%",
                    bottom: "5%",
                    left: 0,
                    height: "90%",
                    width: "100%",
                    background: "#64FF99",
                    opacity: 0.2,
                    transform: "skewY(-7deg)",
                    zIndex: -1,
                  }}
                />
                <Link
                  to="https://bridge.gobbl.io/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box
                    onClick={handleClick}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src="/assets/nav_icons/bridge.png"
                      alt="FoodVerse Project"
                      className={classes.nav_icon}
                      width={32}
                      height={32}
                    />
                    <Typography
                      variant="inherit"
                      style={{
                        fontSize: md ? 9 : 12,
                        lineHeight: "90%",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      BRIDGE
                    </Typography>
                  </Box>
                </Link>
                <Link
                  to="https://explorer.gobbl.io/"
                  onClick={handleClick}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/assets/nav_icons/explorer.png"
                    alt="FoodVerse"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    EXPLORER
                  </Typography>
                </Link>

                <Link
                  to="https://faucet.gobbl.io/"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/assets/nav_icons/gobbl_coin.png"
                    alt="FoodVerse Project"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    FAUCET
                  </Typography>
                </Link>
                <Link
                  to="https://status.gobbl.io/"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/assets/nav_icons/status.png"
                    alt="FoodVerse"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    STATUS
                  </Typography>
                </Link>
                <Link
                  to="https://rpc.gobbl.io/"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/assets/nav_icons/rpc.png"
                    alt="FoodVerse"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    RPC
                  </Typography>
                </Link>
              </Box>

              <Box
                className={classes.nav_link}
                sx={{
                  minWidth: 75,
                  color:
                    playOpen || playPaths.includes(asPath) ? "#64FF99" : "#fff",
                  backgroundColor: "#000",
                }}
                onClick={() => {
                  setProjectOpen(false);
                  setPlayOpen(true);
                  setChainOpen(false);
                }}
              >
                <img
                  src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/play.png"
                  alt="FoodVerse Project"
                  className={classes.nav_icon}
                  width={50}
                  height={40}
                />
                <Typography
                  variant="body2"
                  color="inherit"
                  className={classes.nav_text}
                  style={{
                    marginTop: "-3px",
                  }}
                >
                  Play
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                position: "relative",
                minHeight: playOpen ? 225 : 0,
                maxHeight: playOpen ? 450 : 0,
                width: 75,
                transform: playOpen ? "translateY(-0px)" : "translateY(-420px)",
                transition: "all 0.3s ease",
                // zIndex: -1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                // justifyContent: "center",
                padding: playOpen ? "35px 0 20px" : 0,
                gap: "15px",
                background: "#000",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: "15px",
                  bottom: "15",
                  left: 0,
                  height: "90%",
                  width: "100%",
                  background: "#64FF99",
                  opacity: 0.2,
                  transform: "skewY(-7deg)",
                  zIndex: -2,
                }}
              />
              {/* <Link
                  to="/games"
                  onClick={handleClick}
                  style={{
                    width: "100%",
                    minHeight: 50,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/games.png"
                    alt="FoodVerse Project"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: asPath === "/games" ? "#64FF99" : "#fff",
                    }}
                  >
                    GAMES
                  </Typography>
                </Link> */}
              <Link
                to="/gobblup"
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/assets/nav_icons/gobbl_up.svg"
                  alt="FoodVerse"
                  width={50}
                  height={36}
                  style={{
                    minWidth: 50,
                  }}
                />
              </Link>
              <Link
                to="/foodfury"
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 1,
                }}
              >
                <img
                  src="/assets/nav_icons/foodfury.png"
                  alt="FoodVerse"
                  width={75}
                  height={45}
                  style={{
                    minWidth: 75,
                  }}
                />
              </Link>
              <Link
                to="/food5"
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 1,
                }}
              >
                <img
                  src="/assets/nav_icons/food5.png"
                  alt="FoodVerse"
                  width={60}
                  height={28}
                  style={{
                    minWidth: 60,
                  }}
                />
              </Link>
              <Box
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 1,
                  cursor: "not-allowed",
                }}
              >
                <img
                  src="/assets/nav_icons/foodverse.svg"
                  alt="FoodVerse"
                  width={50}
                  height={32}
                  style={{
                    minWidth: 50,
                  }}
                />
              </Box>

              {/* <Link
                  to="/how-to-play"
                  onClick={handleClick}
                  style={{
                    width: "100%",
                    minHeight: 55,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new_nav_icons/guide.png"
                    alt="FoodVerse Project"
                    className={classes.nav_icon}
                    width={32}
                    height={32}
                  />
                  <Typography
                    variant="inherit"
                    style={{
                      fontSize: md ? 9 : 12,
                      lineHeight: "90%",
                      fontWeight: 600,
                      color: asPath === "/how-to-play" ? "#64FF99" : "#fff",
                    }}
                  >
                    GUIDE
                  </Typography>
                </Link> */}
            </Box>
          </Box>
        </Drawer>
        {/* Mobile - dashboard menu */}
        <Drawer
          open={dashboardOpen}
          onClose={() => setDashboardOpen(false)}
          anchor="right"
        >
          <Box
            style={{
              width: "80vw",
              maxWidth: 300,
              height: "100vh",
              background: "#2A2A2A",
              boxShadow: "8px 0px 16px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
          >
            <img
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/new-icons/dashMenuCloseIcon.svg"
              alt="FoodVerse"
              width={20}
              height={18}
              style={{
                color: "#fff",
                position: "absolute",
                top: 20,
                right: 15,
                transform: "rotate(180deg)",
              }}
              onClick={() => {
                setDashboardOpen(false);
                setMarketOpen(false);
                setKitchenOpen(false);
                setGamesOpen(false);
                setProjectOpen(false);
                setChainOpen(false);
              }}
            />
            <Box
              style={{
                width: "100%",
                height: 250,
                background:
                  "linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), radial-gradient(50% 226.62% at 50% 50%, #C76DFF 0%, #979BFF 98.93%) ",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Typography
                mb={1}
                variant="inherit"
                style={{
                  fontWeight: 500,
                  fontSize: "18px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#000000",
                }}
              >
                {/* DASHBOARD */}
              </Typography>
              <Avatar
                alt={getUserDisplayName as string}
                src={
                  imageUrl
                    ? imageUrl
                    : "https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/images/user.png"
                }
                style={{
                  height: 110,
                  width: 110,
                  border: "4px solid #000",
                }}
              />
              <Typography
                variant="inherit"
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  textAlign: "center",
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {username}.gobbl
              </Typography>
              <Box
                mt={1}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Box
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "22px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#000000",
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/icons/chipsIcon.svg"
                    alt="FoodVerse Chips"
                    width={22}
                    height={22}
                    style={{
                      minHeight: 22,
                      aspectRatio: 1,
                    }}
                  />
                  {userGameData?.chips}
                </Box>
                <Box
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "22px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#000000",
                  }}
                >
                  <img
                    src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/assets/icons/munchIcon.svg"
                    alt="FoodVerse Munch"
                    width={22}
                    height={22}
                    style={{
                      minHeight: 22,
                    }}
                  />
                  {userGameData?.munches}
                </Box>
              </Box>
            </Box>

            <Box
              style={{
                width: "100%",
                height: "calc(100% - 250px)",
                overflow: "auto",
              }}
            >
              <DashboardMenuComponent
                text="DASHBOARD"
                active={
                  asPath === "/legacy" &&
                  selectedDashboardMenuItem === "DASHBOARD"
                }
                onClick={async () => {
                  push("/legacy").then(() =>
                    dispatch(setDashboardMenuItem("DASHBOARD"))
                  );
                  setDashboardOpen(false);
                }}
              >
                <Dashboard
                  style={{
                    color:
                      asPath === "/legacy" &&
                      selectedDashboardMenuItem === "DASHBOARD"
                        ? "#000"
                        : "#fff",
                    fontSize: 30,
                  }}
                />
              </DashboardMenuComponent>
              <DashboardMenuComponent
                text="ACTIVITY"
                active={
                  asPath === "/legacy" &&
                  selectedDashboardMenuItem === "ACTIVITY"
                }
                onClick={async () => {
                  push("/legacy").then(() => {
                    dispatch(setDashboardMenuItem("ACTIVITY"));
                    setDashboardOpen(false);
                  });
                }}
              >
                <svg
                  width="30"
                  height="26"
                  viewBox="0 0 30 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7507 25.75V21.5H0.833984V18.6667H10.7507C11.5298 18.6667 12.1971 18.9443 12.7524 19.4997C13.3077 20.055 13.5849 20.7218 13.584 21.5V25.75H10.7507ZM16.4173 25.75V21.5C16.4173 20.7208 16.695 20.0541 17.2503 19.4997C17.8057 18.9453 18.4724 18.6676 19.2507 18.6667H29.1673V21.5H19.2507V25.75H16.4173ZM6.50065 17.25C5.3201 17.25 4.31662 16.8368 3.49023 16.0104C2.66385 15.184 2.25065 14.1806 2.25065 13V7.33333H27.7507V13C27.7507 14.1806 27.3375 15.184 26.5111 16.0104C25.6847 16.8368 24.6812 17.25 23.5007 17.25H6.50065ZM2.25065 5.91667V3.08333H10.7507V1.66667C10.7507 1.26528 10.8867 0.929056 11.1587 0.658C11.4307 0.386945 11.7669 0.250944 12.1673 0.25H17.834C18.2354 0.25 18.5721 0.386 18.8441 0.658C19.1161 0.93 19.2516 1.26622 19.2507 1.66667V3.08333H27.7507V5.91667H2.25065Z"
                    fill={
                      asPath === "/legacy" &&
                      selectedDashboardMenuItem === "ACTIVITY"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </svg>
              </DashboardMenuComponent>
              <DashboardMenuComponent
                text="INGREDIENTS"
                active={
                  asPath === "/legacy" &&
                  selectedDashboardMenuItem === "INGREDIENTS"
                }
                onClick={async () => {
                  push("/legacy").then(() => {
                    dispatch(setDashboardMenuItem("INGREDIENTS"));
                    setDashboardOpen(false);
                  });
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 13.23V10.4C0 10.4 -3.05474e-07 10.4 0.0699997 10.32C0.125476 10.1949 0.216893 10.0891 0.332634 10.0161C0.448374 9.94313 0.583213 9.90619 0.720001 9.91H2.18C2.18 9.91 2.3 9.91001 2.3 9.85001C2.31183 9.61853 2.33855 9.38805 2.38 9.16C2.41576 8.94687 2.46587 8.73639 2.53 8.53001C2.62644 8.21336 2.75721 7.90821 2.92 7.62C3.01494 7.44931 3.12188 7.28557 3.24 7.13C3.441 6.8487 3.67614 6.59341 3.94 6.37C4.18715 6.16739 4.45148 5.98671 4.73 5.83C5.07297 5.63443 5.44397 5.49277 5.83 5.41L6.24 5.33C6.51314 5.31538 6.78686 5.31538 7.06 5.33C7.12 5.33 7.14 5.33 7.15 5.27C7.18461 5.11977 7.23143 4.97261 7.29 4.83C7.42589 4.48034 7.59676 4.14531 7.8 3.83C7.99378 3.52813 8.22569 3.25252 8.49 3.01C8.51041 2.98639 8.52164 2.95622 8.52164 2.925C8.52164 2.89379 8.51041 2.86362 8.49 2.84C8.41701 2.62441 8.38315 2.39751 8.39 2.17001C8.39 1.93001 8.39 1.7 8.39 1.47C8.39684 1.35714 8.42043 1.24592 8.46 1.14C8.5147 0.920385 8.61713 0.715527 8.76 0.540001C8.91299 0.364185 9.1001 0.221295 9.31 0.120003C9.4 0.120003 9.52 0.12 9.59 0H13.4C13.4 0 13.4 0 13.47 0C13.7099 0.0651232 13.9298 0.18883 14.11 0.360001C14.3478 0.588739 14.5086 0.885806 14.57 1.21001C14.5999 1.50926 14.5999 1.81075 14.57 2.11C14.5806 2.3813 14.5293 2.65145 14.42 2.9C14.3965 2.92995 14.3837 2.96693 14.3837 3.005C14.3837 3.04308 14.3965 3.08005 14.42 3.11C14.6736 3.37655 14.8951 3.6719 15.08 3.99001C15.2797 4.30895 15.4536 4.64335 15.6 4.99001C15.7274 5.27879 15.8344 5.57619 15.92 5.88C16.0053 6.20652 16.049 6.54252 16.05 6.88C16.05 7.43 16.05 7.98 16.05 8.54C16.0595 8.61637 16.0595 8.69363 16.05 8.77C16.05 8.86 16.05 8.95 16.14 8.98L16.29 9.05L17.07 9.5L17.52 9.77C17.6816 9.8829 17.8729 9.94552 18.07 9.95C18.4664 9.93001 18.8636 9.93001 19.26 9.95C19.3566 9.95569 19.4508 9.98287 19.5355 10.0296C19.6203 10.0763 19.6936 10.1414 19.75 10.22C19.81 10.29 19.82 10.39 19.9 10.43V13.26C19.8505 13.4043 19.7577 13.5298 19.6342 13.6193C19.5107 13.7088 19.3625 13.7579 19.21 13.76H18.59C18.42 13.76 18.4 13.76 18.42 13.93C18.4436 14.3177 18.3857 14.7061 18.25 15.07C18.12 15.49 17.97 15.9 17.83 16.31C17.69 16.72 17.51 17.31 17.34 17.8C17.17 18.29 17.05 18.69 16.89 19.13C16.8118 19.3761 16.6745 19.5993 16.49 19.78C16.43 19.84 16.34 19.78 16.3 19.9H3.64C3.38819 19.7078 3.19157 19.4525 3.07 19.16C2.97189 18.9288 2.88839 18.6917 2.82 18.45C2.61 17.88 2.43 17.3 2.24 16.73C2.05 16.16 1.84 15.54 1.65 14.94C1.55245 14.6504 1.5084 14.3454 1.52 14.04C1.52482 13.9834 1.52482 13.9266 1.52 13.87C1.52 13.79 1.52 13.76 1.42 13.76C1.19 13.76 0.969998 13.76 0.739998 13.76C0.541153 13.7598 0.350516 13.6807 0.209999 13.54C0.133439 13.4413 0.0632958 13.3377 0 13.23ZM11.54 1.48H10.14C10.07 1.48 10 1.48 10 1.59V2.10001C9.99863 2.11446 10.0001 2.12905 10.0044 2.14292C10.0087 2.15679 10.0157 2.16968 10.025 2.18083C10.0343 2.19199 10.0457 2.20119 10.0586 2.20792C10.0715 2.21464 10.0855 2.21875 10.1 2.22C10.2016 2.22726 10.3004 2.25596 10.39 2.30423C10.4797 2.35249 10.558 2.41922 10.62 2.5C10.71 2.62267 10.7649 2.76747 10.779 2.91893C10.7931 3.07039 10.7658 3.22284 10.7 3.36C10.6415 3.4675 10.5585 3.55973 10.4577 3.62922C10.357 3.69871 10.2413 3.74351 10.12 3.76C9.90002 3.80733 9.70058 3.92281 9.55 4.09C9.42695 4.21201 9.3164 4.34601 9.22 4.49001C8.99728 4.79524 8.82196 5.13238 8.7 5.49001C8.7 5.56001 8.7 5.6 8.76 5.62C8.92607 5.67576 9.08409 5.75309 9.23 5.85001C9.4709 5.98001 9.69576 6.13774 9.9 6.32C10.13 6.53 10.12 6.53 10.33 6.32C10.4601 6.17967 10.6319 6.08499 10.82 6.05C11.0126 6.01165 11.2126 6.04736 11.38 6.15L12.53 6.8L13.53 7.4L14.46 7.92001C14.55 7.98001 14.57 7.92001 14.57 7.85001C14.57 7.49001 14.57 7.14 14.57 6.79C14.5688 6.65189 14.552 6.51436 14.52 6.38C14.4623 6.11895 14.3785 5.86434 14.27 5.62C14.1266 5.2999 13.9629 4.98927 13.78 4.69C13.6639 4.49475 13.53 4.31063 13.38 4.14C13.2301 3.92854 13.0163 3.7708 12.77 3.69C12.6489 3.65916 12.5388 3.59504 12.4522 3.50492C12.3656 3.4148 12.306 3.30225 12.28 3.18C12.28 3.06 12.19 2.94 12.28 2.82C12.3245 2.70098 12.3815 2.58702 12.45 2.48C12.5078 2.3979 12.5822 2.32879 12.6683 2.27712C12.7544 2.22546 12.8503 2.19237 12.95 2.18C13.04 2.18 13.06 2.18001 13.06 2.06001C13.05 1.89683 13.05 1.73318 13.06 1.57C13.06 1.47 13.06 1.44 12.93 1.44L11.54 1.48ZM5.23 9.91H6.47C6.53 9.91 6.58 9.91 6.62 9.91C6.66 9.91 6.95 9.6 7.12 9.45C7.29 9.3 7.54 9.05001 7.75 8.85001C8.12 8.49001 8.52 8.15 8.89 7.77C8.89 7.71 8.96 7.67 8.89 7.61C8.71776 7.46611 8.52992 7.342 8.33 7.24001C8.14041 7.13854 7.93884 7.06127 7.73 7.01C7.51441 6.95222 7.29303 6.91868 7.07 6.91C6.86715 6.89008 6.66284 6.89008 6.46 6.91C6.19045 6.95482 5.92812 7.03553 5.68 7.15C5.44241 7.25188 5.22025 7.38653 5.02 7.55C4.63868 7.87511 4.34043 8.28649 4.15 8.75C4.0773 8.90636 4.02358 9.07087 3.99 9.24001C3.99 9.42001 3.93 9.6 3.89 9.77C3.85 9.94 3.89 9.92001 3.99 9.92001L5.23 9.91ZM12.34 15.3V16.91C12.3474 17.0593 12.4077 17.2011 12.51 17.31C12.5798 17.3961 12.6684 17.4652 12.7688 17.5119C12.8693 17.5587 12.9792 17.582 13.09 17.58C13.2824 17.5682 13.4638 17.4864 13.6001 17.3501C13.7364 17.2138 13.8182 17.0324 13.83 16.84V14.09C13.8602 13.9079 13.8602 13.7221 13.83 13.54C13.787 13.4097 13.7113 13.2926 13.61 13.2C13.432 13.0592 13.2055 12.9945 12.98 13.02C12.8221 13.0612 12.6804 13.1491 12.5733 13.2722C12.4663 13.3954 12.3989 13.5479 12.38 13.71L12.34 15.3ZM7.66 15.3V13.8C7.66516 13.6547 7.63423 13.5104 7.57 13.38C7.50857 13.256 7.41271 13.1523 7.29388 13.0814C7.17506 13.0104 7.03831 12.9752 6.9 12.98C6.7028 12.9903 6.51706 13.0759 6.3812 13.2192C6.24534 13.3625 6.16973 13.5525 6.17 13.75C6.17 14.75 6.17 15.75 6.17 16.75C6.15059 16.8625 6.15059 16.9775 6.17 17.09C6.22148 17.2281 6.31057 17.3491 6.42721 17.4392C6.54384 17.5293 6.68337 17.585 6.83 17.6C6.97716 17.6003 7.12188 17.5624 7.25 17.49C7.35414 17.4395 7.44261 17.3616 7.506 17.2648C7.5694 17.1679 7.60534 17.0557 7.61 16.94C7.67 16.38 7.66 15.8 7.66 15.3ZM9.26 15.3V16.87C9.25341 16.9912 9.27845 17.1121 9.33269 17.2207C9.38692 17.3293 9.46847 17.422 9.56934 17.4896C9.6702 17.5572 9.78691 17.5973 9.908 17.6062C10.0291 17.615 10.1504 17.5922 10.26 17.54C10.3918 17.4845 10.5065 17.3952 10.5926 17.281C10.6786 17.1669 10.733 17.0319 10.75 16.89C10.75 15.84 10.75 14.78 10.75 13.73C10.7597 13.6838 10.7597 13.6362 10.75 13.59C10.7047 13.4054 10.5901 13.2454 10.43 13.143C10.2699 13.0406 10.0766 13.0037 9.89 13.04C9.7239 13.0681 9.57289 13.1535 9.46326 13.2814C9.35364 13.4093 9.29233 13.5716 9.29 13.74L9.26 15.3ZM14.68 9.9C14.6156 9.85636 14.5488 9.81631 14.48 9.78001L14.07 9.55L13.58 9.27C13.36 9.13 13.12 9.03 12.9 8.89C12.68 8.75 12.24 8.52 11.9 8.32L11.14 7.89C11.08 7.89 11.05 7.89 11.01 7.89C10.97 7.89 10.69 8.20001 10.51 8.35001C10.33 8.50001 9.98 8.88 9.7 9.12C9.42 9.36 9.24 9.59 8.99 9.79C8.99 9.79 8.91 9.79 8.93 9.88C8.95 9.97 9 9.88 9.04 9.88H14.54C14.54 9.88 14.63 9.93 14.68 9.89V9.9Z"
                    fill={
                      asPath === "/legacy" &&
                      selectedDashboardMenuItem === "INGREDIENTS"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </svg>
              </DashboardMenuComponent>
              <DashboardMenuComponent
                text="DISHES"
                active={
                  asPath === "/legacy" && selectedDashboardMenuItem === "DISHES"
                }
                onClick={async () => {
                  push("/legacy").then(() => {
                    dispatch(setDashboardMenuItem("DISHES"));
                    setDashboardOpen(false);
                  });
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 34 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.3 19.25C32.3 11.1562 26.3381 4.47825 18.7 3.60325V0H15.3V3.60325C7.6619 4.47825 1.7 11.1562 1.7 19.25V22.75H32.3V19.25ZM0 24.5H34V28H0V24.5Z"
                    fill={
                      asPath === "/legacy" &&
                      selectedDashboardMenuItem === "DISHES"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </svg>
              </DashboardMenuComponent>
              <DashboardMenuComponent
                text="REWARDS"
                active={
                  asPath === "/legacy" &&
                  selectedDashboardMenuItem === "REWARDS"
                }
                onClick={async () => {
                  push("/legacy").then(() => {
                    dispatch(setDashboardMenuItem("REWARDS"));
                    setDashboardOpen(false);
                  });
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1972_1209)">
                    <path
                      d="M23.5066 24.5538H30.9299C30.3066 16.3277 26.7649 11.2183 22.2222 8.19604L24.2905 3.6816C24.353 3.53835 24.379 3.38182 24.3662 3.22605C24.3533 3.07028 24.302 2.92014 24.2168 2.78909C24.1316 2.65804 24.0152 2.55018 23.8781 2.47518C23.741 2.40018 23.5874 2.36039 23.4311 2.35938H10.4827C10.3264 2.36039 10.1728 2.40018 10.0357 2.47518C9.89857 2.55018 9.78219 2.65804 9.69701 2.78909C9.61183 2.92014 9.5605 3.07028 9.54763 3.22605C9.53477 3.38182 9.56076 3.53835 9.62328 3.6816L10.7566 6.13715H20.3144L19.4644 8.02604H17.7172C18.2508 9.46089 18.643 10.9444 18.8883 12.4555C19.0472 13.3928 19.1481 14.3391 19.1905 15.2888L17.6983 16.3372C17.7023 15.1155 17.6012 13.8959 17.3961 12.6916C17.1351 11.0889 16.6849 9.52272 16.0549 8.02604H15.1105C14.2389 9.12732 13.4557 10.2958 12.7683 11.5205C12.214 12.571 11.7435 13.6637 11.3611 14.7883L10.0672 13.9288C10.4449 12.8419 10.9091 11.787 11.4555 10.7744C12.0076 9.82477 12.613 8.90719 13.2688 8.02604H11.6161L11.6916 8.1866C6.68606 11.5205 2.87995 17.376 2.87995 27.151C2.86719 27.3565 2.89527 27.5625 2.96257 27.7571C3.02986 27.9516 3.13505 28.1309 3.27204 28.2846C3.40903 28.4383 3.57512 28.5633 3.76071 28.6524C3.94629 28.7415 4.1477 28.793 4.35328 28.8038H11.9088C11.5844 28.4662 11.3604 28.0448 11.2619 27.5871C11.1634 27.1293 11.1944 26.6531 11.3512 26.2119C11.5081 25.7707 11.7847 25.3819 12.1501 25.0891C12.5155 24.7962 12.9552 24.6109 13.42 24.5538C13.1938 24.1702 13.0732 23.7336 13.0705 23.2883C13.0705 22.612 13.3392 21.9634 13.8174 21.4851C14.2956 21.0069 14.9442 20.7383 15.6205 20.7383H21.2872C21.9635 20.7383 22.6121 21.0069 23.0903 21.4851C23.5685 21.9634 23.8372 22.612 23.8372 23.2883C23.842 23.7321 23.7279 24.1691 23.5066 24.5538Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                    <path
                      d="M20.3993 26.9171C20.3993 26.6666 20.2998 26.4264 20.1227 26.2493C19.9456 26.0722 19.7053 25.9727 19.4549 25.9727H13.7882C13.5377 25.9727 13.2975 26.0722 13.1204 26.2493C12.9433 26.4264 12.8438 26.6666 12.8438 26.9171C12.8438 27.1676 12.9433 27.4078 13.1204 27.5849C13.2975 27.762 13.5377 27.8615 13.7882 27.8615H19.4549C19.7053 27.8615 19.9456 27.762 20.1227 27.5849C20.2998 27.4078 20.3993 27.1676 20.3993 26.9171Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                    <path
                      d="M21.2869 22.1953H15.6202C15.3697 22.1953 15.1295 22.2948 14.9524 22.4719C14.7753 22.6491 14.6758 22.8893 14.6758 23.1398C14.6758 23.3902 14.7753 23.6305 14.9524 23.8076C15.1295 23.9847 15.3697 24.0842 15.6202 24.0842H21.2869C21.5374 24.0842 21.7776 23.9847 21.9547 23.8076C22.1318 23.6305 22.2313 23.3902 22.2313 23.1398C22.2313 22.8893 22.1318 22.6491 21.9547 22.4719C21.7776 22.2948 21.5374 22.1953 21.2869 22.1953Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                    <path
                      d="M20.7771 29.75H15.1105C14.86 29.75 14.6198 29.8495 14.4426 30.0266C14.2655 30.2037 14.166 30.444 14.166 30.6944C14.166 30.9449 14.2655 31.1852 14.4426 31.3623C14.6198 31.5394 14.86 31.6389 15.1105 31.6389H20.7771C21.0276 31.6389 21.2678 31.5394 21.445 31.3623C21.6221 31.1852 21.7216 30.9449 21.7216 30.6944C21.7216 30.444 21.6221 30.2037 21.445 30.0266C21.2678 29.8495 21.0276 29.75 20.7771 29.75Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                    <path
                      d="M30.8837 29.75H24.2726C24.0221 29.75 23.7819 29.8495 23.6047 30.0266C23.4276 30.2037 23.3281 30.444 23.3281 30.6944C23.3281 30.9449 23.4276 31.1852 23.6047 31.3623C23.7819 31.5394 24.0221 31.6389 24.2726 31.6389H30.8837C31.1342 31.6389 31.3744 31.5394 31.5515 31.3623C31.7286 31.1852 31.8281 30.9449 31.8281 30.6944C31.8281 30.444 31.7286 30.2037 31.5515 30.0266C31.3744 29.8495 31.1342 29.75 30.8837 29.75Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                    <path
                      d="M31.827 25.9727H25.2159C24.9654 25.9727 24.7252 26.0722 24.5481 26.2493C24.371 26.4264 24.2715 26.6666 24.2715 26.9171C24.2715 27.1676 24.371 27.4078 24.5481 27.5849C24.7252 27.762 24.9654 27.8615 25.2159 27.8615H31.827C32.0775 27.8615 32.3177 27.762 32.4949 27.5849C32.672 27.4078 32.7715 27.1676 32.7715 26.9171C32.7715 26.6666 32.672 26.4264 32.4949 26.2493C32.3177 26.0722 32.0775 25.9727 31.827 25.9727Z"
                      fill={
                        asPath === "/legacy" &&
                        selectedDashboardMenuItem === "REWARDS"
                          ? "#000"
                          : "#fff"
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1972_1209">
                      <rect
                        width="34"
                        height="34"
                        fill={
                          asPath === "/legacy" &&
                          selectedDashboardMenuItem === "REWARDS"
                            ? "#000"
                            : "#fff"
                        }
                      />
                    </clipPath>
                  </defs>
                </svg>
              </DashboardMenuComponent>
              <DashboardMenuComponent
                text="TRADE HISTORY"
                active={
                  asPath === "/legacy" &&
                  selectedDashboardMenuItem === "TRADE HISTORY"
                }
                onClick={async () => {
                  push("/legacy").then(() =>
                    dispatch(setDashboardMenuItem("TRADE HISTORY"))
                  );
                  setDashboardOpen(false);
                }}
              >
                <svg
                  width="30"
                  height="25"
                  viewBox="0 0 30 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4173 0.25H22.084V3.08333H16.4173V0.25ZM2.25065 7.33333H7.91732V10.1667H2.25065V7.33333ZM2.25065 18.6667H7.91732V21.5H2.25065V18.6667ZM0.833984 13H6.48648V15.8333H0.833984V13ZM28.7522 5.50158L26.7491 3.49842L24.3308 5.91667C22.7981 4.99039 21.0415 4.50053 19.2507 4.5C13.7837 4.5 9.33398 8.94975 9.33398 14.4167C9.33398 19.8836 13.7837 24.3333 19.2507 24.3333C24.7176 24.3333 29.1673 19.8836 29.1673 14.4167C29.1659 11.9319 28.2275 9.5391 26.5394 7.71583L28.7522 5.50158ZM20.6673 15.8333H17.834V8.6905H20.6673V15.8333Z"
                    fill={
                      asPath === "/legacy" &&
                      selectedDashboardMenuItem === "TRADE HISTORY"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </svg>
              </DashboardMenuComponent>
              <Box
                style={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                  padding: "0 10%",
                  marginTop: "auto",
                  position: "absolute",
                  bottom: 0,
                }}
                onClick={logoutUser}
              >
                <Typography
                  variant="inherit"
                  style={{
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#FFFFFF",
                    textDecoration: "underline",
                  }}
                >
                  LOGOUT
                </Typography>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 9.5H7.5M15 12.5L18 9.5L15 6.5M10 4.5V3.5C10 2.96957 9.78929 2.46086 9.41421 2.08579C9.03914 1.71071 8.53043 1.5 8 1.5H3C2.46957 1.5 1.96086 1.71071 1.58579 2.08579C1.21071 2.46086 1 2.96957 1 3.5V15.5C1 16.0304 1.21071 16.5391 1.58579 16.9142C1.96086 17.2893 2.46957 17.5 3 17.5H8C8.53043 17.5 9.03914 17.2893 9.41421 16.9142C9.78929 16.5391 10 16.0304 10 15.5V14.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
