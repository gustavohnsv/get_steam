import './style.css'

function Game({ props }) {
    if (!props) return null;

    function getPlaytime(time) {
        const totalTime = time;
        const days = Math.floor(totalTime / 1440);
        const hours = Math.floor((totalTime % 1440) / 60);
        const minutes = totalTime % 60;
        return (
            <span> Tempo total: 
            { days > 1 && ` ${days} dias,` }
            { hours > 1 && ` ${hours} horas e` }
            { minutes > 1 ? ` ${minutes} minutos` : ' Nunca jogado'} 
            </span>
        )
    }

    return (
        <div className="game">
            <div className='game-left'>
                <strong> { props.name } </strong>
                { getPlaytime(props.total_playtime) }
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
                <span> Website: { props.website ? <a href={ props.website } target='_blank' rel='noreferrer'> { props.website } </a> : 'Não possui' } </span>
            </div>
            <div className='game-right'>
                <img alt={props.name} src={props.header_image}/>
            </div>
        </div>
    )
}

export default Game;
