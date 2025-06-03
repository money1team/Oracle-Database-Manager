"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { DatabaseIcon, ExternalLinkIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for connections
const mockConnections = [
  {
    id: "1",
    name: "Production Database",
    host: "prod-oracle.example.com",
    port: 1521,
    service: "PRODDB",
    username: "admin",
    lastConnected: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Development Database",
    host: "dev-oracle.local",
    port: 1521,
    service: "DEVDB",
    username: "developer",
    lastConnected: "2023-05-14T16:45:00Z",
  },
  {
    id: "3",
    name: "Test Database",
    host: "test-oracle.example.com",
    port: 1521,
    service: "TESTDB",
    username: "tester",
    lastConnected: "2023-05-10T09:15:00Z",
  },
]

export function ConnectionsList() {
  const router = useRouter()
  const [connections, setConnections] = useState(mockConnections)
  const [connectionToDelete, setConnectionToDelete] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleConnect = (connectionId) => {
    // In a real app, this would establish a connection
    toast({
      title: "Connecting to database",
      description: "Establishing connection...",
    })

    // Simulate connection delay
    setTimeout(() => {
      router.push("/browser")
    }, 1000)
  }

  const handleDelete = () => {
    if (!connectionToDelete) return

    setConnections(connections.filter((conn) => conn.id !== connectionToDelete.id))
    setConnectionToDelete(null)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Connection deleted",
      description: "The database connection has been removed.",
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
    <>
      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
          <DatabaseIcon className="w-12 h-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">No connections yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Create your first database connection to get started.</p>
          <Link href="/connections/new" className="mt-4">
            <Button>Create Connection</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{connection.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleConnect(connection.id)}>
                        <ExternalLinkIcon className="w-4 h-4 mr-2" />
                        Connect
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setConnectionToDelete(connection)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {connection.host}:{connection.port}/{connection.service}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <p>Username: {connection.username}</p>
                  <p>Last connected: {formatDate(connection.lastConnected)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleConnect(connection.id)}>
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Connection</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the connection to "{connectionToDelete?.name}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
