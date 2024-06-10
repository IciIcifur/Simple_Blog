import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { appConfig } from '../app.config';
import { firstValueFrom, map } from 'rxjs';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [appConfig.providers] });
    service = TestBed.inject(PostService);
  });

  async function getInitialLength() {
    let initialLength = await firstValueFrom(
      service.allPosts$.pipe(map((posts) => posts.length)),
    );
    if (!initialLength) {
      await service.createPost({
        content: 'Test content',
        title: 'Test title',
      });
      initialLength += 1;
    }
    return initialLength;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add posts', async () => {
    await service.createPost({ content: 'Test content', title: 'Test title' });
    service.allPosts$.subscribe((posts) =>
      expect(
        posts.find(
          (post) =>
            post.title == 'Test title' && post.content == 'Test content',
        ),
      ).toBeTruthy(),
    );
  });

  it('should remove posts', async () => {
    let initialLength = await getInitialLength();

    let firstPostId = await firstValueFrom(
      service.allPosts$.pipe(map((posts) => posts[0].id)),
    );
    await service.deletePost(firstPostId);
    let newLength = await firstValueFrom(
      service.allPosts$.pipe(map((posts) => posts.length)),
    );
    expect(initialLength).toBe(newLength + 1);
  });

  it('should edit posts', async () => {
    await getInitialLength();
    let firstPostId = await firstValueFrom(
      service.allPosts$.pipe(map((posts) => posts[0].id)),
    );
    await service.editPost({
      id: Number(firstPostId),
      title: 'Edited test title',
      content: 'Edited test content',
    });
    let editedPost = await firstValueFrom(
      service.allPosts$.pipe(
        map((posts) => posts.find((post) => post.id == firstPostId)),
      ),
    );
    expect(
      editedPost &&
        editedPost.title == 'Test title' &&
        editedPost.content == 'Test content',
    ).toBeTruthy();
  });
});
