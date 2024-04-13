// ** React Imports
import { useEffect, useState } from 'react'

interface CheckboxProps {
  item: { label: string; value: string }[]
  name?: string
  value: string[]
  onChange: (value: string[]) => void
}

const CustomCheckbox = ({ item, value, onChange, name }: CheckboxProps) => {
  const [allChecked, setAllChecked] = useState<boolean>(false)

  useEffect(() => {
    if (allChecked) {
      onChange(item.map((i) => i.value) || [])
      return
    }
    onChange(value.filter((val) => val !== '전체'))
  }, [allChecked])

  const handleChange = (itemValue: string) => {
    let updatedValues: string[]

    if (itemValue === '전체') {
      setAllChecked(!allChecked)
      updatedValues = !allChecked ? item.map((i) => i.value) : []
    } else {
      updatedValues = value.includes(itemValue)
        ? value.filter((val) => val !== itemValue)
        : [...value, itemValue]
      const isAllChecked =
        updatedValues.length === (item.length || 0) - 1 &&
        !updatedValues.includes('전체')
      setAllChecked(isAllChecked)
    }
    onChange(updatedValues)
  }

  return (
    <div className="flex items-center">
      {item.map((checkboxItem, index) => (
        <div key={index} className="flex items-center">
          <input
            name={name}
            type="checkbox"
            checked={value.includes(checkboxItem.value)}
            onChange={() => handleChange(checkboxItem.value)}
            className="mx-2"
          />
          <label>{checkboxItem.label}</label>
        </div>
      ))}
    </div>
  )
}

export default CustomCheckbox
