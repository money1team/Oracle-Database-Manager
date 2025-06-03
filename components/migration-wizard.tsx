"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function MigrationWizard() {
  const [step, setStep] = useState(1)
  const [migrationType, setMigrationType] = useState("table-to-table")
  const [sourceSchema, setSourceSchema] = useState("")
  const [sourceTable, setSourceTable] = useState("")
  const [targetSchema, setTargetSchema] = useState("")
  const [targetTable, setTargetTable] = useState("")
  const [migrationMethod, setMigrationMethod] = useState("copy")
  const [customQuery, setCustomQuery] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleRun = () => {
    setIsRunning(true)
    setProgress(0)

    // Simulate migration progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)

          toast({
            title: "Migration completed",
            description: "Data migration has been successfully completed.",
          })

          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Data Migration Wizard</h1>

        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= 1 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= 2 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= 3 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
            >
              3
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= 4 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
            >
              4
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="text-center">Source</div>
            <div className="text-center">Target</div>
            <div className="text-center">Options</div>
            <div className="text-center">Execute</div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Source</CardTitle>
              <CardDescription>Choose the source data for migration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="migration-type">Migration Type</Label>
                <Select value={migrationType} onValueChange={setMigrationType}>
                  <SelectTrigger id="migration-type">
                    <SelectValue placeholder="Select migration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table-to-table">Table to Table</SelectItem>
                    <SelectItem value="query-to-table">Query to Table</SelectItem>
                    <SelectItem value="schema-to-schema">Schema to Schema</SelectItem>
                    <SelectItem value="database-to-database">Database to Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {migrationType === "table-to-table" && (
                <>
                  <div>
                    <Label htmlFor="source-schema">Source Schema</Label>
                    <Select value={sourceSchema} onValueChange={setSourceSchema}>
                      <SelectTrigger id="source-schema">
                        <SelectValue placeholder="Select schema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="OE">OE</SelectItem>
                        <SelectItem value="SH">SH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="source-table">Source Table</Label>
                    <Select value={sourceTable} onValueChange={setSourceTable}>
                      <SelectTrigger id="source-table">
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMPLOYEES">EMPLOYEES</SelectItem>
                        <SelectItem value="DEPARTMENTS">DEPARTMENTS</SelectItem>
                        <SelectItem value="JOBS">JOBS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {migrationType === "query-to-table" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-query">Custom SQL Query</Label>
                  <Textarea
                    id="custom-query"
                    placeholder="SELECT * FROM HR.EMPLOYEES WHERE DEPARTMENT_ID = 90"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="h-32 font-mono"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Target</CardTitle>
              <CardDescription>Choose where to migrate the data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="target-schema">Target Schema</Label>
                <Select value={targetSchema} onValueChange={setTargetSchema}>
                  <SelectTrigger id="target-schema">
                    <SelectValue placeholder="Select schema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="OE">OE</SelectItem>
                    <SelectItem value="SH">SH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target-table">Target Table</Label>
                <div className="flex gap-2">
                  <Select value={targetTable} onValueChange={setTargetTable} className="flex-1">
                    <SelectTrigger id="target-table">
                      <SelectValue placeholder="Select table" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMPLOYEES_BACKUP">EMPLOYEES_BACKUP</SelectItem>
                      <SelectItem value="EMPLOYEES_ARCHIVE">EMPLOYEES_ARCHIVE</SelectItem>
                      <SelectItem value="NEW_TABLE">Create new table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {targetTable === "NEW_TABLE" && (
                <div className="space-y-2">
                  <Label htmlFor="new-table-name">New Table Name</Label>
                  <Input id="new-table-name" placeholder="Enter table name" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Migration Options</CardTitle>
              <CardDescription>Configure how the data should be migrated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Migration Method</Label>
                <RadioGroup value={migrationMethod} onValueChange={setMigrationMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="copy" id="copy" />
                    <Label htmlFor="copy">Copy data (keep source data)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="move" id="move" />
                    <Label htmlFor="move">Move data (delete from source after migration)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Data Handling</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="truncate" className="rounded" />
                  <Label htmlFor="truncate">Truncate target table before migration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="constraints" className="rounded" />
                  <Label htmlFor="constraints">Disable constraints during migration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="triggers" className="rounded" />
                  <Label htmlFor="triggers">Disable triggers during migration</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch-size">Batch Size</Label>
                <Select defaultValue="1000">
                  <SelectTrigger id="batch-size">
                    <SelectValue placeholder="Select batch size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 rows</SelectItem>
                    <SelectItem value="500">500 rows</SelectItem>
                    <SelectItem value="1000">1,000 rows</SelectItem>
                    <SelectItem value="5000">5,000 rows</SelectItem>
                    <SelectItem value="10000">10,000 rows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Execute Migration</CardTitle>
              <CardDescription>Review and execute the data migration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2">Migration Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Source:</div>
                    <div className="col-span-2">
                      {sourceSchema}.{sourceTable}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Target:</div>
                    <div className="col-span-2">
                      {targetSchema}.{targetTable}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Method:</div>
                    <div className="col-span-2 capitalize">{migrationMethod} data</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md font-mono text-sm">
                {migrationType === "table-to-table" ? (
                  <>
                    <div>-- Generated SQL for migration</div>
                    <div>
                      INSERT INTO {targetSchema}.{targetTable}
                    </div>
                    <div>
                      SELECT * FROM {sourceSchema}.{sourceTable};
                    </div>
                    {migrationMethod === "move" && (
                      <div className="mt-2">
                        DELETE FROM {sourceSchema}.{sourceTable};
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>-- Generated SQL for migration</div>
                    <div>
                      INSERT INTO {targetSchema}.{targetTable}
                    </div>
                    <div>{customQuery};</div>
                  </>
                )}
              </div>

              {isRunning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Migration progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleRun} disabled={isRunning}>
                {isRunning ? "Running..." : "Run Migration"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
