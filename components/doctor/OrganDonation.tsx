'use client'
import { useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { doctorRequestOrganDonation } from '../../lib/blockchainService'
import { Heart, CheckCircle, Loader, User, AlertCircle } from 'lucide-react'

const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function DoctorOrganDonation() {
  const { user } = useAuthStore()
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [txHash, setTxHash] = useState('')

  const [form, setForm] = useState({
    patientName: '',
    patientAge: '',
    bloodType: '',
    patientId: '',
    phone: '',
    address: '',
    diagnosis: '',
    medicalJustification: '',
    emergencyContact: '',
    consent: false
  })

  const [errors, setErrors] = useState<any>({})

  const handleToggleOrgan = (organ: string) => {
    setSelectedOrgans(prev =>
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    )
  }

  const validate = () => {
    const newErrors: any = {}
    if (!form.patientName.trim()) newErrors.patientName = 'Patient name is required'
    if (!form.patientAge || parseInt(form.patientAge) < 1) newErrors.patientAge = 'Valid age is required'
    if (!form.bloodType) newErrors.bloodType = 'Blood type is required'
    if (!form.patientId.trim()) newErrors.patientId = 'Patient ID/Aadhar is required'
    if (!form.phone || form.phone.length < 10) newErrors.phone = 'Valid phone number is required'
    if (!form.diagnosis.trim()) newErrors.diagnosis = 'Diagnosis is required'
    if (!form.medicalJustification.trim()) newErrors.medicalJustification = 'Medical justification is required'
    if (!form.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required'
    if (selectedOrgans.length === 0) newErrors.organs = 'Please select at least one organ'
    if (!form.consent) newErrors.consent = 'Doctor consent is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const result = await doctorRequestOrganDonation(
        user?.uid || '',
        user?.displayName || 'Doctor',
        `patient_${form.patientId}`,
        form.patientName,
        parseInt(form.patientAge),
        form.bloodType,
        selectedOrgans
      )
      if (result.success) {
        setTxHash(result.txHash || '')
        setSubmitted(true)
      }
    } catch {
      alert('❌ Request failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-900 mb-2">Request Submitted Successfully!</h2>
        <p className="text-gray-700 mb-3">Organ donation request recorded on blockchain.</p>
        <div className="bg-white rounded-xl p-4 mb-4 text-left space-y-2">
          <p className="text-sm text-gray-600">Patient: <strong>{form.patientName}</strong></p>
          <p className="text-sm text-gray-600">Organs: <strong>{selectedOrgans.join(', ')}</strong></p>
          <p className="text-sm text-gray-600">Blood Type: <strong>{form.bloodType}</strong></p>
          <p className="text-sm text-gray-600">Recommended by: <strong>Dr. {user?.displayName}</strong></p>
          <p className="text-sm font-mono text-gray-500 break-all">TX: {txHash?.substring(0, 30)}...</p>
        </div>
        <p className="text-gray-600">Status: <strong className="text-yellow-600">PENDING</strong> — Awaiting admin approval</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-7 w-7" />
          <h1 className="text-2xl font-bold">Patient Organ Donation Request</h1>
        </div>
        <p className="text-green-100 text-sm">As a doctor, you can recommend organ donation for a patient. All requests are verified by admin.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">This form must only be submitted with the patient's full knowledge and consent. Submitting false information is a serious medical and legal offence.</p>
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-green-600" /> Patient Information
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Full Name *</label>
          <input type="text" value={form.patientName}
            onChange={e => setForm({ ...form, patientName: e.target.value })}
            placeholder="As per hospital records"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Age *</label>
            <input type="number" value={form.patientAge}
              onChange={e => setForm({ ...form, patientAge: e.target.value })}
              placeholder="Age"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            {errors.patientAge && <p className="text-red-500 text-xs mt-1">{errors.patientAge}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Type *</label>
            <select value={form.bloodType}
              onChange={e => setForm({ ...form, bloodType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Select blood type</option>
              {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient ID / Aadhar *</label>
            <input type="text" value={form.patientId}
              onChange={e => setForm({ ...form, patientId: e.target.value })}
              placeholder="Government ID number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Emergency Contact *</label>
          <input type="text" value={form.emergencyContact}
            onChange={e => setForm({ ...form, emergencyContact: e.target.value })}
            placeholder="Name and phone of emergency contact"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-green-600" /> Medical Information
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis *</label>
          <input type="text" value={form.diagnosis}
            onChange={e => setForm({ ...form, diagnosis: e.target.value })}
            placeholder="Patient's current diagnosis"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          {errors.diagnosis && <p className="text-red-500 text-xs mt-1">{errors.diagnosis}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Medical Justification *</label>
          <textarea value={form.medicalJustification}
            onChange={e => setForm({ ...form, medicalJustification: e.target.value })}
            placeholder="Explain why organ donation is being recommended for this patient"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
          {errors.medicalJustification && <p className="text-red-500 text-xs mt-1">{errors.medicalJustification}</p>}
        </div>
      </div>

      {/* Organ Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-green-600" /> Select Organs *
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {ORGANS.map(organ => (
            <button key={organ} onClick={() => handleToggleOrgan(organ)}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                selectedOrgans.includes(organ)
                  ? 'bg-green-50 border-green-400 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}>
              {organ}
            </button>
          ))}
        </div>
        {errors.organs && <p className="text-red-500 text-xs mt-2">{errors.organs}</p>}
        {selectedOrgans.length > 0 && (
          <p className="text-sm text-gray-600 mt-3">Selected: <strong className="text-green-600">{selectedOrgans.join(', ')}</strong></p>
        )}
      </div>

      {/* Doctor Consent */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">Doctor Declaration</h3>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-4 space-y-1">
          <p>• I confirm this request is made with the patient's full knowledge and consent.</p>
          <p>• All medical information provided is accurate to the best of my knowledge.</p>
          <p>• I take full professional responsibility for this recommendation.</p>
          <p>• I understand this request will be reviewed by admin before approval.</p>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.consent}
            onChange={e => setForm({ ...form, consent: e.target.checked })}
            className="mt-1 h-4 w-4 accent-green-600" />
          <span className="text-sm text-gray-700 font-medium">I, Dr. {user?.displayName}, declare that all information is accurate and the patient has given informed consent.</span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-2">{errors.consent}</p>}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
        {loading ? <><Loader className="animate-spin h-5 w-5" /> Submitting...</> : <><Heart className="h-5 w-5" /> Submit Donation Request</>}
      </button>
    </div>
  )
}


// 'use client'
// import { useState } from 'react'
// import { useAuthStore } from '../../lib/authContext'
// import { doctorRequestOrganDonation } from '../../lib/blockchainService'
// import { Heart, CheckCircle, Loader } from 'lucide-react'

// const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']

// export default function DoctorOrganDonation() {
//   const { user } = useAuthStore()
//   const [patientName, setPatientName] = useState('')
//   const [patientAge, setPatientAge] = useState(30)
//   const [bloodType, setBloodType] = useState('O+')
//   const [selectedOrgans, setSelectedOrgans] = useState<string[]>([])
//   const [loading, setLoading] = useState(false)
//   const [submitted, setSubmitted] = useState(false)
//   const [txHash, setTxHash] = useState('')

//   const handleToggleOrgan = (organ: string) => {
//     setSelectedOrgans(prev =>
//       prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
//     )
//   }

//   const handleSubmit = async () => {
//     if (!patientName || selectedOrgans.length === 0) {
//       alert('Please enter patient name and select organs')
//       return
//     }

//     setLoading(true)
//     try {
//       const result = await doctorRequestOrganDonation(
//         user?.uid || '',
//         user?.displayName || 'Doctor',
//         `patient_${Date.now()}`, // Generate unique patient ID
//         patientName,
//         patientAge,
//         bloodType,
//         selectedOrgans
//       )

//       if (result.success) {
//         setTxHash(result.txHash || '')
//         setSubmitted(true)
//         alert('✅ Organ donation request submitted for admin approval!')
//       }
//     } catch (error) {
//       alert('❌ Request failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (submitted) {
//     return (
//       <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
//         <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold text-green-900 mb-2">Request Submitted!</h2>
//         <p className="text-gray-700 mb-3">Organ donation request recorded on immutable blockchain.</p>
//         <p className="text-sm font-mono text-gray-600">TX: {txHash?.substring(0, 20)}...</p>
//         <p className="text-gray-600 mt-4">Patient: <strong>{patientName}</strong></p>
//         <p className="text-gray-600">Status: <strong>PENDING</strong> - Awaiting admin approval</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Request Organ Donation</h1>
      
//       <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <Heart className="h-6 w-6 text-red-600" />
//           <h3 className="text-lg font-bold text-gray-900">Recommend Organ Donation</h3>
//         </div>

//         <div className="space-y-4 mb-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
//             <input
//               type="text"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               placeholder="Enter patient name"
//               className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
//               <input
//                 type="number"
//                 value={patientAge}
//                 onChange={(e) => setPatientAge(parseInt(e.target.value))}
//                 className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
//               <select
//                 value={bloodType}
//                 onChange={(e) => setBloodType(e.target.value)}
//                 className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
//               >
//                 <option>O+</option>
//                 <option>O-</option>
//                 <option>A+</option>
//                 <option>A-</option>
//                 <option>B+</option>
//                 <option>B-</option>
//                 <option>AB+</option>
//                 <option>AB-</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-3">Select Organs</label>
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             {ORGANS.map((organ) => (
//               <button
//                 key={organ}
//                 onClick={() => handleToggleOrgan(organ)}
//                 className={`p-3 rounded-lg border-2 transition-all text-sm ${
//                   selectedOrgans.includes(organ)
//                     ? 'bg-red-50 border-red-300 text-red-900 font-semibold'
//                     : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {organ}
//               </button>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading || !patientName || selectedOrgans.length === 0}
//           className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//         >
//           {loading ? <Loader className="animate-spin h-5 w-5" /> : <Heart className="h-5 w-5" />}
//           {loading ? 'Submitting...' : 'Submit Donation Request'}
//         </button>
//       </div>
//     </div>
//   )
// }
