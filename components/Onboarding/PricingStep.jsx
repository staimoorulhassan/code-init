// components/Onboarding/AgentsStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'

export function AgentsStep() {
  const { agentCount, setAgentCount, setStep } = useOnboardingStore()
  const { speak } = useRobotSpeech()

  useEffect(() => {
    speak('Now, how many calling agents do you currently have or plan to have?')
  }, [speak])

  const handleContinue = () => {
    if (agentCount) {
      speak(`Perfect! You need ${agentCount} agents. Let me show you pricing options that fit your team size.`)
      setTimeout(() => setStep('pricing'), 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">How many calling agents do you have?</h2>
        <p className="text-gray-400">This helps us recommend the right plan for your team</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-lg font-medium min-w-fit">Number of Agents:</label>
          <div className="flex items-center gap-3 flex-1">
            <motion.button
              onClick={() => setAgentCount(Math.max(1, (agentCount || 1) - 1))}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              −
            </motion.button>
            <input
              type="number"
              value={agentCount || ''}
              onChange={(e) => setAgentCount(parseInt(e.target.value) || 1)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-center text-lg font-bold"
              min="1"
              max="100"
            />
            <motion.button
              onClick={() => setAgentCount((agentCount || 1) + 1)}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              +
            </motion.button>
          </div>
        </div>

        <p className="text-sm text-gray-400 p-4 bg-gray-900 rounded">
          💡 Tip: Our platform scales from 1 to 100+ agents. You can add or remove agents anytime.
        </p>
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!agentCount}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Pricing →
      </motion.button>
    </motion.div>
  )
}
