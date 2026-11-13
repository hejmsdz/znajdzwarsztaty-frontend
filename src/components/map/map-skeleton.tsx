export function MapSkeleton() {
  return (
    <div className="relative min-h-0 flex-1" aria-label="Mapa">
      <div
        aria-hidden
        className="relative h-full w-full overflow-hidden bg-[#d9dfc1]"
      >
        <div className="map-placeholder" />
      </div>
    </div>
  );
}
