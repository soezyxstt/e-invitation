export interface GalleryImage {
  url: string;
  altText: string | null;
}

export interface TimelineEventData {
  id: string;
  date: string;
  title: string;
  description: string | null;
  sortOrder: number;
}

export interface GuestBookEntry {
  id: string;
  guestName: string;
  attendance: string;
  message: string;
  createdAt: Date;
}

export interface QrisData {
  qrisUrl: string | null;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  instagramFilterUrl: string | null;
}

export interface InvitationTemplateProps {
  inv: {
    id: string;
    groomName: string;
    brideName: string;
    groomParentsLine: string | null;
    brideParentsLine: string | null;
    groomChildOrder: string | null;
    brideChildOrder: string | null;
    eventDate: Date;
    venueName: string;
    venueAddress: string | null;
    mapUrl: string | null;
    openingReligiousText: string | null;
    basaSundaLemesKey: string | null;
    slug: string;
    status: string;
    tierId: number;
    templateId: number;
  };
  heroUrl: string | null;
  videoUrl: string | null;
  musicUrl?: string;
  galleryImages: GalleryImage[];
  groomPortraitUrl: string | null;
  bridePortraitUrl: string | null;
  timelineEvents: TimelineEventData[];
  guestBookEntries: GuestBookEntry[];
  qrisData: QrisData | null;
  guestName: string | null;
  coupleName: string;
  isDraft: boolean;
  isTier2Plus: boolean;
  isTier3Plus: boolean;
  isTier4: boolean;
  eventDateLabel: string;
  eventTimeLabel: string;
}
