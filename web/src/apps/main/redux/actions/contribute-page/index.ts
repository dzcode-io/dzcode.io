import Axios from "axios";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import { GetContributionsResponseDto } from "@dzcode.io/common/dist/types/api-responses";
import { ThunkResult } from "src/apps/main/redux";
import debounce from "@material-ui/core/utils/debounce";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

/**
 * fetchContributions fetch an array from api and pass it to the store
 */
export const fetchContributions = (): ThunkResult<ContributePageState> => async (
  dispatch,
) => {
  dispatch({
    type: "UPDATE_CONTRIBUTE_PAGE",
    payload: { contributions: null },
  });
  try {
    const {
      data: { contributions, filters },
    } = await Axios.get<GetContributionsResponseDto>(
      apiURL + "/v2/Contributions",
    );
    // const contributions = await new Promise<Contribution[]>((res) => { /**/ });
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { contributions, filters },
    });
  } catch (error) {
    console.error(error);
  }
};

const debouncedFetchContributions = debounce(fetchContributions(), 500);

/**
 * updateFilters update filters state and trigger a debounced fetchContributions action
 */
export const updateFilterValue = (
  filterName: string,
  optionName: string,
  value: boolean,
  updateImmediately = false,
): ThunkResult<ContributePageState> => async (dispatch, getState) => {
  const { filters } = getState().contributePage;
  const newFilters = filters.map((filter) => {
    if (filter.name !== filterName) {
      return filter;
    } else {
      return {
        ...filter,
        options: filter.options.map((option) => {
          if (option.name !== optionName) {
            return option;
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
