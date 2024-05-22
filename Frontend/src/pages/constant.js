
export const baseUrl = 'https://localhost:7257';

export function createURL(path){
    return `${baseUrl}/${path}`;
}