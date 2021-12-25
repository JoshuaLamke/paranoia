import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './modules/Home/Home';
import WaitingRoom from './modules/WaitingRoom/WaitingRoom';

const routes: React.FC<{}> = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/waiting-room" element={<WaitingRoom />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default routes;