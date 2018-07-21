import { Directive, TemplateRef, ViewContainerRef, EmbeddedViewRef } from "@angular/core";

export class NgxCountContext {

    constructor(public index: number, public count: number) {}

    get first(): boolean { return this.index === 0; }

    get last(): boolean { return this.index === this.count - 1; }
  
    get even(): boolean { return this.index % 2 === 0; }
  
    get odd(): boolean { return !this.even; }
}

@Directive({
    selector: "[ngxC\ount]"
})
export class NgxCountDirective {

    constructor(
        private _viewContainer: ViewContainerRef,
        private _template: TemplateRef<NgxCountContext>
    ) { }

    ngOnInit(): void {
        this._viewContainer.createEmbeddedView(this._template, new NgxCountContext(-1, -1));
    }

    private _index = -1;
    private _count = -1;
    private isRefreshedOnNextCheck = false;

    refreshIndex(newIndex: number, newCount: number): void {
        this._index = newIndex;
        this._count = newCount;
        this.isRefreshedOnNextCheck = true;
    }

    ngDoCheck(): void {
        if (this.isRefreshedOnNextCheck) {
            const viewRef = <EmbeddedViewRef<NgxCountContext>>this._viewContainer.get(0);
            viewRef.context.index = this._index;
            viewRef.context.count = this._count;
            this.isRefreshedOnNextCheck = false;
        }
    }
}
