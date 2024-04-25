export default async function Layout({ children }) {
  return (
    <main className="text-foreground bg-background min-h-screen min-w-screen flex flex-auto justify-center place-items-center">
      {children}
    </main>
  )
}
