import { SparklesCore } from '@/components/ui/sparkles';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen w-full bg-black-0">
      <div className="w-full absolute h-screen">
         <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
      </div>
      <div className="min-h-screen bg-transparent flex items-center animate__animated animate__fadeIn delay-500">
        {children}
      </div>
    </main>
  );
}