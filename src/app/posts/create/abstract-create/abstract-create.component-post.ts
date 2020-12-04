import {FormControl} from '@angular/forms';
import {PostsService} from '../../posts.service';
import {PostResponseObject} from '../../contracts/responses/PostResponseObject';

export abstract class AbstractCreateComponentPost {
  controls: FormControl[] = [];

  protected constructor(protected postsService: PostsService) {
  }

  add() {
    const tags: string[] = [];
    const name: string = this.controls[0].value;
    const tagControls = this.controls.slice(1);
    tagControls.forEach(tagControl => {
      if(tagControl.value){
        tags.push(tagControl.value);
      }
    });
    this.postsService.addPost({name, tags}).subscribe(this.afterAddCleanup)
  }

  addFormControl(formControl: FormControl) {
    this.controls.push(formControl);
  }

  abstract afterAddCleanup(result: PostResponseObject): void;
}

