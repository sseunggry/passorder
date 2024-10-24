interface NoticeProps {
    title?: boolean;
    list: string[];
}

function NoticeList({title = true, list} : NoticeProps) {
    if(title) {
        return (
            <div className="notice-wrap">
                <p className="tit">유의사항</p>
                <ul className="notice-list">
                    {list.map((text, idx) => (
                        <li key={idx}>{text}</li>
                    ))}
                </ul>
            </div>
        )
    } else{
        return (
            <ul className="notice-list">
                {list.map((text, idx) => (
                    <li key={idx}>{text}</li>
                ))}
            </ul>
        )
    }
}

export default NoticeList;