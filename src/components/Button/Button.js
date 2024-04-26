import './style.css'

const Button = ({ children, action }) => {
    return(
        <div className="button">
            <button onClick={action}> { children } </button>
        </div>
    )
}

export default Button;