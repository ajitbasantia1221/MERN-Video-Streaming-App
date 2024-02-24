import React from 'react'
import styled from 'styled-components';
import PlayTube from '../images/logo1.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
    flex:1;   // 1 tab
    background-color: ${({ theme }) => theme.bgLighter};  //menu left side bg color to black;
    height: 100vh;  //full screen;
    font-size: 12px;
    color: ${({ theme }) => theme.text}; //text color of menu; theme.text select themes based on light or dark mode as a text
    position: sticky; //top most left or right position
    top:0; //top left side from menu
`;
const Item = styled.div`
    display:flex;
    align-items: center;
    gap: 18px;
    font-weight: bold;
    cursor: pointer;
    padding: 7.5px 0px;  //padding between all the items of Menu
    &:hover {
    background-color: ${({ theme }) => theme.soft};  //hover effect on items
  }
`;

const Wrapper = styled.div`
    padding: 18px 26px;
`;
const Hr = styled.hr`  //Horizontal row between two items when the item is been clicked. [Sub, His, Liv]
  margin: 15px 0px;   //{TopBottom LeftRight}
  border: 0.5px solid ${({ theme }) => theme.soft}; //HR also changes with theme
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Logo = styled.div`
    display :flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;  
`;

const Menu = ({ darkMode, setDarkMode }) => {  //theme as a Prop we are using
    return (
        <Container>
            <Wrapper>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Logo>
                    <Img src={PlayTube} />
                    PlayTube
                </Logo>
                </Link>
                <Item>
                    <HomeIcon />
                    Home
                </Item>
                <Link to="trends" style={{ textDecoration: "none", color:"inherit"}}>
                <Item>
                    <ExploreOutlinedIcon />
                    Explore
                </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none" ,color:"inherit"}}>
                <Item>
                    <SubscriptionsOutlinedIcon />
                    Subscriptions
                </Item>
                </Link>
                <Hr />
                <Item>
                    <VideoLibraryOutlinedIcon />
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button>
                            <AccountCircleOutlinedIcon />
                            SIGN IN
                        </Button>
                    </Link>
                </Login>
                <Hr />
                <Title>BEST OF PLAYTUBE</Title>
                <Item>
                    <LibraryMusicOutlinedIcon />
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlinedIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon />
                    Gaming
                </Item>
                <Item>
                    <MovieOutlinedIcon />
                    Movies
                </Item>
                <Item>
                    <ArticleOutlinedIcon />
                    News
                </Item>
                <Item>
                    <LiveTvOutlinedIcon />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <FlagOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>  
                    <SettingsBrightnessOutlinedIcon />
                    {darkMode ? "Light" : "Dark"} Mode 
                </Item>
            </Wrapper>
        </Container>
    );
};

export default Menu;


//SetDarkMode on click will take the opposite that is light mode line no. 165