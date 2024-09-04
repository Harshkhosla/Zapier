"use client"
import {  useRouter } from "next/navigation"
import { PrimaryButton } from "./Buttons/PrimaryButton"
import { SecondaryButton } from "./Buttons/SecondaryButton"
import { Feature } from "./Feature"

export const Hero = () => {
    const router = useRouter()
    return <div>
        <div className="flex justify-center ">
            <div className="text-6xl  font-semibold text-center pt-20 max-w-4xl">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center ">
            <div className="text-xl  font-bold text-center pt-8 max-w-5xl">
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>
    <div className="flex justify-center">
        <div className="flex  pt-6 ">
            <PrimaryButton onClick={()=>{
                router.push('/signup')
            }} size="big">  Start Free with Email</PrimaryButton>
        <div className="pl-6 ">

            <SecondaryButton onClick={()=>{}} size="big">  Start Free with Google</SecondaryButton>
        </div>

        </div>
    </div>
<div className="flex justify-center pt-10">

    <Feature title={"Free forever"} subtitle={"for core features"}/>
    <Feature title={"More apps"} subtitle={"than any other platform"}/>
    <Feature title={"Cutting-edge"} subtitle={"AI features"}/>
</div>

    </div>
}