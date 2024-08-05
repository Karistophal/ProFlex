import React from 'react'

function loading() {
  return (
    <div className="flex flex-col gap-24 w-full justify-center py-5 pb-10 md:py-20 xl:px-20 md:px-20 px-4 min-h-[calc(100vh-4rem)]">
      <div className="flex h-full w-full items-center lg:flex-row flex-col">
        <div className="flex mb-10 flex-col gap-8 lg:w-3/5 w-full md:min-w-[450px] lg:mr-14 bg-opacity-10 p-4 rounded-md">
          <div className="w-full sm:h-[500px] h-[200px] object-cover rounded-3xl animate-pulse bg-black bg-opacity-10 " />
          <div className="w-full flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map((img, index) => (
              <div className="w-1/2 md:w-1/4 h-[25vw] sm:h-40 object-cover cursor-pointer border-2 rounded-xl border-transparent hover:border-blue-500 animate-pulse bg-black bg-opacity-10" key={index} />
            ))}
          </div>
        </div>

        <div className=" h-3/4 flex flex-col items-between gap-8 lg:w-1/2 w-full">

          {/* Name */}
          <h1 className="hidden lg:block text-5xl font-bold animate-pulse bg-black bg-opacity-10 text-transparent w-fit">Product name</h1>
          <div className="flex flex-col gap-2 max-w-[600px]">
            <div className="w-full h-6 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
            <div className="w-[calc(100%-2 rem)] h-6 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
            <div className="w-[calc(100%-0.5rem)] h-6 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
            <div className="w-[calc(100%-1.5rem)] h-6 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
          </div>
            
          {/* Price */}
          <div className="flex gap-4 flex-col">
            <div className="w-40 h-8 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
            <div className="w-32 h-10 rounded-md animate-pulse bg-black bg-opacity-10 text-transparent" />
          </div>

          {/* Types */}
          <div className="flex gap-5">
            <div className="text-md w-20 h-8 rounded animate-pulse bg-black bg-opacity-10 border-2"></div>
            <div className="text-md w-20 h-8 rounded animate-pulse bg-black bg-opacity-10 border-2"></div>
            <div className="text-md w-20 h-8 rounded animate-pulse bg-black bg-opacity-10 border-2"></div>
          </div>
          {/* Payement */}
          <div className="flex gap-6">
            <div className="h-14 w-32 flex items-center rounded animate-pulse bg-black bg-opacity-10" />
            <div className="h-14 w-44 flex items-center rounded animate-pulse bg-black bg-opacity-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading