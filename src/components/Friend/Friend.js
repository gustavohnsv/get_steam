import './style.css'

function Friend({ props }) {

    const FormatedDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (!props) return null;  

    return (
        <div className="friend">
            <span> Nome: {props.name} </span>
            <span> RNome: {props.realname ? <> {props.realname} </> : <> ∅ </>} </span>
            <span> Pais: {props.country ? <> {props.country} </> : <> ∅ </>} </span>
            <span> Amigos desde {FormatedDate(props.friend_since)} </span>
            <a href={props.url} target='_blank' rel='noreferrer'> Clique aqui para ir até o perfil </a>
            <img alt={props.name} src={props.avatar}/>
        </div>
    );
}

export default Friend;