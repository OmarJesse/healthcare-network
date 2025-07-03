"use client"

import type React from "react"

import { useCallback, useMemo, useEffect, useState } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  Background,
  type Connection,
  ConnectionMode,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow"
import "reactflow/dist/style.css"
import CustomNode from "./custom-node"
import CustomEdge from "./custom-edge"
import NodeTooltip from "./node-tooltip"
import ConnectionTooltip from "./connection-tooltip"
import ConnectionModal from "./connection-modal"
import type { HCP, HCPConnection } from "@/types/hcp"

const nodeTypes = {
  custom: CustomNode,
}

const edgeTypes = {
  custom: CustomEdge,
}

interface NetworkGraphProps {
  hcps: HCP[]
  connections: HCPConnection[]
  selectedHCPId: string | null
  highlightedNodeId: string | null
  onNodeClick: (nodeId: string) => void
}

export default function NetworkGraph({
  hcps,
  connections,
  selectedHCPId,
  highlightedNodeId,
  onNodeClick,
}: NetworkGraphProps) {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<HCP | null>(null)
  const [edgeTooltipPosition, setEdgeTooltipPosition] = useState({ x: 0, y: 0 })
  const [nodeTooltipPosition, setNodeTooltipPosition] = useState({ x: 0, y: 0 })
  const [selectedConnection, setSelectedConnection] = useState<HCPConnection | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNodeHover = (hcp: HCP, position: { x: number; y: number }) => {
    setHoveredNode(hcp)
    setNodeTooltipPosition(position)
  }

  const handleNodeHoverEnd = () => {
    setHoveredNode(null)
  }

  // Convert HCPs to ReactFlow nodes with more organic positioning
  const initialNodes: Node[] = useMemo(() => {
    const centerHCP = hcps.find((hcp) => hcp.id === selectedHCPId) || hcps[0]
    const otherHCPs = hcps.filter((hcp) => hcp.id !== centerHCP.id)

    const nodes: Node[] = [
      {
        id: centerHCP.id,
        type: "custom",
        position: { x: 500, y: 350 },
        data: {
          hcp: centerHCP,
          isCenter: true,
          isHighlighted: highlightedNodeId === centerHCP.id,
          onClick: onNodeClick,
          onHover: handleNodeHover,
          onHoverEnd: handleNodeHoverEnd,
        },
      },
    ]

    // Create more organic positioning with varying distances
    otherHCPs.forEach((hcp, index) => {
      const ring = Math.floor(index / 8) + 1 // 8 nodes per ring for better distribution
      const nodeInRing = index % 8

      // Vary radius based on connection strength and ring
      const baseRadius = 180 + ring * 140
      const radiusVariation = (Math.random() - 0.5) * 60 // Add some randomness
      const radius = baseRadius + radiusVariation

      const angleStep = (2 * Math.PI) / Math.min(8, otherHCPs.length - (ring - 1) * 8)
      const angle = nodeInRing * angleStep + (ring % 2) * (angleStep / 2) // Offset alternate rings

      // Add more organic positioning with noise
      const x = 500 + radius * Math.cos(angle) + (Math.random() - 0.5) * 100
      const y = 350 + radius * Math.sin(angle) + (Math.random() - 0.5) * 100

      nodes.push({
        id: hcp.id,
        type: "custom",
        position: { x, y },
        data: {
          hcp,
          isCenter: false,
          isHighlighted: highlightedNodeId === hcp.id,
          onClick: onNodeClick,
          onHover: handleNodeHover,
          onHoverEnd: handleNodeHoverEnd,
        },
      })
    })

    return nodes
  }, [hcps, selectedHCPId, highlightedNodeId, onNodeClick])

  // Convert connections to ReactFlow edges with labels
  const initialEdges: Edge[] = useMemo(() => {
    return connections.map((conn) => ({
      id: `${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      type: "custom",
      animated: conn.from === selectedHCPId || conn.to === selectedHCPId,
      style: {
        stroke: conn.from === selectedHCPId || conn.to === selectedHCPId ? "#3b82f6" : "#94a3b8",
        strokeWidth: Math.max(1, conn.strength), // Vary thickness by strength
        cursor: "pointer",
      },
      data: { connection: conn },
    }))
  }, [connections, selectedHCPId])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // Update nodes when props change
  useMemo(() => {
    setNodes(initialNodes)
  }, [initialNodes, setNodes])

  useMemo(() => {
    setEdges(initialEdges)
  }, [initialEdges, setEdges])

  const reactFlowInstance = useReactFlow()

  // Add effect to center on selected HCP
  useEffect(() => {
    if (selectedHCPId && reactFlowInstance) {
      const node = nodes.find((n) => n.id === selectedHCPId)
      if (node) {
        reactFlowInstance.setCenter(node.position.x, node.position.y, { zoom: 0.8, duration: 800 })
      }
    }
  }, [selectedHCPId, nodes, reactFlowInstance])

  const handleEdgeMouseEnter = (event: React.MouseEvent, edge: Edge) => {
    setHoveredEdge(edge.id)
    const reactFlowBounds = event.currentTarget.closest(".react-flow")?.getBoundingClientRect()
    if (reactFlowBounds) {
      setEdgeTooltipPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
    } else {
      setEdgeTooltipPosition({ x: event.clientX, y: event.clientY })
    }
  }

  const handleEdgeMouseLeave = () => {
    setHoveredEdge(null)
  }

  const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation()
    setSelectedConnection(edge.data.connection)
    setIsModalOpen(true)
  }

  const hoveredConnection = hoveredEdge ? edges.find((e) => e.id === hoveredEdge)?.data.connection : null
  const fromHCP = hoveredConnection ? hcps.find((h) => h.id === hoveredConnection.from) : null
  const toHCP = hoveredConnection ? hcps.find((h) => h.id === hoveredConnection.to) : null

  const modalFromHCP = selectedConnection ? hcps.find((h) => h.id === selectedConnection.from) : null
  const modalToHCP = selectedConnection ? hcps.find((h) => h.id === selectedConnection.to) : null

  return (
    <>
      <div className="w-full h-full relative overflow-hidden">
        {/* Fade overlay for edges */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/40 via-transparent to-gray-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/40 via-transparent to-gray-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/30"></div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeMouseEnter={handleEdgeMouseEnter}
          onEdgeMouseLeave={handleEdgeMouseLeave}
          onEdgeClick={handleEdgeClick}
          connectionMode={ConnectionMode.Loose}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background variant="dots" gap={20} size={1} color="#e2e8f0" />
          <Controls />
        </ReactFlow>

        {/* Node Tooltip */}
        {hoveredNode && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: nodeTooltipPosition.x,
              top: nodeTooltipPosition.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <NodeTooltip hcp={hoveredNode} />
          </div>
        )}

        {/* Connection Tooltip */}
        {hoveredEdge && hoveredConnection && fromHCP && toHCP && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: edgeTooltipPosition.x,
              top: edgeTooltipPosition.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <ConnectionTooltip connection={hoveredConnection} fromHCP={fromHCP.name} toHCP={toHCP.name} />
          </div>
        )}
      </div>

      {/* Connection Modal */}
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        connection={selectedConnection}
        fromHCP={modalFromHCP}
        toHCP={modalToHCP}
      />
    </>
  )
}
