import Header, {HeaderProps} from "./Header";
import BottomMenu from "./BottomMenu";
import React, {MouseEventHandler, ReactNode, useEffect, useState} from "react";
import Button from "../components/Button";

interface LayoutPros{
    addClass?: string;
    header?: boolean;
    headerCon?: HeaderProps;
    children?: ReactNode;
    bottomMenu?: boolean;
    pageBtn?: {
        text: string;
        addClass?: string;
        onClick?: () => void;
    };
}

function Layout({addClass = '', header = true, headerCon, children, bottomMenu = true, pageBtn}: LayoutPros) {
    const [paddingTop, setPaddingTop] = useState<number>(0);
    const [paddingBottom, setPaddingBottom] = useState<number>(0);
    
    useEffect(() => {
        const updateContainerHeight = () => {
            const $header = document.querySelector(".header") as HTMLElement | null;
            const $bottomMenu = document.querySelector(".bottom-menu") as HTMLElement | null;
            const $pageBtn = document.querySelector(".btn-page-wrap") as HTMLElement | null;
            
            const headerHeight = $header?.offsetHeight ?? 0;
            const bottomMenuHeight = $bottomMenu?.offsetHeight ?? 0;
            const pageBtnHeight = $pageBtn?.offsetHeight ?? 0;
    
            // setContainerHeight(windowHeight - headerHeight - bottomMenuHeight);
            setPaddingTop(headerHeight);
            if($bottomMenu) {
                setPaddingBottom(bottomMenuHeight);
            }
            if($pageBtn) {
                setPaddingBottom(pageBtnHeight);
            }
        };
    
        updateContainerHeight();
        window.addEventListener('resize', updateContainerHeight);
        
        return () => {
            window.removeEventListener('resize', updateContainerHeight);
        }
    }, [header, bottomMenu]);
    
    return (
        <div className={`wrap ${addClass}`}>
            {header && <Header {...headerCon}/>}
            
            <div className="container" style={{paddingTop: `${paddingTop * 0.1}rem`, paddingBottom: `${paddingBottom * 0.1}rem`}}>
                <div className="contents">
                    {children}
                </div>
            </div>
            
            {pageBtn ? (
                <div className="btn-page-wrap">
                    <Button
                        tag="a"
                        text={pageBtn.text}
                        addClass={`fill large round-m primary`}
                        onClick={pageBtn.onClick}
                    />
                </div>
            ) : bottomMenu ? <BottomMenu /> : ''}
        </div>
    )
}

export default Layout;