import { useEffect, useState } from "react";
import SongSearchForm from "../components/SongSearchForm";
import SongResultsTable from "../components/SongResultsTable";
import SpotifyPlayer from "../components/SpotifyPlayer";
import EditSongModal from "../components/EditSongModal";


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

interface SearchParams {
  title?: string;
  orchestra?: string;
  singer?: string;
  yearFrom?: number;
  yearTo?: number;
  type?: string;
  style?: string;
  isInstrumental?: boolean;
  alsoPlayedBy?: string;
}

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [loading, setLoading] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [selectedSpotifyId, setSelectedSpotifyId] = useState<string | null>(null);
  const [likedSongs, setLikedSongs] = useState<number[]>([]); // optional

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (searchParams.title) query.append("title", searchParams.title);
      if (searchParams.orchestra) query.append("orchestra", searchParams.orchestra);
      if (searchParams.singer) query.append("singer", searchParams.singer);
      if (searchParams.yearFrom) query.append("yearFrom", String(searchParams.yearFrom));
      if (searchParams.yearTo) query.append("yearTo", String(searchParams.yearTo));
      if (searchParams.type) query.append("type", searchParams.type);
      if (searchParams.style) query.append("style", searchParams.style);
      if (searchParams.isInstrumental) query.append("isInstrumental", searchParams.isInstrumental ? "true" : "false");
      if (searchParams.alsoPlayedBy) query.append("alsoPlayedBy", searchParams.alsoPlayedBy);

      const res = await fetch(`/api/songs?${query.toString()}`);
      const data = await res.json();
      const normalized = data.map((song: any) => ({
        ...song,
        orchestra: { name: song.orchestra_name },
        song_singer: song.singers
          ? song.singers.split(", ").map((name: string) => ({
              singer: { name },
            }))
          : [],
      }));

      setSongs(normalized);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [searchParams]);

  // Dummy handlers for now
  const handleLike = (songId: number) => {
    setLikedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const handleEdit = (songId: number) => {
    const song = songs.find((s) => s.id === songId) || null;
    setEditingSong(song);
  };

  const handleSave = () => {
    fetchSongs(); // refresh list
  };

  return (
    <div className="px-6 py-8 text-white bg-neutral-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Songs</h2>

      <SongSearchForm onSearch={setSearchParams} />

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-gray-400">Loading songs...</p>
        ) : (
          <SongResultsTable
            songs={songs}
            likedSongs={likedSongs}
            selectedSongId={selectedSongId}
            onPlay={(song) => {
              setSelectedSongId(song.id);
              setSelectedSpotifyId(song.spotify_id || null);
            }}
            onLike={handleLike}
            onEdit={handleEdit}
          />
        )}
      </div>

      {selectedSpotifyId && (
        <SpotifyPlayer
          trackId={selectedSpotifyId}
          onClose={() => {
            setSelectedSpotifyId(null);
            setSelectedSongId(null);
          }}
        />
      )}

      {editingSong && (
        <EditSongModal
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onSave={handleSave}
        />
      )}

    </div>
  );
};

export default Songs;
