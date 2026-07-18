// components/Onboarding/PricingPlansStep.jsx
'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'
import { PRICING_PLANS, calculateMonthlyCost } from '@/lib/pricing'

export function PricingPlansStep() {
  const { planType, setPlanType, agentCount, setMonthlyBudget, setStep } = useOnboardingStore()
  const { speak } = useRobotSpeech()

  useEffect(() => {
    speak('Based on your team size, here are our available plans. Each includes dedicated support and advanced features.')
  }, [speak])

  const handleSelectPlan = (plan) => {
    const basePrice = PRICING_PLANS[plan].monthlyPrice
    const totalCost = typeof basePrice === 'number' 
      ? calculateMonthlyCost(basePrice, agentCount)
      : basePrice
    
    setPlanType(plan)
    setMonthlyBudget(totalCost)
    
    const planName = PRICING_PLANS[plan].name
    speak(`You selected the ${planName} plan. Let me show you what is included and the security measures we take to protect your data.`)
    
    setTimeout(() => setStep('security'), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-400">Pricing for {agentCount} agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(PRICING_PLANS).map(([key, plan]) => {
          const totalCost = typeof plan.monthlyPrice === 'number'
            ? calculateMonthlyCost(plan.monthlyPrice, agentCount)
            : plan.monthlyPrice

          return (
            <motion.div
              key={key}
              onClick={() => handleSelectPlan(key)}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                planType === key
                  ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/30'
                  : 'border-gray-600 bg-gray-900 hover:border-cyan-400'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-cyan-400 mb-4">
                {typeof totalCost === 'number' ? `$${totalCost}/mo` : totalCost}
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm">
                  <strong>Agents:</strong> {plan.agentsIncluded}
                </p>
                <p className="text-sm">
                  <strong>Calls/Month:</strong> {typeof plan.callsPerMonth === 'number' ? plan.callsPerMonth.toLocaleString() : plan.callsPerMonth}
                </p>
                {plan.dncIncluded && <p className="text-sm text-green-400">✓ DNC Scrub Included</p>}
              </div>

              <ul className="space-y-2 text-sm text-gray-300">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
