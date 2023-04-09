import { by, device, element, expect } from "detox";

describe("Contribute screen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"No contributions" view should be visible', async () => {
    await expect(element(by.id("no-contributions"))).toBeVisible();
  });
});
