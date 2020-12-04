import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TagResponseObject} from '../contracts/responses/TagResponseObject';
import {TagsService} from '../tags.service';
import {filter, map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateTagModalComponent} from '../create/create-tag-modal/create-tag-modal.component';

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

  constructor(private tagsService: TagsService, private modal: NgbModal) {
    this.tags$ = this.tagsService.getTagsPaginated(this.pageNumber, this.pageSize);
    this.tagsCount$ = this.tagsService.getTagsCount();
  }

  ngOnInit(): void {
  }

  filterTags() {
    this.tags$ = this.tags$.pipe(map(tags => tags.filter(tag => tag.name?.includes(this.filterKey))));
  }

  deleteTag(tagName: string) {
    this.tagsService.deleteTag(tagName).subscribe(_ => {
      this.tags$ = this.tags$.pipe(map(tags => tags.filter(tag => tag.name != tagName)));
    });
  }

  addTagModal() {
    const modalRef = this.modal.open(CreateTagModalComponent, {size: 'lg'});
    modalRef.result.then((result: TagResponseObject) => {
      this.tags$ = this.tags$.pipe(map(tags => {
        tags.unshift(result);
        return tags.slice(0, 7);
      }));
    })
      .catch(_ => {
      });
  }

  changePage(newPageNumber: number) {
    this.tags$ = this.tagsService.getTagsPaginated(newPageNumber, this.pageSize);
    this.filterTags();
  }
}
