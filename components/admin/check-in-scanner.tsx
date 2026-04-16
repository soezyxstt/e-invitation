"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, CheckCircle2, XCircle, RefreshCw, Keyboard } from "lucide-react";

type CheckInResult = {
  success: boolean;
  alreadyCheckedIn?: boolean;
  guest?: {
    name: string;
    attendance: string;
    partySize: number;
    message: string | null;
  };
  invitation?: {
    title: string;
    coupleName: string;
  };
  error?: string;
};

const ATTENDANCE_LABEL: Record<string, string> = {
  ATTENDING: "Hadir",
  DECLINED: "Tidak Hadir",
  MAYBE: "Mungkin Hadir",
  PENDING: "Belum Konfirmasi",
};

export function CheckInScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [manualToken, setManualToken] = useState("");
  const [mode, setMode] = useState<"camera" | "manual">("camera");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  const handleToken = useCallback(async (token: string) => {
    if (loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data: CheckInResult = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "Gagal terhubung ke server." });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const startCamera = useCallback(async () => {
    setError(null);
    setResult(null);

    try {
      const { BrowserQRCodeReader } = await import("@zxing/browser");
      const reader = new BrowserQRCodeReader();
      setScanning(true);

      const controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (res, err) => {
          if (res) {
            const text = res.getText();
            controls.stop();
            setScanning(false);
            handleToken(text);
          }
          if (err && !(err.message?.includes("No MultiFormat"))) {
            // Non-fatal decode errors — keep scanning
          }
        },
      );
      controlsRef.current = controls;
    } catch (e) {
      setScanning(false);
      setError(
        "Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan, atau gunakan input manual.",
      );
    }
  }, [handleToken]);

  const stopCamera = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setScanning(false);
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const reset = () => {
    setResult(null);
    setManualToken("");
    if (mode === "camera") startCamera();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex rounded-xl border border-stone-200 bg-stone-100 p-1">
        {(["camera", "manual"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              stopCamera();
              setMode(m);
              setResult(null);
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
              mode === m
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {m === "camera" ? <Camera size={14} /> : <Keyboard size={14} />}
            {m === "camera" ? "Kamera" : "Input Manual"}
          </button>
        ))}
      </div>

      {/* Camera view */}
      {mode === "camera" && (
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-2xl bg-stone-900 aspect-square">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              muted
              playsInline
            />
            {!scanning && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Camera size={40} className="text-stone-500" />
                <p className="text-sm text-stone-400">Kamera belum aktif</p>
              </div>
            )}
            {/* Scan overlay */}
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="scanner-backdrop-dim h-52 w-52 rounded-2xl border-2 border-muted-gold">
                  <div className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-gold-shine rounded-tl-xl" />
                  <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-gold-shine rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-gold-shine rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-gold-shine rounded-br-xl" />
                  {/* Scan line animation */}
                  <div className="absolute inset-x-2 h-0.5 animate-[scanLine_2s_ease-in-out_infinite] bg-gold-shine/70" />
                </div>
              </div>
            )}
          </div>

          {!scanning && !result && (
            <button
              onClick={startCamera}
              className="flex items-center justify-center gap-2 rounded-xl bg-wood-brown py-3 text-sm font-medium text-primary-cream transition hover:bg-wood-brown/90"
            >
              <Camera size={15} />
              Aktifkan Kamera
            </button>
          )}
          {scanning && (
            <button
              onClick={stopCamera}
              className="rounded-xl border border-stone-200 py-2.5 text-sm text-stone-600 transition hover:bg-stone-50"
            >
              Hentikan Kamera
            </button>
          )}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>
      )}

      {/* Manual input */}
      {mode === "manual" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualToken.trim()) handleToken(manualToken.trim());
          }}
          className="flex flex-col gap-3"
        >
          <label className="text-xs uppercase tracking-[0.15em] text-stone-500">
            Token QR
          </label>
          <input
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="Masukkan token dari QR tamu…"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/30"
          />
          <button
            type="submit"
            disabled={loading || !manualToken.trim()}
            className="rounded-xl bg-wood-brown py-3 text-sm font-medium text-primary-cream transition hover:bg-wood-brown/90 disabled:opacity-50"
          >
            {loading ? "Memverifikasi…" : "Check-in"}
          </button>
        </form>
      )}

      {/* Result */}
      {result && (
        <div
          className={`rounded-2xl border p-6 ${
            result.success
              ? result.alreadyCheckedIn
                ? "border-amber-200 bg-amber-50"
                : "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          {result.success && result.guest ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    result.alreadyCheckedIn
                      ? "bg-amber-100"
                      : "bg-emerald-100"
                  }`}
                >
                  <CheckCircle2
                    size={24}
                    className={
                      result.alreadyCheckedIn
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-stone-900">
                    {result.alreadyCheckedIn
                      ? "Sudah Check-in"
                      : "Selamat Datang!"}
                  </p>
                  <p className="text-sm text-stone-500">
                    {result.invitation?.coupleName}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/70 px-4 py-3">
                <p className="text-lg font-semibold text-stone-900">
                  {result.guest.name}
                </p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-stone-600">
                  <span>{ATTENDANCE_LABEL[result.guest.attendance] ?? result.guest.attendance}</span>
                  <span>·</span>
                  <span>{result.guest.partySize} tamu</span>
                </div>
                {result.guest.message && (
                  <p className="mt-2 text-sm italic text-stone-500">
                    &ldquo;{result.guest.message}&rdquo;
                  </p>
                )}
              </div>

              {result.alreadyCheckedIn && (
                <p className="text-xs text-amber-700">
                  Tamu ini sudah melakukan check-in sebelumnya.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <XCircle size={24} className="shrink-0 text-red-500" />
              <p className="text-sm font-medium text-red-800">
                {result.error ?? "Terjadi kesalahan."}
              </p>
            </div>
          )}

          <button
            onClick={reset}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 text-sm text-stone-600 transition hover:bg-stone-50"
          >
            <RefreshCw size={13} />
            Scan Tamu Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
