type inputProps = {
    addClass?: string;
    placeholder?: string;
    label?: string;
    title?: string;
    id?: string;
    value?: string;
}

function Input({addClass = '', label, title, value, id, placeholder} : inputProps){
    return (
        <>
            <div className={`input ${addClass}`}>
                <label htmlFor={id}>
                    {label ? label : <span className="blind">{title}</span>}
                </label>
                <input type="text" id={id} placeholder={placeholder ? placeholder : "입력해 주세요."} value={value} />
            </div>
            <button type="button" className="btn-icon delete">
                <span className="blind">삭제</span>
            </button>
        </>
    )
}

export default Input;