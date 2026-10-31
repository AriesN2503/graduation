import { notFound } from "next/navigation";

import InvitationExperience from "@/app/invitation-experience";
import invitations from "@/data/invitations.json";

interface GuestInvitationPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

function isInvitationSlug(slug: string): slug is keyof typeof invitations {
  return Object.hasOwn(invitations, slug);
}

export function generateStaticParams() {
  return Object.keys(invitations).map((slug) => ({ slug }));
}

export default async function GuestInvitationPage({
  params,
}: GuestInvitationPageProps) {
  const { slug } = await params;

  if (!isInvitationSlug(slug)) {
    notFound();
  }

  const guest = invitations[slug];

  return <InvitationExperience guestSlug={slug} guestName={guest.name} />;
}
