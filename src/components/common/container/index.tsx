import React from 'react'


const index = ({children}: React.PropsWithChildren) => {
  return (
    <div className='container mx-auto lg:w-[1200px] px-[15px]'>
        {children}
    </div>
  )
}

export default index