// app/page.jsx
'use client'
import React, { Suspense, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useOnboardingStore, useRobotSpeech } from '@/lib/store'
import { WelcomeStep } from '@/components/Onboarding/WelcomeStep'
import { ServiceTypeStep } from '@/components/Onboarding/ServiceTypeStep'
import { AgentsStep } from '@/components/Onboarding/PricingStep'
import { PricingPlansStep } from '@/components/Onboarding/PricingPlansStep'
import { SecurityStep } from '@/components/Onboarding/SecurityStep'
import { ContactInfoStep } from '@/components/Onboarding/ContactInfoStep'
import { ConfirmationStep } from '@/components/Onboarding/ConfirmationStep'

const Scene3D = dynamic(() => import('@/components/3D/Scene3D').then(mod => ({ default: mod.Scene3D })), {
  ssr: false,
  loading: () => <div className="bg-black w-full h-full" />,
})

const STEPS = {
  'welcome': WelcomeStep,
  'service-type': ServiceTypeStep,
  'agents': AgentsStep,
  'pricing': PricingPlansStep,
  'security': SecurityStep,
  'contact-info': ContactInfoStep,
  'confirmation': ConfirmationStep,
}

export default function Home() {
  const { step } = useOnboardingStore()
  const { isSpeaking } = useRobotSpeech()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const CurrentStep = STEPS[step] || WelcomeStep

  if (!mounted) return null

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      <div className="flex h-full">
        {/* 3D Robot Scene - Left Side */}
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-1/2 h-full relative hidden lg:block"
        >
          <Suspense fallback={<div className="bg-gradient-to-br from-gray-900 to-black w-full h-full" />}>
            <Scene3D isSpeaking={isSpeaking} isActive={step !== 'welcome'} />
          </Suspense>

          {/* Floating Info Card */}
          {step !== 'welcome' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 p-4 bg-gray-900/80 backdrop-blur border border-cyan-500/30 rounded-lg max-w-sm"
            >
              <p className="text-sm text-gray-300">
                💡 Our AI agents are trained to provide professional service and ensure customer satisfaction.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Content Panel - Right Side */}
        <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full lg:w-1/2 h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-black to-gray-950"
        >
          <div className="max-w-2xl mx-auto px-8 py-12 h-full flex flex-col justify-center">
            {/* Progress Indicator */}
            <div className="mb-12 flex gap-2">
              {Object.keys(STEPS).map((s, idx) => (
                <motion.div
                  key={s}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    Object.keys(STEPS).indexOf(step) >= idx
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStep />
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500">
              <p>Step {Object.keys(STEPS).indexOf(step) + 1} of {Object.keys(STEPS).length}</p>
              <p className="mt-2">Your data is secure and encrypted • Privacy Policy • Terms of Service</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
