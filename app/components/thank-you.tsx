import Image from "next/image"

export const ThankYou = () => {
    return (
        <>
            <Image src="/icon-thank-you.svg" alt="thankYouIcon" width={64} height={64} className="mx-auto mb-6 mt-14"/>
            <h1 className="text-3xl font-bold text-center">Thank you!</h1>
            <p className="text-Grey-500 mt-3 mb-14 text-center">
                Thanks for confirming your subscription! We hope you have fun 
                using our platform. If you ever need support, please feel free 
                to email us at support@loremgaming.com.
            </p>
        </>
    )
}