export const ZapCell =({
    name,
    index
}:{
    name?:string
    index:number
})=>{
    return <div className="border border-black py-4 px-4 flex w-[300px] justify-center cursor-pointer">
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