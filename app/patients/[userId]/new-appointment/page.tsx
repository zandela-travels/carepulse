import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";



export default async function NewAppointment({ params: { userId }}: SearchParamProps) {
    const patient = await getPatient(userId);

    return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <img 
            src = "/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm type="create" userId={userId} patientId={patient.$id}/>
            
            <p className="copyright mt-5">
              @2024 CarePulse
            </p>

        </div>
      </section>

      <img 
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="image"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
