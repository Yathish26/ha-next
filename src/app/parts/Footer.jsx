import Contact from "../../Data/data";
import Link from "next/link";
import { leagueSpartan } from "@/lib/font";

export default function Footer() {
  return (
    <footer className="bg-gray-900 font-spartan text-lg text-white py-8 mo:h-[45rem]">
      <div className={`${leagueSpartan.className} container mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-4">Email: <a href={`mailto:${Contact.email}`} className="text-purple-400 hover:underline">{Contact.email}</a></p>
            <div className="flex space-x-4">
              <a target="_blank" href={Contact.Instagram} className="text-purple-400 hover:underline">
                <img className='w-8 h-8' src="/socialsvg/insta.svg" alt="Instagram" /></a>
              <a target="_blank" href={Contact.Linkedin} className="text-purple-400 hover:underline">
                <img className='w-8 h-8' src="/socialsvg/linkedin.svg" alt="Linkedin" /></a>
              <a target="_blank" href={Contact.X} className="text-purple-400 hover:underline">
                <img className='w-8 h-8' src="/socialsvg/x.svg" alt="X" /></a>
              <a target="_blank" href={Contact.Threads} className="text-purple-400 hover:underline">
                <img className='w-8 h-8' src="/socialsvg/threads.svg" alt="Threads" /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul>
              <li className="mb-2"><Link href="/about" className="text-purple-400 hover:underline">About Us</Link></li>
              <li className="mb-2"><Link href="/free-listing" className="text-purple-400 hover:underline">Register Business</Link></li>
              <li className="mb-2"><Link href="/user/jobs" className="text-purple-400 hover:underline">Post a Job</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-purple-400 hover:underline">Contact</Link></li>
              <li className="mb-2"><Link href="/blog" className="text-purple-400 hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Legal Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><Link href="/privacy-policy" className="text-purple-400 hover:underline">Privacy Policy</Link></li>
              <li className="mb-2"><Link href="/terms-of-service" className="text-purple-400 hover:underline">Terms of Service</Link></li>
              <li className="mb-4">© {new Date().getFullYear()} Hire Arrive</li>
            </ul>
          </div>
        </div>


      </div>
    </footer >
  );
}
