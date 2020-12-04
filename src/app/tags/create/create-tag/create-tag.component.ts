import {Component, OnInit} from '@angular/core';
import {AbstractCreateComponentTag} from '../abstract-create/abstract-create-component-tag';
import {TagResponseObject} from '../../contracts/responses/TagResponseObject';
import {TagsService} from '../../tags.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent extends AbstractCreateComponentTag implements OnInit {

  constructor(tagsService: TagsService) {
    super(tagsService);
  }

  ngOnInit(): void {
  }

  afterAddCleanup = (result: TagResponseObject): void => {
    this.controls.forEach(control => control.setValue(''));
  };

}
