import { useState } from "react";
import Game from "../components/Game/Game";
import Friend from "../components/Friend/Friend";
import Button from "../components/Button/Button";
import api from "../services/api";
import './style.css';

function Main() {

    const [userID, setUserID] = useState('');
    const [gameDetails, setGameDetails] = useState([]);
    const [friendDetails, setFriendDetails] = useState([]);

    async function gameInfo(appID) {
        try {
            const response = await api.get(`appsinfo/${appID}`);
            const gameData = {
                name: response.data.name,
                type: response.data.type,
                exchange: response.data.exchange,
                price: response.data.price,
                coming_soon: response.data.coming_soon,
                date: response.data.date,
                rating: response.data.rating,
                required_age: response.data.required_age,
                rating_desc: response.data.rating_desc,
                header_image: response.data.header_image
            }
            return gameData;
        } catch (error) {
            console.error('Erro ao obter dados', error);
            return null;
        }
    }

    async function userInfo(userID) {
        try {
            const response = await api.get(`/userinfo/${userID}`);
            const userData = {
                name: response.data.response.players[0].personaname,
                realname: response.data.response.players[0].realname,
                country: response.data.response.players[0].loccountrycode,
                avatar: response.data.response.players[0].avatarfull,
                url: response.data.response.players[0].profileurl
            }
            return userData;
        } catch (error) {
            console.error('Erro ao obter dados', error);
            return null;
        }
    }

    async function userAppsList() {
        setFriendDetails([]);
        try {
            const response = await api.get(`userapps/${userID}`);
            console.log(response.data);
            const items = response.data.response.games;
            const gameDetails = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const gameData = await gameInfo(item.appid);
                gameDetails.push(gameData);
    
                if (i < items.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 0.2 segundos
                }
            }
            setGameDetails(gameDetails);
        } catch (error) {
            console.error('Erro ao obter dados', error);
        }
    }

    async function userFriendList() {
        setGameDetails([]);
        try {
            const response = await api.get(`userfriends/${userID}`);
            console.log(response.data);
            const items = response.data.friendslist.friends;
            const friendsDetails = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const friendData = await userInfo(item.steamid);
                friendsDetails.push(friendData);

                if (i < items.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 0.2 segundos
                }
            }
            setFriendDetails(friendsDetails);
        } catch (error) {
            console.error('Erro ao obter dados', error)
        }
    }

    function clearResponses() {
        setFriendDetails([]);
        setGameDetails([]);
    }

    return(
        <div className='main'>
            <header className="main-header">
                <h1> Consumindo API da Steam </h1>
                <input 
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                />
                <Button action={userAppsList}> Lista de jogos </Button>
                <Button action={userFriendList}> Lista de amigos </Button>
                <Button action={clearResponses}> Limpar resultados </Button>
            </header>
            <div className="game-list">
            {
                gameDetails.map((game, index) => (
                    game ? (
                        <Game
                        key={index}
                        props={game}
                        />
                    ) : (
                        <></>
                    )
                ))
            }
            </div>
            <div className="friend-list">
            {
                friendDetails.map((friend, index) => (
                        <Friend
                        key={index}
                        props={friend}
                />
                ))
            }
            </div>
        </div>
    )
}

export default Main;