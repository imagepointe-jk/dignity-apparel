import { Facebook } from "@/components/icons/Facebook";
import { Instagram } from "@/components/icons/Instagram";
import { LinkedIn } from "@/components/icons/LinkedIn";
import { YouTube } from "@/components/icons/YouTube";
import Link from "next/link";

type SocialMediaLinkProps = {
  href?: string;
  size?: number;
};
export function SocialMediaLink({ href, size }: SocialMediaLinkProps) {
  const type = !href
    ? null
    : href.includes("facebook")
      ? "facebook"
      : href.includes("youtube")
        ? "youtube"
        : href.includes("instagram")
          ? "instagram"
          : href.includes("linkedin")
            ? "linkedin"
            : null;
  return (
    <Link href={href || ""} aria-label={`dignity apparel ${type}`}>
      {type === "facebook" && <Facebook size={size || 20} />}
      {type === "youtube" && <YouTube size={size || 14} />}
      {type === "instagram" && <Instagram size={size || 20} />}
      {type === "linkedin" && <LinkedIn size={size || 20} />}
    </Link>
  );
}
