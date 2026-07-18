// components/Onboarding/WelcomeStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'

export function WelcomeStep() {
  const { setStep } = useOnboardingStore()
  const { speak, isSpeaking } = useRobotSpeech()

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(
        'Hello and welcome to our company! I am your AI assistant. I am here to help you understand our call center solutions and find the perfect plan for your business. Let me ask you a few questions to get started.'
      )
    }, 500)

    return () => clearTimeout(timer)
  }, [speak])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-full gap-8"
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Welcome to AI Call Center Solutions
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Our platform helps you manage inbound and outbound calls with cutting-edge AI technology, 
          ensuring your customers receive the best service possible.
        </p>
      </div>

      <motion.button
        onClick={() => setStep('service-type')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
      >
        Learn More & Get Started →
      </motion.button>

      <div className="text-sm text-gray-400 mt-4">
        {isSpeaking && <span className="text-cyan-400">🎤 Speaking...</span>}
      </div>
    </motion.div>
  )
}
