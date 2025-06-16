import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react"; // install via: npm i @headlessui/react
import AutoSuggestInput from "./AutoSuggestInput"; // assuming this is your custom component
import { Circle, CheckCircle } from "lucide-react";


interface Song {
  id: number;
  title: string;
  type: string;
  style?: string;
  recording_year?: number;
  is_instrumental?: boolean;
  spotify_id?: string;
  duration?: number; 
  orchestra: { name: string };
  song_singer: Array<{ singer: { name: string } }>;
  verified?: boolean;
}

interface Props {
  song: Song | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditSongModal({ song, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    style: "",
    recording_year: "",
    is_instrumental: false,
    spotify_id: "",
    duration: "",
    orchestra: "",
    singers: [] as string[],
    verified: song?.verified
    });

  useEffect(() => {
    if (song) {
        setForm({
        title: song.title || "",
        type: song.type || "",
        style: song.style || "",
        recording_year: song.recording_year?.toString() || "",
        is_instrumental: song.is_instrumental || false,
        spotify_id: song.spotify_id || "",
        duration: song.duration?.toString() || "", // assuming not in song yet
        orchestra: song.orchestra?.name || "",
        singers: song.song_singer?.map((s) => s.singer.name) || [],
        verified: song.verified 
        });
    }
  }, [song]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!song) return;
    try {
      const res = await fetch(`/api/songs/${song.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recording_year: parseInt(form.recording_year),
        }),
      });

      if (!res.ok) throw new Error("Failed to update song");
      onSave();
      onClose();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!song) return null;

  return (
    <Dialog open={!!song} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-neutral-900 rounded-lg p-6 w-full max-w-md text-white">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Song
          </Dialog.Title>

          <div className="space-y-4">
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Title"
            />

            <input
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Type"
            />

            <input
              value={form.style}
              onChange={(e) => handleChange("style", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Style"
            />

            <input
              value={form.recording_year}
              onChange={(e) => handleChange("recording_year", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Year"
              type="number"
            />

            <label
              className={`flex items-center gap-2 text-sm cursor-pointer
                          ${form.is_instrumental ? "text-red-400" : "text-white"}`}
            >
              {/* hidden native checkbox keeps it accessible */}
              <input
                type="checkbox"
                checked={form.is_instrumental}
                onChange={(e) => {
                  const checked = e.target.checked;
                  handleChange("is_instrumental", checked);
                  if (checked) handleChange("singers", []);  // clear singers if instrumental
                }}
                className="hidden"
              />

              {/* Icon switches based on state */}
              {form.is_instrumental ? (
                <CheckCircle className="h-5 w-5 text-red-400" />
              ) : (
                <Circle className="h-5 w-5 text-white" />
              )}

              <span>Instrumental</span>
            </label>


            <input
              value={form.spotify_id}
              onChange={(e) => handleChange("spotify_id", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Spotify ID"
              />

              <input
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600"
              placeholder="Duration (sec)"
              type="number"
              />

              <AutoSuggestInput
                label="Orchestra"
                placeholder="Orchestra name..."
                apiPath="/api/suggestions/orchestras"
                initialValue={form.orchestra}               // ← show current value
                onSelect={(val) => handleChange("orchestra", val)}
              />
            
              <label className="block text-sm mb-1">Singers</label>
              <div className="space-y-2">
                  {form.singers.map((name, index) => (
                  <div key={index} className="flex gap-2">
                      <AutoSuggestInput
                        label=""
                        placeholder="Singer name..."
                        apiPath="/api/suggestions/singers"
                        initialValue={name}                         // ← current singer
                        onSelect={(val) => {
                          const updated = [...form.singers];
                          updated[index] = val;
                          handleChange("singers", updated);
                        }}
                      />
                      <button
                      type="button"
                      onClick={() => {
                          const updated = form.singers.filter((_, i) => i !== index);
                          handleChange("singers", updated);
                      }}
                      className="text-red-400 text-sm"
                      disabled={form.is_instrumental}             // ↙ disable if instrumental
                      >
                      Remove
                      </button>
                  </div>
                ))}

                <button
                type="button"
                onClick={() => handleChange("singers", [...form.singers, ""])}
                className={`mt-2 text-sm underline ${
                  form.is_instrumental ? "text-gray-500 cursor-not-allowed" : "text-blue-400"
                }`}
                disabled={form.is_instrumental}             // ↙ disable if instrumental
                >
                + Add singer
                </button>
            </div>
          </div>
          

          <label
            className={`flex items-center gap-2 text-sm mt-4 cursor-pointer
                        ${form.verified ? "text-green-400" : "text-white"}`}
          >
            {/* hidden native checkbox for accessibility */}
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => handleChange("verified", e.target.checked)}
              className="hidden"
            />

            {/* Icon toggles based on state */}
            {form.verified ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Circle className="h-5 w-5 text-white" />
            )}

            <span>Verified</span>
          </label>


          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-sm px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
            >
              Save
            </button>
          </div>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
