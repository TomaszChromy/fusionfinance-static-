import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  href: string;
  title: string;
  description?: string;
  image?: string;
  meta?: string;
}

export function ArticleCard({ href, title, description, image, meta }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {image && (
        <div className="relative aspect-[16/9]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 space-y-2">
        <h3 className="text-[15px] font-semibold text-[var(--text)] leading-tight line-clamp-2 group-hover:text-[var(--accent)]">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-[var(--text-2)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {meta && <p className="text-[12px] text-[var(--muted)]">{meta}</p>}
      </div>
    </Link>
  );
}
