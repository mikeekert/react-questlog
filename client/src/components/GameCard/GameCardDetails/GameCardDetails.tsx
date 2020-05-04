import React from "react";
import "./GameCardDetails.scss";

function GameCardDetails(gameProp: any) {
    return (
        <div className="game-card-details">
            {gameProp.props.nowPlaying ? <span className="gameDesc">NOW PLAYING!</span> : null}
            <span className="gameDesc title">TITLE: {gameProp.props.name}</span>
            <span className="gameDesc">RELEASE DATE: {gameProp.props.releaseDate}</span>
            <span className="gameDesc">PLATFORM: {gameProp.props.platform}</span>
            <span className="gameDesc">HOURS PLAYED: {gameProp.props.hoursPlayed}</span>
            <span className="gameDesc">HOURS TO COMPLETE: {gameProp.props.hoursToFinish}</span>
        </div>
    );
}

export default GameCardDetails;
