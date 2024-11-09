export default class Item {
    private myItemType!: string;

    constructor(theItemType: string) {
        this.myItemType = this.setItemType(theItemType);
    }

    public getItemType(): string {
        return this.myItemType;
    }

    public setItemType(theItemType: string): string {
        if(theItemType.length === 0) {
            throw new Error("Item type cannot be empty");
        }
        return theItemType;
    }

    public toString(): string {
        return this.myItemType;
    }
}
