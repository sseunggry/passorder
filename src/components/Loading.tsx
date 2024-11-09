import {ReactNode} from "react";

interface LoadingPros {
    addClass?: string;
    text?: string;
    children?: ReactNode;
}

function Loading({addClass = '', text, children}: LoadingPros){
    return (
        <div className="loading-wrap">
            <div className="loading">
                <div className="spinner">
                    <i className="circle"></i>
                    <i className="circle"></i>
                </div>
                <p aria-live="polite" className="blind">로딩중...</p>
            </div>
        </div>
    )
}

export default Loading;