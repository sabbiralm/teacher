export default function LeaderboardTable({ teacher, data }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 text-white p-4">
          <h2 className="text-xl font-semibold">{teacher} - ক্লাস লিডারবোর্ড</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">র‍্যাংক</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিক্ষার্থীর নাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্কোর</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অগ্রগতি</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((student, index) => (
                <tr key={index} className={index < 3 ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {student.rank === 1 && <i className="fas fa-trophy text-yellow-500 mr-2"></i>}
                      {student.rank === 2 && <i className="fas fa-trophy text-gray-400 mr-2"></i>}
                      {student.rank === 3 && <i className="fas fa-trophy text-orange-500 mr-2"></i>}
                      <span className={`font-semibold ${student.rank <= 3 ? 'text-lg' : ''}`}>
                        {student.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">{student.score}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }