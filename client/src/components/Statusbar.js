import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <Box id="playlister-statusbar">
            <Typography variant="h4">{text}</Typography>
        </Box>
    );
}

export default Statusbar;