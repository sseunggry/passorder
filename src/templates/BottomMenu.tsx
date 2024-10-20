import {Link} from "react-router-dom";

function BottomMenu() {
    const navList = [
        {"url": "/", "icon": "home", "text": "홈"},
        {"url": "order", "icon": "order", "text": "주문내역"},
        {"url": "qr", "icon": "qr", "text": "큐알주문"},
        {"url": "my", "icon": "my", "text": "MY"},
    ]
    return (
        <nav className="bottom-menu">
            {navList.map(({url, icon, text}, idx) => (
                <Link to={url} key={idx}>
                    <i className={`icon icon-${icon}`}></i>
                    <p className="txt">{text}</p>
                </Link>
            ))}
        </nav>
    )
}

export default BottomMenu;