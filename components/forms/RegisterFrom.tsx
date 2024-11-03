"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formFieldType } from "./PatientForm"
import {Form, FormControl
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerPatient } from "@/lib/actions/patient.actions"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, Doctors, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

 
const RegisterForm = ({ user }: { user: User }) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData

    if(values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      })

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name)
    } 

    try {
      
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }

      //@ts-ignore
      const patient = await registerPatient(patientData);

      if(patient) router.push(`/patients/${user.$id}/new-appointment`)

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className="space-y-4">
        <h1 className="header">Welcome!</h1>
        <p className="text-dark-700">Let us know more about you!</p>
      </section>

      <section className="space-y-6">
       <div className="mb-9 spac-y-1">
       <h2 className="sub-header">Personal Information</h2>
       </div>
      </section>

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="name"      
          label="Full name"
          placeholder="Jhon Doe"
          iconAlt="user"
      />

      <div className="flex flex-col gap-6 xl:flex-row">
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
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">

      <CustomFormField
          fieldType={formFieldType.DATE_PICKER}
          control={form.control} 
          name="birthDate"      
          label="Date Of Birth"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => (
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                        <div key={option} className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
          )}
          iconAlt=""     
      />

      </div>

      <div className="flex flex-col gap-6 xl:flex-row">

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="address"      
          label="Address"
          placeholder="143/Koskandawala"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="occupation"      
          label="Occupation"
          placeholder="Doctor"
          iconAlt=""
      />

      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="emergencyContactName"      
          label="Emergency Contact Name"
          placeholder="Guardian"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="Guardian's Contact" 
          iconAlt=""     
      />
      </div>

      <section className="space-y-6">
       <div className="mb-9 spac-y-1">
       <h2 className="sub-header">Medical Information</h2>
       </div>
      </section>

      <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician" 
          iconAlt=""     
      >
        {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                    <Image 
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt={doctor.name}
                        className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>    
                </div>
            </SelectItem>
        ))}
      </CustomFormField>

      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="insuranceProvider"      
          label="Insurance Provider"
          placeholder="Softlogic"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="insurancePolicyNumber"      
          label="Insurance Policy Numberr"
          placeholder="12345678"
          iconAlt=""
      />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">

      <CustomFormField
          fieldType={formFieldType.TEXTAREA}
          control={form.control}
          name="alergies"
          label="Alergies (if any)"
          placeholder="Alergy to certain medications" 
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="Current medications (if any)"
          placeholder="Probiotics" 
          iconAlt=""     
      />

      </div>

      <div className="flex flex-col gap-6 xl:flex-row">

      <CustomFormField
          fieldType={formFieldType.TEXTAREA}
          control={form.control}
          name="familyMedicalHistory"
          label="Family Medical History"
          placeholder="Alergy to certain medications" 
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.TEXTAREA}
          control={form.control}
          name="pastMedicalHistory"
          label="Past Medical History"
          placeholder="Probiotics" 
          iconAlt=""     
      />

      </div>

      <section className="space-y-6">
       <div className="mb-9 spac-y-1">
       <h2 className="sub-header">Identification and Verification</h2>
       </div>
      </section>

      <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select anidentification type" 
          iconAlt=""     
      >
        {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
                {type}
            </SelectItem>
        ))}
      </CustomFormField>

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="identificationNumber"      
          label="Identification Number"
          placeholder="12345678"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of identification document"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <section className="space-y-6">
       <div className="mb-9 spac-y-1">
       <h2 className="sub-header">Consent and Privacy</h2>
       </div>
      </section>

      <CustomFormField fieldType={formFieldType.CHECKBOX} 
        control={form.control}
        name="treatmentConsent"
        label="I consent to treatment"
        iconAlt=""
      />

      <CustomFormField fieldType={formFieldType.CHECKBOX} 
        control={form.control}
        name="disclosureConsent"
        label="I consent to diclosure of information"
        iconAlt=""
      />

      <CustomFormField fieldType={formFieldType.CHECKBOX} 
        control={form.control}
        name="privacyConsent"
        label="I consent to privacy policy"
        iconAlt=""
      />


      <SubmitButton isLoading = {isLoading}>Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm