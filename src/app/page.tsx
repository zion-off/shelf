import { HomeProvider } from "@/context/homeContext";
import Header from "@/components/navigation/header";
import Shelf from "@/components/shelf/shelfRoot";

export default function Home() {
  return (
    <main className="flex flex-col h-full absolute inset-0">
      <Header />
      <div className="w-full flex px-4 grow relative">
        <HomeProvider>
          {/* <Sidebar /> */}
          <Shelf />
        </HomeProvider>
      </div>
    </main>
  );
}
