import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import DoubleDownArrowIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import DoubleUpArrowIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import WorkspaceScreen from "./WorkspaceScreen";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair, selected, resetSongIndex } = props;
    const [text, setText] = useState(idNamePair.name);
    const [isOpen, setIsOpen] = useState(false);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleOpen() {
        store.setCurrentList(idNamePair._id);
        setIsOpen(true);
    }
    function handleUnopen() {
        setIsOpen(true);
        store.closeCurrentList();
        resetSongIndex();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    let cardElement;
    if (!store.currentList)
    cardElement = (
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            // style={{
            //     marginTop: "5px",
            //     display: "flex",
            //     width: "100%",
            //     border: "3px solid lightBlue",
            //     borderRadius: "20px",
            //     backgroundColor: "lightyellow",
            // }}
            onDoubleClick={handleToggleEdit}
        >
            <div id='unexpand-box1'>
                <div id='list-card-title'>{idNamePair.name}</div>
                <div style={{ marginLeft: "10px" }}>By: </div>
                <div style={{ marginLeft: "10px", marginBottom: "7px" }}>
                    Published:
                </div>
            </div>
            <div id='unexpand-box2'>
                <div style={{ marginLeft: "10px" }}>
                    <IconButton>
                        <ThumbUpIcon />
                    </IconButton>
                    0
                    <IconButton>
                        <ThumbDownIcon />
                    </IconButton>
                    0
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: "20px",
                        bottom: "1px",
                    }}
                >
                    <IconButton
                        onClick={
                            handleOpen
                        }
                    >
                        <DoubleDownArrowIcon fontSize='large' />
                    </IconButton>
                </div>
            </div>
        </div>
    );
    else if (store.currentList._id === idNamePair._id) {
        cardElement = (
            <div
                id={idNamePair._id}
                key={idNamePair._id}
                style={{
                    marginTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid lightBlue",
                    borderRadius: "20px",
                    backgroundColor: "lightyellow",
                }}
                onDoubleClick={handleToggleEdit}
            >
                <div id='expand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px" }}>By: </div>
                </div>

                <div id='expand-box2'>
                    {/* {console.log(store.currentList)} */}
                    <WorkspaceScreen />
                </div>

                <div id='expand-box3' style={{ position: "relative" }}>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <button style={{ marginLeft: "20px" }} onClick={handleUndo}>Undo</button>
                        <button style={{ marginLeft: "5%" }} onClick={handleRedo}>Redo</button>
                        <button style={{ marginLeft: "5%" }}>Publish</button>
                        <button
                            style={{ marginLeft: "5%" }}
                            onClick={(event) => handleDeleteList(event, idNamePair._id)}
                        >
                            Delete
                        </button>
                        <button style={{ marginLeft: "5%" }}>Duplicate</button>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton onClick={handleUnopen}>
                            <DoubleUpArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    } else {
        cardElement = (
            <div
                id={idNamePair._id}
                key={idNamePair._id}
                style={{
                    marginTop: "5px",
                    display: "flex",
                    width: "100%",
                    border: "3px solid lightBlue",
                    borderRadius: "20px",
                    backgroundColor: "lightyellow",
                }}
                onDoubleClick={handleToggleEdit}
            >
                <div id='unexpand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px" }}>By: </div>
                    <div style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        Published:
                    </div>
                </div>
                <div id='unexpand-box2'>
                    <div style={{ marginLeft: "10px" }}>
                        <IconButton>
                            <ThumbUpIcon />
                        </IconButton>
                        0
                        <IconButton>
                            <ThumbDownIcon />
                        </IconButton>
                        0
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton
                            onClick={
                                // handleLoadList(event, idNamePair._id);
                                handleOpen
                            }
                        >
                            <DoubleDownArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }

    // let cardElement =
    //     <ListItem
    //         id={idNamePair._id}
    //         key={idNamePair._id}
    //         sx={{ marginTop: '15px', display: 'flex', p: 1 }}
    //         style={{ width: '100%', fontSize: '48pt' }}
    //         button
    //         onClick={(event) => {
    //             handleLoadList(event, idNamePair._id)
    //         }}
    //     >
    //         <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
    //         <Box sx={{ p: 1 }}>
    //             <IconButton onClick={handleToggleEdit} aria-label='edit'>
    //                 <EditIcon style={{fontSize:'48pt'}} />
    //             </IconButton>
    //         </Box>
    //         <Box sx={{ p: 1 }}>
    //             <IconButton onClick={(event) => {
    //                     handleDeleteList(event, idNamePair._id)
    //                 }} aria-label='delete'>
    //                 <DeleteIcon style={{fontSize:'48pt'}} />
    //             </IconButton>
    //         </Box>
    //     </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;