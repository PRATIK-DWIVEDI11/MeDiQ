'use client'
import { Brain, Lightbulb, TrendingUp } from 'lucide-react'

export default function AITools() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border-2 border-purple-100 p-8">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostic Support</h3>
          <p className="text-gray-600 mb-4">AI-powered diagnostic suggestions with 89% accuracy</p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800 font-semibold">Cases Assisted Today: 7</p>
            <p className="text-xs text-purple-600 mt-2">Accuracy: 89% | Avg Time: 3.2 min</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border-2 border-green-100 p-8">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Lightbulb className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Treatment Recommendations</h3>
          <p className="text-gray-600 mb-4">Evidence-based treatment suggestions from latest research</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800 font-semibold">Recommendation Accuracy: 92%</p>
            <p className="text-xs text-green-600 mt-2">Updated: Daily | Sources: 150+ papers</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
        <div className="flex items-start gap-4">
          <TrendingUp className="h-8 w-8 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">AI Performance This Month</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-sm text-purple-100">AI Efficiency</p>
              </div>
              <div>
                <p className="text-3xl font-bold">847</p>
                <p className="text-sm text-purple-100">Cases Processed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.8/5</p>
                <p className="text-sm text-purple-100">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick AI Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-semibold text-gray-900">Pattern Recognition</p>
              <p className="text-sm text-gray-600">AI detected symptom pattern similar to 43 past cases with 87% similarity</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-semibold text-gray-900">Treatment Optimization</p>
              <p className="text-sm text-gray-600">Based on patient history, 3 treatment options recommended with success rates</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-semibold text-gray-900">Risk Assessment</p>
              <p className="text-sm text-gray-600">AI identified 2 potential complications with preventive measures</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
