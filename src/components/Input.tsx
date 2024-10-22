import {ReactNode} from "react";

type inputProps = {
    addClass?: string;
    placeholder?: string;
    label?: string;
    title?: string;
    id?: string;
    value?: string;
    children?: ReactNode;
}

function Input({addClass = '', label, title, value, id, placeholder, children} : inputProps){
    return (
        <>
            <label htmlFor={id}>
                {label ? label : <span className="blind">{title}</span>}
            </label>
            <div className={`input ${addClass}`}>
                <input type="text" id={id} placeholder={placeholder ? placeholder : "입력해 주세요."} value={value} />
                <button type="button" className="btn-icon btn-delete-fill">
                    <span className="blind">삭제</span>
                </button>
                {children}
            </div>
        </>
    )
}

export default Input;