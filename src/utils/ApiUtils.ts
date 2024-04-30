import { Request } from "express";
import { HolidayResponseType } from "./ResponseEntity";

interface CheckHolidayResponseType {
    isHoliday: boolean;
    holidayName: string | null;
}

export class ApiUtils {
    static getUserIdFromRequest(req: Request): string {
        const uid = req.auth?.payload.sub;
        if (!uid) throw new Error("Unable to retrieve UserID from token");
        return uid;
    }

    static async checkHoliday(date: Date): Promise<CheckHolidayResponseType> {
        try {
            const data = await ApiUtils.getHolidays(date.getFullYear());

            const obj: CheckHolidayResponseType = {
                isHoliday: false,
                holidayName: null,
            };

            // checking if is holiday
            for (let i = 0; i < data.length; i++) {
                const holidayDate = new Date(data[i].date);
                holidayDate.setUTCHours(new Date().getUTCHours() - 3);

                if (
                    date.getDate() === holidayDate.getDate() &&
                    date.getMonth() === holidayDate.getMonth() &&
                    date.getFullYear() === holidayDate.getFullYear()
                ) {
                    obj.isHoliday = true;
                    obj.holidayName = data[i].name;
                    break;
                }
            }

            return { ...obj };
        } catch (e) {
            return { isHoliday: false, holidayName: null };
        }
    }

    static async getHolidays(year: number): Promise<HolidayResponseType[]> {
        const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${year}/BR`,
        );
        const data: HolidayResponseType[] = await response.json();
        return [...data];
    }
}
