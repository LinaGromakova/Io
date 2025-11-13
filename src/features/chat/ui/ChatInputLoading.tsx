export function ChatInputLoading() {
  return (
    <div className="absolute px-2 flex justify-center w-full max-md:py-0 max-md:px-0 bottom-15 max-md:bottom-6">
      <div className="relative w-8/12 max-md:w-full">
        <div className="flex">
          <div
            className="outline-none max-md:w-full bg-background w-full
         max-md:rounded-none rounded-3xl h-10 pr-10 pl-10 animate-pulse"
          ></div>
          <div
            className="text-base max-md:ml-0 max-md:absolute max-md:right-0 ml-5
           bg-background min-w-10 min-h-10 h-10 w-10 rounded-full animate-pulse max-md:hidden"
          ></div>
        </div>
      </div>
    </div>
  );
}
