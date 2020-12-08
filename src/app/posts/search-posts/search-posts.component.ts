import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {PostResponseObject} from '../contracts/responses/PostResponseObject';
import {ICollapsed} from '../../shared/models/ICollapsed';
import {PostsService} from '../posts.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css']
})
export class SearchPostsComponent implements OnInit, AfterViewInit {
  posts$: Observable<PostResponseObject[]> = of([]);
  isCollapsed: ICollapsed[] = [];
  suggestions$: Observable<PostResponseObject[]> = of([]);
  searchSubject: BehaviorSubject<string>;
  searchKey: string;

  @ViewChild('myDrop')
  dropDownRef: NgbDropdown;

  constructor(private postsService: PostsService,
              private cdRef: ChangeDetectorRef) {
    this.searchKey = '';
    this.searchSubject = new BehaviorSubject<string>(this.searchKey);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.suggestions$ = this.searchSubject.pipe(debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (searchTerm !== '') {
          this.dropDownRef?.open();
        }
        return this.postsService.getRecommended(searchTerm);
      }), catchError(error => {
        console.log(error);
        return of([]);
      }));
    this.cdRef.detectChanges();
  }

  toggleCollapse(index: number): void {
    this.isCollapsed[index].collapsed = !this.isCollapsed[index].collapsed;
  }

  searchPosts(name: string = ''): void {
    this.searchKey = name;
    this.posts$ = this.postsService.getRecommended(name).pipe(map(posts => {
      Array.from(Array(posts.length)).forEach(nr => this.isCollapsed.push({collapsed: true}));
      return posts;
    }));
  }

  changeValue(): void {
    if (this.searchKey === '') {
      this.dropDownRef?.close();
    }
    this.searchSubject.next(this.searchKey);
  }
}
