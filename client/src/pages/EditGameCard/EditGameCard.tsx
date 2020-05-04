import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import { take } from 'rxjs/operators';
import { GameDtoModel } from '../../models/gameDto.model';
import { deleteGameById, getGameById, updateGameById } from '../../services/games.service';
import { clearGames } from '../../store/actions/games.actions';
import { fetchUserGamesFromApi } from '../../store/actions/user.actions';
import { IAppState } from '../../store/reducers/root.reducer';
import "./EditGameCard.scss";

function EditGameCard() {
    const [gameData, setGameData] = useState<GameDtoModel>({
        _id: '',
        completed: false,
        coverUrl: '',
        hoursPlayed: 0,
        hoursToFinish: 0,
        name: '',
        nowPlaying: false,
        platform: '',
        releaseDate: '',
        uid: ''
    });

    const history = useHistory();
    const dispatch = useDispatch();

    function deleteGame() {
        deleteGameById(gameData._id).subscribe(() => {
            dispatch(clearGames())
            dispatch(fetchUserGamesFromApi(userData.sub))
            history.push('/');
        });
    }

    function updateGame() {
        updateGameById(gameData._id, gameData).subscribe(() => {
            dispatch(clearGames())
            dispatch(fetchUserGamesFromApi(userData.sub))
            history.push('/');
        });
    }

    const {id} = useParams();

    const userData = useSelector((state: IAppState) => {
        return state.userReducer.user;
    });

    const handleChange = (event: { target: any; }) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setGameData({
            ...gameData,
            [name]: value
        });
    };

    useEffect(() => {
        getGameById(id)
            .pipe(take(1))
            .subscribe(res => setGameData(res.data))
    }, [id, userData.sub])

    return <div>
        {gameData ? <div className="EditGameCard">
            <section className="section_8bit edit-title">
                <div className="wrapper">Edit</div>
            </section>
            <section className="section_8bit">
                <div className="wrapper edit-container">
                    <div className="img-container">
                        <img
                            src={gameData.coverUrl}
                            alt=""
                        />
                    </div>
                    <div className="edit-form">
                        <div>
                            <span>NAME:</span>
                            <span>{gameData.name}</span>
                        </div>

                        <div>
                            <span>PLATFORM:</span>
                            <input onChange={handleChange} name="platform" value={gameData.platform} type="text"
                                   className="search"/>
                        </div>
                        <div>
                            <span>HOURS PLAYED: </span>
                            <input onChange={handleChange} name="hoursPlayed" value={gameData.hoursPlayed}
                                   type="text" className="search"
                                   maxLength={3}/>
                        </div>
                        <div>
                            <span>HOURS TO COMPLETE: </span>
                            <input onChange={handleChange} name="hoursToFinish" value={gameData.hoursToFinish}
                                   type="text"
                                   className="search" maxLength={3}/>
                        </div>
                        <div>
                            <span className="searchLabel Left">NOW PLAYING:</span>
                            <input onChange={handleChange} name="nowPlaying" checked={gameData.nowPlaying}
                                   type="checkbox" id="nowPlay"/>
                            <label htmlFor="nowPlay"/>
                        </div>
                        <div>
                            <span>COMPLETED:</span>
                            <input onChange={handleChange} name="completed"
                                   checked={gameData.completed || gameData.hoursToFinish === gameData.hoursPlayed}
                                   type="checkbox" id="complete"/>
                            <label htmlFor="complete"/>
                        </div>
                        <div className="edit-buttons">
                            <button onClick={updateGame}>SAVE</button>
                            <button onClick={deleteGame}>DELETE</button>
                            <Link to={"/"}>
                                <button>CANCEL</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div> : null}
    </div>;
}

export default EditGameCard;
