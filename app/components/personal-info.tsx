import { useState } from "react";

interface IPersonalInfoProps {
    onFormSubmit: () => void
}

export default function PersonalInfo({ onFormSubmit }: IPersonalInfoProps) {
    const [showInvalid, setShowInvalid] = useState(false)

  return (
    <div className="absolute top-25.5 left-1/2 -translate-x-1/2 w-[95%] bg-white rounded-xl h-fit pt-8 pb-6 px-6 drop-shadow-xl">
        <h1 className="text-3xl font-bold">Personal info</h1>
        <p className="text-Grey-500 mt-3 mb-5">Please provide your name, email adress and phone number.</p>
        <form
            id="personalInfoForm"
            onSubmit={onFormSubmit}
            onInvalid={() => setShowInvalid(true)}
        >
            <label 
                htmlFor="name"
                className="w-full mb-0.5"
            >
                Name
            </label> 
            <input
                name="name"
                type="name"
                placeholder="e.g Stephen King"
                required
                className={`mb-3 px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm ${showInvalid && "invalid:border-Red-500"}`}
            />
            <label 
                htmlFor="email"
                className="w-full mb-0.5"
            >
                Email Address
            </label> 
            <input
                name="email"
                type="email"
                placeholder="e.g stephenking@lorem.com"
                required
                className={`mb-3 px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm ${showInvalid && "invalid:border-Red-500"}`}
            />
            <label 
                htmlFor="phone"
                className="w-full mb-0.5"
            >
                Phone Number
            </label> 
            <input
                name="phone"
                type="phone"
                placeholder="e.g. +1 234 567 890"
                required
                className={`px-4 py-3 placeholder:text-Grey-500 border border-Grey-500 w-full rounded-sm ${showInvalid && "invalid:border-Red-500"}`}
            />
        </form>
    </div>
  );
}


