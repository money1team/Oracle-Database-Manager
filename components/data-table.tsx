"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { EditIcon, PlusIcon, SaveIcon, TrashIcon } from "lucide-react"

// Mock data for the table
const initialData = [
  {
    id: 100,
    first_name: "Steven",
    last_name: "King",
    email: "SKING",
    phone_number: "515.123.4567",
    hire_date: "2003-06-17",
    job_id: "AD_PRES",
    salary: 24000,
    department_id: 90,
  },
  {
    id: 101,
    first_name: "Neena",
    last_name: "Kochhar",
    email: "NKOCHHAR",
    phone_number: "515.123.4568",
    hire_date: "2005-09-21",
    job_id: "AD_VP",
    salary: 17000,
    department_id: 90,
  },
  {
    id: 102,
    first_name: "Lex",
    last_name: "De Haan",
    email: "LDEHAAN",
    phone_number: "515.123.4569",
    hire_date: "2001-01-13",
    job_id: "AD_VP",
    salary: 17000,
    department_id: 90,
  },
  {
    id: 103,
    first_name: "Alexander",
    last_name: "Hunold",
    email: "AHUNOLD",
    phone_number: "590.423.4567",
    hire_date: "2006-01-03",
    job_id: "IT_PROG",
    salary: 9000,
    department_id: 60,
  },
  {
    id: 104,
    first_name: "Bruce",
    last_name: "Ernst",
    email: "BERNST",
    phone_number: "590.423.4568",
    hire_date: "2007-05-21",
    job_id: "IT_PROG",
    salary: 6000,
    department_id: 60,
  },
]

export function DataTable() {
  const [data, setData] = useState(initialData)
  const [editingRow, setEditingRow] = useState(null)
  const [editedValues, setEditedValues] = useState({})
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newRow, setNewRow] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    hire_date: "",
    job_id: "",
    salary: "",
    department_id: "",
  })

  const handleEdit = (row) => {
    setEditingRow(row.id)
    setEditedValues({ ...row })
  }

  const handleSave = () => {
    setData(data.map((row) => (row.id === editingRow ? editedValues : row)))
    setEditingRow(null)

    toast({
      title: "Row updated",
      description: "The changes have been saved.",
    })
  }

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id))

    toast({
      title: "Row deleted",
      description: "The row has been removed from the table.",
    })
  }

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    })
  }

  const handleNewRowChange = (field, value) => {
    setNewRow({
      ...newRow,
      [field]: value,
    })
  }

  const handleAddRow = () => {
    // Convert numeric fields
    const processedRow = {
      ...newRow,
      id: Number.parseInt(newRow.id),
      salary: Number.parseInt(newRow.salary),
      department_id: Number.parseInt(newRow.department_id),
    }

    setData([...data, processedRow])
    setIsAddDialogOpen(false)
    setNewRow({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      hire_date: "",
      job_id: "",
      salary: "",
      department_id: "",
    })

    toast({
      title: "Row added",
      description: "A new row has been added to the table.",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">HR.EMPLOYEES</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details for the new employee record.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.keys(newRow).map((field) => (
                <div key={field} className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor={field} className="text-right capitalize">
                    {field.replace("_", " ")}:
                  </label>
                  <Input
                    id={field}
                    value={newRow[field]}
                    onChange={(e) => handleNewRowChange(field, e.target.value)}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRow}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableHead key={key} className="capitalize">
                  {key.replace("_", " ")}
                </TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    {editingRow === row.id ? (
                      <Input value={editedValues[key]} onChange={(e) => handleInputChange(key, e.target.value)} />
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    {editingRow === row.id ? (
                      <Button size="icon" variant="outline" onClick={handleSave}>
                        <SaveIcon className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button size="icon" variant="outline" onClick={() => handleEdit(row)}>
                        <EditIcon className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="outline" className="text-red-500" onClick={() => handleDelete(row.id)}>
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
