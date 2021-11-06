import { FC } from "react";
import { IntlProvider } from "react-intl";
import { StateInterface } from "src/apps/main/redux";
import ar from "./locals/ar.json";
import en from "./locals/en.json";
import fr from "./locals/fr.json";
import { useSelector } from "react-redux";

export const Localization: FC = (props) => {
  const locals: any = { fr, ar, en };

  const { settings } = useSelector<StateInterface, StateInterface>((state) => state);

  return (
    <IntlProvider
      messages={locals[settings.language.code]}
      locale={settings.language.code}
      defaultLocale="en"
    >
      {props.children}
    </IntlProvider>
  );
};

export default Localization;
