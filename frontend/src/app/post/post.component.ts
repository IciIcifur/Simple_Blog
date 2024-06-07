import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PostService } from './post.service';
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    TuiButtonModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.less',
})
export class PostComponent implements OnInit {
  async ngOnInit() {}

  constructor(
    private apollo: Apollo,
    protected postFacade: PostService,
  ) {}

  protected readonly console = console;
}
