export interface HCP {
  id: string
  name: string
  specialty: string
  yearsExperience: number
  description: string
  avatar?: string
  peersCount: number
  followingCount: number
  patientsServed: number
  patientsGrowth: number
  successRate: number
  successRateGrowth: number
  about: string
  education: Education[]
  publications?: Publication[]
  workExperience?: WorkExperience[]
}

interface Education {
  institution: string
  degree: string
  specialization: string
  period: string
}

interface Publication {
  title: string
  journal: string
  year: number
  coAuthors?: string[]
}

interface WorkExperience {
  institution: string
  position: string
  period: string
  description: string
}

export interface HCPConnection {
  id: string
  from: string
  to: string
  type: "Co-authored" | "Colleague" | "Mentor-Mentee" | "Referral" | "Research Collaboration"
  description: string
  details?: string
  strength: number // 1-5 scale
}
