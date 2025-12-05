
export function ChatListLoading() {
 
  return (
    <>
      <header className="flex mb-4 w-full items-center px-4 py-2 h-[52px]">
        <div
          className="w-13 h-13  mr-2
         min-w-13 max-w-13 rounded-full flex items-center justify-center text-3xl tracking-wider pl-1.5 italic animate-pulse"
        >
          IO
        </div>
        <div className="h-9 bg-extra/50 w-full rounded-3xl animate-pulse"></div>
        <div className="rounded-full h-9 w-9 min-w-9 min-h-9 bg-extra/50 ml-2 animate-pulse"></div>
      </header>
      {Array.from({ length: 8 }).map((_, index) => (
        <article
          key={index}
          className="py-3 px-5 relative h-20 bg-extra/50 rounded-2xl flex items-center my-2 animate-pulse"
        >
          <div className="flex items-center w-full">
            <div className="rounded-full min-w-14 min-h-14 w-14 h-14 bg-background"></div>
            <div className="ml-4">
              <p className="h-4 w-12 bg-background rounded-md"></p>
              <p className="h-4 w-20 bg-background mt-2 rounded-md"></p>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <div className="flex">
              <div className="h-4 w-8 bg-background rounded-md"></div>
            </div>
            <div className="w-5 h-5"></div>
          </div>
        </article>
      ))}
    </>
  );
}
