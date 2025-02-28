import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="col-span-2 lg:col-span-1">
    <h2 className="text-2xl font-bold">ReelPro</h2>
    <p className="text-gray-400 mt-2">Your ultimate platform for short video creation and sharing.</p>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 col-span-2">
    <div className="lg:col-span-3">
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
        <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
        <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
        <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
      </ul>
    </div>

    <div className="lg:col-span-3">
      <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-white"><Youtube size={20} /></a>
      </div>
    </div>
  </div>
</div>


        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ReelPro. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
