import { FormEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface SelectPlanProps {
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void,
    isYearly: boolean,
    setIsYearly: Dispatch<SetStateAction<boolean>>
}

export const plansData = [
    {
        planType: "arcade",
        monthlyPricing: 9
    },
    {
        planType: "advanced",
        monthlyPricing: 12
    },
    {
        planType: "pro",
        monthlyPricing: 15
    }
]

export default function SelectPlan({ onFormSubmit, isYearly, setIsYearly }: SelectPlanProps) {    

    return (
    <>
        <h1 className="text-3xl font-bold mb-3 md:text-[33px]">Select your plan</h1>
        <form
            id="selectPlanForm"
            onSubmit={e => onFormSubmit(e)}           
        >
            <div className="text-Grey-500 mb-5">You have the option of monthly or yearly billing.</div>
            <fieldset>
                <div className="md:grid grid-cols-3 gap-3 md:h-48">
                    {plansData.map((plan, idx) => {
                            return (
                                <Option
                                    key={plan.planType}
                                    planType={plan.planType}
                                    monthlyPricing={plan.monthlyPricing}
                                    isYearly={isYearly}
                                    idx={idx}
                                />
                            )
                        }
                    )}
                </div>
                <div className="w-full py-5 bg-Blue-50 rounded-xl h-full flex justify-center items-center gap-5 md:mt-4">
                    <label htmlFor="frequencyToggle" className={`${isYearly && "text-Grey-500"}`}>Monthly</label>
                    <label htmlFor="frequencyToggle" className="w-12 h-fit bg-Blue-950 rounded-2xl p-1 flex">
                        <div className={`flex transition-[flex-grow] duration-250 ${isYearly && "grow"}`}></div>
                        <input
                            type="checkbox"
                            name="frequency"
                            id={"frequencyToggle"}
                            title={"frequencyToggle"}
                            value={isYearly ? "yearly" : "monthly"} 
                            onChange={(e) => setIsYearly(e.target.checked)}
                            className={`appearance-none`}
                        />
                        <div className="size-4.5 rounded-full bg-white"></div>
                    </label>
                    <label htmlFor="frequencyToggle" className={`${!isYearly && "text-Grey-500"}`}>Yearly</label>
                </div>
                {!isYearly && <input hidden name="frequency" defaultValue={"monthly"} />} 
            </fieldset>

        </form>
    </>
    );
}

interface IOptionProps {
    planType: string
    monthlyPricing: number
    isYearly: boolean,
    idx: number
}

const Option = ({ planType, monthlyPricing, isYearly, idx }: IOptionProps) => {
    const pricing = isYearly ? monthlyPricing * (12 - 2) : monthlyPricing
    const pricingFrequency = isYearly ? "yr" : "mo";
    return (
        <label 
            htmlFor={planType} 
            className={`border py-4 px-3 mb-4 flex gap-3 rounded-lg  has-checked:border-Purple-600 has-checked:bg-Blue-100 border-Grey-500 cursor-pointer duration-250 hover:border-Purple-600 md:flex-col md:justify-between md:px-4 md:py-5`}
        >
            <input 
                type="radio"
                name="plan"
                hidden
                id={planType}
                title={planType}
                value={planType} 
                defaultChecked={idx===0}
                className="appearance-none"
            />
            <Image
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
        </label>
    )
}
