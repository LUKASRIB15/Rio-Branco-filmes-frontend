import { TOKEN_STORAGE, USER_DATA_STORAGE } from "./config";

type UserData = {
  name: string
  email: string
}

export function getUserFromStorage(){
  const userData = localStorage.getItem(USER_DATA_STORAGE)

  return {
    token: localStorage.getItem(TOKEN_STORAGE),
    user: userData ? JSON.parse(userData) : null as UserData | null
  }  
}

export function removeUserFromStorage(){
  localStorage.removeItem(TOKEN_STORAGE)
  localStorage.removeItem(USER_DATA_STORAGE)
}

export function setUserInStorage(token: string, user: UserData){
  localStorage.setItem(TOKEN_STORAGE, token)
  localStorage.setItem(USER_DATA_STORAGE, JSON.stringify(user))
}