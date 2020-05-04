import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGameForm from "../../components/AddGameForm/AddGameForm";
import AddGameResults from "../../components/AddGameResults/AddGameResults";
import { IGames } from "../../models/games.model";
import { clearGames } from '../../store/actions/games.actions';
import "./AddGame.scss";

function AddGame() {
    let pageLimit = 6;
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currGames, setCurrGames] = useState([]);

    const dispatch = useDispatch();

    const allGames = useSelector((state: any) => {
        return state.gamesReducer.games;
    });

    const handleChange = (event: any, value: number) => {
        setCurrPage(value);
        let startRange = (value - 1) * (pageLimit + 1);
        setCurrGames(allGames.slice(startRange, startRange + 6));
    };

    useEffect(() => {
        setTotalPages(Math.floor((allGames.length - 1) / 6));
        setCurrGames(allGames.slice(0, 6));
    }, [allGames, allGames.length]);

    useEffect(() => {
        return () => {
            dispatch(clearGames())
        }
    }, []);

    return (
        <div className="AddGame">
            <AddGameForm/>
            {allGames.length ? (
                <Pagination
                    count={totalPages}
                    page={currPage}
                    onChange={handleChange}
                />
            ) : null}
            <div className={"results-container"}>
                {currGames?.map((game: IGames, index: number) => {
                    return <AddGameResults key={index} {...game} />;
                })}
            </div>
        </div>
    );
}

export default AddGame;
