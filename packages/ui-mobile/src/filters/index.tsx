import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import React, { VFC } from "react";
import { Checkbox } from "src/checkbox";
import { List } from "src/list";

interface FiltersProps {
  filters: FilterDto[];
  onCheckboxPress: (filterName: string, optionName: string) => void;
}

export const Filters: VFC<FiltersProps> = ({ filters, onCheckboxPress }) => {
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
