import { FormEvent, useState } from "react";

interface IPersonalInfoProps {
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function PersonalInfo({ onFormSubmit }: IPersonalInfoProps) {
    const [showInvalid, setShowInvalid] = useState(false)

  return (
    <>
        <h1 className="text-3xl md:text-[33px] font-bold">Personal info</h1>
        <p className="text-Grey-500 mt-3 mb-5">Please provide your name, email adress and phone number.</p>
        <form
            id="personalInfoForm"
            onSubmit={e => onFormSubmit(e)}
            onInvalid={() => setShowInvalid(true)}
            className="flex flex-col"
        >
            <label
                htmlFor="name"
                className={`${showInvalid ? "form-error" : ""} after:text-Red-500 after:grow after:text-right w-full mb-0.5 flex md:mb-1`}
            >
                Name
            </label>
            <input
                id="name"
                name="name"
                type="name"
                placeholder="e.g Stephen King"
                required
                className={`mb-3 px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm md:rounded-lg ${showInvalid && "invalid:border-Red-500"}`}
            />
            <label 
                htmlFor="email"
                className={`${showInvalid ? "form-error-email" : ""} after:text-Red-500 after:grow after:text-right w-full mb-0.5 flex md:mb-1`}
            >
                Email Address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g stephenking@lorem.com"
                required
                className={`mb-3 px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm md:rounded-lg ${showInvalid && "invalid:border-Red-500"}`}
            />
            <label 
                htmlFor="phone"
                className={`${showInvalid ? "form-error" : ""} after:text-Red-500 after:grow after:text-right w-full mb-0.5 flex md:mb-1`}
            >
                Phone Number
            </label>                  
            <input
                id="phone"
                name="phone"
                type="phone"
                placeholder="e.g. +1 234 567 890"
                required
                className={`px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm md:rounded-lg ${showInvalid && "invalid:border-Red-500"}`}
            />                               
        </form>
    </>
  );
}


