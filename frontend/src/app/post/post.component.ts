import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.less',
})
export class PostComponent implements OnInit {
  async ngOnInit() {
    await this.postFacade.getPostById(1);
  }

  constructor(
    private apollo: Apollo,
    protected postFacade: PostService,
  ) {}
}
