import {ReactNode} from "react";

interface RadioProps {
    addClass?: string;
    label?: string;
    dataLabel?: string;
    dataPrice?: number;
    labelChildren?: ReactNode;
    id?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    children?: ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Radio({addClass = '', label, dataLabel, dataPrice, labelChildren, id, name, value, checked, onChange, children} : RadioProps){
    return (
        <>
            <div className={`radio ${addClass}`}>
                <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} data-label={dataLabel} data-price={dataPrice}/>
                <label htmlFor={id}>
                    <span>{label}</span>
                    {labelChildren}
                </label>
                {children}
            </div>
        </>
    )
}

export default Radio;