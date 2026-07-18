'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { create } from 'zustand'

// Store for multi-step form state
export const useOnboardingStore = create((set) => ({
  step: 'welcome', // welcome, service-type, agents, pricing, payment, confirmation
  serviceType: null, // 'outbound' | 'inbound' | 'blended'
  agentCount: null,
  planType: null, // 'starter', 'professional', 'enterprise'
  monthlyBudget: 0,
  customerData: {
    name: '',
    email: '',
    company: '',
    phone: '',
  },
  isDNCRequired: false,
  isLeadGatheringRequired: false,
  
  setStep: (step) => set({ step }),
  setServiceType: (type) => set({ serviceType: type }),
  setAgentCount: (count) => set({ agentCount: count }),
  setPlanType: (plan) => set({ planType: plan }),
  setMonthlyBudget: (budget) => set({ monthlyBudget: budget }),
  setCustomerData: (data) => set((state) => ({
    customerData: { ...state.customerData, ...data }
  })),
  setDNCRequired: (val) => set({ isDNCRequired: val }),
  setLeadGatheringRequired: (val) => set({ isLeadGatheringRequired: val }),
  reset: () => set({
    step: 'welcome',
    serviceType: null,
    agentCount: null,
    planType: null,
    monthlyBudget: 0,
    customerData: { name: '', email: '', company: '', phone: '' },
    isDNCRequired: false,
    isLeadGatheringRequired: false,
  }),
}))

// Robot speech synthesis
export const useRobotSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.pitch = 1
      utterance.volume = 1
      utterance.voice = window.speechSynthesis.getVoices()[0]
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  return { speak, isSpeaking }
}
