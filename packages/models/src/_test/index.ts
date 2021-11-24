import {
  OptionalPropertiesOf,
  RequiredPropertiesOf,
} from "@dzcode.io/utils/dist/ts";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { BaseEntity } from "../_base";

export type Cases<T extends object> = [
  {
    name: string;
    input: RequiredPropertiesOf<T>;
    expectErrors: false;
  },
  {
    name: string;
    input: Required<T>;
    expectErrors: false;
  },
  {
    name: string;
    input: Record<string, never>;
    expectErrors: boolean;
  }
];

export const runDTOTestCases = <T extends BaseEntity>(
  entity: ClassConstructor<T>,
  requiredFields: RequiredPropertiesOf<T>,
  optionalFields: OptionalPropertiesOf<T>
): void => {
  const hasNoRequiredFields = Object.keys(requiredFields).length === 0;
  const cases: Cases<T> = [
    {
      name: "should match snapshot when providing required fields only",
      input: requiredFields,
      expectErrors: false,
    },
    {
      name: "should match snapshot when providing all fields",
      input: { ...requiredFields, ...optionalFields } as Required<T>,
      expectErrors: false,
    },
    {
      name: hasNoRequiredFields
        ? "should match snapshot when providing an empty object"
        : "should show an error that matches snapshot when passing empty object",
      input: {},
      expectErrors: !hasNoRequiredFields,
    },
  ];

  it.each(cases)("$name", ({ input, expectErrors }) => {
    const output = plainToClass(entity, input);
    const errors = validateSync(output);

    expect(output).toMatchSnapshot("output");
    expect(errors).toMatchSnapshot("errors");
    if (expectErrors) {
      expect(errors.length).not.toBeLessThanOrEqual(0);
    } else {
      expect(errors.length).toBe(0);
    }
  });
};
