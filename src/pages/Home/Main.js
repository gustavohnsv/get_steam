import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";
import GridLoader from "react-spinners/GridLoader";
import Game from "../../components/Game/Game";
import Friend from "../../components/Friend/Friend";
import Button from "../../components/Button/Button";
import api from "../../services/api";
import './style.css';

function Main() {

    let [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
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
                header_image: response.data.header_image,
                website: response.data.website,
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
        setLoading(true);
        if (userID) {
            if (isNaN(userID)) {
                alert('Digite um número válido');
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`userapps/${userID}`);
                console.log(response.data);
                const items = response.data.response.games;
                const gameDetails = [];
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const gameData = await gameInfo(item.appid);
                    gameDetails.push({
                        ...gameData,
                        total_playtime: items[i].playtime_forever,
                    });
                    
                    if (i < items.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 50)); // Aguarda 0.05 segundos
                    }
                }
                setGameDetails(gameDetails);
            } catch (error) {
                console.error('Erro ao obter dados', error);
            }
        } else {
            alert('Digite um ID de usuário');
        }
        setLoading(false)
    }

    async function userFriendList() {
        setGameDetails([]);
        setLoading(true);
        if (userID) {
            if (isNaN(userID)) {
                alert('Digite um número válido');
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`userfriends/${userID}`);
                console.log(response.data);
                const items = response.data.friendslist.friends;
                const friendsDetails = [];
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const friendData = await userInfo(item.steamid);
                    friendsDetails.push({
                        ...friendData,
                        friend_since: items[i].friend_since
                    });

                    if (i < items.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 50)); // Aguarda 0.05 segundos
                    }
                }
                setFriendDetails(friendsDetails);
            } catch (error) {
                console.error('Erro ao obter dados', error)
            }
        } else {
            alert('Digite um ID de usuário');
        }
        setLoading(false);
    }
    
    function clearResponses() {
        setFriendDetails([]);
        setGameDetails([]);
        setUserID('');
    }

    return (
        <div className='main'>
            <header className="main-header">
                <div className="main-header-left">
                    <img src={process.env.PUBLIC_URL + '/steamlogo.svg'} alt="Steam Logo" width={30}/>
                    <h1> Consumindo Steam API </h1>
                </div>
                <div className="main-header-right">
                    <input 
                    type="text"
                    value={userID}
                    onChange={(e) => {
                        setUserID(e.target.value);
                        console.log(e.target.value);
                    }}
                    placeholder="Digite o ID do usuário"
                    />
                    <input 
                    type="text"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        console.log(e.target.value);
                    }}
                    placeholder="Digite o filtro"
                    />
                    <Button title='Lista de jogos' action={userAppsList}> <FaGamepad size={20} /> </Button>
                    <Button title='Lista de amigos' action={userFriendList}> <IoPeople size={20} /> </Button>
                    <Button title='Limpar resulados' action={clearResponses}> <FaTrash size={15} /> </Button>
                    <GridLoader 
                    color="#FFF" 
                    loading={loading}
                    size={5}
                    />
                </div>
            </header>
            <section>
            <div className="game-list">
                {
                    gameDetails.filter(game => game && game.name && game.name.toLowerCase().includes(filter.toLowerCase())).map((game, index) => (
                        <Game
                        key={index}
                        props={game}
                        /> 
                    ))
                }
            </div>
            <div className="friend-list">
                {
                    friendDetails.filter(friend => friend && friend.name && friend.name.toLowerCase().includes(filter.toLowerCase())).map((friend, index) => (
                        <Friend
                        key={index}
                        props={friend}
                        />
                    ))
                }
            </div>
            </section>
        </div>
    )
}

export default Main;