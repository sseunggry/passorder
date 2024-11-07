import {useState} from "react";

interface TabProps {
    addClass?: string;
    list: string[];
    // onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Tab({addClass = '', list} : TabProps) {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const tabOnClick = (idx: number) => {
        setActiveIdx(idx);
    }
    
    return (
        <div className={`tab ${addClass}`}>
            <ul role="tablist">
                {list.map((txt, idx) => (
                    <li
                        key={idx}
                        id={`tabInfo${idx+1}`}
                        role="tab"
                        aria-selected="true"
                        aria-controls={`tabPanelInfo${idx+1}`}
                    >
                        <button
                            type="button"
                            className={`btn-tab ${idx === activeIdx ? 'active' : ''}`}
                            onClick={() => tabOnClick(idx)}
                        >
                            {txt}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// <div role="tabpanel" id="panel1" aria-labelledby="tab1">
//     <!-- Tab 1 content -->
// </div>
export default Tab;