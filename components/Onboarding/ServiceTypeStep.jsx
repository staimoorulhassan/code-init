// components/Onboarding/ServiceTypeStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'

const SERVICE_TYPES = [
  {
    id: 'outbound',
    title: 'Outbound Calls',
    description: 'Make calls to leads and customers',
    icon: '📞',
  },
  {
    id: 'inbound',
    title: 'Inbound Calls',
    description: 'Receive customer inquiries and support calls',
    icon: '☎️',
  },
  {
    id: 'blended',
    title: 'Blended',
    description: 'Both outbound and inbound capabilities',
    icon: '🔄',
  },
]

export function ServiceTypeStep() {
  const { serviceType, setServiceType, setStep } = useOnboardingStore()
  const { speak, isSpeaking } = useRobotSpeech()

  useEffect(() => {
    speak(
      'Great! First, let me understand your needs. What type of calling service are you interested in? Do you need outbound dialing to reach customers, inbound support to receive calls, or both?'
    )
  }, [speak])

  const handleSelect = (type) => {
    setServiceType(type)
    speak(`You selected ${type}. Excellent choice! Now, let me ask about your team size.`)
    setTimeout(() => setStep('agents'), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">What service do you need?</h2>
        <p className="text-gray-400">Choose the type of call center service that best fits your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SERVICE_TYPES.map((service) => (
          <motion.button
            key={service.id}
            onClick={() => handleSelect(service.id)}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-lg border-2 transition-all ${
              serviceType === service.id
                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/30'
                : 'border-gray-600 bg-gray-900 hover:border-cyan-400'
            }`}
          >
            <div className="text-4xl mb-3">{service.icon}</div>
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </motion.button>
        ))}
      </div>

      {isSpeaking && (
        <div className="flex items-center gap-2 text-cyan-400 text-sm">
          <span className="animate-pulse">🎤</span> Speaking...
        </div>
      )}
    </motion.div>
  )
}
