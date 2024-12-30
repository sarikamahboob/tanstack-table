import { useEffect, useState } from "react"

const DebouncedInput = ({
  value: initValue, debounce = 500, onChange, ...props
}) => {
  const [value, setValue] = useState(initValue)

  useEffect(()=> {
    setValue(initValue)
  },[initValue])

  useEffect(()=> {
    const timeout = setTimeout(()=>{
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  },[value])

  return (
    <div>
      <input 
        {...props} 
        value={value} 
        onChange={(e)=> setValue(e.target.value)} 
        type="text" 
      />
    </div>
  )
}

export default DebouncedInput