import { HomeProvider } from "@/context/homeContext";
import Header from "@/components/navigation/header";
import Shelf from "@/components/shelf/shelfRoot";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <Header />
      <div className="w-full flex p-6 grow">
        <HomeProvider>
          <Sidebar />
          <Shelf />
        </HomeProvider>
      </div>
    </main>
  );
}
