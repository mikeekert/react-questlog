import React from "react";
import "./ProgressBar.scss";

function ProgressBar(game: any) {
    function calcProgress() {
        if (!game.props.hoursToFinish) {
            return 0;
        } else if (game.props.completed) {
            return 100;
        }
        const progressPercent = ((game.props.hoursPlayed / game.props.hoursToFinish) * 100);
        return progressPercent > 0 ? Math.round(progressPercent) : 0;
    }

    return (
        <div className="progress-outline">
            <span>{calcProgress()}% Complete</span>
            <div className="progress-bar" style={{
                width: calcProgress() + '%',
                borderRadius: calcProgress() === 100 ? '4px' : '',
                boxShadow: calcProgress() === 100 ? 'none' : ''
            }}/>
        </div>
    );
}

export default ProgressBar;
