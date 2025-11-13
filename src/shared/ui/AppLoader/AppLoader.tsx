import { RingLoader, BeatLoader } from 'react-spinners';

export function AppLoader() {
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center flex-col select-none">
      <div className="relative flex flex-col justify-center items-center">
        <RingLoader
          size={250}
          color="#ff740b"
          speedMultiplier={0.7}
        ></RingLoader>

        <span className="text-4xl text-accent absolute opacity-50">IO</span>
      </div>
      <p className="flex items-end text-accent opacity-80 mt-10">
        <p className="text-2xl tracking-widest "> Loading</p>

        <BeatLoader size={6} color="#ff740b" speedMultiplier={0.3}></BeatLoader>
      </p>
    </div>
  );
}
