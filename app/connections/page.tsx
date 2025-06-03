import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import { ConnectionsList } from "@/components/connections-list"

export default function ConnectionsPage() {
  return (
    <div className="container px-4 py-6 mx-auto md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Database Connections</h1>
        <Link href="/connections/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Connection
          </Button>
        </Link>
      </div>

      <ConnectionsList />

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Learn how to connect to and manage your Oracle databases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="flex items-center text-lg font-medium">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-primary rounded-full">
                  1
                </span>
                Create a new connection
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Click the "New Connection" button and enter your Oracle database credentials.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="flex items-center text-lg font-medium">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-primary rounded-full">
                  2
                </span>
                Browse your database
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Once connected, you can browse tables, views, and other database objects.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="flex items-center text-lg font-medium">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-primary rounded-full">
                  3
                </span>
                Run SQL commands
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Use the SQL editor to execute queries and view results instantly.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/docs">
              <Button variant="outline">View Documentation</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
