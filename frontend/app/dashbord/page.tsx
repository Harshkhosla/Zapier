"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/Buttons/DarkButton";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerid": String,
    "userId": String,
    " actions": {
        "id": String,
        "zapId": String,
        "actionId": String,
        "SortingOrder": String,
        "type": {
            "id": string,
            "name": string
        }
    }[],
    "trigger":{
        "id":String,
        "zapId":String,
        "triggerId":String,
        "type":{
            "id":String,
            "name":string,
        }
    }
}
function useZaps() {
    const [loading, SetLoading] = useState(true);
    const [zaps, SetZaps] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/vi/zap`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then(res => {
                SetZaps(res.data.zaps);
                SetLoading(false)
            })
    }, [])

    return {
        loading, zaps
    }
}

export default function () {
const router = useRouter();
    const { loading, zaps } = useZaps();
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">

            <div className="pt-8 max-w-screen-lg w-full">
                <div className="flex justify-between pr-8">
                    <div className="text-xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create")
                    }}> Create</DarkButton>
                </div>
            </div>
        </div>
        {loading?"Loading...":<div  className="flex justify-center"> <ZapTable zaps={zaps}/></div>}
    </div>
}


function ZapTable ({zaps}:{  zaps:Zap[]}){
    const router = useRouter()
return <div className="p-8 max-w-screen-lg  w-full" >
<div className="flex">
  
    <div className="flex-1">Name</div>
    <div className="flex-1">Last Edit</div>
    <div className="flex-1">Running</div>
    <div className="flex-1">Go</div>
   
</div>

    {zaps.map(z=> <div className="flex border-b border-t py-4">
    <div className="flex-1">{z.trigger.type.name}{z.actions.map(x=>x.type.name+" ")}</div>
    <div className="flex-1">{z.id}</div>
    <div className="flex-1">Nov 13, 2004</div>
    <div className="flex-1"><LinkButton onClick={()=>{
        router.push("/zap/"+z.id)
    }}></LinkButton></div>
    </div>)}
  


</div>

}