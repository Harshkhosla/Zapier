"use client"
import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/Appbar";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useEffect, useState } from "react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    
    const [availableTriggers, setAvailableTriggers] = useState([]);
    console.log(availableTriggers,"dljdvnskdsvsnkvdsnjkvdsn");

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/vi/triggers/avalible`)
            .then(x => setAvailableTriggers(x.data.avalibleTriggers))

        axios.get(`${BACKEND_URL}/api/vi/actions/avalible`)
            .then(x => setAvailableActions(x.data.avalibleActions))
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}
export default function () {
    const [selectTrigger, setSelectTrigger] = useState<{
        id:string,
        name:string
    }>();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
  
    const [selectActions, setSelectedActions] = useState<{
        index:number,
        avalibleActionId: string,
        avalibleActionName: string,
    }[]>([]);


const [SelectedModal,setSelecteModal]= useState<null |number>(null);

    return <div>
        <Appbar />

        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">

                <ZapCell onClick={()=>{
                    setSelecteModal(1)
                }} name={selectTrigger?.name ? selectTrigger.name : "Trigger"} index={1} />
            </div>
            <div className=" w-full pt-2 pb-2">
                {selectActions.map((action, index) => <div className="flex pt-2 justify-center"> <ZapCell onClick={()=>{
                    setSelecteModal(action.index)
                }} name={action ? action.avalibleActionName : "Action"}  index={action.index} /> </div>)}
            </div>


            <div className="flex justify-center">
                <div className=" ">
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index:a.length+2,
                            avalibleActionId: "",
                            avalibleActionName: ""
                        }])
                    }}><div className="text-2xl max-w-2">+
                    </div>
                    </PrimaryButton>
                </div>
            </div>
        </div>
        {SelectedModal && <Modal availableItems={SelectedModal === 1 ? availableTriggers : availableActions} onSelect={(props:null |{name:string,id:string})=>{
            if(props===null){
                setSelecteModal(null);
                return;
            }
            if(SelectedModal===1){
                setSelectTrigger({
                    id:props.id,
                    name:props.name
                })

            }else{
                setSelectedActions(a=>{
                    let newActions= [...a];
                    newActions[SelectedModal-2]={
                        index:SelectedModal,
                        avalibleActionId:props.id,
                        avalibleActionName:props.name
                    }
                    return newActions
                })
            }
            setSelecteModal(null);
        }} index={SelectedModal}/>}
    </div>
}




function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: {id: string, name: string, image: string;}[] }){
    console.log(availableItems,"sdkhsdvbsdvhb");
    
    return<div>
        <div id="default-modal"   className="  fixed top-0 right-0 left-0 z-50 justify-center 
        items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-slate-100 bg-opacity-70">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      
        <div className="relative bg-white rounded-lg shadow ">
    
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                Select {index==1?"Trigger":"Action"}
                </h3>
                <button onClick={()=>{
                    onSelect(null)
                }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {availableItems?.map(({id,name,image})=>{
                return <div className="flex border p-4 cursor-pointer hover:bg-slate-100">
                    {/* {name} */}
                    <img src={image} width={30} className="rounded-full" /> <div className="flex flex-col justify-center"> {name} </div>
                         
                    </div>
              })}
            
            </div>
        
                </div>
    </div>
</div>
    </div>

}