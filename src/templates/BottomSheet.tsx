import React, {MouseEvent, ReactNode, useEffect, useRef, useState} from "react";
import Button from "../components/Button";

interface BottomSheetProps {
    isOpen?: boolean;
    id?: string;
    addClass?: string;
    title?: string;
    closeBtn?: boolean;
    children?: ReactNode;
    popupBtn?: {
        text: string;
        addClass?: string;
        onClick?: () => void;
    }
}

function BottomSheet({isOpen, id, addClass = '', title, closeBtn, children, popupBtn} : BottomSheetProps) {
    const popRef = useRef(null);
    const [popOpen, setPopOpen] = useState(false);
    const onPopupClose = () => {
        setPopOpen(prev => !prev);
    }
    useEffect(() => {
        if(isOpen) {
            setPopOpen(true);
        }
    }, [isOpen]);
    
    return (
        <div id={id} className={`pop-wrap bottom-sheet ${addClass} ${popOpen ? 'open' : ''}`} ref={popRef}>
            <div className="pop-inner">
                {title ?? (
                    <div className="pop-tit">
                        <p>{title}</p>
                    </div>
                )}
                
                <div className="pop-con">
                    {children}
                </div>
                
                {popupBtn?.text ? (
                    <div className="pop-btn">
                        <Button
                            text={popupBtn.text}
                            addClass={`fill large round-m primary ${popupBtn.addClass}`}
                            onClick={popupBtn.onClick}
                        />
                    </div>
                ) : ''}
        
                {closeBtn ?? (
                    <div className="pop-close-btn">
                        {/*<button className={`btn ${addClass}`} onClick={(e) => onPopupClose(e)}>*/}
                        {/*    <span className="blind">닫기</span>*/}
                        {/*    <i className="icon icon-delete"></i>*/}
                        {/*</button>*/}
                        <Button
                            children={(
                                <>
                                    <span className="blind">닫기</span>
                                    <i className="icon icon-delete"></i>
                                </>
                            )}
                            onClick={onPopupClose}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BottomSheet;