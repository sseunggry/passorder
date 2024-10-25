import {ReactNode} from "react";

type checkboxProps = {
    addClass?: string;
    label?: string;
    id?: string;
    checked?: boolean;
    children?: ReactNode;
}

function Checkbox({addClass = '', label, id, checked, children} : checkboxProps){
    return (
        <>
            <div className={`checkbox ${addClass}`}>
                <input type="checkbox" checked={checked} id={id} />
                <label htmlFor={id}>{label}</label>
                {children}
            </div>
        </>
    )
}

export default Checkbox;