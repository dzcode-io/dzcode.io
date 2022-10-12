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
  label: string;
  name: string;
  checked?: boolean;
}
