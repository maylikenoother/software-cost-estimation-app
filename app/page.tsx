import Image from 'next/image'
import Link from 'next/link'

const home = () => {
  return (
    <div className="bg-lime-950 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-11/12 md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Software Cost Estimation</h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6">Calculate the cost of your software project.</p>
      <div className="flex justify-center">
          <Link href="/start" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 text-lg text-center inline-block ">
            Start Estimation
          </Link>
        </div>
    </div>
  </div>
  )
}

export default home;


