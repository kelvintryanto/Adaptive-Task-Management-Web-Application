"use client";

export default function LoadingComponent() {
  return (
    <div className="flex h-[80dvh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Loading data...</p>
      </div>
    </div>
  );
}
