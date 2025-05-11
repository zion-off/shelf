import Header from "@/components/navigation/header";

export default function Hero() {
  return (
    <main className="absolute inset-0 flex flex-col w-full h-full items-center justify-center">
      <Header />
      <div className="grow flex flex-col justify-center">
        <h1 className="font-gambarino text-5xl text-center">
          A place for everything
          <br className="hidden md:visible" />{" "}
          that isn't a book.
        </h1>
      </div>
    </main>
  );
}
