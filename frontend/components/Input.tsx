"use client"
export const Input =({lable,placeholder,onChange ,type="text"}:{
    lable : String;
    placeholder : String;
    onChange :(e:any)=>void;
    type?: "text"| "password"
})=>{
    return<div>
        <div className="text-md pb-1 pt-2">

        *<lable>{lable}</lable>
        </div>
        <input className="border rounded px-4 py-2 w-full border-black " type={type} placeholder={placeholder} onChange={onChange}/>
    </div>
}