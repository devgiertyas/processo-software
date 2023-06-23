import { post, get } from "../services/api"

const userHandleLogin = async (email, password) => {  
    return await post("/users/handle-login", {email, password})
}

const userHandleCreate = async (name, email, password) => {     
    return await post("/users", {name, email, password})
}

const userHandleGet = async () => {     
    return await get("/users",)
}




export {userHandleLogin, userHandleCreate,userHandleGet}