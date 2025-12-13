export function ChatHeaderLoading() {
  return (
    <header className="flex items-center px-4 py-2 w-full">
      <div className="mr-4 hidden max-md:flex bg-extra/50 w-9 h-9 min-w-9 min-h-9 rounded-full animate-pulse"></div>
      <article
        className="flex items-center 
         justify-between px-1 h-10"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-extra/50 min-w-10 min-h-10 animate-pulse"></div>
          <div className="ml-4">
            <div className=" w-14 h-3  bg-extra/50 rounded-md animate-pulse"></div>
            <div className="w-12 h-2 bg-extra/50 mt-2 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </article>
      <div className="ml-auto h-9 w-9 min-h-9 min-w-9 bg-extra/50 rounded-full animate-pulse"></div>
    </header>
  );
}
