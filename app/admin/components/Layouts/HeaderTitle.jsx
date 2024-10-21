import { Button } from '@nextui-org/react'
import React from 'react'

const HeaderTitle = ({ title, btnTitle, onClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h4>{title}</h4>
      <Button color="primary" size="sm" onClick={onClick}>
        {btnTitle}
      </Button>
    </div>
  )
}

export default HeaderTitle
