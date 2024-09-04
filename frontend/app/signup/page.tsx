"use client"
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";

export default function () {

    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="flex pt-8 max-w-5xl">
            <div className="flex-1  pt-20 px-4">
                <div className="font-semibold text-4xl  pb-4">
                    Join millions worldwide who automate their work using Zapier.
                </div>
                <div className="pb-4">

                    <CheckFeature lable={"Easy setup, no coding required"} />
                </div>
                <div className="pb-4">
                    <CheckFeature lable={"Free forever for core features"} />
                </div>
                <div className="pb-4">
                    <CheckFeature lable={"14-day trial of premium features & apps"} />
                </div>
            </div>
            <div className="flex-1 pt-12 pb-12 mt-12 px-4 pr-8 border ">
                <Input lable={"Name"} onChange={e => {

                }} type="text" placeholder="Your Name"></Input>
                <Input lable={"Email"} onChange={e => {

                }} type="text" placeholder="Your Email"></Input>
                <Input lable={"password"} onChange={e => {

                }} type="password" placeholder="Password"></Input>
                <div className="pt-4">

            <PrimaryButton onClick={()=>{

            }} size = {"big"}> Get Started</PrimaryButton>
                </div>
            </div>
        </div>
        </div>
    </div>
}