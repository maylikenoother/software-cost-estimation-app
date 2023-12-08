import Image from 'next/image'
import Link from 'next/link'

const home = () => {
  return (
    <div className="bg-lime-950 min-h-screen flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Software Cost Estimation</h1>
      <p className="text-gray-600 mb-4">Calculate the cost of your software project.</p>
      <div className="flex justify-center">
          <Link href="/start" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 text-center ">
            Start Estimation
          </Link>
        </div>
    </div>
  </div>
  )
}

export default home;