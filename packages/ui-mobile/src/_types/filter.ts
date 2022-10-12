import { Option } from "./option";

export interface Filter {
  label: string;
  name: string;
  options: Option[];
}
