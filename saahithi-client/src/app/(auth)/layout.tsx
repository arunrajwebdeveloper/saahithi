export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full flex bg-green-400">
      <div className="max-w-80 m-auto bg-white p-4">{children}</div>
    </section>
  );
}
