import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IGenericData} from '../models/IGenericData';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent<T> implements OnInit, OnChanges {

  @Input()
  data: IGenericData<T>[] = [];
  @Input()
  numberOfElements: number = 0;
  @Input()
  addable: boolean = false;
  @Input()
  editable: boolean = false;
  @Input()
  deletable: boolean = false;
  @Input()
  clickable: boolean = false;
  @Input()
  filterable: boolean = false;
  @Input()
  displayKey: string;
  @Input()
  editFunction: (item: T) => void;
  @Input()
  deleteFunction: (item: T) => void;
  @Input()
  addFunction: () => void;
  @Input()
  clickFunction: (item: T) => void = this.emptyFunction;
  @Input()
  filterFunction: (item: T, searchKey: string) => boolean;
  @Input()
  pageSize: number = 7;
  @Output()
  pageChangeEvent: EventEmitter<number> = new EventEmitter<number>();

  searchKey: string = '';
  pageNumber: number = 1;

  displayData$: BehaviorSubject<IGenericData<T>[]> = new BehaviorSubject<IGenericData<T>[]>([]);

  constructor() {
  }

  ngOnInit(): void {
    this.displayData$.next(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'data': {
            this.data = changes[propName].currentValue;
            this.filterPosts();
            break;
          }
          case 'numberOfElements': {
            this.numberOfElements = changes[propName].currentValue;
            break;
          }
        }
      }
    }
  }

  changePage(newPage: number): void {
    this.pageNumber = newPage;
    this.pageChangeEvent.emit(newPage);
  }

  filterPosts(): void {
    if (this.filterable) {
      this.displayData$.next(this.data.filter(item => this.filterFunction(item.item, this.searchKey)));
    }
  }

  emptyFunction(): void {
  }
}
