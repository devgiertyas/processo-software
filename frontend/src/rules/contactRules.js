import { post, get, put } from "../services/api"


const contactHandleCreate = async (name, email, telefone) => {     
    return await post("/contacts", {name, email, telefone})
}

const contactHandleGet = async () => {     
    return await get("/contacts",)
}

const contactHandleGetContact = async (id) => {     
    return await get(`/contacts/${id}`,)
}

const contactHandleUpdate = async (id, name, email, telefone) => {     
    return await put(`/contacts/${id}`,  {id, name, email, telefone})
}




export {contactHandleCreate, contactHandleGet,contactHandleGetContact,contactHandleUpdate}