import './style.css'

function Game({ props }) {
    return (
        <div className="game">
            <div className='game-left'>
                <strong> { props.name } </strong>
                <span> Tipo: { props.type } </span>
                <span> Preço: { props.price ? props.price : 'Gratuito' } </span>
                { props.price && (
                    <>
                        <span> Moeda: { props.exchange } </span>
                    </>
                )}
                <span> Lançamento: { props.coming_soon ? 'Não está disponível' : 'Já está disponível' } </span>
                <span> Data de lançamento: { props.date } </span>
                <span> Classificação: { props.rating ? props.rating : 'Não possui restrição' } </span>
                { props.rating && (
                    <>
                        <span> { props.rating_desc } </span>
                    </>
                )}
                <span> Website: { props.website ? <a href={ props.website } target='_blank'> { props.website } </a> : 'Não possui' } </span>
            </div>
            <div className='game-right'>
                <img alt={props.name} src={props.header_image}/>
            </div>
        </div>
    )
}

export default Game;
