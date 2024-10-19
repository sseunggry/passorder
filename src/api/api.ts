const FOLDER_NAME = "passorder";
const BASE_PATH = `https://sseunggry.github.io/dataApi/data/${FOLDER_NAME}`;

export const fetchData = (name: string) => {
    return fetch(`${BASE_PATH}/${name}.json`).then((response) => response.json());
}