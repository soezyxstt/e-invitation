import { CheckInScanner } from "@/components/admin/check-in-scanner";
import { ScanLine } from "lucide-react";

export const metadata = { title: "Check-in Scanner — Sentuh Undang" };

export default function CheckInPage() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <ScanLine size={20} className="text-stone-500" />
        <div>
          <h1 className="text-xl font-semibold text-stone-900">
            Check-in Scanner
          </h1>
          <p className="mt-0.5 text-sm text-stone-500">
            Scan QR tamu untuk mencatat kehadiran di lokasi acara (Tier Sultan).
          </p>
        </div>
      </div>

      <CheckInScanner />
    </div>
  );
}
