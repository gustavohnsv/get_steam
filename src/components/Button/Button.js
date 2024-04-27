import './style.css'

const Button = ({ title, children, action }) => {
    return(
        <div className="button">
            <button title={title} onClick={action}> { children } </button>
        </div>
    )
}

export default Button;