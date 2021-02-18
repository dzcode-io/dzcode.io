/* eslint sort-imports:off */
import { FC } from "react";
import fr from "./locals/fr";
import ar from "./locals/ar";
import en from "./locals/en";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { StateInterface } from "src/apps/main/redux";

export const Localization: FC = (props) => {
  const locals: { [key: string]: any } = { fr, ar, en };

  const { settings } = useSelector<StateInterface, StateInterface>(
    (state) => state,
  );

  return (
    <IntlProvider
      messages={locals[settings.lang]}
      locale={settings.lang}
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
