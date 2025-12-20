export function BlackListLoading() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="my-5 h-6 animate-pulse bg-extra/50 rounded-2xl w-72"></div>
      </div>
      {Array.from({ length: 5 }).map((_, idx) => {
        return (
          <article
            key={idx}
            className="h-20 w-full py-3 px-5 relative flex items-center bg-extra/50 animate-pulse rounded-2xl my-2"
          >
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center">
                <div className="rounded-full h-14 w-14 bg-background min-w-14 min-h-14"></div>
                <div className="ml-4 w-16 bg-background h-5 rounded-md"></div>
              </div>
              <div className="bg-background h-9 w-9 min-h-9 min-w-9 rounded-full"></div>
            </div>
          </article>
        );
      })}
    </>
  );
}
