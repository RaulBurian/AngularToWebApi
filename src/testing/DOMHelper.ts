import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

export class DOMHelper<T> {

  constructor(private fixture: ComponentFixture<T>) {
  }

  singleElement(selector: string): HTMLHeadElement {
    const element: DebugElement = this.fixture.debugElement.query(By.css(selector));
    if (element) {
      return element.nativeElement;
    }
    return null;
  }

  allElements(selector: string): HTMLHeadElement[] {
    return this.fixture.debugElement.queryAll(By.css(selector))?.map(debug => debug.nativeElement);
  }

  singleText(tagName: string): string {
    const element: DebugElement = this.fixture.debugElement.query(By.css(tagName));
    if (element) {
      return element.nativeElement.innerText;
    }
    return null;
  }

  count(tagName: string): number {
    const elements: DebugElement[] = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.length;
  }

  countText(tagName: string, text: string): number {
    const elements: DebugElement[] = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.filter(element => element.nativeElement.innerText === text).length;
  }
}
