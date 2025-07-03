"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, FileText, Users, TrendingUp } from "lucide-react"
import type { HCP } from "@/types/hcp"

interface NodeTooltipProps {
  hcp: HCP
}

export default function NodeTooltip({ hcp }: NodeTooltipProps) {
  return (
    <Card className="p-4 bg-white shadow-xl border max-w-sm pointer-events-none">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={hcp.avatar || "/placeholder.svg?height=48&width=48"}
              alt={hcp.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{hcp.name}</h3>
            <p className="text-sm text-blue-600">{hcp.specialty}</p>
            <Badge variant="secondary" className="text-xs">
              {hcp.yearsExperience} years experience
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">{hcp.patientsServed}</p>
              <p className="text-xs text-gray-500">Patients</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">{hcp.successRate}%</p>
              <p className="text-xs text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium text-gray-900">Education</h4>
          </div>
          {hcp.education.slice(0, 2).map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="text-sm font-medium text-gray-900">{edu.institution}</p>
              <p className="text-xs text-gray-600">{edu.degree}</p>
              <p className="text-xs text-gray-500">{edu.specialization}</p>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        {hcp.workExperience && hcp.workExperience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-orange-600" />
              <h4 className="font-medium text-gray-900">Experience</h4>
            </div>
            {hcp.workExperience.slice(0, 2).map((work, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <p className="text-sm font-medium text-gray-900">{work.position}</p>
                <p className="text-xs text-gray-600">{work.institution}</p>
                <p className="text-xs text-gray-500">{work.period}</p>
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {hcp.publications && hcp.publications.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-gray-900">Recent Publications</h4>
            </div>
            {hcp.publications.slice(0, 2).map((pub, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{pub.title}</p>
                <p className="text-xs text-gray-600">
                  {pub.journal} ({pub.year})
                </p>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        <div>
          <p className="text-xs text-gray-600 line-clamp-3">{hcp.about}</p>
        </div>
      </div>
    </Card>
  )
}
