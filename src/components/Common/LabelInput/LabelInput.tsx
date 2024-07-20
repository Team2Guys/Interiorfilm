import React from 'react'

interface inputprops{
    label?:string;
    placeholder?:string;
    type?:string;
    id?:string;
    name?:string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    value?:string | number
  }
const LabelInput:React.FC<inputprops> = ({label,placeholder,type,id,name,value,onChange}) => {
  return (
  <div className="w-full px-3 mb-10">
  <label className="block uppercase tracking-wide text-dark text-sm font-bold mb-2">
    {label}
  </label>
  <input className="appearance-none block w-full bg-gray-200 text-dark border border-gray mt-4 0 rounded py-5 px-5 leading-tight focus:outline-none focus:bg-white focus:border-dark outline-dark" 
  id={id} 
  type={type}
   placeholder={placeholder}
  name={name} 
  value={value}
  onChange={onChange}
  />

</div>

  )
}

export default LabelInput