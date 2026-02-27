import SharePet from "./_components/dialog/SharePet";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#656A6E]">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-8 px-4 bg-white dark:bg-[#656A6E] sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center w-full sm:items-start sm:text-left">
          Pet Friends
          <div data-slot="pet-card" className="flex flex-row gap-2 w-full border p-2 rounded-lg justify-between bg-[#C6C7C5]">
            <div data-slot="pet-card-image" className="flex items-center bg-white rounded-sm text-black p-1">Pet image</div>
            <div data-slot="pet-card-content" className="flex flex-col text-black">
              <div className="flex gap-4">
                <span>{`Name:`}</span>
                <SharePet />
              </div>
              <span>{`Age:`}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
