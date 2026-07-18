// components/Onboarding/SecurityStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'

export function SecurityStep() {
  const { 
    isDNCRequired, 
    setDNCRequired, 
    isLeadGatheringRequired, 
    setLeadGatheringRequired,
    setStep 
  } = useOnboardingStore()
  const { speak } = useRobotSpeech()

  useEffect(() => {
    speak(
      'Your data security is our top priority. We encrypt all information, comply with GDPR and CCPA, and will sign a data protection agreement with you. We also offer DNC scrubbing to ensure compliance and lead generation services if you need them.'
    )
  }, [speak])

  const handleContinue = () => {
    const extras = []
    if (isDNCRequired) extras.push('DNC scrubbing')
    if (isLeadGatheringRequired) extras.push('lead generation')
    
    const message = extras.length > 0
      ? `Perfect! You selected ${extras.join(' and ')}. Let me collect your information to finalize everything.`
      : 'Great! Let me collect your information to complete the setup.'
    
    speak(message)
    setTimeout(() => setStep('contact-info'), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Data Security & Compliance</h2>
        <p className="text-gray-400">We protect your business with enterprise-grade security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-400">🔐</span> Security Features
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>End-to-end encryption for all data</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>GDPR and CCPA Compliant</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>ISO 27001 Certified</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Regular Security Audits</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Legal Data Protection Agreement</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-lg border-2 border-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isDNCRequired}
                onChange={(e) => setDNCRequired(e.target.checked)}
                className="w-5 h-5 accent-cyan-500"
              />
              <span className="font-medium">
                DNC Scrubbing Service <span className="text-gray-400 text-sm">(+$49/mo)</span>
              </span>
            </label>
            <p className="text-sm text-gray-400 mt-2 ml-8">
              Remove numbers from Do-Not-Call list to ensure compliance
            </p>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg border-2 border-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isLeadGatheringRequired}
                onChange={(e) => setLeadGatheringRequired(e.target.checked)}
                className="w-5 h-5 accent-cyan-500"
              />
              <span className="font-medium">
                Lead Generation Service <span className="text-gray-400 text-sm">(+$99/mo)</span>
              </span>
            </label>
            <p className="text-sm text-gray-400 mt-2 ml-8">
              Get qualified leads tailored to your business needs
            </p>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold"
      >
        Continue →
      </motion.button>
    </motion.div>
  )
}
