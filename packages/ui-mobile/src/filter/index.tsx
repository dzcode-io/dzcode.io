import { FC } from "react";
import type { Filter } from "src/_types/filter";
import { Checkbox } from "src/checkbox";
import { List } from "src/list";

interface FilterProps {
  /**
   * the filters to display
   */
  filters: Filter[];
  /**
   * the function to call when a checkbox is pressed
   */
  onCheckboxPress: (filterName: string, optionName: string) => void;
}

/**
 * Filters component used to display the list of filters coming from `@dzcode.io/api` in the app
 * @example
 * <Filters
 *    filters={filters}
 *    onCheckboxPress={(filterName, optionName) => console.log(filterName, optionName)}
 * />
 */
export const Filters: FC<FilterProps> = ({ filters, onCheckboxPress }) => {
  return (
    <List.AccordionGroup>
      {filters.map(({ name: filterName, options }) => (
        <List.Accordion key={`filter-${filterName}`} title={filterName} id={filterName}>
          {options.map(({ label: optionLabel, name: optionName, checked }) => (
            <List.Item
              hasTVPreferredFocus
              tvParallaxProperties={{ enabled: true }}
              key={`filter-${filterName}-${optionName}`}
              title={optionLabel || optionName}
              right={() => (
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    onCheckboxPress(filterName, optionName);
                  }}
                />
              )}
              onPress={() => {
                onCheckboxPress(filterName, optionName);
              }}
            />
          ))}
        </List.Accordion>
      ))}
    </List.AccordionGroup>
  );
};
