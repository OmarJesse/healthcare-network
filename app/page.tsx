"use client"

import { useState, useCallback } from "react"
import { ReactFlowProvider } from "reactflow"
import NetworkGraph from "@/components/network-graph"
import ProfileSidebar from "@/components/profile-sidebar"
import SearchBar from "@/components/search-bar"
import { mockHCPs, mockConnections } from "@/lib/mock-data"
import type { HCP } from "@/types/hcp"

export default function HomePage() {
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(mockHCPs[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectHCP = useCallback((hcp: HCP) => {
    setSelectedHCP(hcp)
    setHighlightedNodeId(hcp.id)
    // This will trigger the graph to recenter on the selected HCP
  }, [])

  const handleNodeClick = (nodeId: string) => {
    const hcp = mockHCPs.find((h) => h.id === nodeId)
    if (hcp) {
      setSelectedHCP(hcp)
      setHighlightedNodeId(nodeId)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">PeerSpace</h1>
          </div>
          <SearchBar onSearch={handleSearch} onSelectHCP={handleSelectHCP} hcps={mockHCPs} />
        </div>

        <div className="flex-1 overflow-y-auto">{selectedHCP && <ProfileSidebar hcp={selectedHCP} />}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <NetworkGraph
            hcps={mockHCPs}
            connections={mockConnections}
            selectedHCPId={selectedHCP?.id || null}
            highlightedNodeId={highlightedNodeId}
            onNodeClick={handleNodeClick}
          />
        </ReactFlowProvider>

        {/* Right Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
