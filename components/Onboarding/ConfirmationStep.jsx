// components/Onboarding/ConfirmationStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'
import { PRICING_PLANS, calculateMonthlyCost } from '@/lib/pricing'
import { saveDemoRequest } from '@/lib/supabase'

export function ConfirmationStep() {
  const {
    customerData,
    serviceType,
    agentCount,
    planType,
    isDNCRequired,
    isLeadGatheringRequired,
    monthlyBudget,
    reset,
  } = useOnboardingStore()
  const { speak, isSpeaking } = useRobotSpeech()
  const [saved, setSaved] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    saveRequest()
  }, [])

  const saveRequest = async () => {
    setLoading(true)
    try {
      await saveDemoRequest({
        name: customerData.name,
        email: customerData.email,
        company: customerData.company,
        phone: customerData.phone,
        serviceType,
        agentCount,
        planType,
        monthlyBudget,
        isDNCRequired,
        isLeadGatheringRequired,
      })
      setSaved(true)
      speak(
        `Perfect! Your request has been saved. We will contact you shortly at ${customerData.email} with your personalized quote and next steps. Thank you for choosing our AI call center solutions!`
      )
    } catch (error) {
      console.error('Error saving request:', error)
      speak('There was an error saving your request. Please try again.')
    }
    setLoading(false)
  }

  const plan = PRICING_PLANS[planType]
  const totalCost = typeof monthlyBudget === 'number' ? monthlyBudget : 'Custom'
  let dncPrice = isDNCRequired ? 49 : 0
  let leadsPrice = isLeadGatheringRequired ? 99 : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 max-w-3xl"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl mb-4"
        >
          ✓
        </motion.div>
        <h2 className="text-4xl font-bold mb-2">Great! We're All Set</h2>
        <p className="text-gray-400">
          Your request has been saved and our team will contact you soon
        </p>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900 p-8 rounded-lg border border-cyan-500/30 space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Company</p>
            <p className="font-bold text-lg">{customerData.company}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Contact</p>
            <p className="font-bold text-lg">{customerData.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Service Type</p>
            <p className="font-bold text-lg capitalize">{serviceType}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Agents</p>
            <p className="font-bold text-lg">{agentCount}</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h3 className="font-bold mb-4">Plan & Pricing</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{plan.name} Plan</span>
              <span className="font-bold text-cyan-400">
                ${typeof monthlyBudget === 'number' ? (monthlyBudget - dncPrice - leadsPrice).toLocaleString() : 'Custom'}/mo
              </span>
            </div>
            {isDNCRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">DNC Scrubbing</span>
                <span className="text-gray-400">+$49/mo</span>
              </div>
            )}
            {isLeadGatheringRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Lead Generation</span>
                <span className="text-gray-400">+$99/mo</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-3 text-cyan-400">
              <span>Total Monthly Cost</span>
              <span>
                ${typeof totalCost === 'number' ? (totalCost + dncPrice + leadsPrice).toLocaleString() : totalCost}/mo
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded text-sm text-blue-100">
          📋 <strong>Next Steps:</strong> We'll send you a detailed proposal, data protection agreement, and onboarding guide via email within 24 hours.
        </div>
      </motion.div>

      {isSpeaking && (
        <div className="flex items-center justify-center gap-2 text-cyan-400">
          <span className="animate-pulse">🎤</span>
          <span>Speaking...</span>
        </div>
      )}

      <motion.button
        onClick={() => {
          reset()
          window.location.reload()
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-lg"
      >
        Start Over
      </motion.button>
    </motion.div>
  )
}
