import NoticeList from "../templates/NoticeList";

interface SelectProps {
    id?: string;
    label?: string;
    title?: string;
    list?: object;
    placeholder?: string;
    noticeList?: string[];
}

function Select({id = '', label, title, list = {}, placeholder = '', noticeList} : SelectProps){
    const names = Object.keys(list);
    const values = Object.values(list);
    
    return (
        <>
            <div className="select-wrap">
                <label htmlFor={id}>{label ? label : <span className="blind">{title}</span>}</label>
                <select name="role" id={id}>
                    {placeholder && (
                        <option value="" disabled defaultValue={placeholder}>{placeholder}</option>
                    )}
                    {names.map((name, idx) => (
                        <option key={idx} value={values[idx]}>{name}</option>
                    ))}
                </select>
            </div>
            {noticeList?.length !== 0 && (
                <NoticeList
                    title={false}
                    list={noticeList}
                />
            )}
        </>
    )
}

export default Select;