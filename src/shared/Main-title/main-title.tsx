interface TitleProps {
  title: string;
}
export function MainTitle(props: TitleProps) {
  return (
    <h1 className="text-5xl font-normal tracking-[2px] text-center mb-8 capitalize">
      {props.title}
    </h1>
  );
}
