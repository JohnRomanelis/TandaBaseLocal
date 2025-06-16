import { useState, useMemo } from "react";
import SongRow from "./SongRow";

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

type SortField = "title" | "orchestra" | "singer" | "type" | "style" | "year";
type SortDirection = "asc" | "desc";

interface Props {
  songs: Song[];
  likedSongs?: number[]; // optional list of liked song IDs
  selectedSongId: number | null;
  onPlay: (song: Song) => void;
  onLike: (songId: number) => void;
  onEdit: (songId: number) => void;
}

export default function SongResultsTable({
  songs,
  likedSongs = [],
  selectedSongId,
  onPlay,
  onLike,
  onEdit,
}: Props) {
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const sorted = useMemo(() => {
    return [...songs].sort((a, b) => {
      let valA = "";
      let valB = "";

      switch (sortField) {
        case "title":
          valA = a.title;
          valB = b.title;
          break;
        case "orchestra":
          valA = a.orchestra?.name || "";
          valB = b.orchestra?.name || "";
          break;
        case "singer":
          valA = a.song_singer?.[0]?.singer?.name || "";
          valB = b.song_singer?.[0]?.singer?.name || "";
          break;
        case "type":
          valA = a.type || "";
          valB = b.type || "";
          break;
        case "style":
          valA = a.style || "";
          valB = b.style || "";
          break;
        case "year":
          return (a.recording_year || 0) - (b.recording_year || 0) * (sortDir === "asc" ? 1 : -1);
      }

      return valA.localeCompare(valB) * (sortDir === "asc" ? 1 : -1);
    });
  }, [songs, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-md bg-neutral-900 mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-800 border-b border-neutral-700">
          <tr className="text-white">
            <th></th>
            <th onClick={() => toggleSort("title")} className="w-1/3 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Title {sortField === "title" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => toggleSort("orchestra")} className="w-1/4 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Orchestra {sortField === "orchestra" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => toggleSort("singer")} className="w-1/4 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Singer {sortField === "singer" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => toggleSort("type")} className="w-1/8 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Type {sortField === "type" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => toggleSort("style")} className="w-1/8 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Style {sortField === "style" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => toggleSort("year")} className="w-1/8 px-4 py-2 cursor-pointer text-left text-sm text-gray-300">
              Year {sortField === "year" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              isSelected={song.id === selectedSongId}
              isLiked={likedSongs.includes(song.id)}
              onPlay={() => onPlay(song)}
              onLike={() => onLike(song.id)}
              onEdit={() => onEdit(song.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
