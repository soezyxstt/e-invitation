import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function Hero({ whatsappNumber }: { whatsappNumber: string }) {
  const contactUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang undangan digital SentuhUndang.")}`;

  return (
    <section className="bg-primary-cream px-6 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight text-deep-charcoal sm:text-5xl lg:text-6xl">
            Hari istimewa, undangan yang terasa dekat.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-wood-brown/80 sm:text-lg">
            Undangan pernikahan digital dengan sentuhan Sunda. Pilih desain,
            lengkapi cerita kalian, lalu bagikan kepada orang terdekat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#preview" className="inline-flex items-center justify-center gap-3 rounded-full bg-deep-charcoal px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown">
              Lihat desain <ArrowRight size={16} />
            </Link>
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-wood-brown/20 px-7 py-3.5 text-sm font-medium text-deep-charcoal transition-colors hover:bg-wood-brown/5">
              <MessageCircle size={16} /> Tanya lewat WhatsApp
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-wood-brown/10 sm:aspect-square lg:aspect-[4/3]">
          <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=75&auto=format&fit=crop" alt="Suasana pernikahan di taman" fill preload quality={75} className="object-cover" sizes="(max-width: 1023px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
