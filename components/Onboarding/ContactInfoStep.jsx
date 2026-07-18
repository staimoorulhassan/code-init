// components/Onboarding/ContactInfoStep.jsx
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'

export function ContactInfoStep() {
  const { customerData, setCustomerData, setStep } = useOnboardingStore()
  const { speak } = useRobotSpeech()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    speak('Could you please provide your contact information so we can get in touch?')
  }, [speak])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!customerData.name.trim()) newErrors.name = 'Name is required'
    if (!customerData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(customerData.email)) newErrors.email = 'Invalid email'
    if (!customerData.company.trim()) newErrors.company = 'Company is required'
    if (!customerData.phone.trim()) newErrors.phone = 'Phone is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      speak('Thank you! Let me process your information and prepare your quote and agreement.')
      setTimeout(() => setStep('confirmation'), 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Your Information</h2>
        <p className="text-gray-400">We'll use this to contact you with your customized quote</p>
      </div>

      <div className="space-y-4">
        {['name', 'email', 'company', 'phone'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2 capitalize">
              {field}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={customerData[field]}
              onChange={(e) => {
                setCustomerData({ [field]: e.target.value })
                if (errors[field]) setErrors({ ...errors, [field]: '' })
              }}
              placeholder={`Enter your ${field}`}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none transition ${
                errors[field]
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-600 focus:border-cyan-500'
              }`}
            />
            {errors[field] && (
              <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
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
