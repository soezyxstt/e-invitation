-- Go-To-Market indexes: optimise the most common read paths
-- so queries stay fast as RSVP data grows.

-- InvitationAsset: speed up metadata queries that filter by kind
-- (e.g. find HERO_IMAGE for generateMetadata and page render)
CREATE INDEX IF NOT EXISTS "invitation_assets_invitationId_kind_idx"
  ON "invitation_assets"("invitationId", "kind");

-- Rsvp: public guest-book / live-wall query
--   WHERE invitationId = ? AND isPublic = true ORDER BY createdAt DESC LIMIT 50
-- PostgreSQL will use this index for both the filter and the sort.
CREATE INDEX IF NOT EXISTS "rsvps_invitationId_isPublic_createdAt_idx"
  ON "rsvps"("invitationId", "isPublic", "createdAt" DESC);

-- Rsvp: admin attendance breakdown
--   WHERE invitationId = ? AND attendance = 'ATTENDING' (COUNT / SUM partySize)
CREATE INDEX IF NOT EXISTS "rsvps_invitationId_attendance_idx"
  ON "rsvps"("invitationId", "attendance");
