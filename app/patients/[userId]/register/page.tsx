import React from 'react'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterFrom'
import { getUser } from '@/lib/actions/patient.actions'


const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <img 
            src = "/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user}/>
            
            <p className="copywright py-12">
              @2024 Carepulse
            </p>

        </div>
      </section>

      <img 
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="image"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register
