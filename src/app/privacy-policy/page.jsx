import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Contact from "@/Data/data";
import { leagueSpartan } from "@/lib/font";

export const metadata = {
    title: "Privacy Policy"
}

export default function PrivacyPolicy() {
    const updatedDate = '01/09/2024'
    const companyname = 'Hire Arrive'
    const compmail = Contact.email
    const website = Contact.Website

    return (
        <div className="flex-1 flex flex-col">
            <Header />
            <div className={`bg-gray-900 ${leagueSpartan.className} text-xl text-gray-300 p-6 md:p-12`}>
                <h1 className="text-4xl font-bold text-purple-500 mb-6">Privacy Policy</h1>
                <p className="mb-4">This Privacy Policy explains how {companyname} collects, uses, and discloses your personal information when you visit our website or use our services.</p>
                <p className="mb-8">Last updated: {updatedDate}</p>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Information We Collect</h2>
                <p className="mb-4">
                    When you visit our website, we may collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li>Personal Data: Information that can be used to identify you, such as your name, email address, phone number, and other details you provide.</li>
                    <li>Usage Data: Information about how you interact with our website, including your IP address, browser type, and the pages you visit.</li>
                    <li>Cookies: Data collected through cookies and similar tracking technologies, which help us improve your browsing experience.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li>To provide, operate, and maintain our website and services.</li>
                    <li>To improve and personalize your experience on our website.</li>
                    <li>To communicate with you, respond to your inquiries, and send you updates.</li>
                    <li>To analyze how our website is used so we can make improvements.</li>
                    <li>To protect against fraud and ensure the security of our website.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Sharing Your Information</h2>
                <p className="mb-8">
                    We do not share your personal information with third parties except in the following cases:
                </p>
                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li>With your consent.</li>
                    <li>To comply with legal obligations or court orders.</li>
                    <li>With service providers who assist us in operating our website, provided they agree to keep your information confidential.</li>
                    <li>In connection with a merger, acquisition, or sale of assets, where your information may be transferred as part of the transaction.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Your Rights</h2>
                <p className="mb-4">
                    You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li>Access: You can request access to the personal information we hold about you.</li>
                    <li>Correction: You can request that we correct any inaccuracies in your personal information.</li>
                    <li>Deletion: You can request that we delete your personal information, subject to certain legal obligations.</li>
                    <li>Objection: You can object to the processing of your personal information in certain circumstances.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Data Security</h2>
                <p className="mb-8">
                    We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Changes to This Privacy Policy</h2>
                <p className="mb-8">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>

                <h2 className="text-2xl font-semibold text-purple-500 mb-4">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at
                    <a href={`mailto:${compmail}`} className="text-purple-500 underline hover:text-purple-400 ml-1">{compmail}</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
}