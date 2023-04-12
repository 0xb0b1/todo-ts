export const saveToLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data))
}
