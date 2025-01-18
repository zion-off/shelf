import Header from "@/components/navigation/header";

export default function Hero() {
  return (
    <main className="absolute inset-0 flex flex-col w-full h-full items-center justify-center">
      <Header />
      <div className="grow flex flex-col justify-center">
        <h1 className="font-gambarino text-5xl text-center">
          Lorem ipsum odor amet,
          <br className="hidden md:visible" />{" "}
          consectetuer adipiscing elit.
        </h1>
      </div>
    </main>
  );
}
