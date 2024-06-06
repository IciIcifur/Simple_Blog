import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client";


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.less'
})
export class PostComponent implements OnInit {
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            post(id: 1) {
              title
              content
            }
          }
        `
      })
      .valueChanges.subscribe((result) => {
      console.log(result.data)
    });


    this.apollo.mutate({
      mutation: gql`mutation createPost {
          createPost(input: {title: "1ooops", content: "hhhhh"}) {
        post {
          id
          title
          content
    }
  }
}
        `
    }).subscribe((data) => console.log(data.data))

  }

  constructor(private apollo: Apollo
  ) {
  }
}
