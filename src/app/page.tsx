import Shelf from "@/components/shelf/shelf";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="p-6 w-full h-full flex items-center">
      <Sidebar />
      <Shelf />
    </main>
  );
}
