// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const saveDemoRequest = async (data) => {
  const { data: saved, error } = await supabase
    .from('demo_requests')
    .insert([
      {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service_type: data.serviceType,
        agent_count: data.agentCount,
        plan_type: data.planType,
        monthly_budget: data.monthlyBudget,
        dnc_required: data.isDNCRequired,
        lead_gathering: data.isLeadGatheringRequired,
        created_at: new Date(),
      },
    ])
  
  if (error) throw error
  return saved
}

export const saveAgreement = async (customerId, agreementData) => {
  const { data, error } = await supabase
    .from('agreements')
    .insert([
      {
        customer_id: customerId,
        agreement_text: agreementData.text,
        signed_at: new Date(),
        accepted: true,
      },
    ])
  
  if (error) throw error
  return data
}
