import {FormEventHandler } from "react";

React.FormEvent<HTMLFormElement>
export interface USRPROPS {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error:string | null | undefined
    loading: boolean | null | undefined
    inputFields:any
    title?: string,
    descrition? : string  
    InstructionText? :string,
    routingText? : string
  
  }