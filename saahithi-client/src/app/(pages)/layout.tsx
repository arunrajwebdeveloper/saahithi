export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full flex">
      <>{children}</>
    </section>
  );
}
