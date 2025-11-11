'use client'
import { useEffect, useState } from 'react'
import { getBlockchainTransactions } from '../../lib/blockchainService'
import { Link as LinkIcon, CheckCircle, Loader } from 'lucide-react'

export default function BlockchainDashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    const data = await getBlockchainTransactions()
    setTransactions(data)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <LinkIcon className="h-6 w-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">Immutable Blockchain Transactions</h3>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading transactions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Block Hash</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx: any) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold">{tx.type}</td>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">
                    {tx.blockHash?.substring(0, 16)}...
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(tx.timestamp.toDate()).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

