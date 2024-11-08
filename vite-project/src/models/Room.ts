import Item from "./Item";
import Question from "./Question";

export default class Room {
    private myRow: number;
    private myCol: number;
    private isOpen: boolean;
    private isLocked: boolean;
    private isItemRoom: boolean;
    private isAnswered: boolean;
    private myQuestion?: Question;
    private myItem?: Item;
    
    constructor({theRow, theCol}:{theRow:number, theCol:number}){
        this.myRow = theRow;
        this.myCol = theCol;
        this.isOpen = false;
        this.isLocked = false;
        this.isItemRoom = false;
        this.isAnswered = false;
        this.myQuestion = undefined;
        this.myItem = undefined;
    }

    public getItem(){
        return this.myItem;
    }
    
    public getQuestion(){
        return this.myQuestion;
    }

    public getRow(){
        return this.myRow;
    }

    public getCol(){
        return this.myCol;
    }

    public getIsLocked(){
        return this.isLocked;
    }

    public getIsOpen(){
        return this.isOpen;
    }

    public getIsItemRoom(){
        return this.isItemRoom;
    }



    public getIsAnswered(){
        return this.isAnswered;
    }

    public setItem(item:Item){
        if(item !== null){
            this.myItem = item;
        }
    }
    
    public setQuestion(question:Question){
        if(question !== null){
            this.myQuestion = question;
        }
        throw new Error("Question cannot be null");
    }

    public setRow(row:number){
        if(row !== null){
            this.myRow = row;
        }
    }

    public setCol(col:number){
        if(col !== null){
            this.myCol = col;
        }
    }   

    public setIsAnswered(answeredStatus:boolean){
        if(answeredStatus !== null){
            this.isAnswered = answeredStatus;
        }
    }

    public setIsItemRoom(itemRoomStatus:boolean){
        if(itemRoomStatus !== null){
            this.isItemRoom = itemRoomStatus;
        }
    }

    public setIsLocked(lockedStatus:boolean){
        if(lockedStatus !== null){
            this.isLocked = lockedStatus;
        }
    }

    public setIsOpen(openStatus:boolean){
        if(openStatus !== null){
            this.isOpen = openStatus;
        }
    }

    public hasItem(){
        return this.myItem !== undefined;
    }

}