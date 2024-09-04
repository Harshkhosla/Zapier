"use client"
import { Appbar } from "@/components/Appbar";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function () {
    const [selectTrigger, setSelectTrigger] = useState('')
    const [selectActions, setSelectedActions] = useState<{
        avalibleActionId: string,
        avalibleActionName: string,
    }[]>([]);
    return <div>
        <Appbar />

        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">

                <ZapCell name={selectTrigger ? selectTrigger : "Trigger"} index={1} />
            </div>
            <div className=" w-full pt-2 pb-2">
                {selectActions.map((action, index) => <div className="flex pt-2 justify-center"> <ZapCell name={action ? action.avalibleActionName : "Action"} index={2 + index} /> </div>)}
            </div>


            <div className="flex justify-center">
                <div className=" ">
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            avalibleActionId: "",
                            avalibleActionName: ""
                        }])
                    }}><div className="text-2xl max-w-2">+
                    </div>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}