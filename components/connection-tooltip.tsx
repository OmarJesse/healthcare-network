"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Building, UserCheck, FlaskConical } from "lucide-react"
import type { HCPConnection } from "@/types/hcp"

interface ConnectionTooltipProps {
  connection: HCPConnection
  fromHCP: string
  toHCP: string
}

export default function ConnectionTooltip({ connection, fromHCP, toHCP }: ConnectionTooltipProps) {
  const getConnectionIcon = () => {
    switch (connection.type) {
      case "Co-authored":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "Colleague":
        return <Building className="w-4 h-4 text-green-600" />
      case "Mentor-Mentee":
        return <UserCheck className="w-4 h-4 text-purple-600" />
      case "Referral":
        return <Users className="w-4 h-4 text-orange-600" />
      case "Research Collaboration":
        return <FlaskConical className="w-4 h-4 text-red-600" />
      default:
        return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  const getStrengthColor = () => {
    if (connection.strength >= 4) return "bg-green-100 text-green-800"
    if (connection.strength >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="p-4 bg-white shadow-xl border max-w-xs">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          {getConnectionIcon()}
          <h3 className="font-semibold text-gray-900">{connection.type}</h3>
          <Badge className={`text-xs ${getStrengthColor()}`}>Strength: {connection.strength}/5</Badge>
        </div>

        {/* Connection Details */}
        <div>
          <p className="text-sm text-gray-600 mb-2">{connection.description}</p>
          {connection.details && <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{connection.details}</p>}
        </div>

        {/* Connected HCPs */}
        <div className="border-t pt-2">
          <p className="text-xs text-gray-500">
            <span className="font-medium">{fromHCP}</span> ↔ <span className="font-medium">{toHCP}</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
