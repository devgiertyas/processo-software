import { post} from "../services/api"

const messageHandleSend = async (payload) => {     
    return await post("/message",{payload: payload})
}

export {messageHandleSend}