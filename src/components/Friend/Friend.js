import './style.css'

function Friend({ props }) {
    return (
        <div className="friend">
            <span> Nome: { props.name } </span>
            <span> RNome: 
            { props.realname ? <> { props.realname } </> : <> ∅ </> }
            </span>
            <span> Pais: 
            { props.country ? <> { props.country } </> : <> ∅ </> }
            </span>
            <a href={props.url} target='_blank' rel='noreferrer'> Clique aqui para ir ate o perfil </a>
            <img alt={props.name} src={props.avatar}/>
        </div>
    )
}

export default Friend;