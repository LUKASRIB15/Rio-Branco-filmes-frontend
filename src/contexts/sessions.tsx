import { api } from "@/services/axios";
import { getUserFromStorage, removeUserFromStorage, setUserInStorage } from "@/storage/sessions-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { email } from "zod";

type SignInRequest = {
  email: string
  password: string
}

type SignUpRequest = {
  name: string
  email: string
  password: string
}

type RecoveryPasswordRequest = {
  accessToken: string
  newPassword: string
}

type UpdateUserAccountRequest = {
  name: string
  email: string
}

type UserDTO = {
  name: string 
  email: string
}

type SessionsContextProps = {
  accessToken: string | null
  userLogged: UserDTO | null
  signIn: (data: SignInRequest) => Promise<void>
  signUp: (data: SignUpRequest) => Promise<void>
  signOut: () => Promise<void>
  sendLinkToEmail: (email:string) => Promise<void>
  recoveryPassword: (data: RecoveryPasswordRequest) => Promise<void>
  updateUserAccount: (data: UpdateUserAccountRequest) => Promise<void>
  deleteUserAccount: () => Promise<void>
}

const SessionsContext = createContext({} as SessionsContextProps)

export function SessionsProvider({children}: {children: ReactNode}){
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [userLogged, setUserLogged] = useState<UserDTO | null>(null)

  async function signIn(data: SignInRequest){
    try{
      const response = await api.post("/auth/login", {
        email: data.email,
        senha: data.password
      })

      if(response.status !== 200){
        throw new Error(response.data.message)
      }

      const {accessToken, user} = response.data

      setAccessToken(accessToken)
      setUserLogged({
        name: user.nome,
        email: user.email
      })
      setUserInStorage(accessToken, {
        name: user.nome,
        email: user.email
      })
    }catch(error){
      throw error
    }
  }

  async function signUp(data: SignUpRequest){
    try{
      const response = await api.post("/auth/register", {
        nome: data.name,
        email: data.email,
        senha: data.password
      })

      if(response.status !== 200){
        throw new Error(response.data.message)
      }

      const {accessToken, user} = response.data

      setAccessToken(accessToken)
      setUserLogged({
        name: user.nome,
        email: user.email
      })
      setUserInStorage(accessToken, {
        name: user.nome,
        email: user.email
      })
    }catch(error){
      throw error
    }
  }

  async function signOut(){
    try{
      setAccessToken(null)
      setUserLogged(null)
      removeUserFromStorage()
    }catch(error){
      throw error
    }
  }

  async function sendLinkToEmail(email: string){
    try{
      await api.post('/auth/forgot-password', {
        email
      })
    }catch(error){
      throw error
    }
  }

  async function recoveryPassword(data: RecoveryPasswordRequest){
    try{
      const {accessToken, newPassword} = data

      await api.post('/auth/reset-password', {
        novaSenha: newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }catch(error){
      throw error
    }
  }

  async function updateUserAccount(data: UpdateUserAccountRequest){
    try{
      const {name, email} = data
      
      await api.put('/cinefilo', {
        nome: name,
        email,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      setUserLogged({
        name,
        email
      })
    }catch(error){
      throw error
    }
  }

  async function deleteUserAccount(){
    try{
      await api.delete('/cinefilo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      await signOut()
    }catch(error){
      throw error
    }
  }

  useEffect(()=>{
    const {token, user} = getUserFromStorage()

    if(token && user){
      setAccessToken(token)
      setUserLogged(user)
    }
  }, [])

  return (
    <SessionsContext.Provider value={{
      accessToken, 
      userLogged, 
      signIn, 
      signUp, 
      signOut, 
      sendLinkToEmail, 
      recoveryPassword, 
      updateUserAccount,
      deleteUserAccount
    }}>
      {children}
    </SessionsContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionsContext)
}