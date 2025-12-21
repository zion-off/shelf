import Header from "@/components/navigation/header";
import Shelf from "@/components/shelf/shelfRoot";

export default function Home() {
  return (
    <main className="flex flex-col h-[100dvh] overflow-hidden">
      <Header />
      <div className="flex-1 w-full flex px-4 relative overflow-hidden">
        <Shelf />
      </div>
    </main>
  );
}

