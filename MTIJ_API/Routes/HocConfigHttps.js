const { EnumMethodHttp } = require("../Contants/Config");
const HttpGet = (action, DisplayName) => {
    action.configHttp = {
        method: EnumMethodHttp.GET,
        DisplayName: DisplayName || null
    }
    return action
}
const HttpPost = (action, DisplayName) => {
    action.configHttp = {
        method: EnumMethodHttp.POST,
        DisplayName: DisplayName || null
    }
    return action
}
module.exports = {
    HttpGet,
    HttpPost
}