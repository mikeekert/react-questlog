import React from "react";
import { useSelector } from 'react-redux';
import GameCard from "../../components/GameCard/GameCard";
import { IAppState } from '../../store/reducers/root.reducer';
import "./Dashboard.scss";

function Dashboard() {
    const userGames = useSelector((state: IAppState) => {
        return state.userReducer.user.games;
    })
    const loading = useSelector((state: IAppState) => {
        return state.userReducer.loading
    })

    if (loading) {
        return <div>Loading</div>
    }

    return <div>
        {userGames?.map((game: any, index: number) => {
            return <GameCard key={index} props={game}/>
        })}
    </div>;
}

export default Dashboard;
