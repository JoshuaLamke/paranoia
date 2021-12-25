import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/Icon.png';
import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import '../../styles/home.css';
import { createRoom } from "./homeRequests";

interface Props {

}

const Home: React.FC<Props> = () => {

    const [createModalShow, setCreateModalShow] = useState<boolean>(false);
    const [joinModalShow, setJoinModalShow] = useState<boolean>(false);
    const [createName, setCreateName] = useState<string>("");
    const [joinName, setJoinName] = useState<string>("");
    const [createErrorText, setCreateErrorText] = useState<string>("");
    const [joinErrorText, setJoinErrorText] = useState<string>("");
    const navigate = useNavigate();


    const handleCreate: () => void = async () => {
        if(createName.trim().length > 20) {
            setCreateErrorText("Must be less than 20 characters");
        } else if(createName.trim().length < 2) {
            setCreateErrorText("Must be greater than 2 characters");
        } else if (!createName.match(/^[a-zA-Z0-9]+$/)) {
            setCreateErrorText("Only letters and numbers allowed");
        } else {
            setCreateErrorText("");
            // Make the fetch call to create room before routing to waiting page
            // For now just close modal
            const { code } = await createRoom(createName);
            if(code === 'error') {
                alert("Something went wrong when creating a room");
                setCreateModalShow(false);
            } else {
                localStorage.setItem("create-name", createName);
                localStorage.setItem("create-code", code);
                setCreateModalShow(false);
                navigate("/waiting-room");
            }
        }
    }

    const handleJoin: () => void = async () => {
        if(joinName.trim().length > 20) {
            setJoinErrorText("Must be less than 20 characters");
        } else if(joinName.trim().length < 2) {
            setJoinErrorText("Must be greater than 2 characters");
        } else if (!joinName.match(/^[a-zA-Z0-9]+$/)) {
            setJoinErrorText("Only letters and numbers allowed");
        } else {
            setJoinErrorText("");
            // Make the fetch call to join room before routing to waiting page
            // For now just close modal
            setJoinModalShow(false);
        }
    }

    return (
        <div id="home-container" className="d-flex flex-column">
            <header className="container-fluid d-flex flex-column align-items-center">
                <img 
                    src={Icon} 
                    alt="paranoia-icon" 
                    width={"150px"} 
                    height={"auto"}
                />
                <h1 className="header-text primary-text">
                    Paranoia
                </h1>
            </header>
            <div 
                id="home-buttons-container" 
                className="container-fluid d-flex flex-column align-items-center justify-content-center"
            >
                <Button 
                    variant="contained" 
                    className="room-button"
                    onClick={() => setCreateModalShow(true)}
                >
                    Create Room
                </Button>
                <Button 
                    variant="contained" 
                    className="room-button"
                    onClick={() => setJoinModalShow(true)}
                >
                    Join Room
                </Button>
            </div>
            {/*Modal for creating a room*/}
            <Modal
                show={createModalShow} 
                onHide={() => setCreateModalShow(false)}
                centered 
            >
                <Modal.Header 
                    className="modal-header"
                    closeButton
                >
                    <Modal.Title className="modal-title">
                        Create A New Room
                    </Modal.Title>
                </Modal.Header>
            
                <Modal.Body 
                    className="d-flex flex-column align-items-center modal-body"
                >
                    <h3 className="primary-text">
                        Enter your name
                    </h3>
                    <input 
                        type="text" 
                        className="modal-input" 
                        value={createName} 
                        onChange={(e) => setCreateName(e.target.value.toUpperCase())}
                    />
                    <h6 className="text-warning">
                        {createErrorText}
                    </h6>
                    <Button
                        variant="contained"
                        className="room-button"
                        onClick={() => handleCreate()}
                    >
                        Create
                    </Button>
                </Modal.Body>
            </Modal>
            {/*Modal for joining a room*/}
            <Modal
                show={joinModalShow} 
                onHide={() => setJoinModalShow(false)}
                centered 
            >
                <Modal.Header 
                    className="modal-header"
                    closeButton
                >
                    <Modal.Title className="modal-title">
                        Join A Room
                    </Modal.Title>
                </Modal.Header>
            
                <Modal.Body 
                    className="d-flex flex-column align-items-center modal-body"
                >
                    <h3 className="primary-text">
                        Enter your name
                    </h3>
                    <input 
                        type="text" 
                        className="modal-input" 
                        value={joinName} 
                        onChange={(e) => setJoinName(e.target.value.toUpperCase())}
                    />
                    <h6 className="text-warning">
                        {joinErrorText}
                    </h6>
                    <Button
                        variant="contained"
                        className="room-button"
                        onClick={() => handleJoin()}
                    >
                        Join
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home;