import { useOptionsConfig } from '../../lib/hooks/use-options-config';
import { OptionsItem } from '../OptionsItem/OptionsItem';

export function OptionsList() {
  const { optionsConfig } = useOptionsConfig();
  return (
    <section>
      <h3 className="text-2xl py-6 px-4">Настройки</h3>
      {optionsConfig.map((opt, idx) => {
        return (
          <OptionsItem
            key={idx}
            icon={opt.icon}
            text={opt.text}
            handlerClick={() => opt.handlerClick()}
          ></OptionsItem>
        );
      })}
    </section>
  );
}
