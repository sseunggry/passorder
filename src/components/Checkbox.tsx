import {ReactNode} from "react";

interface CheckboxProps {
    addClass?: string;
    label?: string;
    dataLabel?: number;
    labelChildren?: ReactNode;
    id?: string;
    value?: string;
    checked?: boolean;
    children?: ReactNode;
    onChange?: () => void;
}

function Checkbox({addClass = '', label, dataLabel, labelChildren, id, value, checked, onChange, children} : CheckboxProps){
    return (
        <>
            <div className={`checkbox ${addClass}`}>
                <input type="checkbox"  id={id} value={value} checked={checked} onChange={onChange} data-label={dataLabel} />
                <label htmlFor={id}>
                    <span>{label}</span>
                    {labelChildren}
                </label>
                {children}
            </div>
        </>
    )
}

export default Checkbox;