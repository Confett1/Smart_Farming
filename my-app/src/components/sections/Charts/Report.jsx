
export function Report() {
  const [reportData] = useState({
    title: "Quarterly Business Report",
    date: new Date().toLocaleDateString(),
    author: "John Doe",
    department: "Marketing",
    summary:
      "This report summarizes the quarterly performance of our marketing campaigns and provides insights for future strategy.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* A4 Report Preview/Print Area */}
      <div className="bg-white shadow-lg">
        <div className="w-[210mm] h-[297mm] mx-auto bg-white p-[20mm] flex flex-col">
          {/* Report Header */}
          <div className="flex justify-between items-start border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{reportData.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{reportData.date}</span>
              </div>
            </div>
            <div className="flex items-center justify-center bg-gray-100 h-16 w-16 rounded">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
          </div>

          {/* Report Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Author</h3>
              <p className="text-base">{reportData.author}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="text-base">{reportData.department}</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm">{reportData.summary}</p>
            </div>
          </div>

          {/* Report Content */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Report Details</h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{reportData.content}</p>
            </div>
          </div>
 
          {/* Report Footer */}
          <div className="mt-auto pt-6 border-t text-sm text-gray-500 flex justify-between">
            <span>Generated on {new Date().toLocaleDateString()}</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Report;