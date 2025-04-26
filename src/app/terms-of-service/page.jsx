import Footer from "../parts/Footer";
import Header from "../parts/Header";
import TermSheet from "@/Data/terms";
import { leagueSpartan } from "@/lib/font";

export const metadata = {
    title: "Terms of Service",
}

export default function TermsOfService() {
    const updatedDate = '01/10/2024'
    const companyname = 'Hire Arrive'

    return (
        <div className="flex-1 bg-gray-900 flex flex-col">
            <Header />
            <div className={`bg-gray-900 ${leagueSpartan.className} text-xl text-gray-300 p-6 md:p-12`}>
                <h1 className="text-4xl font-bold text-purple-500 mb-6">Terms of Service</h1>
                <p className="mb-4">By using our website, you agree to be bound by these terms. If you do not agree to these terms, please do not use our website.</p>
                <p className="mb-8">Last updated: {updatedDate}</p>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">
                    Welcome to {companyname}! These Terms and Conditions govern your use of our services, including the deployment of gig workers/laborers to clients. By using our services, you agree to these terms.
                </h2>

                <ul className="list-disc list-inside space-y-6">
                    {TermSheet.map((term, index) => (
                        <Terms
                            key={index}
                            title={term.title}
                            p={term.p}
                            p1={term.p1}
                            p2={term.p2}
                            p3={term.p3}
                            p4={term.p4}
                            p5={term.p5}
                            p6={term.p6}
                        />
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

const Terms = ({ title, p, p1, p2, p3, p4, p5, p6 }) => {
    return (
        <>
            {title && <li className="font-semibold text-xl text-purple-500">{title}</li>}

            {p && <p className="ml-6">- {p}</p>}
            {p1 && <p className="ml-6">- {p1}</p>}
            {p2 && <p className="ml-6">- {p2}</p>}
            {p3 && <p className="ml-6">- {p3}</p>}
            {p4 && <p className="ml-6">- {p4}</p>}
            {p5 && <p className="ml-6">- {p5}</p>}
            {p6 && <p className="ml-6">- {p6}</p>}
        </>
    )
}
