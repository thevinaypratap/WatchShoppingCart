export const SERVER = "https://localhost:7257/api";

export function createURL(path) {
  return `${SERVER}/${path}`;
}