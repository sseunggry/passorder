import Header, {HeaderProps} from "./Header";
import BottomMenu from "./BottomMenu";
import {ReactNode, useEffect, useState} from "react";

interface LayoutPros{
    addClass?: string;
    header?: boolean;
    headerCon?: HeaderProps;
    children?: ReactNode;
    bottomMenu?: boolean;
}

function Layout({addClass = '', header = true, headerCon, children, bottomMenu = true}: LayoutPros) {
    const [containerHeight, setContainerHeight] = useState<number>(0);
    
    useEffect(() => {
        const updateContainerHeight = () => {
            const $header = document.querySelector(".header") as HTMLElement | null;
            const $bottomMenu = document.querySelector(".bottom-menu") as HTMLElement | null;
            const windowHeight = window.innerHeight;
            
            const headerHeight = $header?.offsetHeight ?? 0;
            const bottomMenuHeight = $bottomMenu?.offsetHeight ?? 0;
    
            setContainerHeight(windowHeight - headerHeight - bottomMenuHeight);
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
            
            <div className="container" style={{height: (containerHeight * 0.1)+ 'rem'}}>
                {children}
            </div>
    
            {bottomMenu && <BottomMenu />}
        </div>
    )
}

export default Layout;