import React from "react";
import { Link } from "react-router-dom";
import pixelBubble from "../../assets/images/pixel-speech-bubble.png";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./GameCard.scss";
import GameCardDetails from "./GameCardDetails/GameCardDetails";

function GameCard(game: any) {
    function completedCheck() {
        return (game.props.hoursPlayed === game.props.hoursToFinish || game.props.completed);
    }

    return (
        <div className={`game-card ${completedCheck() || game.props.nowPlaying ? '' : 'ongoing'}`}>
            <section className="section_8bit">
                <div className="wrapper">
                    {completedCheck() ?
                        <img src={pixelBubble} alt="" className="pixel-image-100percent"/> : null
                    }
                    <div className="game-card_img">
                        <img
                            src={game.props.coverUrl}
                            className="img"
                            alt=""
                        />
                    </div>
                    <div className="details">
                        <ProgressBar props={game.props}/>
                        <GameCardDetails props={game.props}/>
                    </div>
                    <Link to={{
                        pathname: `/edit/${game.props._id}`,
                    }}>
                        <div className="edit">
                            <span>&gt;</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default GameCard;
