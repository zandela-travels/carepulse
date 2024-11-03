"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


export enum formFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}
 
const PatientForm = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {name, email, phone};

      const user = await createUser(userData);

      if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hello there!</h1>
        <p className="text-dark-700">Book Now!</p>
      </section>

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="name"      
          label="Full name"
          placeholder="Jhon Doe"
          iconAlt="user"
      />

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="email"      
          label="Email"
          placeholder="johndoe@gmail.com"
          iconAlt="email"
      />

      <CustomFormField
          fieldType={formFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="0762870489" 
          iconAlt=""     
      />

      <SubmitButton isLoading = {isLoading}>Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
