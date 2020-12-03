import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostsService} from '../../posts.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractCreateComponent} from '../abstract-create/abstract-create.component';
import {PostResponseObject} from '../../contracts/PostResponseObject';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent extends AbstractCreateComponent implements OnInit {

  constructor(postsService: PostsService,
              public activeModal: NgbActiveModal) {
    super(postsService);
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }

  afterAddCleanup = (result: PostResponseObject): void => {
    this.activeModal.close(result);
  };
}
