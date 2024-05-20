import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CreateTaskForm } from "@/components/create-task-form";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Organize suas pendências de forma rápida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn("flex h-screen justify-center", inter.className)}>
        <Providers>
          <main className="flex w-full max-w-2xl flex-col items-center gap-12 p-8">
            <header className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-bold text-primary">Tarefas</h1>
              <span className="text-muted-foreground">
                Organize suas pendências de forma rápida.
              </span>
            </header>
            <CreateTaskForm />
            <section className="flex max-h-96 w-full flex-col gap-1 overflow-y-auto">
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
