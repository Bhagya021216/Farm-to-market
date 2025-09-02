export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-4 px-4 mt-8 pl-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2 font-bold text-lg text-green-400">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 mr-1">🌱</span>
            Farm2Market
          </div>
          <div className="text-sm mb-4">Connecting farmers and sellers directly for fresher produce and fairer prices.</div>
          <div className="flex gap-2 mt-2">
            <a href="mailto:info@farm2market.com" className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg></a>
            <a href="tel:+1234567890" className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2" aria-label="Phone"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></a>
            <a href="#" className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">For Farmers</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">List Your Produce</a></li>
            <li><a href="#" className="hover:underline">Manage Orders</a></li>
            <li><a href="#" className="hover:underline">Pricing Guide</a></li>
            <li><a href="#" className="hover:underline">Success Stories</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">For Sellers</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Browse Produce</a></li>
            <li><a href="#" className="hover:underline">Place Orders</a></li>
            <li><a href="#" className="hover:underline">Track Deliveries</a></li>
            <li><a href="#" className="hover:underline">Quality Guarantee</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8">© {new Date().getFullYear()} Farm2Market. All rights reserved.</div>
    </footer>
  );
}
