"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Users, FileText, Building, UserCheck, FlaskConical, Calendar, Star } from "lucide-react"
import type { HCPConnection, HCP } from "@/types/hcp"

interface ConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  connection: HCPConnection | null
  fromHCP: HCP | null
  toHCP: HCP | null
}

export default function ConnectionModal({ isOpen, onClose, connection, fromHCP, toHCP }: ConnectionModalProps) {
  if (!connection || !fromHCP || !toHCP) return null

  const getConnectionIcon = () => {
    switch (connection.type) {
      case "Co-authored":
        return <FileText className="w-6 h-6 text-blue-600" />
      case "Colleague":
        return <Building className="w-6 h-6 text-green-600" />
      case "Mentor-Mentee":
        return <UserCheck className="w-6 h-6 text-purple-600" />
      case "Referral":
        return <Users className="w-6 h-6 text-orange-600" />
      case "Research Collaboration":
        return <FlaskConical className="w-6 h-6 text-red-600" />
      default:
        return <Users className="w-6 h-6 text-gray-600" />
    }
  }

  const getStrengthColor = () => {
    if (connection.strength >= 4) return "bg-green-100 text-green-800"
    if (connection.strength >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getConnectionIcon()}
            <span>Connection Details: {connection.type}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connection Overview */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Connection Overview</h3>
              <Badge className={`${getStrengthColor()}`}>
                <Star className="w-3 h-3 mr-1" />
                Strength: {connection.strength}/5
              </Badge>
            </div>
            <p className="text-gray-600 mb-3">{connection.description}</p>
            {connection.details && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{connection.details}</p>
              </div>
            )}
          </Card>

          {/* Connected Professionals */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={fromHCP.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={fromHCP.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{fromHCP.name}</h4>
                  <p className="text-sm text-blue-600">{fromHCP.specialty}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{fromHCP.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{fromHCP.peersCount} peers</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={toHCP.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={toHCP.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{toHCP.name}</h4>
                  <p className="text-sm text-blue-600">{toHCP.specialty}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{toHCP.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{toHCP.peersCount} peers</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Additional Details based on connection type */}
          {connection.type === "Co-authored" && (
            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Collaboration History</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Joint publications in cardiovascular research</p>
                <p>• Ongoing research projects in heart-brain axis</p>
                <p>• Conference presentations together</p>
              </div>
            </Card>
          )}

          {connection.type === "Referral" && (
            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Referral Pattern</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Average 3-5 referrals per month</p>
                <p>• High success rate in patient outcomes</p>
                <p>• Specialized cases requiring cross-specialty expertise</p>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
