import { Heart, Pencil, PlayCircle } from "lucide-react";

interface Song {
  id: number;
  title: string;
  type: string;
  style?: string;
  recording_year?: number;
  is_instrumental?: boolean;
  spotify_id?: string;
  orchestra: { name: string };
  song_singer: Array<{ singer: { name: string } }>;
}

interface Props {
  song: Song;
  isSelected: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onLike: () => void;
  onEdit: () => void;
}

export default function SongRow({
  song,
  isSelected,
  isLiked,
  onPlay,
  onLike,
  onEdit,
}: Props) {
  const hasSingers = Array.isArray(song.song_singer) && song.song_singer.length > 0;
  const singerLabel = song.is_instrumental || !hasSingers
    ? "Instrumental"
    : song.song_singer.map((s) => s.singer.name).join(", ");

  return (
    <tr
      className={`cursor-pointer text-white transition-colors ${
        isSelected ? "bg-neutral-800" : "hover:bg-neutral-800"
      }`}
      onClick={onPlay}
      title="Click to play"
    >
      {/* ▶️ Play Icon (just for visual) */}
      <td className="px-4 py-4">
        <PlayCircle className="h-5 w-5 text-white" />
      </td>

      {/* 🎵 Title */}
      <td className="px-4 py-4">{song.title}</td>

      {/* 🎻 Orchestra */}
      <td className="px-4 py-4">{song.orchestra?.name || "-"}</td>

      {/* 🎤 Singer */}
      <td className="px-4 py-4">{singerLabel}</td>

      {/* 💃 Type */}
      <td className="px-4 py-4">{song.type}</td>

      {/* 🎼 Style */}
      <td className="px-4 py-4">{song.style || "-"}</td>

      {/* 📆 Year */}
      <td className="px-4 py-4">{song.recording_year || "-"}</td>

      {/* ❤️ Like + ✏️ Edit */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            title={isLiked ? "Unlike" : "Like"}
            aria-label="Toggle Like"
          >
            {isLiked ? (
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="h-5 w-5 text-white hover:text-red-500" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit Song"
            aria-label="Edit"
          >
            <Pencil className="h-5 w-5 text-white hover:text-blue-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}
