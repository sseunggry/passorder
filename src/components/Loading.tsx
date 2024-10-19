import {ReactNode} from "react";

interface LoadingPros {
    addClass?: string;
    text?: string;
    children?: ReactNode;
}

function Loading({addClass = '', text, children}: LoadingPros){
    return (
        <>
            <p aria-live="polite">로딩중...</p>
        </>
    )
}

export default Loading;