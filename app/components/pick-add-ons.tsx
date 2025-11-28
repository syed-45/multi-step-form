import { FormEvent, } from "react";

interface IPickAddOnsProps {
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void,
    isYearly: boolean,
}

export const addOnsData = [
    {
        addOn:"Online service",
        description:"Access to multiplayer games",
        monthlyPricing: 1
    },
    {
        addOn:"Larger storage",
        description: "Extra 1TB of cloud save",
        monthlyPricing: 2
    },
    {
        addOn:"Customizable Profile",
        description:"Custom theme on your profile",
        monthlyPricing:2
    }
]

export const PickAddOns = ({ onFormSubmit, isYearly }: IPickAddOnsProps) => {    

    return (
        <>
            <h1 className="text-3xl font-bold">Pick add-ons</h1>
            <p className="text-Grey-500 mt-3 mb-5">Add-ons help enhance your gaming experience.</p>
            <form
                id="pickAddOnsForm"
                onSubmit={e => onFormSubmit(e)}
            >
                <fieldset>
                   {addOnsData.map(addOn => {
                            return (
                                <AddOn 
                                    key={addOn.addOn}
                                    {...addOn}
                                    isYearly={isYearly}
                                />
                            )
                        }
                    )}
                </fieldset>
            </form>
        </>
    )
}


interface IAddOnProps {
    addOn: string
    description: string
    monthlyPricing: number
    isYearly: boolean,
}

const AddOn = ({addOn, description, monthlyPricing, isYearly }: IAddOnProps) => {
    const pricing = isYearly ? monthlyPricing * (12 - 2) : monthlyPricing
    const pricingFrequency = isYearly ? "yr" : "mo";
    return (
        <label htmlFor={addOn}>
            <div className={`border py-4 px-4 mb-4 flex items-center justify-start rounded-lg has-checked:border-Purple-600 border-Grey-500`}>
                <input 
                    type="checkbox"
                    name="addOn"
                    id={addOn}
                    title={addOn}
                    value={addOn} 
                    className="peer appearance-none"
                />
                <div className={`peer-checked:bg-Purple-600 peer-checked:border-0 flex justify-center items-center min-w-7 min-h-7 mr-4 rounded-md border border-Grey-500`}>
                    <svg className="w-4 h-3 stroke-white stroke-2" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9">
                        <path fill="none" d="m1 4 3.433 3.433L10.866 1"/>
                    </svg>
                </div>
                <div className="flex flex-col justify-start">
                    <div className="font-medium capitalize">{addOn}</div>
                    <div className="text-Grey-500 text-sm">
                        {description}
                    </div>                    
                </div>
                <div className="text-Purple-600 grow text-right ml-4">+${pricing}/{pricingFrequency}</div>
            </div>
        </label>
    )
}
