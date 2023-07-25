
export const SaveLocalStorage = (key: string, value: string) => {
    // console.log('SaveLocalStorage saving', key, value);
    localStorage.setItem(key, value);
    // console.log('SaveLocalStorage saved', localStorage.getItem(key));
}
export const GetLocalStorage = (key: string) => {
    // console.log('SaveLocalStorage getting', key);
    return localStorage.getItem(key);
}