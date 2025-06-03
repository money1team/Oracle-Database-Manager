"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DatabaseIcon,
  FolderIcon,
  RefreshCwIcon,
  SearchIcon,
  TableIcon,
} from "lucide-react"

// Mock data for database objects
const mockSchemas = [
  {
    name: "HR",
    tables: [
      { name: "EMPLOYEES", rowCount: 107 },
      { name: "DEPARTMENTS", rowCount: 27 },
      { name: "JOBS", rowCount: 19 },
      { name: "LOCATIONS", rowCount: 23 },
      { name: "COUNTRIES", rowCount: 25 },
      { name: "REGIONS", rowCount: 4 },
    ],
    views: [{ name: "EMP_DETAILS_VIEW" }, { name: "DEPT_SUMMARY_VIEW" }],
    procedures: [{ name: "ADD_EMPLOYEE" }, { name: "UPDATE_SALARY" }, { name: "GET_EMPLOYEE_INFO" }],
  },
  {
    name: "OE",
    tables: [
      { name: "CUSTOMERS", rowCount: 319 },
      { name: "ORDERS", rowCount: 105 },
      { name: "ORDER_ITEMS", rowCount: 665 },
      { name: "PRODUCTS", rowCount: 288 },
      { name: "PRODUCT_CATEGORIES", rowCount: 22 },
      { name: "WAREHOUSES", rowCount: 9 },
    ],
    views: [{ name: "ORDER_SUMMARY" }, { name: "CUSTOMER_ORDERS" }],
    procedures: [{ name: "PROCESS_ORDER" }, { name: "UPDATE_INVENTORY" }],
  },
  {
    name: "SH",
    tables: [
      { name: "SALES", rowCount: 918843 },
      { name: "CUSTOMERS", rowCount: 55500 },
      { name: "PRODUCTS", rowCount: 72 },
      { name: "CHANNELS", rowCount: 5 },
      { name: "PROMOTIONS", rowCount: 503 },
      { name: "TIMES", rowCount: 1826 },
    ],
    views: [{ name: "SALES_SUMMARY" }],
    procedures: [{ name: "ANALYZE_SALES" }],
  },
]

export function DatabaseBrowser() {
  const [expandedSchemas, setExpandedSchemas] = useState({})
  const [expandedTables, setExpandedTables] = useState({})
  const [expandedViews, setExpandedViews] = useState({})
  const [expandedProcedures, setExpandedProcedures] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  const toggleSchema = (schemaName) => {
    setExpandedSchemas({
      ...expandedSchemas,
      [schemaName]: !expandedSchemas[schemaName],
    })
  }

  const toggleTableFolder = (schemaName) => {
    setExpandedTables({
      ...expandedTables,
      [schemaName]: !expandedTables[schemaName],
    })
  }

  const toggleViewFolder = (schemaName) => {
    setExpandedViews({
      ...expandedViews,
      [schemaName]: !expandedViews[schemaName],
    })
  }

  const toggleProcedureFolder = (schemaName) => {
    setExpandedProcedures({
      ...expandedProcedures,
      [schemaName]: !expandedProcedures[schemaName],
    })
  }

  const handleTableClick = (schemaName, tableName) => {
    toast({
      title: "Loading table data",
      description: `Loading ${schemaName}.${tableName}...`,
    })
  }

  const filteredSchemas = searchTerm
    ? mockSchemas
        .map((schema) => ({
          ...schema,
          tables: schema.tables.filter((table) => table.name.toLowerCase().includes(searchTerm.toLowerCase())),
          views: schema.views.filter((view) => view.name.toLowerCase().includes(searchTerm.toLowerCase())),
          procedures: schema.procedures.filter((proc) => proc.name.toLowerCase().includes(searchTerm.toLowerCase())),
        }))
        .filter(
          (schema) =>
            schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schema.tables.length > 0 ||
            schema.views.length > 0 ||
            schema.procedures.length > 0,
        )
    : mockSchemas

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search database objects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="ml-2">
          <RefreshCwIcon className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="objects" className="flex-1">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="objects">Objects</TabsTrigger>
          <TabsTrigger value="data-dictionary">Data Dictionary</TabsTrigger>
        </TabsList>

        <TabsContent value="objects" className="flex-1 p-0 m-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-2">
              {filteredSchemas.map((schema) => (
                <div key={schema.name} className="mb-1">
                  <div
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => toggleSchema(schema.name)}
                  >
                    {expandedSchemas[schema.name] ? (
                      <ChevronDownIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 mr-1" />
                    )}
                    <DatabaseIcon className="w-4 h-4 mr-2" />
                    <span>{schema.name}</span>
                  </div>

                  {expandedSchemas[schema.name] && (
                    <div className="ml-6">
                      {/* Tables folder */}
                      <div
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => toggleTableFolder(schema.name)}
                      >
                        {expandedTables[schema.name] ? (
                          <ChevronDownIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 mr-1" />
                        )}
                        <FolderIcon className="w-4 h-4 mr-2" />
                        <span>Tables ({schema.tables.length})</span>
                      </div>

                      {expandedTables[schema.name] && (
                        <div className="ml-6">
                          {schema.tables.map((table) => (
                            <div
                              key={table.name}
                              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                              onClick={() => handleTableClick(schema.name, table.name)}
                            >
                              <TableIcon className="w-4 h-4 mr-2" />
                              <span>{table.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">({table.rowCount} rows)</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Views folder */}
                      <div
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => toggleViewFolder(schema.name)}
                      >
                        {expandedViews[schema.name] ? (
                          <ChevronDownIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 mr-1" />
                        )}
                        <FolderIcon className="w-4 h-4 mr-2" />
                        <span>Views ({schema.views.length})</span>
                      </div>

                      {expandedViews[schema.name] && (
                        <div className="ml-6">
                          {schema.views.map((view) => (
                            <div
                              key={view.name}
                              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>{view.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Procedures folder */}
                      <div
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => toggleProcedureFolder(schema.name)}
                      >
                        {expandedProcedures[schema.name] ? (
                          <ChevronDownIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 mr-1" />
                        )}
                        <FolderIcon className="w-4 h-4 mr-2" />
                        <span>Procedures ({schema.procedures.length})</span>
                      </div>

                      {expandedProcedures[schema.name] && (
                        <div className="ml-6">
                          {schema.procedures.map((proc) => (
                            <div
                              key={proc.name}
                              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 14.66V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H9.34"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 2L22 8L12 18H6V12L16 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>{proc.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="data-dictionary" className="flex-1 p-0 m-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-4">
              <p className="text-muted-foreground">Browse Oracle data dictionary views to explore database metadata.</p>

              <div className="mt-4 space-y-2">
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_TABLES</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_TAB_COLUMNS</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_INDEXES</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_CONSTRAINTS</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_SEQUENCES</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_VIEWS</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_PROCEDURES</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_TRIGGERS</span>
                </div>
                <div className="p-2 rounded-md cursor-pointer hover:bg-muted">
                  <span>ALL_USERS</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
