import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import NavigationBar from "./NavigationBar";
import AppBanner from './AppBanner'
import AppFooter from './AppFooter'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import YouTube from "react-youtube";

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PreviousIcon from '@mui/icons-material/FastRewind';
import NextIcon from '@mui/icons-material/FastForward';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from "@mui/material";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [value, setValue] = useState(0);
    const [songIndex, setSongIndex] = useState(0);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function resetSongIndex() {
        setSongIndex(0);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper', borderRadius: '20px'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        songIndex={songIndex}
                        resetSongIndex={resetSongIndex}
                    />
                ))
            }
            </List>;
    }

    let isListModalOpen = store.isDeleteListModalOpen();
    let editStatus = false;
    if (store.listNameActive) { editStatus = true; }
  
    let addListClass = 'playlister-button';
    if (isListModalOpen || editStatus)
        addListClass += "-disabled";

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const opts = {
        height: "300px",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    let song_id = "";
    let songIds = [];
    let player;

    if (store.currentList) {
        let songs = store.currentList.songs;
        for (let song of songs)
            songIds.push(song.youTubeId);
        song_id = songIds[songIndex];
    }

    function loadAndPlayCurrentSong(player) {
        let song = songIds[songIndex];
        player.loadVideoById(song);
        player.playVideo();
    }

    function onPlayerReady(event) {
        player = event.target;
        loadAndPlayCurrentSong(player);
    }

    function incSong() {
        let index = (songIndex + 1) % songIds.length;
        setSongIndex(index);
    }

    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        }
    }

    function handlePlay() {
        player.playVideo();
    }

    function handlePause() {
        player.pauseVideo();
    }

    function handleNext() {
        incSong();
        song_id = songIds[songIndex];
        player.playVideo();
    }

    function handlePrevious() {
        let index = (songIndex - 1) % songIds.length;
        if (index < 0) index = 0;
        setSongIndex(index);
        song_id = songIds[songIndex];
        player.playVideo();
    }

    return (
        <React.Fragment>
            <AppBanner />
            <NavigationBar />
            <div id='container'>
                <div id='container-left-side'>
                    {listCard}
                    <MUIDeleteModal />
                </div>

                <div id='container-right-side'>
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                        <div style={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                sx={{height: "50px"}}
                            >
                                <Tab label='Player' {...a11yProps(0)} sx={{background:"grey", borderRadius:"10px"}}/>
                                <Tab label='Comments' {...a11yProps(1)} sx={{background:"grey", borderRadius:"10px"}}/>
                            </Tabs>
                        </div>
                        <TabPanel value={value} index={0}>
                            <YouTube videoId={song_id} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange}/>
                            <div>Playlist: {store.currentList ? store.currentList.name : ""} </div>
                            <div>song #: {(store.currentList && store.currentList.songs.length > 0) ? (songIndex+1) : ""}</div>
                            <div>title: {(store.currentList && store.currentList.songs.length > 0) ? store.currentList.songs[songIndex].title : ""} </div>
                            <div>artist: {(store.currentList && store.currentList.songs.length > 0) ? store.currentList.songs[songIndex].artist : ""}</div>
                            <div id="player-controller">
                                <IconButton size="large" onClick={handlePrevious}>
                                    <PreviousIcon />
                                </IconButton>
                                <IconButton onClick={handlePause}>
                                    <StopIcon />
                                </IconButton>
                                <IconButton onClick={handlePlay}>
                                    <PlayIcon />
                                </IconButton>
                                <IconButton onClick={handleNext}>
                                    <NextIcon />
                                </IconButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Comments
                        </TabPanel>
                    </div>
                </div>
            </div>
            <AppFooter />
        </React.Fragment>
    );
};

export default HomeScreen;