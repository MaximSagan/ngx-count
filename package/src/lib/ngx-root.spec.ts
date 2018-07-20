import { Component, PipeTransform, Pipe } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxCountDirective } from './ngx-count.directive';
import { NgxCountRootDirective } from './ngx-count-root.directive';

@Component({
    selector: "count-test",
    template: `
        <h3>Number of counted items: {{myTotal}}</h3>
        <ul ngxCountRoot (total)="myTotal = $event">
            <li *ngIf="wordAExists">
                <p *ngxCount="let i = index" [id]="wordA">
                    <span>wordA</span>
                    <span class="index">{{i}}</span>
                </p>
            </li>
            <li *ngFor="let word of (reverseWords ? (wordList | reverse) : wordList)">
                <span *ngxCount="let i = index" [id]="word">
                    <span>{{word}}</span>
                    <span class="index">{{i}}</span>
                </span>
            </li>
        </ul>
        <button class="toggleWordA" (click)="wordAExists = !wordAExists">Add/remove optional word</button>
        <button class="addWord" (click)=addItem()>Add item to list</button>
    `
})
class CountTestComponent {
    public myTotal: number;
    public wordAExists = true;
    public wordList = [
        "wordB",
        "wordC",
        "wordD",
        "wordE"
    ];
    reverseWords = false;
    addItem() {
        this.wordList.push("wordE");
    }
}

@Pipe({
    name: 'reverse'
})
class ReversePipe implements PipeTransform {
    transform(array: string[]) {
        return [...array].reverse();
    }
}

describe('NgxCount', () => {
  let component: CountTestComponent;
  let fixture: ComponentFixture<CountTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountTestComponent, NgxCountDirective, NgxCountRootDirective, ReversePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const expectNgxCountRootTotalToBe = async (expectedVal: number, done: DoneFn) => {
    const countRoot = fixture.debugElement.query(By.directive(NgxCountRootDirective));
    const countRootDir = countRoot.injector.get(NgxCountRootDirective);
  };
  
  it('should count instances of the ngxCount directive', () => {
    expect(component.myTotal).toEqual(5);
  });
  it('should reduce when an instance of the ngxCount directive is removed programmatically', () => {
    component.wordAExists = false;
    fixture.detectChanges();
    expect(component.myTotal).toEqual(4);
  });
  it('should increase when an instances of the ngxCount directive are added programmatically', () => {
    component.wordList.push('another word', 'yet another word');
    fixture.detectChanges();
    expect(component.myTotal).toEqual(7);
  });
  it('should reduce when an instance of the ngxCount directive is removed via DOM interaction', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css(".toggleWordA")).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.myTotal).toEqual(4);
  });
  
  it('should increase when an instances of the ngxCount directive are added via DOM interaction', () => {
    const addWordButton: HTMLElement = fixture.debugElement.query(By.css(".addWord")).nativeElement;
    addWordButton.click();
    addWordButton.click();
    fixture.detectChanges();
    expect(component.myTotal).toEqual(7);
  });

  it('should provide the correct index for counted item', () => {
    const wordCIndexSpan: HTMLElement = fixture.debugElement.query(By.css("#wordC .index")).nativeElement;
    expect(Number(wordCIndexSpan.innerText)).toEqual(2);
  });

  it('should reduce the correct index for counted item after a proceeding counted item is removed programmatically', () => {
    component.wordAExists = false;
    fixture.detectChanges();
    const wordCIndexSpan: HTMLElement = fixture.debugElement.query(By.css("#wordC .index")).nativeElement;
    expect(Number(wordCIndexSpan.innerText)).toEqual(1);
  });

  
  it('should reduce the correct index for counted item after a proceeding counted item is removed via DOM interaction', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css(".toggleWordA")).nativeElement;
    button.click();
    fixture.detectChanges();
    const wordCIndexSpan: HTMLElement = fixture.debugElement.query(By.css("#wordC .index")).nativeElement;
    expect(Number(wordCIndexSpan.innerText)).toEqual(1);
  });

  it('should change index when order is altered with a pipe', () => {
    component.reverseWords = true;
    fixture.detectChanges();
    const wordCIndexSpan: HTMLElement = fixture.debugElement.query(By.css("#wordC .index")).nativeElement;
    expect(Number(wordCIndexSpan.innerText)).toEqual(3);
  });

});
