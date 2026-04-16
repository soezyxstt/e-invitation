-- AlterTable: Tier 4 fields on invitations
ALTER TABLE "invitations"
  ADD COLUMN "videoUrl"           TEXT,
  ADD COLUMN "qrisUrl"            TEXT,
  ADD COLUMN "bankAccountNumber"  TEXT,
  ADD COLUMN "bankAccountName"    TEXT,
  ADD COLUMN "bankName"           TEXT,
  ADD COLUMN "instagramFilterUrl" TEXT,
  ADD COLUMN "hasCustomDomain"    BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "customDomain"       TEXT;

-- AlterTable: QR token on rsvps
ALTER TABLE "rsvps"
  ADD COLUMN "qrCodeToken" TEXT;

-- CreateIndex: unique QR token
CREATE UNIQUE INDEX "rsvps_qrCodeToken_key" ON "rsvps"("qrCodeToken");

-- CreateTable: guest_check_ins
CREATE TABLE "guest_check_ins" (
    "id"          TEXT NOT NULL,
    "rsvpId"      TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guest_check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: unique rsvpId in check-ins
CREATE UNIQUE INDEX "guest_check_ins_rsvpId_key" ON "guest_check_ins"("rsvpId");

-- AddForeignKey
ALTER TABLE "guest_check_ins"
  ADD CONSTRAINT "guest_check_ins_rsvpId_fkey"
  FOREIGN KEY ("rsvpId") REFERENCES "rsvps"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
