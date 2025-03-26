// components/ResumeItemSkeleton.tsx
export default function ResumeItemSkeleton() {
    return (
      <div className="animate-pulse rounded-lg bg-muted p-3">
        <div className="h-48 w-full rounded bg-muted-foreground/20" />
        <div className="mt-3 h-4 w-3/4 rounded bg-muted-foreground/20" />
        <div className="mt-1 h-3 w-1/2 rounded bg-muted-foreground/20" />
      </div>
    );
  }