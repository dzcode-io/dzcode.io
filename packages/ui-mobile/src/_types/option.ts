/**
 * Type used in `@dzcode.io/api` package to help with filtering contributions
 * @example
 * let option: Option = {
 *  label: "All",
 *  name: "all",
 *  checked: true,
 * };
 */
export interface Option {
  /**
   * the label of the option
   */
  label: string;
  /**
   * the name of the option
   */
  name: string;
  /**
   * whether the option is checked or not
   */
  checked?: boolean;
}
