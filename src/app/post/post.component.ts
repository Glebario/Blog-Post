import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { Post } from '../app.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: Post;
  @Output() onRemovePost = new EventEmitter<number>();
  @Output() onEditPost = new EventEmitter<Post>();
  @Output() onLikePost = new EventEmitter<Post>();
  @ViewChild('cardFocus', {static: false}) cardFocus: ElementRef;

  //============================================FOCUS POSTS===================================
  postFocus() {
    if (this.cardFocus.nativeElement.classList == 'card') {
      this.cardFocus.nativeElement.classList.remove('card');
      this.cardFocus.nativeElement.classList.add('cardFocus');
      this.activePostFocus = true;
    } else {
      this.cardFocus.nativeElement.classList.remove('cardFocus');
      this.cardFocus.nativeElement.classList.add('card');
      this.activePostFocus = false;
    }
  }
  activePostFocus: boolean;

  //============================================REMOVE POST===================================
  removePost(){
    // Отправка id поста в app.component.ts
    this.onRemovePost.emit(this.post.id);
  }


  //============================================EDIT POST===================================
  editPost(){
    // Отправка поста в app.component.ts
    this.onEditPost.emit(this.post);
    console.log(this.post)
  }


  //============================================LIKE POST===================================

  likePost(){
    // Отправка поста в app.component.ts
    if(this.post.like === '') {
      this.post.like = 'active';
      this.onLikePost.emit(this.post);
    } else {
      this.post.like = '';
      this.onLikePost.emit(this.post);
    }
    //console.log(this.post)
  }
}
