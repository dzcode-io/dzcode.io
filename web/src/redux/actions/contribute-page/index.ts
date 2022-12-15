import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import debounce from "@material-ui/core/utils/debounce";
import * as Sentry from "@sentry/browser";
import { actions, getState } from "src/redux";
import { fetchV2 } from "src/utils/fetch";

/**
 * fetchContributions fetch an array from api and pass it to the store
 */
export const fetchContributions = async (): Promise<void> => {
  actions.contributePage.set({ contributions: null });
  try {
    const { contributePage } = getState();
    const loadedFilters = isLoaded(contributePage.filters);
    const query: [string, string][] = [];
    loadedFilters?.forEach((filter) => {
      filter.options.forEach((option) => {
        if (option.checked) query.push([filter.name, option.name]);
      });
    });

    const { contributions, filters } = await fetchV2("api:Contributions", { query });

    // restore filters states:
    const checkedFilters: Array<{
      filterName: string;
      optionName: string;
    }> = [];
    loadedFilters?.forEach((filter) => {
      filter.options.forEach((option) => {
        if (option.checked) {
          checkedFilters.push({
            filterName: filter.name,
            optionName: option.name,
          });
        }
      });
    });
    const newFilters = filters.map((filter) => ({
      ...filter,
      options: filter.options.map((option) => ({
        ...option,
        checked: checkedFilters.some(
          ({ filterName, optionName }) => filterName === filter.name && optionName === option.name,
        ),
      })),
    }));
    actions.contributePage.set({ contributions, filters: newFilters });
  } catch (error) {
    actions.contributePage.set({ contributions: "ERROR" });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

const debouncedFetchContributions = debounce(fetchContributions, 500);

type UpdateFilterValueParam = {
  filterName: string;
  optionName: string;
  value: boolean;
  updateImmediately?: boolean;
  overwrite?: boolean;
};

/**
 * updateFilters update filters state and trigger a debounced fetchContributions action
 */
export const updateFilterValue = async ({
  filterName,
  optionName,
  value,
  updateImmediately = false,
  overwrite = false,
}: UpdateFilterValueParam): Promise<void> => {
  const { filters } = getState().contributePage;
  const loadedFilters = isLoaded(filters);
  if (!loadedFilters) return;

  const newFilters = loadedFilters.map((filter) => {
    if (filter.name !== filterName) {
      return {
        ...filter,
        options: !overwrite
          ? filter.options
          : filter.options.map((option) => {
              return {
                ...option,
                checked: false,
              };
            }),
      };
    } else {
      return {
        ...filter,
        options: filter.options.map((option) => {
          if (option.name !== optionName) {
            return overwrite ? { ...option, checked: false } : option;
          } else {
            return { ...option, checked: value };
          }
        }),
      };
    }
  });
  actions.contributePage.set({ filters: newFilters });
  if (!updateImmediately) {
    debouncedFetchContributions();
  } else {
    fetchContributions();
  }
};
