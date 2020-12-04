import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TagsService} from '../../tags.service';
import {AbstractCreateComponentTag} from '../abstract-create/abstract-create-component-tag';
import {TagResponseObject} from '../../contracts/responses/TagResponseObject';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-tag-modal',
  templateUrl: './create-tag-modal.component.html',
  styleUrls: ['./create-tag-modal.component.css']
})
export class CreateTagModalComponent extends AbstractCreateComponentTag implements OnInit {

  constructor(tagsService: TagsService, public activeModal: NgbActiveModal) {
    super(tagsService);
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }

  afterAddCleanup = (result: TagResponseObject): void => {
    this.activeModal.close(result);
  };
}
