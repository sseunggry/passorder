import {createContext, ReactNode, useState} from "react";
import {ProductOptionList} from "hooks/queries/useStoreQuery";

//상태와 함수타입 정의
interface OptionListContextType {
    // id: string | null;
    productOptionList: ProductOptionList[];
    setProductOptionList: (optionList: ProductOptionList[]) => void;
}

interface OptionListProviderProps {
    children: ReactNode;
}

//Context 생성
const OptionListContext = createContext<OptionListContextType | undefined>(undefined);

//Provider 컴포넌트 생성
export const OptionListProvider: React.FC<OptionListProviderProps> = ({ children }) => {
    // const [id, setId] = useState<string>('');
    const [productOptionList, setProductOptionList] = useState<ProductOptionList[]>([]);
    
    return (
        <OptionListContext.Provider value={{ productOptionList, setProductOptionList }}>
            {children}
        </OptionListContext.Provider>
    )
}

export default OptionListContext;