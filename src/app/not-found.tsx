import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Could not find requested resource</h2>
      <Link  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" href="/">Return Home</Link>

    </div>
  </div>

  )
}