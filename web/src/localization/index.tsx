/* eslint sort-imports:off */
import PropTypes from "prop-types";
import { FC } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { StateInterface } from "src/apps/main/redux";

import ar from "./locals/ar";
import en from "./locals/en";
import fr from "./locals/fr";

export const Localization: FC = (props) => {
  const locals: { [key: string]: any } = { fr, ar, en };

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

Localization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Localization;
