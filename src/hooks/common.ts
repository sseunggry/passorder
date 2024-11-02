import {InputOptionsTypeProps} from "../reducer/optionSelect";

export const numberComma = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//랜덤 ID 생성 함수
export const generateRandomId = (productId: string) => `${productId}-${Math.floor(Math.random() * 1000000)}`;