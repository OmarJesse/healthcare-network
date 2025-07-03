"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award, MoreHorizontal, Heart } from "lucide-react"
import type { HCP } from "@/types/hcp"

interface ProfileSidebarProps {
  hcp: HCP
}

export default function ProfileSidebar({ hcp }: ProfileSidebarProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
          <img
            src={hcp.avatar || "/placeholder.svg?height=96&width=96"}
            alt={hcp.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{hcp.name}</h2>
        <p className="text-blue-600 font-medium">{hcp.specialty}</p>
        <Badge variant="secondary" className="mt-1">
          {hcp.yearsExperience} years
        </Badge>
        <p className="text-sm text-gray-600 mt-2">{hcp.description}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">Peers</p>
          <p className="text-lg font-semibold">{hcp.peersCount}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Following</p>
          <p className="text-lg font-semibold">{hcp.followingCount}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Profile</Button>
        <Button variant="outline" className="flex-1 bg-white text-gray-600 border-gray-300">
          Resume
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Patient Served</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{hcp.patientsServed}</p>
          <p className="text-sm text-green-500">+{hcp.patientsGrowth}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Success rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{hcp.successRate}%</p>
          <p className="text-sm text-green-500">+{hcp.successRateGrowth}%</p>
        </div>
      </div>

      {/* About Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{hcp.about}</p>
      </div>

      {/* Education */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
        <div className="space-y-3">
          {hcp.education.map((edu, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.specialization}</p>
                <p className="text-xs text-gray-400">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
