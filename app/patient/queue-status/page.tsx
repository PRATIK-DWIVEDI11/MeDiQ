import QueueStatus from '../../../components/patient/QueueStatus';

export default function QueueStatusPage() {
  // You need a way to get doctorId and patientId here, for example from auth context or params

  const doctorId = 'some_doctor_id'; // Get dynamically
  const patientId = 'some_patient_id'; // Get dynamically

  return (
    <QueueStatus doctorId={doctorId} patientId={patientId} />
  );
}


// import QueueStatus from '../../../components/patient/QueueStatus'

// export default function QueueStatusPage() {
//   return <QueueStatus doctorId={undefined} patientId={undefined} />
// }


// // import QueueStatus from '../../../components/patient/QueueStatus'

// // export default function QueueStatusPage() {
// //   return <QueueStatus />
// // }
