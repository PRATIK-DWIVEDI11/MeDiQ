export const mockAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      date: '2025-11-15',
      time: '2:00 PM',
      status: 'confirmed',
      reason: 'Regular Checkup'
    },
    {
      id: 2,
      doctorName: 'Dr. Meera Singh',
      specialty: 'Neurology',
      date: '2025-11-18',
      time: '10:30 AM',
      status: 'pending',
      reason: 'Migraine Consultation'
    },
    {
      id: 3,
      doctorName: 'Dr. Ajay Patel',
      specialty: 'Orthopedics',
      date: '2025-11-22',
      time: '3:15 PM',
      status: 'confirmed',
      reason: 'Knee Pain Assessment'
    }
  ]
  
  export const mockPatients = [
    {
      id: 1,
      name: 'Ravi Patel',
      age: 45,
      condition: 'Chest pain, shortness of breath',
      urgencyScore: 85,
      lastVisit: '2025-11-05',
      status: 'High Risk'
    },
    {
      id: 2,
      name: 'Meera Singh',
      age: 32,
      condition: 'Severe headache, nausea',
      urgencyScore: 65,
      lastVisit: '2025-11-06',
      status: 'Medium'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      age: 28,
      condition: 'Back pain, routine checkup',
      urgencyScore: 35,
      lastVisit: '2025-11-07',
      status: 'Low'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      age: 52,
      condition: 'Diabetes monitoring',
      urgencyScore: 45,
      lastVisit: '2025-11-04',
      status: 'Medium'
    }
  ]
  
  export const mockQueue = [
    { position: 1, name: 'Patient A', waitTime: 15, specialty: 'Cardiology' },
    { position: 2, name: 'Patient B', waitTime: 30, specialty: 'Cardiology' },
    { position: 3, name: 'Patient C', waitTime: 45, specialty: 'Cardiology' },
    { position: 4, name: 'You', waitTime: 60, specialty: 'Cardiology' },
    { position: 5, name: 'Patient E', waitTime: 75, specialty: 'Cardiology' },
  ]
  
  export const mockMedicalRecords = [
    {
      id: 1,
      date: '2025-10-15',
      type: 'Blood Test',
      doctor: 'Dr. Kumar',
      status: 'Normal',
      details: 'All parameters within normal range'
    },
    {
      id: 2,
      date: '2025-09-20',
      type: 'X-Ray',
      doctor: 'Dr. Singh',
      status: 'Normal',
      details: 'Chest X-Ray - No abnormalities detected'
    },
    {
      id: 3,
      date: '2025-08-10',
      type: 'ECG',
      doctor: 'Dr. Patel',
      status: 'Normal',
      details: 'Electrocardiogram - Heart rhythm normal'
    }
  ]
  
  export const mockStaff = [
    { id: 1, name: 'Dr. Rajesh Kumar', role: 'Cardiologist', phone: '+91-9876543210', email: 'rajesh@mediq.com', status: 'Online' },
    { id: 2, name: 'Dr. Meera Singh', role: 'Neurologist', phone: '+91-9876543211', email: 'meera@mediq.com', status: 'Online' },
    { id: 3, name: 'Nurse Sarah', role: 'Nurse', phone: '+91-9876543212', email: 'sarah@mediq.com', status: 'Offline' },
    { id: 4, name: 'Admin John', role: 'Administrator', phone: '+91-9876543213', email: 'john@mediq.com', status: 'Online' },
  ]
  
  export const mockAnalytics = {
    totalPatients: 1247,
    appointmentsToday: 45,
    avgWaitTime: 18,
    aiAccuracy: 87.5,
    queueOptimization: 42,
    patientSatisfaction: 94,
    weeklyTrend: [
      { day: 'Mon', patients: 120, appointments: 45 },
      { day: 'Tue', patients: 135, appointments: 52 },
      { day: 'Wed', patients: 145, appointments: 58 },
      { day: 'Thu', patients: 140, appointments: 55 },
      { day: 'Fri', patients: 160, appointments: 65 },
      { day: 'Sat', patients: 95, appointments: 38 },
      { day: 'Sun', patients: 70, appointments: 25 }
    ]
  }
  
  export const mockDoctors = [
    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', rating: 4.8, availability: 'Available' },
    { id: 2, name: 'Dr. Meera Singh', specialty: 'Neurology', rating: 4.6, availability: 'Available' },
    { id: 3, name: 'Dr. Ajay Patel', specialty: 'Orthopedics', rating: 4.7, availability: 'Busy' },
  ]
  
  export const mockOrganData = {
    kidney: { available: 12, waiting: 234, successRate: 94, transactions: 1456 },
    liver: { available: 3, waiting: 156, successRate: 87, transactions: 890 },
    heart: { available: 1, waiting: 89, successRate: 91, transactions: 234 }
  }
  