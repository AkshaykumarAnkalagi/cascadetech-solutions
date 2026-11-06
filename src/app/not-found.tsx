import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070e] text-white px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          404
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-sm text-zinc-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
