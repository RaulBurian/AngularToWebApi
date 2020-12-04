import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../posts.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractCreateComponentPost} from '../abstract-create/abstract-create.component-post';
import {PostResponseObject} from '../../contracts/responses/PostResponseObject';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent extends AbstractCreateComponentPost implements OnInit {

  constructor(postsService: PostsService,
              public activeModal: NgbActiveModal) {
    super(postsService);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.dismiss();
  }

  afterAddCleanup = (result: PostResponseObject): void => {
    this.activeModal.close(result);
  }
}
