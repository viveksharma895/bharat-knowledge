export default function PersonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-brand-border/70 shadow-subtle animate-pulse">
      <div className="w-full aspect-[3/4] bg-brand-cream-warm" />

      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-brand-cream-warm rounded w-3/4" />
          <div className="h-3 bg-brand-cream-warm rounded w-1/3" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3 bg-brand-cream-warm rounded w-full" />
          <div className="h-3 bg-brand-cream-warm rounded w-5/6" />
          <div className="h-3 bg-brand-cream-warm rounded w-2/3" />
        </div>

        <div className="pt-2 border-t border-brand-border/50">
          <div className="h-3 bg-brand-cream-warm rounded w-20" />
        </div>
      </div>
    </div>
  );
}
