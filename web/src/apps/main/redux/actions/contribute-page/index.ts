import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import { ThunkResult } from "src/apps/main/redux";
import debounce from "@material-ui/core/utils/debounce";
import { fetchV2 } from "src/common/utils/fetch";

/**
 * fetchContributions fetch an array from api and pass it to the store
 */
export const fetchContributions =
  (): ThunkResult<ContributePageState> => async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { contributions: null },
    });
    try {
      const { contributePage } = getState();
      const query: [string, string][] = [];
      contributePage.filters.forEach((filter) => {
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
      contributePage.filters.forEach((filter) => {
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
            ({ filterName, optionName }) =>
              filterName === filter.name && optionName === option.name,
          ),
        })),
      }));
      dispatch({
        type: "UPDATE_CONTRIBUTE_PAGE",
        payload: { contributions, filters: newFilters },
      });
    } catch (error) {
      console.error(error);
    }
  };

const debouncedFetchContributions = debounce(fetchContributions(), 500);

/**
 * updateFilters update filters state and trigger a debounced fetchContributions action
 */
export const updateFilterValue =
  (
    filterName: string,
    optionName: string,
    value: boolean,
    updateImmediately = false,
    overwrite = false,
  ): ThunkResult<ContributePageState> =>
  async (dispatch, getState) => {
    const { filters } = getState().contributePage;
    const newFilters = filters.map((filter) => {
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
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { filters: newFilters },
    });
    if (!updateImmediately) {
      dispatch(debouncedFetchContributions);
    } else {
      dispatch(fetchContributions());
    }
  };
