export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">শিক্ষা প্ল্যাটফর্ম</h3>
              <p className="text-gray-300">
                শিক্ষক এবং শিক্ষার্থীদের মধ্যে যোগাযোগ ও সহযোগিতার জন্য একটি সম্পূর্ণ প্ল্যাটফর্ম।
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition duration-300">হোম</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-white transition duration-300">কমিউনিটি</a></li>
                <li><a href="/leaderboard" className="text-gray-300 hover:text-white transition duration-300">লিডারবোর্ড</a></li>
                <li><a href="/exams" className="text-gray-300 hover:text-white transition duration-300">পরীক্ষা</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <span>support@shikkha-platform.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-phone"></i>
                  <span>+880 1XXX-XXXXXX</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>ঢাকা, বাংলাদেশ</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2023 শিক্ষা প্ল্যাটফর্ম। সকল স্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    )
  }