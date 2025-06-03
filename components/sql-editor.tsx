"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { PlayIcon, SaveIcon, DownloadIcon, ClipboardIcon, HistoryIcon } from "lucide-react"

// Mock query history
const queryHistory = [
  {
    id: 1,
    query: "SELECT * FROM HR.EMPLOYEES WHERE DEPARTMENT_ID = 90",
    timestamp: "2023-05-15T10:30:00Z",
    duration: "0.12s",
  },
  {
    id: 2,
    query:
      "SELECT DEPARTMENT_NAME, COUNT(*) FROM HR.EMPLOYEES e JOIN HR.DEPARTMENTS d ON e.DEPARTMENT_ID = d.DEPARTMENT_ID GROUP BY DEPARTMENT_NAME ORDER BY COUNT(*) DESC",
    timestamp: "2023-05-15T10:25:00Z",
    duration: "0.23s",
  },
  {
    id: 3,
    query: "SELECT * FROM HR.JOBS",
    timestamp: "2023-05-15T10:20:00Z",
    duration: "0.05s",
  },
]

// Mock query results
const mockResults = {
  columns: [
    "EMPLOYEE_ID",
    "FIRST_NAME",
    "LAST_NAME",
    "EMAIL",
    "PHONE_NUMBER",
    "HIRE_DATE",
    "JOB_ID",
    "SALARY",
    "DEPARTMENT_ID",
  ],
  rows: [
    [100, "Steven", "King", "SKING", "515.123.4567", "2003-06-17", "AD_PRES", 24000, 90],
    [101, "Neena", "Kochhar", "NKOCHHAR", "515.123.4568", "2005-09-21", "AD_VP", 17000, 90],
    [102, "Lex", "De Haan", "LDEHAAN", "515.123.4569", "2001-01-13", "AD_VP", 17000, 90],
  ],
}

export function SqlEditor() {
  const [query, setQuery] = useState("SELECT * FROM HR.EMPLOYEES WHERE DEPARTMENT_ID = 90")
  const [isExecuting, setIsExecuting] = useState(false)
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState("editor")

  const executeQuery = () => {
    setIsExecuting(true)

    // Simulate query execution
    setTimeout(() => {
      setResults(mockResults)
      setIsExecuting(false)
      toast({
        title: "Query executed successfully",
        description: "Retrieved 3 rows in 0.12 seconds",
      })
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query)
    toast({
      title: "Copied to clipboard",
      description: "SQL query copied to clipboard",
    })
  }

  const loadFromHistory = (historicalQuery) => {
    setQuery(historicalQuery.query)
    setActiveTab("editor")
    toast({
      title: "Query loaded from history",
      description: "You can now edit and execute this query",
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="flex items-center p-2 border-b">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <div className="flex items-center ml-auto gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <ClipboardIcon className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <SaveIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={executeQuery} disabled={isExecuting}>
              <PlayIcon className="w-4 h-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute"}
            </Button>
          </div>
        </div>

        <TabsContent value="editor" className="flex flex-col flex-1 p-0 m-0">
          <div className="flex-1 p-4 border-b">
            <textarea
              className="w-full h-full p-4 font-mono text-sm bg-muted/50 rounded-md focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your SQL query here..."
            />
          </div>

          <div className="flex-1 p-4 overflow-auto">
            {results ? (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        {results.columns.map((column, index) => (
                          <th key={index} className="p-2 text-left font-medium border">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-muted/50" : ""}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2 border">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <HistoryIcon className="w-12 h-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No results to display</h3>
                <p className="mt-2 text-sm text-muted-foreground">Execute a query to see results here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="p-4 m-0 overflow-auto">
          <div className="space-y-4">
            {queryHistory.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(item.timestamp)} • {item.duration}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => loadFromHistory(item)}>
                      Load
                    </Button>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm overflow-x-auto">{item.query}</div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
