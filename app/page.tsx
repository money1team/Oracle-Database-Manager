import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DatabaseIcon, GitMergeIcon, PlayIcon, SettingsIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Oracle Database Manager",
  description: "A universal web-based Oracle database management system",
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 mx-auto sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <DatabaseIcon className="w-6 h-6" />
            <span>Oracle DB Manager</span>
          </Link>
          <nav className="flex items-center gap-4 ml-auto">
            <Link href="/connections">
              <Button variant="ghost" size="sm">
                Connections
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Oracle Database Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A universal web-based solution for managing Oracle databases with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/connections/new">
                  <Button>Connect to Database</Button>
                </Link>
                <Link href="/connections">
                  <Button variant="outline">View Connections</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <DatabaseIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">CRUD Operations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create, read, update, and delete data with an intuitive interface. Manage your tables, views, and
                  stored procedures.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <GitMergeIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Data Migration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Migrate data between tables, schemas, or databases with a powerful wizard. Export and import data in
                  various formats.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <PlayIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">SQL Command Runner</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Execute any SQL command with syntax highlighting and auto-completion. Save and reuse your queries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Oracle DB Manager. All rights reserved.
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/about" className="text-gray-500 hover:underline dark:text-gray-400">
              About
            </Link>
            <Link href="/docs" className="text-gray-500 hover:underline dark:text-gray-400">
              Documentation
            </Link>
            <Link href="/support" className="text-gray-500 hover:underline dark:text-gray-400">
              Support
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
