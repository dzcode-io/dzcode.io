import { Option } from "./option";

/**
 * Type used in `@dzcode.io/api` package to filter contributions
 * @example
 * let filter: Filter = {
 *  name: "filter",
 *  label: "Filter",
 *  options: [
 *    {
 *      label: "All",
 *      name: "all",
 *      checked: true,
 *    },
 *  ],
 * };
 */
export interface Filter {
  /**
   * the label of the filter
   */
  label: string;
  /**
   * the name of the filter
   */
  name: string;
  /**
   * the options of the filter
   */
  options: Option[];
}
