"use client"
import { useState } from "react";
import Image from "next/image";
import PersonalInfo from "./components/personal-info";
import SelectPlan from "./components/select-plan";

export default function Page() {
  const [stepNum, setStepNum] = useState(2)

  const onFormSubmit = () => setStepNum(prevNum => prevNum + 1)

  const stepsBlocks = [
    <PersonalInfo
      key={1}
      onFormSubmit={onFormSubmit}
    />,
    <SelectPlan
      key={2}
      onFormSubmit={onFormSubmit}
    />
  ]

  return (
    <div className="flex justify-center items-center min-h-screen min-w-[375px]">
      <main className="w-full h-dvh flex flex-col">
        <div className="grid place-content-start">
          <div className="[grid-area:1/1]">
            <Image src="/bg-sidebar-mobile.svg" alt="sidebarMobile" width={375} height={172} className="w-dvw" unoptimized/>
            <div className="w-full h-full bg-Blue-100"></div>
          </div>
          <div className="[grid-area:1/1]">
            <div className="mt-10 flex justify-center gap-4">
              {Array(4).fill(0).map((zero,idx) => {
                  return (
                    <div key={idx} className={`rounded-full size-8 flex justify-center items-center ${idx + 1 === stepNum ? "bg-Blue-200" : "border-white border text-white"}`}>
                      {idx + 1}
                    </div>
                  )
                })
              }
            </div>
            {stepsBlocks[stepNum-1]}
          </div>
        </div>
        <div className="flex items-center justify-end bg-white w-full min-h-20 px-5 fixed bottom-0 left-0">
          <button 
            title="nextBtn"
            type="submit"
            form="personalInfoForm"
            className="bg-Blue-950 text-white  px-4 py-2.5 h-fit rounded-sm cursor-pointer"
          >
            Next Step
          </button>
        </div>       
      </main>
    </div>
  );
}


