import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'

const Search = () => {
  const { SetShow } = useContext(StoreContext)
  return (
    <div className='h-[10vh]'>
      <div className='w-full  flex items-center justify-center'>
        <form action="">
          <div className='pt-3 flex relative ' >
            <img onClick={() => SetShow(false)} className='w-9 absolute md:-left-16 -left-4  hover:cursor-pointer' src="menu-icon.png" alt="" />
            <div>
              <input className='text-black xl:pl-12 xl:pr-12 pt-2 pb-2 rounded-md outline-none -pr-20 -pl-20 w-32 sm:w-full ml-14 md:ml-0' type="text" placeholder='Search' />
            </div>
            <button className='bg-white rounded-md -ml-3 '> <img className='w-10' src="search.png" alt="" /> </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Search