import {FormControl} from '@angular/forms';
import {TagsService} from '../../tags.service';
import {TagResponseObject} from '../../contracts/responses/TagResponseObject';


export abstract class AbstractCreateComponentTag {
  controls: FormControl[] = [];

  protected constructor(protected tagsService: TagsService) {
  }

  add() {
    const tagName=this.controls[0].value;
    this.tagsService.addTags({name:tagName}).subscribe(this.afterAddCleanup);
  }

  addFormControl(formControl: FormControl) {
    this.controls.push(formControl);
  }

  abstract afterAddCleanup(result: TagResponseObject): void;
}

