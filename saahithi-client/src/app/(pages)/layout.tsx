export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen w-full overflow-y-auto overflow-x-hidden flex">
      <>{children}</>
    </section>
  );
}
