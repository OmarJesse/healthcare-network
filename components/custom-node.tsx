"use client"

import type React from "react"
import { Handle, Position } from "reactflow"
import type { HCP } from "@/types/hcp"

interface CustomNodeProps {
  data: {
    hcp: HCP
    isCenter: boolean
    isHighlighted: boolean
    onClick: (nodeId: string) => void
    onHover: (hcp: HCP, position: { x: number; y: number }) => void
    onHoverEnd: () => void
  }
}

export default function CustomNode({ data }: CustomNodeProps) {
  const { hcp, isCenter, isHighlighted, onClick, onHover, onHoverEnd } = data

  const handleClick = () => {
    onClick(hcp.id)
  }

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const reactFlowBounds = event.currentTarget.closest(".react-flow")?.getBoundingClientRect()

    if (reactFlowBounds) {
      onHover(hcp, {
        x: rect.left + rect.width / 2 - reactFlowBounds.left,
        y: rect.top - reactFlowBounds.top,
      })
    }
  }

  const handleMouseLeave = () => {
    onHoverEnd()
  }

  const getBorderColor = () => {
    if (isHighlighted) return "border-amber-400 shadow-lg shadow-amber-200"
    if (isCenter) return "border-blue-500 shadow-lg shadow-blue-200"

    // Color based on specialty
    switch (hcp.specialty.toLowerCase()) {
      case "cardiology":
        return "border-red-400"
      case "neurology":
        return "border-purple-400"
      case "oncology":
        return "border-green-400"
      case "pediatrics":
        return "border-pink-400"
      case "psychiatry":
        return "border-indigo-400"
      case "emergency medicine":
        return "border-orange-400"
      case "dermatology":
        return "border-cyan-400"
      case "orthopedics":
        return "border-yellow-400"
      case "radiology":
        return "border-teal-400"
      case "anesthesiology":
        return "border-rose-400"
      case "obstetrics & gynecology":
        return "border-violet-400"
      case "gastroenterology":
        return "border-emerald-400"
      default:
        return "border-gray-300"
    }
  }

  // Calculate node size based on data metrics
  const getNodeSize = () => {
    if (isCenter) return { size: "w-24 h-24", border: "border-4" }

    // Size based on combination of experience, patients served, and success rate
    const experienceScore = Math.min(hcp.yearsExperience / 20, 1) // Max 20 years
    const patientsScore = Math.min(hcp.patientsServed / 1500, 1) // Max 1500 patients
    const successScore = hcp.successRate / 100 // Convert percentage to decimal

    const combinedScore = (experienceScore + patientsScore + successScore) / 3

    if (combinedScore > 0.8) return { size: "w-20 h-20", border: "border-3" }
    if (combinedScore > 0.6) return { size: "w-16 h-16", border: "border-3" }
    if (combinedScore > 0.4) return { size: "w-14 h-14", border: "border-2" }
    return { size: "w-12 h-12", border: "border-2" }
  }

  const { size, border } = getNodeSize()

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />

      <div
        className={`${size} ${border} ${getBorderColor()} rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg bg-white ${
          isHighlighted ? "shadow-xl scale-110" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={hcp.avatar || "/placeholder.svg?height=80&width=80"}
          alt={hcp.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
