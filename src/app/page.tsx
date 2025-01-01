import Header from "@/components/navigation/header";
import Shelf from "@/components/shelf/shelf";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <Header />
      <div className="w-full flex p-6 grow">
        <Sidebar />
        <Shelf />
      </div>
    </main>
  );
}
