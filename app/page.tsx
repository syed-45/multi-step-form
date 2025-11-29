"use client"
import { Activity, FormEvent, JSX, useState } from "react";
import Image from "next/image";
import PersonalInfo from "./components/personal-info";
import SelectPlan from "./components/select-plan";
import { PickAddOns } from "./components/pick-add-ons";
import { FinishingUp } from "./components/finishing-up";
import { ThankYou } from "./components/thank-you";

interface ISteps {
  name: string;
  element: JSX.Element
  formId?: string;
}

export default function Page() {
  const [stepNum, setStepNum] = useState(1)
  const [allFormData, setAllFormData] = useState<FormData>(new FormData)
  const [isYearly, setIsYearly] = useState(false)


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

  const onConfirmClick = () => {
    setStepNum(5)
    //axios.post(allFormdData) ...
  }

  const stepsData: ISteps[] = [
    {
      name: "YOUR INFO",
      formId: "personalInfoForm",
      element: <PersonalInfo
              onFormSubmit={onFormSubmit}
            />
    },
    {
      name: "SELECT PLAN",
      formId: "selectPlanForm",
      element: <SelectPlan                
              onFormSubmit={onFormSubmit}
              isYearly={isYearly}
              setIsYearly={setIsYearly}
            />
    },
    {
      name: "ADD-ONS",
      formId: "pickAddOnsForm",
      element: <PickAddOns                
              onFormSubmit={onFormSubmit}
              isYearly={isYearly}
            />
    },
    {
      name: "SUMMARY",
      element: <FinishingUp
                  isYearly={isYearly}
                  plan={allFormData.get("plan") as string}
                  addOns={allFormData.getAll("addOn") as string[] | null}
                  setStepNum={setStepNum}
                />
    },
    {
      name: "SUMMARY",
      element: <ThankYou/>
    }
  ]

  return (
    <div className="flex justify-center items-center min-h-screen min-w-[375px]">
      <main className="w-full min-h-dvh flex flex-col md:min-h-100 max-w-5xl md:bg-white md:rounded-xl">
        <div className="grid place-content-stretch grow md:grow-0">
          <div className="[grid-area:1/1] h-full">
            <Image src="/bg-sidebar-mobile.svg" alt="sidebarMobile" width={375} height={172} className="min-w-dvw md:hidden"/>
            <Image src="/bg-sidebar-desktop.svg" alt="sidebarDesktop" width={274} height={568} className="hidden md:block aspect-274/568 w-75 pl-4 py-4"/>
          </div>
          <div className="[grid-area:1/1] mt-10 flex justify-center h-fit gap-4 md:w-[274px] md:flex-col md:justify-start md:mt-12 md:ml-10 md:gap-5">
            {Array(4).fill(0).map((zero,idx) => {
                const stepNumInArr = idx + 1
                return (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className={`rounded-full size-8 flex justify-center items-center font-medium ${stepNumInArr === stepNum || (stepNum === 5 && stepNumInArr === 4) ? "bg-Blue-200" : "border-white border text-white"}`}>
                      {stepNumInArr}
                    </div>
                    <div className="hidden md:flex md:flex-col text-left">
                      <div className="text-Grey-500 text-sm">STEP {stepNumInArr}</div>
                      <div className="font-medium text-white tracking-wider">{stepsData[stepNumInArr - 1].name}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="[grid-area:1/1] md:ml-[300px] flex flex-col">
            <div className={`mt-27 mx-auto w-[95%] bg-white rounded-xl h-fit pt-8 pb-6 drop-shadow-xl md:w-4/5 md:drop-shadow-none ${stepNum===5 ? "md:mt-0 content-center h-full px-14" : "md:mt-8 px-7 md:px-2 lg:px-7"}`}>
              {stepsData.map((step, idx) => {
                  return (
                    <Activity
                      key={idx}
                      mode={stepNum=== idx + 1 ? "visible" : "hidden"}
                    >
                      {step.element}
                    </Activity>
                  )
                })
              }              
            </div>
            <div className="grow content-end">
              <div className={`${stepNum===5 ? "hidden" : "flex"} items-center ${stepNum > 1 ? "justify-between" : "justify-end"} bg-white w-full min-h-20 h-20 px-5 md:px-7 md:pb-8 md:w-4/5 md:mx-auto`}>
                {stepNum > 1 && 
                <button 
                  title="prevBtn"
                  type="button"
                  className="text-Grey-500 px-4 py-2.5 h-fit cursor-pointer duration-250 hover:text-Blue-950"
                  onClick={() => setStepNum(prevNum => prevNum - 1)}
                >
                  Go Back
                </button>}
                {stepNum === 4 ?
                <button 
                  title="confirmBtn"
                  type="button"
                  onClick={onConfirmClick}
                  className="bg-Purple-600 duration-250 hover:opacity-75 text-white w-25 py-2.5 h-fit rounded-sm cursor-pointer md:rounded-lg md:px-6 md:py-3 md:w-fit"
                >
                  Confirm
                </button>
                  :
                <button
                  title="nextBtn"
                  type="submit"
                  form={stepsData[stepNum - 1].formId}
                  className="bg-Blue-950 duration-250 hover:opacity-75 text-white w-25 py-2.5 h-fit rounded-sm cursor-pointer md:rounded-lg md:px-6 md:py-3 md:w-fit"
                >
                  Next Step
                </button>}
              </div>    
            </div>
          </div>          
        </div>           
      </main>
    </div>
  );
}


