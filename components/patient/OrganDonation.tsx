'use client'
import { useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { patientRequestOrganDonation } from '../../lib/blockchainService'
import { Heart, CheckCircle, Loader, User, Droplets, Calendar, Phone, MapPin, AlertCircle } from 'lucide-react'

const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function OrganDonation() {
  const { user } = useAuthStore()
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [txHash, setTxHash] = useState('')

  const [form, setForm] = useState({
    fullName: user?.displayName || '',
    age: '',
    bloodType: '',
    phone: '',
    address: '',
    idType: 'Aadhar Card',
    idNumber: '',
    emergencyContact: '',
    medicalConditions: '',
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
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.age || parseInt(form.age) < 18 || parseInt(form.age) > 65) newErrors.age = 'Age must be between 18 and 65'
    if (!form.bloodType) newErrors.bloodType = 'Blood type is required'
    if (!form.phone || form.phone.length < 10) newErrors.phone = 'Valid phone number is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.idNumber.trim()) newErrors.idNumber = 'ID number is required'
    if (!form.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required'
    if (selectedOrgans.length === 0) newErrors.organs = 'Please select at least one organ'
    if (!form.consent) newErrors.consent = 'You must give consent to proceed'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const result = await patientRequestOrganDonation(
        user?.uid || '',
        form.fullName,
        parseInt(form.age),
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
        <p className="text-gray-700 mb-3">Your organ donation request has been recorded on the blockchain.</p>
        <div className="bg-white rounded-xl p-4 mb-4 text-left space-y-2">
          <p className="text-sm text-gray-600">Donor: <strong>{form.fullName}</strong></p>
          <p className="text-sm text-gray-600">Organs: <strong>{selectedOrgans.join(', ')}</strong></p>
          <p className="text-sm text-gray-600">Blood Type: <strong>{form.bloodType}</strong></p>
          <p className="text-sm font-mono text-gray-500 break-all">TX: {txHash?.substring(0, 30)}...</p>
        </div>
        <p className="text-gray-600">Status: <strong className="text-yellow-600">PENDING</strong> — Awaiting admin approval</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-7 w-7" />
          <h1 className="text-2xl font-bold">Organ Donation Registration</h1>
        </div>
        <p className="text-red-100 text-sm">Your information will be verified and recorded on blockchain for transparency.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">Organ donation is a voluntary and legal process. All information submitted will be verified by our admin team before approval. You must be between 18-65 years of age.</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-red-600" /> Personal Information
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input type="text" value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            placeholder="As per government ID"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Age * (18-65)</label>
            <input type="number" value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
              placeholder="Your age"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Type *</label>
            <select value={form.bloodType}
              onChange={e => setForm({ ...form, bloodType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
              <option value="">Select blood type</option>
              {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
          <input type="tel" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
          <textarea value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="Full residential address"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
      </div>

      {/* ID Verification */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" /> ID Verification
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ID Type *</label>
            <select value={form.idType}
              onChange={e => setForm({ ...form, idType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
              <option>Aadhar Card</option>
              <option>PAN Card</option>
              <option>Passport</option>
              <option>Voter ID</option>
              <option>Driving License</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ID Number *</label>
            <input type="text" value={form.idNumber}
              onChange={e => setForm({ ...form, idNumber: e.target.value })}
              placeholder="Enter ID number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Emergency Contact *</label>
          <input type="text" value={form.emergencyContact}
            onChange={e => setForm({ ...form, emergencyContact: e.target.value })}
            placeholder="Name and phone of emergency contact"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
          {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Existing Medical Conditions (optional)</label>
          <textarea value={form.medicalConditions}
            onChange={e => setForm({ ...form, medicalConditions: e.target.value })}
            placeholder="List any medical conditions, allergies, or medications"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" />
        </div>
      </div>

      {/* Organ Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-red-600" /> Select Organs to Donate *
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {ORGANS.map(organ => (
            <button key={organ} onClick={() => handleToggleOrgan(organ)}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                selectedOrgans.includes(organ)
                  ? 'bg-red-50 border-red-400 text-red-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}>
              {organ}
            </button>
          ))}
        </div>
        {errors.organs && <p className="text-red-500 text-xs mt-2">{errors.organs}</p>}
        {selectedOrgans.length > 0 && (
          <p className="text-sm text-gray-600 mt-3">Selected: <strong className="text-red-600">{selectedOrgans.join(', ')}</strong></p>
        )}
      </div>

      {/* Consent */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">Consent & Declaration</h3>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-4 space-y-1">
          <p>• I voluntarily wish to donate my organs after death.</p>
          <p>• I confirm all information provided is accurate and truthful.</p>
          <p>• I understand this request will be reviewed and approved by admin.</p>
          <p>• I consent to my information being stored on blockchain for transparency.</p>
          <p>• I understand I can withdraw this request at any time.</p>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.consent}
            onChange={e => setForm({ ...form, consent: e.target.checked })}
            className="mt-1 h-4 w-4 accent-red-600" />
          <span className="text-sm text-gray-700 font-medium">I have read and agree to the above declaration and give my full consent for organ donation registration.</span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-2">{errors.consent}</p>}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
        {loading ? <><Loader className="animate-spin h-5 w-5" /> Submitting...</> : <><Heart className="h-5 w-5" /> Submit Organ Donation Request</>}
      </button>
    </div>
  )
}

// 'use client'
// import { useState } from 'react'
// import { useAuthStore } from '../../lib/authContext'
// import { patientRequestOrganDonation } from '../../lib/blockchainService'
// import { Heart, CheckCircle, Loader } from 'lucide-react'

// const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']

// export default function OrganDonation() {
//   const { user } = useAuthStore()
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
//     if (selectedOrgans.length === 0) {
//       alert('Please select at least one organ')
//       return
//     }

//     setLoading(true)
//     try {
//       const result = await patientRequestOrganDonation(
//         user?.uid || '',
//         user?.displayName || 'Patient',
//         30,
//         'O+',
//         selectedOrgans
//       )

//       if (result.success) {
//         setTxHash(result.txHash || '')
//         setSubmitted(true)
//         alert('✅ Organ donation request submitted! Waiting for admin approval.')
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
//         <p className="text-gray-700 mb-3">Your organ donation request has been recorded on blockchain.</p>
//         <p className="text-sm font-mono text-gray-600">TX: {txHash?.substring(0, 20)}...</p>
//         <p className="text-gray-600 mt-4">Status: <strong>PENDING</strong> - Awaiting admin approval</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Organ Donation Request</h1>
      
//       <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <Heart className="h-6 w-6 text-red-600" />
//           <h3 className="text-lg font-bold text-gray-900">Request Organ Donation</h3>
//         </div>

//         <p className="text-gray-600 mb-6">
//           Select organs you wish to donate. Your request will be immutably recorded on blockchain and sent for admin approval.
//         </p>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {ORGANS.map((organ) => (
//             <button
//               key={organ}
//               onClick={() => handleToggleOrgan(organ)}
//               className={`p-4 rounded-lg border-2 transition-all ${
//                 selectedOrgans.includes(organ)
//                   ? 'bg-red-50 border-red-300 text-red-900 font-semibold'
//                   : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               {organ}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading || selectedOrgans.length === 0}
//           className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//         >
//           {loading ? <Loader className="animate-spin h-5 w-5" /> : <Heart className="h-5 w-5" />}
//           {loading ? 'Submitting...' : 'Submit Donation Request'}
//         </button>
//       </div>
//     </div>
//   )
// }

