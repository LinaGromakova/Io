export function AppLoader() {
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center flex-col select-none">
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-accent/10 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-transparent border-b-accent/60 rounded-full animate-spin"></div>
        </div>
        <span className="text-4xl text-accent absolute opacity-50">IO</span>
      </div>
      <div className="flex items-end text-accent opacity-80 mt-10 gap-0.5">
        <p className="text-2xl tracking-widest flex">Loading</p>
        <div className="w-1 h-1 bg-accent rounded-full animate-pulse mb-1"></div>
        <div
          className="w-1 h-1 bg-accent rounded-full animate-pulse mb-1"
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className="w-1 h-1 bg-accent rounded-full animate-pulse mb-1"
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>
    </div>
  );
}
