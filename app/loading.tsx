import React from 'react'
import ProductLoad from './components/product/ProductLoad'

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
            <div className="relative min-w-28 sm:min-w-36 lg:min-w-44 h-full bg-neutral-300 rounded-lg flex flex-col items-center justify-between cursor-pointer overflow-hidden animate-pulse" key={category}>
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
            <ProductLoad />
          ))}
        </div>
      </div>

      {/* Products */}
    </div>
  )
}

export default loading