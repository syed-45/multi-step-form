"use client"
import { Activity, FormEvent, useState } from "react";
import Image from "next/image";
import PersonalInfo from "./components/personal-info";
import SelectPlan from "./components/select-plan";
import { PickAddOns } from "./components/pick-add-ons";
import { FinishingUp } from "./components/finishing-up";
import { ThankYou } from "./components/thank-you";

export default function Page() {
  const [stepNum, setStepNum] = useState(1)
  const [allFormData, setAllFormData] = useState<FormData>(new FormData)
  const [isYearly, setIsYearly] = useState(false)

  const formIds: Record<number, string> = {
    1: "personalInfoForm",
    2: "selectPlanForm",
    3: "pickAddOnsForm",
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submittedFormData = new FormData(e.target as HTMLFormElement)

    setStepNum(prevNum => {
      setAllFormData(prevFormData => {
        const newFormData = new FormData()
        for (const [key, val] of prevFormData) {
          if (prevNum===3 && key.toString()==="addOn") {
            //skip, will be added from submittedFormData
          } else {
            newFormData.append(key, val)
          }
        }
        for (const [key, val] of submittedFormData) {
          if (prevFormData.get(key)===undefined || key.toString()==="addOn") {
            newFormData.append(key, val)
          } else {
            newFormData.set(key, val)
          }
        }
        return newFormData
      })
      return prevNum + 1
    })
  }

  const onConformClick = () => {
    setStepNum(5)
    //axios.post(allFormdData) ...
  }

  return (
    <div className="flex justify-center items-center min-h-screen min-w-[375px]">
      <main className="w-full min-h-dvh flex flex-col">
        <div className="grid place-content-stretch grow pb-6">
          <div className="[grid-area:1/1] flex flex-col h-full">
            <Image src="/bg-sidebar-mobile.svg" alt="sidebarMobile" width={375} height={172} className="min-w-dvw"/>
            <div className="w-full h-full bg-Blue-100"></div>
          </div>
          <div className="[grid-area:1/1]">
            <div className="mt-10 flex justify-center gap-4">
              {Array(4).fill(0).map((zero,idx) => {
                  return (
                    <div key={idx} className={`rounded-full size-8 flex justify-center items-center ${idx + 1 === stepNum || (stepNum === 5 && idx === 3) ? "bg-Blue-200" : "border-white border text-white"}`}>
                      {idx + 1}
                    </div>
                  )
                })
              }
            </div>
            <div className="mt-9 mx-auto w-[95%] bg-white rounded-xl h-fit pt-8 pb-6 px-7 drop-shadow-xl">
              <Activity mode={stepNum===1 ? "visible" : "hidden"}>
                <PersonalInfo
                  onFormSubmit={onFormSubmit}
                />
              </Activity>
              <Activity mode={stepNum===2 ? "visible" : "hidden"}>
                <SelectPlan                
                  onFormSubmit={onFormSubmit}
                  isYearly={isYearly}
                  setIsYearly={setIsYearly}
                />
              </Activity>
              <Activity mode={stepNum===3 ? "visible" : "hidden"}>
                <PickAddOns                
                  onFormSubmit={onFormSubmit}
                  isYearly={isYearly}
                />
              </Activity>
              <Activity mode={stepNum===4 ? "visible" : "hidden"}>
                <FinishingUp
                  isYearly={isYearly}
                  plan={allFormData.get("plan") as string}
                  addOns={allFormData.getAll("addOn") as string[] | null}
                  setStepNum={setStepNum}
                />
              </Activity>
              <Activity mode={stepNum===5 ? "visible" : "hidden"}>
                <ThankYou/>
              </Activity>
            </div>
          </div>
        </div>
        <div className={`${stepNum===5 ? "hidden" : "flex"} items-center ${stepNum > 1 ? "justify-between" : "justify-end"} bg-white w-full min-h-20 px-5`}>
          {stepNum > 1 && 
          <button 
            title="prevBtn"
            type="button"
            className="text-Grey-500 px-4 py-2.5 h-fit cursor-pointer"
            onClick={() => setStepNum(prevNum => prevNum - 1)}
          >
            Go Back
          </button>}
          {stepNum === 4 ?
          <button 
            title="confirmBtn"
            type="button"
            onClick={onConformClick}
            className="bg-Purple-600 duration-250 hover:opacity-75 text-white w-25 py-2.5 h-fit rounded-sm cursor-pointer"
          >
            Confirm
          </button>
            :
          <button
            title="nextBtn"
            type="submit"
            form={formIds[stepNum]}
            className="bg-Blue-950 duration-250 hover:opacity-75 text-white w-25 py-2.5 h-fit rounded-sm cursor-pointer"
          >
            Next Step
          </button>}
        </div>       
      </main>
    </div>
  );
}


