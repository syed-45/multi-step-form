import { Dispatch, SetStateAction, } from "react";
import { plansData } from "./select-plan";
import { addOnsData as allAddOnsData } from "./pick-add-ons";

interface IFinishingUpProps {
    setStepNum: Dispatch<SetStateAction<number>>
    isYearly: boolean,
    plan: string,
    addOns: string[] | null
}

export const FinishingUp = ({ setStepNum, isYearly, plan, addOns }: IFinishingUpProps) => {
    const frequencyText = isYearly ? "Yearly" : "Monthly";
    const frequencyTextShortened = isYearly ? "yr" : "mo";
    
    const monthlyPlanPricing = plansData.find(planInArr => planInArr.planType === plan)!.monthlyPricing
    const planPricing = isYearly ? monthlyPlanPricing * (12 - 2) : monthlyPlanPricing
    const addOnsWithPricing = addOns?.map(addOn => {
        const addOnMonthlyPricing =  allAddOnsData.find(addOnInarr => addOnInarr.addOn === addOn)!.monthlyPricing
        const addOnPricing = isYearly ? addOnMonthlyPricing * (12 - 2) : addOnMonthlyPricing
            return {
                addOn: addOn,
                pricing: addOnPricing
            }
        }
    )
    const totalAddOnPricing = addOnsWithPricing===undefined ? 0 : addOnsWithPricing.reduce((acc, curr) => acc + curr.pricing, 0)
    const totalPricing = planPricing + totalAddOnPricing

    const onChangeClick = () => {
        setStepNum(2)
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Finishing up</h1>
            <p className="text-Grey-500 mt-3 mb-5">Double-check everything looks OK before confirming.</p>
            <div className="bg-Blue-100 rounded-lg p-4 ">
                <div className="flex border-b border-Grey-500 pb-3 mb-4">
                    <div className="text-left grow">
                        <div className="capitalize font-medium">{plan} ({frequencyText})</div>
                        <button 
                            className="underline text-Grey-500 duration-250 hover:text-Purple-600 hover:cursor-pointer"
                            onClick={onChangeClick}
                        >
                            Change
                        </button>
                    </div>
                    <div className="font-bold content-center">${planPricing}/{frequencyTextShortened}</div>
                </div>
                {addOnsWithPricing!==undefined && addOnsWithPricing.map((addOn, idx) => {
                        return (
                            <div
                                key={addOn.addOn}
                                className={`flex ${idx===addOnsWithPricing.length-1 ? "" : "mb-3"}`}
                            >
                                    <div className="grow text-left text-Grey-500">{addOn.addOn}</div>
                                    <div className="text-right">+${addOn.pricing}/{frequencyTextShortened}</div>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="flex px-4 mt-6 mb-2">
                <div className="grow text-Grey-500">Total (per {isYearly ? "year" : "month"})</div>
                <div className="text-Purple-600 font-bold">+${totalPricing}/{frequencyTextShortened}</div>
            </div>
        </>
    )
}

