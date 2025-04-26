import Contact from "../../Data/data";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { leagueSpartan } from "@/lib/font";

export const metadata = {
    title: "Contact Us"
}

export default function ContactUs() {
    return (
        <div className="flex-1 flex flex-col">
            <Header />
            <div className={`container bg-gray-900 mx-auto text-white py-8 px-4 ${leagueSpartan.className}`}>
                <section className="text-center mb-12">
                    <h1 className="text-4xl  font-bold mb-4">Contact Us</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        We’d love to hear from you! Whether you have questions, feedback, or just want to get in touch, feel free to reach out to us.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
                    <div className="space-y-6 ">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Email Address</h3>
                            <p className="text-gray-400 text-xl">
                                <a href={`mailto:${Contact.email}`} className="text-purple-400 hover:underline">{Contact.email}</a>
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                            <div className="flex space-x-4 text-xl">
                                <a href={Contact.Instagram} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Instagram</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}