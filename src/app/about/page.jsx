import Footer from "../parts/Footer";
import Header from "../parts/Header";
import { leagueSpartan } from "@/lib/font";


export const metadata = {
    title: "About Us",
};

export default function AboutUs() {
    return (
        <div className="flex-1 flex flex-col">
            <Header />
            <div className={`container mx-auto bg-gray-900 py-8 px-4 text-white ${leagueSpartan.className}`}>
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg max-w-3xl mx-auto">
                        Welcome to Hire Arrive! What started as a small project for fun has now grown into a meaningful platform. We aimed to help people list their services and connect with those in need. To our surprise, it worked out, and now we proudly serve more customer needs, creating value for everyone involved.
                    </p>
                </section>

                {/* Our Mission */}
                <section className="mb-12">
                    <h2 className="text-3xl text-center font-semibold mb-6">Our Mission</h2>
                    <p className="text-lg text-center max-w-2xl mx-auto">
                        Every human possesses unique skills, and we believe no skill should go unnoticed or wasted. Somewhere in the world, there is someone who values that skill and might need it. At the same time, finding local services in one’s hometown can often be a challenge. That’s why we created Hire Arrive—an all-in-one hub to connect people with services they need, right in their local areas.
                    </p>
                </section>

                {/* Our Team */}
                <section className="mb-12">
                    <h2 className="text-3xl text-center font-semibold mb-6">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <img src="https://iili.io/25BAyXf.jpg" draggable="false" alt="Team Member 1" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                            <h3 className="text-xl text-center font-semibold mb-2">Yathish Acharya</h3>
                            <p className="text-gray-400 text-center">Frontman</p>
                            <p className="mt-4 text-center">Yathish is building Hire Arrive, adding new features, and keeping it up-to-date while resolving bugs to ensure a seamless experience for users.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <img draggable="false" src="https://iili.io/25BRJql.jpg" alt="Team Member 2" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                            <h3 className="text-xl text-center font-semibold mb-2">Justin D'souza</h3>
                            <p className="text-center text-gray-400">Marketing</p>
                            <p className="mt-4 text-center">Justin leads the marketing efforts for Hire Arrive, helping us reach more people, grow our customer base, and drive sales effectively.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}