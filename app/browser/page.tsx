"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatabaseBrowser } from "@/components/database-browser"
import { SqlEditor } from "@/components/sql-editor"
import { DataTable } from "@/components/data-table"
import { MigrationWizard } from "@/components/migration-wizard"
import { DatabaseIcon, RefreshCwIcon, SearchIcon } from "lucide-react"

export default function BrowserPage() {
  const [activeTab, setActiveTab] = useState("browser")

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <DatabaseIcon className="w-6 h-6" />
          <span>ORCL@localhost</span>
        </div>
        <div className="flex items-center ml-auto gap-4">
          <div className="relative w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search database objects..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="flex flex-1 overflow-hidden"
        >
          <TabsList className="flex flex-col h-full gap-2 p-2 border-r bg-muted/50">
            <TabsTrigger value="browser" className="justify-start">
              <DatabaseIcon className="w-4 h-4 mr-2" />
              Browser
            </TabsTrigger>
            <TabsTrigger value="sql" className="justify-start">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6H20M4 12H20M4 18H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              SQL Editor
            </TabsTrigger>
            <TabsTrigger value="data" className="justify-start">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9H21M3 15H21M12 3V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Data
            </TabsTrigger>
            <TabsTrigger value="migration" className="justify-start">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 8L21 12M21 12L17 16M21 12H3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Migration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="flex-1 p-0 m-0 overflow-auto">
            <DatabaseBrowser />
          </TabsContent>

          <TabsContent value="sql" className="flex-1 p-0 m-0 overflow-hidden">
            <SqlEditor />
          </TabsContent>

          <TabsContent value="data" className="flex-1 p-0 m-0 overflow-auto">
            <div className="p-4">
              <Card className="overflow-hidden">
                <DataTable />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="migration" className="flex-1 p-0 m-0 overflow-auto">
            <MigrationWizard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
