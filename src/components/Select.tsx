interface SelectProps {
    id?: string;
    label?: string;
    title?: string;
    list?: object;
    placeholder?: string;
}

function Select({id = '', label, title, list = {}, placeholder = ''} : SelectProps){
    const names = Object.keys(list);
    const values = Object.values(list);
    
    return (
        <div className="select-wrap">
            <label htmlFor={id}>{label ? label : <span className="blind">{title}</span>}</label>
            <select name="role" id={id}>
                {placeholder && (
                    <option value="" disabled selected>{placeholder}</option>
                )}
                {names.map((name, idx) => (
                    <option key={idx} value={values[idx]}>{name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;