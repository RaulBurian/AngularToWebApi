import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TagResponseObject} from '../contracts/TagResponseObject';
import {TagsService} from '../tags.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags$: Observable<TagResponseObject[]>;
  tagsCount$: Observable<number>;
  pageNumber: number = 1;
  filterKey: string = '';
  pageSize: number = 7;

  constructor(private tagsService: TagsService) {
    this.tags$ = this.tagsService.getTagsPaginated(this.pageNumber, this.pageSize);
    this.tagsCount$ = this.tagsService.getTagsCount();
  }

  ngOnInit(): void {
  }

  filterTags() {

  }

  deleteTag(tagName: string) {
    this.tagsService.deleteTag(tagName).subscribe(_ => {
      this.tags$ = this.tags$.pipe(map(tags => tags.filter(tag => tag.name != tagName)));
    });
  }

  addTagModal() {

  }

  changePage(newPageNumber: number) {
    this.tags$ = this.tagsService.getTagsPaginated(newPageNumber, this.pageSize);
  }
}
