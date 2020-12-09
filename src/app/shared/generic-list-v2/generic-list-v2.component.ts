import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IGenericData} from '../models/IGenericData';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-generic-list-v2',
  templateUrl: './generic-list-v2.component.html',
  styleUrls: ['./generic-list-v2.component.css']
})
export class GenericListV2Component<T> implements OnInit, OnChanges {

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
  pageSize: number = 7;
  @Input()
  filterFunction: (item: T, searchKey: string) => boolean;

  @Output()
  pageChangeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  elementClickedEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output()
  elementDeletedEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output()
  elementEditedEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output()
  elementAddedEvent: EventEmitter<void> = new EventEmitter<void>();

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

  itemClicked(item: T): void {
    this.elementClickedEvent.emit(item);
  }

  deleteItem(item: T): void {
    this.elementDeletedEvent.emit(item);
  }

  editItem(item: T): void {
    this.elementEditedEvent.emit(item);
  }

  addItem(): void {
    this.elementAddedEvent.emit();
  }
}
