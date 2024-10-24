import Header, {HeaderProps} from "./Header";
import BottomMenu from "./BottomMenu";
import {ReactNode, useEffect, useState} from "react";
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
    };
}

function Layout({addClass = '', header = true, headerCon, children, bottomMenu = true, pageBtn}: LayoutPros) {
    // const [containerHeight, setContainerHeight] = useState<number>(0);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [bottomMenuHeight, setBottomMenuHeight] = useState<number>(0);
    
    useEffect(() => {
        const updateContainerHeight = () => {
            const $header = document.querySelector(".header") as HTMLElement | null;
            const $bottomMenu = document.querySelector(".bottom-menu") as HTMLElement | null;
            // const windowHeight = window.innerHeight;
            
            const headerHeight = $header?.offsetHeight ?? 0;
            const bottomMenuHeight = $bottomMenu?.offsetHeight ?? 0;
    
            // setContainerHeight(windowHeight - headerHeight - bottomMenuHeight);
            setHeaderHeight(headerHeight);
            setBottomMenuHeight(bottomMenuHeight);
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
            
            <div className="container" style={{paddingTop: (headerHeight * 0.1)+ 'rem', paddingBottom: (bottomMenuHeight * 0.1)+ 'rem'}}>
                <div className="contents">
                    {children}
                </div>
            </div>
    
            {bottomMenu && <BottomMenu />}
            {pageBtn && (
                <div className="btn-page-wrap">
                    <Button
                        tag="a"
                        text={pageBtn.text}
                        addClass={`fill large round-m primary disabled`}
                    />
                </div>
            )}
        </div>
    )
}

export default Layout;