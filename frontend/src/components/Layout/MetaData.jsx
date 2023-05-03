import React from 'react'
import Helmet from 'react-helmet'
import { favicon } from '../../logo'

const MetaData = ({title}) => {
  return (
     <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
     </Helmet>
  )
}

export default MetaData