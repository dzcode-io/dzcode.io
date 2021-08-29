import Axios from "axios";
import { ContributePageState } from "../../reducers/contribute-page";
import Debounce from "debounce";
import { GetContributionsResponseDto } from "../../../.common/types/api-responses";
import { ThunkResult } from "../..";
import { fullstackConfig } from "../../../config";

const apiURL = fullstackConfig.api.url;

/**
 * fetchContributions fetch an array from api and pass it to the store
 */
export const fetchContributions =
  (): ThunkResult<ContributePageState> => async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { refreshing: true },
    });
    try {
      const { contributePage } = getState();
      const query = contributePage.filters.reduce(
        (query, filter) =>
          `${query}${filter.name}=${filter.options
            .filter(({ checked }) => checked)
            .reduce((filterQuery, option) => `${filterQuery}${option.name},`, "")}&`,
        "?",
      );
      const {
        data: { contributions, filters },
      } = await Axios.get<GetContributionsResponseDto>(apiURL + "/v2/Contributions" + query);

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
        payload: { contributions, filters: newFilters, refreshing: false },
      });
    } catch (error) {
      console.error(error);
    }
  };

const debouncedFetchContributions = Debounce(fetchContributions(), 500);

/**
 * updateFilters update filters state and trigger a debounced fetchContributions action
 */
export const updateFilterValue =
  (
    filterName: string,
    optionName: string,
    value: boolean | "reverse",
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
              return { ...option, checked: value === "reverse" ? !option.checked : value };
            }
          }),
        };
      }
    });
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { filters: newFilters, contributions: null },
    });
    if (!updateImmediately) {
      dispatch(debouncedFetchContributions);
    } else {
      dispatch(fetchContributions());
    }
  };
