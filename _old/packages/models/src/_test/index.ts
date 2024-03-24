import { OptionalPropertiesOf, RequiredPropertiesOf } from "@dzcode.io/utils/dist/ts";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { BaseEntity } from "src/_base";

export type Cases<T extends object> = [
  [string, RequiredPropertiesOf<T>, false],
  [string, Required<T>, false],
  [string, Record<string, never>, boolean],
];

export const runDTOTestCases = <T extends BaseEntity>(
  entity: ClassConstructor<T>,
  requiredFields: RequiredPropertiesOf<T>,
  optionalFields: OptionalPropertiesOf<T>,
): void => {
  const hasNoRequiredFields = Object.keys(requiredFields).length === 0;
  const cases: Cases<T> = [
    ["should match snapshot when providing required fields only", requiredFields, false],
    [
      "should match snapshot when providing all fields",
      { ...requiredFields, ...optionalFields } as Required<T>,
      false,
    ],
    [
      hasNoRequiredFields
        ? "should match snapshot when providing an empty object"
        : "should show an error that matches snapshot when passing empty object",
      {},
      !hasNoRequiredFields,
    ],
  ];

  it.each(cases)("%s", (name, input, expectErrors) => {
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
