import { Link } from "react-router-dom";
import { Music, ListMusic, Archive } from "lucide-react";

const Home = () => {
  const features = [
    {
      title: "Songs",
      icon: <Music className="w-8 h-8 text-red-500" />,
      description: "Explore and search tango songs from various orchestras. Discover classics and hidden gems.",
      to: "/songs"
    },
    {
      title: "Tandas",
      icon: <Archive className="w-8 h-8 text-red-500" />,
      description: "Create and manage your tandas. Group songs by orchestra, style, or theme.",
      to: "/tandas"
    },
    {
      title: "Playlists",
      icon: <ListMusic className="w-8 h-8 text-red-500" />,
      description: "Organize your tandas into playlists. Perfect for planning events or sharing favorites.",
      to: "/playlists"
    },
  ];

  return (
    <main className="px-6 py-12 text-white bg-neutral-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Welcome to TandaBase</h2>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        Your comprehensive platform for organizing and discovering tango music. Create tandas, manage playlists, and explore a vast collection of tango songs.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature) => (
            <Link
            key={feature.title}
            to={feature.to}
            className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-xl shadow text-center flex flex-col items-center justify-center min-h-[220px] transition-all"
            >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
            </Link>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-gray-500">
        <p>Something is not working or you have feedback?</p>
        <a href="#" className="text-red-400 underline">Let us know and help us improve</a>
      </div>
    </main>
  );
};

export default Home;
