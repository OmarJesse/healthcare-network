"use client"

import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "reactflow"
import { Badge } from "@/components/ui/badge"

export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const getConnectionTypeColor = () => {
    switch (data?.connection?.type) {
      case "Co-authored":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Colleague":
        return "bg-green-100 text-green-800 border-green-200"
      case "Mentor-Mentee":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Referral":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Research Collaboration":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConnectionTypeShort = () => {
    switch (data?.connection?.type) {
      case "Co-authored":
        return "Co-auth"
      case "Colleague":
        return "Colleague"
      case "Mentor-Mentee":
        return "Mentor"
      case "Referral":
        return "Referral"
      case "Research Collaboration":
        return "Research"
      default:
        return "Connected"
    }
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 10,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <Badge variant="secondary" className={`text-xs px-2 py-1 ${getConnectionTypeColor()} shadow-sm`}>
            {getConnectionTypeShort()}
          </Badge>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
