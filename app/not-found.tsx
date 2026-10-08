import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#040316] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-[120px] font-black text-[#ffeb20] leading-none">
          404
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mt-3 text-white/40 max-w-sm mx-auto text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/products" className="btn-secondary">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
