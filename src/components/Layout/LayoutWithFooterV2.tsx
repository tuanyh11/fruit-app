import React from 'react'
import FooterV1 from '../common/Footer/FooterV1'
import FooterV2 from '../common/Footer/FooterV2'

const LayoutWithFooterV1: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div>
        {children}
        <FooterV2/>
    </div>
  )
}

export default LayoutWithFooterV1