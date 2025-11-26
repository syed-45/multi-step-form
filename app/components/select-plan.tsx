import { useState } from "react";
import Image from "next/image";

interface SelectPlanProps {
    onFormSubmit: () => void
}

export default function SelectPlan({ onFormSubmit }: SelectPlanProps) {
    const [isYearly, setIsYearly] = useState(false)
    const plans = [
        {
            planType: "arcade",
            pricing: [9, 90]
        },
        {
            planType: "advanced",
            pricing: [12, 120]
        },
        {
            planType: "pro",
            pricing: [15, 150]
        }
    ]

    return (
    <div className="mt-9 mx-auto w-[95%] bg-white rounded-xl h-fit pt-8 pb-6 px-6 drop-shadow-xl">
        <h1 className="text-3xl font-bold mb-3">Select your plan</h1>
        <form
            id="select-plan-form"
            onSubmit={onFormSubmit}           
        >
            <div className="text-Grey-500 mb-5">You have the option of monthly or yearly billing.</div>
            <fieldset>
                {plans.map((plan, idx) => {
                    return (
                        <Option
                            key={plan.planType}
                            planType={plan.planType}
                            pricingArr={plan.pricing}
                            isYearly={isYearly}
                            idx={idx}
                        />
                    )
                })}
                <div className="w-full py-5 bg-Blue-100 rounded-xl h-full flex justify-center items-center gap-5">
                    <label htmlFor="frequencyToggle" className={`${isYearly && "text-Grey-500"}`}>Monthly</label>
                    <label htmlFor="frequencyToggle" className="w-14 h-fit bg-Blue-950 rounded-2xl p-1 flex">
                        <div className={`flex transition-[flex-grow] duration-250 ${isYearly && "grow"}`}></div>
                        <input
                            type="checkbox"
                            name="frequency"
                            id={"frequencyToggle"}
                            title={"frequencyToggle"}
                            value={"frequencyToggle"} 
                            onChange={(e) => setIsYearly(e.target.checked)}
                            className={`appearance-none`}
                        />
                        <div className="size-4.5 rounded-full bg-white"></div>
                    </label>
                    <label htmlFor="frequencyToggle" className={`${!isYearly && "text-Grey-500"}`}>Yearly</label>
                </div>
            </fieldset>

        </form>
    </div>
    );
}

interface IOptionProps {
    planType: string
    pricingArr: number[]
    isYearly: boolean,
    idx: number
}

const Option = ({ planType, pricingArr, isYearly, idx }: IOptionProps) => {
    const pricing = isYearly ? pricingArr[1] : pricingArr[0];
    const pricingFrequency = isYearly ? "yr" : "mo";
    return (
        <label htmlFor={planType}>
            <div className={`border py-4 px-3 mb-4 flex gap-3 rounded-lg  has-checked:border-Purple-600 has-checked:bg-Blue-100 border-Grey-500`}>
                <input 
                    type="radio"
                    name="plan"
                    id={planType}
                    title={planType}
                    value={planType} 
                    defaultChecked={idx===0}
                    className="appearance-none"
                />
                <Image 
                    unoptimized 
                    alt={planType} 
                    src={`/icon-${planType}.svg`} 
                    width="40" 
                    height="40" 
                    className="w-10" 
                />
                <div className="flex flex-col justify-start">
                    <div className="font-medium capitalize">{planType}</div>
                    <div className="text-Grey-500">
                        ${pricing}/{pricingFrequency}
                    </div>
                    {isYearly &&<div>2 months free</div>}
                </div>
            </div>
        </label>
    )
}
