import React, { VFC } from "react";
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
export const Filters: VFC<FilterProps> = ({ filters, onCheckboxPress }) => {
  return (
    <List.AccordionGroup>
      {filters.map(({ name: filterName, label: filterLabel, options }) => (
        <List.Accordion key={`filter-${filterName}`} title={filterLabel} id={filterName}>
          {options.map(({ label: optionLabel, name: optionName, checked }) => (
            <List.Item
              hasTVPreferredFocus
              tvParallaxProperties
              key={`filter-${filterName}-${optionName}`}
              title={optionLabel}
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
