import { ApiUtils } from "../utils/ApiUtils";

describe("API utils", () => {
    jest.setTimeout(60000);

    it("Should return true for holiday when getting a date that is a holiday", async () => {
        const hday = await ApiUtils.checkHoliday(new Date(2024, 0, 1));
        expect(hday.isHoliday).toBeTruthy();
    });
});
