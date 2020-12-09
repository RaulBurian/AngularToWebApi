import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TagResponseObject} from '../contracts/responses/TagResponseObject';
import {TagsService} from '../tags.service';
import {map} from 'rxjs/operators';
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
  pageSize: number = 7;

  constructor(private tagsService: TagsService, private modal: NgbModal) {
    this.tags$ = this.tagsService.getTagsPaginated(this.pageNumber, this.pageSize);
    this.tagsCount$ = this.tagsService.getTagsCount();
  }

  ngOnInit(): void {
  }

  delete = (tag: TagResponseObject): void => {
    this.tagsService.deleteTag(tag.name).subscribe(_ => {
      this.tags$ = this.tags$.pipe(map(tags => tags.filter(tg => tg.name !== tag.name)));
    });
  }

  addTagModal = (): void => {
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

  changePage(newPageNumber: number): void {
    this.tags$ = this.tagsService.getTagsPaginated(newPageNumber, this.pageSize);
  }

  filterTag(tag: TagResponseObject, key: string): boolean {
    return tag.name.includes(key);
  }
}
