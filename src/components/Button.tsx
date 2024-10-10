import {Link} from "react-router-dom";

interface ButtonProps {
    tag?: string;
    url?: string;
    addClass?: string;
    text?: string;
    children?: React.ReactNode;
}

function Button({tag = 'button', url = '', addClass = '', text, children} : ButtonProps){
    return (
        <>
            {(tag === 'a') ? (
                <Link to={url} className={`btn ${addClass}`}>
                    {text && <span>{text}</span>}
                    {children}
                </Link>
            ) : (
                <button className={`btn ${addClass}`}>
                    {text && <span>{text}</span>}
                    {children}
                </button>
            )}
        </>
    )
}

export default Button;