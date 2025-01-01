import Header from "@/components/navigation/header";

export default function Hero() {
  return (
    <main className="h-screen absolute flex flex-col w-full">
      <Header />
      <div className="grow flex flex-col justify-center">
        <h1 className="font-gambarino text-5xl text-center">
          Lorem ipsum odor amet,
          <br />
          consectetuer adipiscing elit.
        </h1>
      </div>
    </main>
  );
}
