import { post, get, put } from "../services/api"

const userHandleLogin = async (email, password) => {  
    return await post("/users/handle-login", {email, password})
}

const userHandleCreate = async (name, email, password) => {     
    return await post("/users", {name, email, password})
}

const userHandleGet = async () => {     
    return await get("/users",)
}

const userHandleGetUser = async (id) => {     
    return await get(`/users/${id}`,)
}

const userHandleUpdate = async (id, name, email) => {     
    return await put(`/users/${id}`,  {id, name, email})
}




export {userHandleLogin, userHandleCreate,userHandleGet,userHandleGetUser, userHandleUpdate}