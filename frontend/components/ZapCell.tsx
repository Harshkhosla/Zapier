export const ZapCell =({
    name,
    index,
    onClick
}:{
    name?:string
    index:number
    onClick:()=>void
})=>{
    return <div className="border border-black py-4 px-4 flex w-[300px] justify-center cursor-pointer" onClick={onClick}>
        <div className="flex text-xl">

        <div className="font-bold">
            {index}

        </div>
        <div className="font-bold">
            {name}

        </div>
        </div>

    </div>
}