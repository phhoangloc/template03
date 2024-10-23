'use client'
import Cover from "@/components/home/cover";

export default function Home() {


  return (
    <div>
      <Cover />
      <div className="w-full min-h-screen bg-amber-50 dark:bg-slate-950 dark:text-white flex flex-col justify-center">
        <div className="max-w-screen-xl m-auto h-max">
          <div>NEWEST BOOK</div>
        </div>
      </div>
    </div>
  );
}
