import React from 'react'
import { Button, Container, FooterV2 } from '../../components'
import { contactMethods } from '../../lib/data'

const index = () => {
  return (
    <div>
        <Container>
            <div className="my-[50px]">
              <div className="flex justify-center">
                <div className="grid grid-cols-12 md:gap-x-[30px] w-10/12">
                  {
                    contactMethods.map((method, index) => 
                      <div key={index}  className=" col-span-12 md:col-span-4 text-center">
                        <div className="text-main text-[60px]">
                          <i className={method.icon}></i>
                        </div>
                        <div className="">
                          <h2 className="mt-2 text-[18px] font-bold truncate">
                            {method.methodName}:
                            <a href={method.link || '#'} className="text-[#555] transition-main hover:text-main ">{method.methodValue}</a>
                          </h2>
                        </div>
                      </div>  
                    )
                  }
                  <div className=" col-span-12 text-center">
                    <p className="mt-10 mb-20">If the supplier fails to ship your products on time or the product quality does not meet the standards set in your contract, Aloshop will refund the covered amount of your payment.</p>
                  </div>
                </div>
              </div>

              <div className="">
                <h2 className="mb-5 text-[30px] font-bold">CONTACT FROM</h2>
                <div className="">
                  <div className="grid grid-cols-12 gap-y-[30px] md:gap-[30px]">
                    <input type="text" className=' md:col-span-4 col-span-12 h-10 outline-none border border-[#e5e5e5] text-[#999] px-[15px]' placeholder='Name *' />
                    <input type="text" className=' md:col-span-4 col-span-12 h-10 outline-none border border-[#e5e5e5] text-[#999] px-[15px]' placeholder='Email *'/>
                    <input type="text" className=' md:col-span-4 col-span-12 h-10 outline-none border border-[#e5e5e5] text-[#999] px-[15px]' placeholder='Website'/>
                    <textarea name="your-message" cols={40} rows={10} className="col-span-12 border outline-none p-[15px] border-[#e5e5e5] text-[#999]" aria-invalid="false"></textarea>
                  </div>
                </div>
                <div className="mt-[50px]">
                  <Button onClick={() => {}} text="Send Message"/>
                </div>
              </div>

            </div>
              <div className="">
                <FooterV2/>
              </div>
        </Container>
    </div>
  )
}

export default index