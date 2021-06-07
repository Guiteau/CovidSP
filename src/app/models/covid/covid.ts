import { Dates } from "./dates";
import { Metadata } from "./metadata";
import { Total } from "./total";

export class Covid{

    dates: Dates;
    metadata: Metadata;
    total: Total;
    updatedAt: string;

    constructor(dates, metadata, total, updatedAt){
        this.dates = dates;
        this.metadata = metadata;
        this.total = total;
        this.updatedAt = updatedAt;
    }

}