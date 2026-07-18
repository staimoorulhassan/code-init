// lib/pricing.js
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    monthlyPrice: 499,
    agentsIncluded: 1,
    callsPerMonth: 500,
    features: [
      'Outbound or Inbound',
      'Basic Call Tracking',
      'Simple Reporting',
      'Email Support',
    ],
    dncIncluded: false,
    leadsPerMonth: 0,
  },
  professional: {
    name: 'Professional',
    monthlyPrice: 1299,
    agentsIncluded: 3,
    callsPerMonth: 2000,
    features: [
      'Outbound + Inbound',
      'Advanced Call Tracking',
      'Detailed Analytics',
      'Priority Support',
      'DNC Scrub Included',
    ],
    dncIncluded: true,
    leadsPerMonth: 500,
  },
  enterprise: {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    agentsIncluded: 10,
    callsPerMonth: 10000,
    features: [
      'Unlimited Channels',
      'Custom Integration',
      'Dedicated Account Manager',
      '24/7 Support',
      'DNC + Lead Generation',
      'Data Security Guarantee',
    ],
    dncIncluded: true,
    leadsPerMonth: 'Custom',
  },
}

export const calculateMonthlyCost = (basePrice, agentCount, additionalAgentPrice = 200) => {
  const pricingPlan = Object.values(PRICING_PLANS).find((p) => p.monthlyPrice === basePrice)
  if (!pricingPlan) return basePrice
  
  const agentsAboveIncluded = Math.max(0, agentCount - pricingPlan.agentsIncluded)
  return basePrice + agentsAboveIncluded * additionalAgentPrice
}
