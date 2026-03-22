'use client'
import { useState } from 'react'
import { FileText, Loader2, AlertCircle, CheckCircle, Sparkles, ClipboardPaste } from 'lucide-react'

const SAMPLE_REPORT = `Complete Blood Count (CBC)
Hemoglobin: 11.2 g/dL (Normal: 12-16)
WBC Count: 11,500 cells/mcL (Normal: 4,500-11,000)
Platelet Count: 180,000 (Normal: 150,000-400,000)
RBC Count: 3.9 million/mcL (Normal: 4.2-5.4)

Blood Sugar
Fasting Blood Glucose: 108 mg/dL (Normal: 70-99)
HbA1c: 5.9% (Normal: below 5.7%)

Liver Function
SGPT (ALT): 42 U/L (Normal: 7-40)
SGOT (AST): 38 U/L (Normal: 10-40)
Bilirubin Total: 0.8 mg/dL (Normal: 0.2-1.2)`

export default function ReportSummarizer() {
  const [reportText, setReportText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeReport = async () => {
    if (!reportText.trim() || loading) return
    setLoading(true)
    setError('')
    setSummary('')

    try {
      const response = await fetch('/api/ai-report-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportText: reportText.trim() })
      })

      const data = await response.json()

      if (data.success) {
        setSummary(data.summary)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please check your internet.')
    } finally {
      setLoading(false)
    }
  }

  const loadSample = () => {
    setReportText(SAMPLE_REPORT)
    setSummary('')
    setError('')
  }

  const formatSummary = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('📋') || line.startsWith('🔬') || line.startsWith('⚠️') || line.startsWith('✅') || line.startsWith('💡') || line.startsWith('⚕️')) {
        return <p key={i} className="font-bold text-gray-900 dark:text-white mt-4 mb-1 text-base">{line}</p>
      }
      if (line.startsWith('-')) {
        return <p key={i} className="text-gray-700 dark:text-gray-300 text-sm pl-3 py-0.5">{line}</p>
      }
      if (line.trim() === '') return <div key={i} className="h-1" />
      return <p key={i} className="text-gray-700 dark:text-gray-300 text-sm">{line}</p>
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-7 w-7" />
          <h1 className="text-2xl font-bold">AI Medical Report Analyzer</h1>
        </div>
        <p className="text-purple-100">Paste your lab report or test results and get a simple explanation in seconds.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white">
          This tool explains medical reports in simple language. It is <strong>not a medical diagnosis</strong>. Always consult your doctor for medical advice.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h2 className="font-bold text-gray-900 dark:text-white">Paste Your Report</h2>
            </div>
            <button
              onClick={loadSample}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ClipboardPaste className="h-3 w-3" />
              Load Sample
            </button>
          </div>

          <textarea
            value={reportText}
            onChange={e => setReportText(e.target.value)}
            placeholder={`Paste your lab report here...\n\nExample:\nHemoglobin: 11.2 g/dL\nWBC Count: 11,500\nBlood Sugar: 108 mg/dL\n...`}
            className="w-full h-72 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 font-mono"
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-400">{reportText.length} characters</span>
            <button
              onClick={analyzeReport}
              disabled={!reportText.trim() || loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Analyze Report</>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="font-bold text-gray-900 dark:text-white">AI Explanation</h2>
          </div>

          {!summary && !loading && !error && (
            <div className="h-72 flex flex-col items-center justify-center text-center">
              <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-400 dark:text-gray-500 text-sm">Paste your report on the left and click<br /><strong>Analyze Report</strong> to get started</p>
            </div>
          )}

          {loading && (
            <div className="h-72 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">AI is reading your report...</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">This takes about 5-10 seconds</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">❌ {error}</p>
            </div>
          )}

          {summary && (
            <div className="h-72 overflow-y-auto pr-2 space-y-1">
              {formatSummary(summary)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}