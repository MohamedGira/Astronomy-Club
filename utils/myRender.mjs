import { getResetTemplate } from "./templates/templatesCombined.mjs"

export const render=(string,options={})=>{
    let keys= Object.keys(options)
    console.log(keys)
    keys.forEach(key=>{
        string=string.replace(`{${key}}`,options[key])
    })
    return string
}
