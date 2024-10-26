import {Link} from "react-router-dom";

interface ButtonProps {
    tag?: string;
    url?: string;
    addClass?: string;
    text?: string;
    preChildren?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
}

function Button({tag = 'button', url = '', addClass = '', text, onClick, preChildren, children} : ButtonProps){
    return (
        <>
            {(tag === 'a') ? (
                <Link to={url} className={`btn ${addClass}`} onClick={onClick}>
                    {preChildren && preChildren}
                    {text && <span>{text}</span>}
                    {children}
                </Link>
            ) : (
                <button className={`btn ${addClass}`} onClick={onClick}>
                    {preChildren && preChildren}
                    {text && <span>{text}</span>}
                    {children}
                </button>
            )}
        </>
    )
}

export default Button;