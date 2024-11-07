// const FOLDER_NAME = "passorder";
// const BASE_PATH = `https://sseunggry.github.io/dataApi/data/${FOLDER_NAME}`;
const BASE_PATH = `http://localhost:3001`;

// export const fetchData = (name: string) => {
//     return fetch(`${BASE_PATH}/${name}.json`).then((response) => response.json());
// }
export const fetchData = async (name: string) => {
    const response = await fetch(`${BASE_PATH}/${name}`);
    return await response.json();
}