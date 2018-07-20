import { Directive, QueryList, AfterContentInit, ContentChildren, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { NgxCountDirective } from "./ngx-count.directive";


@Directive({
    selector: "[ngxCountRoot]"
})
export class NgxCountRootDirective implements AfterContentInit {

    @Output() total: EventEmitter<number> = new EventEmitter();

    constructor(private changeRef: ChangeDetectorRef) { }

    @ContentChildren(NgxCountDirective) countItems: QueryList<NgxCountDirective>;

    ngAfterContentInit(): void {
        this.refreshIndices();
        this.countItems.changes.subscribe(a => {
            this.refreshIndices();
        });
    }

    refreshIndices(): void {
        this.countItems.forEach((countItem, i) => {
            countItem.refreshIndex(i, this.countItems.length);
        });
        this.total.emit(this.countItems.length);
        this.changeRef.detectChanges();
    }
}
