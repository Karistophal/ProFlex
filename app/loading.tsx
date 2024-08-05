import React from 'react'

function loading() {
  return (
    <div className="flex flex-col items-center min-h-screen  px-5 md:px-16 lg:px-24 py-12 gap-12 ">
      {/* Head */}
      <div className="relative w-full h-[30vw] md:h-96 bg-neutral-300 animate-pulse rounded-lg">
      </div>


      {/* categories */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-end pb-4">
          <div className="text-3xl sm:text-4xl font-bold">Catégories</div>
          <div className="">Voir plus</div>
        </div>
        <div className="w-full h-28 sm:h-36 lg:h-44 flex gap-4 flex-wrap overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((category) => (
            <div className="relative min-w-28 sm:min-w-36 lg:min-w-44 h-full bg-neutral-300 rounded-lg flex flex-col items-center justify-between cursor-pointer overflow-hidden animate-pulse">
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-end pb-4">
          <div className="text-3xl sm:text-4xl font-bold">Tendances</div>
          <div className="">Voir plus</div>
        </div>
        <div className="w-full h-50 flex gap-4 flex-wrap overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <div className="w-[calc(50%-0.5rem)] sm:w-52 sm:min-w-52 lg:w-60 sm:h-fit flex flex-col items-center gap-2 cursor-pointer animate-pulse" key={product}>
              <div className="w-full h-[30svw] sm:h-40 lg:h-48 rounded-lg bg-gray-200"></div>
              <div className="w-full flex flex-col flex-1 justify-between">
                {/* Name and price */}
                <div className="flex justify-between">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-6 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
    </div>
  )
}

export default loading