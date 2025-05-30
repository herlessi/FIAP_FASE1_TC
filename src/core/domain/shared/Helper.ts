export default class Helper {

    public static cleanObject(obj: any): any {
        if (typeof obj !== 'object' || obj === null) return obj;
        const cleaned: any = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (value !== null && value !== undefined) {
                    cleaned[key] = this.cleanObject(value);
                }
            }
        }
        return cleaned;
    }

}