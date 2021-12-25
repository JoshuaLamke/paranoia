import React, { useEffect } from 'react';
import '../../styles/waiting-room.css';
import Icon from '../../assets/Icon.png';
import { useNavigate } from 'react-router';

interface Props {

}

const WaitingRoom: React.FC<Props> = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("create-code") === null || localStorage.getItem("create-name") === null) {
            alert("Could not find code!");
            navigate("/");
        } 
    }, [navigate])

    const code: string = localStorage.getItem("create-code")!;
    const name: string = localStorage.getItem("create-name")!;

    return (
        <div 
            id="waiting-room-container" 
            className="container-fluid d-flex flex-column align-items-center"
        >
            <div 
                className="d-flex flex-column align-items-center"
            >
                <img 
                    src={Icon} 
                    alt="paranoia-icon" 
                    width={"150px"} 
                    height={"auto"}
                />
                <h1 className="header-text primary-text">Waiting Room</h1>
                <div className="d-flex flex-wrap text-center justify-content-center align-items-center">
                    <h1 className="secondary-text me-2">People In Room:</h1>
                    <h1 className="secondary-text">{name}</h1>
                </div>
            </div>
            <div
                className="d-flex flex-column align-items-center flex-one justify-content-center mb-5"
            >
                <h1 className="primary-text">Room Code</h1>
                <p className="code-text primary-text">{code}</p>
            </div>
        </div>
    )
}

export default WaitingRoom;