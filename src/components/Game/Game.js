import './style.css'

function Game({ props }) {
    return (
        <div className="game">
            <span> { props.name }</span>
            <span> { props.type } </span>
            <span> { props.exchange } </span>
            <span> { props.price } </span>
            <span> { props.coming_soon } </span>
            <span> { props.date } </span>
            <span> { props.rating } </span>
            <span> { props.required_age } </span>
            <span> { props.rating_desc } </span>
            <img alt={props.name} src={props.header_image}/>
        </div>
    )
}

export default Game;