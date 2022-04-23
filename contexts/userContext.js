import cookie from "js-cookie"
import { useRouter } from "next/router"
import { createContext, useState } from 'react'
const userContext = createContext()

const UserState = (props) => {
  const router = useRouter()
  const [duplicate, setduplicate] = useState(false)
  const [duplicateName, setduplicateName] = useState(false)
  const [wrongData, setwrongData] = useState(false)

  const handleSignOut = async () => {
    cookie.remove("token")
    cookie.remove("id")
    cookie.remove("username")
    router.push("/signup")
  }

  const handleOnSignUp = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append('profileImg', e.target.profileImg.files[0]);
    console.log(formData)
    console.log(process.env.NEXT_PUBLIC_HOST)
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/createUser`, {
      method: "POST",
      body: formData
    })
    console.log(res)
    const resjson = await res.json()
    console.log(resjson)
    if (resjson.error) {
      return setduplicate(true)
    }
    if (resjson.duplicateName) {
      return setduplicateName(true)
    } else {
      cookie.set("token", resjson.token, { expires: 1000 })
      cookie.set("id", resjson.id, { expires: 1000 })
      cookie.set("username", resjson.username, { expires: 1000 })
      router.push("/")
    }
  }
  const handleOnSignIn = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
    })
    const resjson = await res.json()
    if (resjson.error) {
      return setwrongData(true)
    }
    if (resjson.token) {
      cookie.set("token", resjson.token, { expires: 1000 })
      cookie.set("id", resjson.id, { expires: 1000 })
      cookie.set("username", resjson.username, { expires: 1000 })
      router.push("/")
    }
  }
  return (
    <userContext.Provider value={{ handleOnSignUp, handleSignOut, duplicateName, handleOnSignIn, duplicate, wrongData }}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserState
export { userContext }

