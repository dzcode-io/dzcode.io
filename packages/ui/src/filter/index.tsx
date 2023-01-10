import { FC } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { BaseUIProps } from "src/_types";
import { Accordion } from "src/accordion";
import { Checkbox } from "src/checkbox";

export interface FilterProps extends BaseUIProps {
  items: Array<{
    name: string;
    options: Array<{
      label?: string;
      name: string;
      checked?: boolean;
    }>;
  }> | null;
  local: {
    filterLabelKeyPrefix: string;
    programmingLanguageKeyPrefix: string;
    contributionLabelKeyPrefix: string;
  };
  onOptionClick: (filterName: string, optionName: string, checked: boolean) => void;
}

export const Filter: FC<FilterProps> = ({ items, local, onOptionClick, margin }) => {
  const { t } = useTranslation();
  const localize = (filterName: string, optionName: string): string => {
    const keyPrefix =
      filterName === "labels"
        ? local.contributionLabelKeyPrefix
        : filterName === "languages"
        ? local.programmingLanguageKeyPrefix
        : null;
    if (!keyPrefix) return filterName;
    return t(`${keyPrefix}-${optionName.toLowerCase()}`, undefined, undefined, optionName);
  };
  return (
    <Accordion
      margin={margin}
      items={
        items?.map((item) => ({
          title: t(`${local.filterLabelKeyPrefix}-${item.name}`),
          description: item.options.map((option) => (
            <Checkbox
              key={`option-${option.name}`}
              label={option.label || localize(item.name, option.name)}
              checked={!!option.checked}
              onChange={(e, checked) => onOptionClick(item.name, option.name, checked)}
            />
          )),
        })) || [] // @TODO-ZM: map to Skeleton components here
      }
    />
  );
};
