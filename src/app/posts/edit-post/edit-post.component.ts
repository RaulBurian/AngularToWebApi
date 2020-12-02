import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() postName: string = '';
  @Input() postId: string = '';

  constructor(public activeModal: NgbActiveModal,
              private postsService: PostsService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  saveAndClose() {
    this.postsService.updatePost(this.postId, this.postName)
      .subscribe(_ => this.activeModal
        .close({postId: this.postId, postName: this.postName}));
  }
}
