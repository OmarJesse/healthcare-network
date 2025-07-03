"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { HCP } from "@/types/hcp"

interface SearchBarProps {
  onSearch: (query: string) => void
  onSelectHCP: (hcp: HCP) => void
  hcps: HCP[]
}

export default function SearchBar({ onSearch, onSelectHCP, hcps }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<HCP[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      const results = hcps.filter(
        (hcp) =>
          hcp.name.toLowerCase().includes(query.toLowerCase()) ||
          hcp.specialty.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [query, hcps])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    if (searchResults.length > 0) {
      onSelectHCP(searchResults[0])
      setShowResults(false)
    }
  }

  const handleSelectHCP = (hcp: HCP) => {
    setQuery(hcp.name)
    onSelectHCP(hcp)
    onSearch(hcp.name)
    setShowResults(false)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" className="bg-white text-gray-600">
          <Filter className="w-4 h-4" />
        </Button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto">
          {searchResults.map((hcp) => (
            <div
              key={hcp.id}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelectHCP(hcp)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={hcp.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={hcp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{hcp.name}</p>
                  <p className="text-sm text-gray-600">{hcp.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* No Results */}
      {showResults && query && searchResults.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 p-3">
          <p className="text-gray-500 text-sm">No healthcare professionals found</p>
        </Card>
      )}
    </div>
  )
}
