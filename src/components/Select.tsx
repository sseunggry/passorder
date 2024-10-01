interface SelectProps {
    id?: string;
    label?: string;
    list?: object;
}

function Select({id = '', label = '', list = {}} : SelectProps){
    const names = Object.keys(list);
    const values = Object.values(list);
    
    return (
        <div className="select-wrap">
            <label htmlFor={id} className="blind">{label}</label>
            <select id={id}>
                {names.map((name, idx) => (
                    <option key={idx} value={values[idx]}>{name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;