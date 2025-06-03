"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { DatabaseIcon, KeyIcon, ServerIcon, UserIcon } from "lucide-react"

export default function NewConnectionPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (event) => {
    event.preventDefault()
    setIsConnecting(true)

    try {
      // In a real app, this would connect to the Oracle database
      // using the oracledb Node.js driver
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Connection successful",
        description: "You are now connected to the database.",
      })

      router.push("/browser")
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error.message || "Could not connect to the database.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="container px-4 py-6 mx-auto md:py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">New Database Connection</h1>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Connection Details</CardTitle>
                <CardDescription>Enter your Oracle database connection details</CardDescription>
              </CardHeader>
              <form onSubmit={handleConnect}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Connection Name</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 border border-r-0 rounded-l-md bg-muted">
                        <DatabaseIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Input id="name" placeholder="My Oracle Database" className="rounded-l-none" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="host">Hostname / IP</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 border border-r-0 rounded-l-md bg-muted">
                        <ServerIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Input id="host" placeholder="localhost or 192.168.1.1" className="rounded-l-none" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input id="port" type="number" placeholder="1521" defaultValue="1521" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Name / SID</Label>
                      <Input id="service" placeholder="ORCL" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 border border-r-0 rounded-l-md bg-muted">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Input id="username" placeholder="system" className="rounded-l-none" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 border border-r-0 rounded-l-md bg-muted">
                        <KeyIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Input id="password" type="password" placeholder="••••••••" className="rounded-l-none" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Connection Settings</CardTitle>
                <CardDescription>Configure additional connection parameters</CardDescription>
              </CardHeader>
              <form onSubmit={handleConnect}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="connection-string">Connection String</Label>
                    <Input
                      id="connection-string"
                      placeholder="(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username-adv">Username</Label>
                    <Input id="username-adv" placeholder="system" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-adv">Password</Label>
                    <Input id="password-adv" type="password" placeholder="••••••••" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Connection Timeout (seconds)</Label>
                    <Input id="timeout" type="number" placeholder="30" defaultValue="30" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
