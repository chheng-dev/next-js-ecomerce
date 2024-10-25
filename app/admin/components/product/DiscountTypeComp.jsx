import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

const DiscountTypeComp = ({items, onSelectedDiscountType, selectedDiscountType}) => {
  return (
    <Select
      items={items}
      label="Discount Type"
      placeholder="Select an discount"
      className="w-full"
      labelPlacement='outside'
      selectedKeys={selectedDiscountType ? [selectedDiscountType] : []}
      value={selectedDiscountType}
      onChange={onSelectedDiscountType}
    >
      {(discount) => <SelectItem>{discount.value}</SelectItem>}
    </Select>
  )
}

export default DiscountTypeComp
