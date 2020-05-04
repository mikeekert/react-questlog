import { Fade, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { take } from 'rxjs/operators';
import { GameDtoModel } from '../../models/gameDto.model';
import { addGameForUser } from '../../services/games.service';
import { getHltbByName } from '../../services/igdb.service';
import { clearGames } from '../../store/actions/games.actions';
import { fetchUserGamesFromApi } from '../../store/actions/user.actions';
import { IAppState } from '../../store/reducers/root.reducer';
import "./AddGameResults.scss";

function AddGameResults(props: any) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [hltb, setHltb] = useState(0)
    const [platform, setPlatform] = useState(props?.platforms?.[0].name);
    const [hoursPlayed, setHoursPlayed] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [nowPlaying, setNowPlaying] = useState(false);

    const userData = useSelector((state: IAppState) => {
        return state.userReducer.user;
    });

    const handleOpen = () => {
        getHltbByName(props.name).pipe(take(1)).subscribe((res: any) => {
            setHltb(res.gameplayMain | 0)
            setOpen(true);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    function submitGame() {
        let game: GameDtoModel = {
            _id: props._id,
            name: props.name,
            hoursPlayed: hoursPlayed,
            hoursToFinish: hltb,
            platform: platform,
            completed: completed,
            nowPlaying: nowPlaying,
            uid: userData.sub,
            coverUrl: props.cover.url,
            releaseDate: props.releaseDateFormatted
        };
        addGameForUser(game).pipe(take(1)).subscribe(() => {
            dispatch(clearGames())
            dispatch(fetchUserGamesFromApi(userData.sub))
            handleClose();
            history.push('/')
        })
    }

    return <div className="AddGameResults">
        <section className="section_8bit">
            <div className="wrapper wrapMenu">
                <div className="card-details" onClick={handleOpen}>
                    <div>
                        <span>
                            Title: {props.name} ({props.releaseDateFormatted})
                        </span>
                    </div>
                    <div>
                        {props.platforms?.map((platform: any, index: number) => {
                            return <span key={index}>{platform.abbreviation} </span>;
                        })}
                    </div>
                </div>
                <div
                    className="card-image"
                    style={{backgroundImage: `url(${props.primaryImage})`}}
                />
            </div>
        </section>
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            closeAfterTransition={false}
            disableBackdropClick={true}
        >
            <Fade in={open}>
                <div className={"add-modal"}>
                    <section className="section_8bit">
                        <div className="wrapper wrapMenu">
                            <div className={"title"}>
                                <h3 className={"title-intro"}>Add new game to collection:</h3>
                                <h1>{props.name}</h1>
                            </div>
                            <div className="modal-content">
                                <div className="modal-image">
                                    <img src={props.cover?.url} alt=""/>
                                </div>
                                <div className="modal-details">
                                    <div className="edit-form">
                                        <div>
                                            <span>PLATFORM:</span>
                                            <input type="text"
                                                   className="search"
                                                   defaultValue={props?.platforms?.[0].name}
                                                   onChange={e => setPlatform(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <span>HOURS PLAYED: </span>
                                            <input type="text" className="search" maxLength={3}
                                                   onChange={e => setHoursPlayed(parseInt(e.target.value))}/>
                                        </div>
                                        <div>
                                            <span>HOURS TO COMPLETE: </span>
                                            <input type="text" className="search" maxLength={3} defaultValue={hltb}
                                                   onChange={e => setHltb(parseInt(e.target.value))}/>
                                        </div>
                                        <div>
                                            <span className="searchLabel Left">NOW PLAYING:</span>
                                            <input type="checkbox" id="nowPlay"
                                                   onChange={e => setNowPlaying(e.target.checked)}/>
                                            <label htmlFor="nowPlay"/>
                                        </div>
                                        <div>
                                            <span>COMPLETED:</span>
                                            <input type="checkbox" id="complete"
                                                   onChange={e => setCompleted(e.target.checked)}/>
                                            <label htmlFor="complete"/>
                                        </div>
                                        <div className="edit-buttons">
                                            <button onClick={submitGame}>SAVE</button>
                                            <button
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        handleClose();
                                                    }, 1);
                                                }}
                                            >
                                                CANCEL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Fade>
        </Modal>
    </div>;
}

export default AddGameResults;
