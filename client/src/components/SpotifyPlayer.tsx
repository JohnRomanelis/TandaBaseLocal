import { X } from "lucide-react";

interface Props {
  trackId: string;
  onClose: () => void;
}

export default function SpotifyPlayer({ trackId, onClose }: Props) {
  if (!trackId) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center z-10"
          title="Close player"
        >
          <X className="w-4 h-4" />
        </button>

        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg border-none"
        />
      </div>
    </div>
  );
}
