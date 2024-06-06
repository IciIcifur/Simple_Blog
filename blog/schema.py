from datetime import date

import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from blog.models import Post


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query(ObjectType):
    post = graphene.Field(PostType, id=graphene.Int())
    posts = graphene.List(PostType)

    def resolve_post(self, info, **kwargs):
        if kwargs.get('id'):
            return Post.objects.get(pk=kwargs.get('id'))
        return None

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()


class PostInput(graphene.InputObjectType):
    id = graphene.Int()
    date = graphene.Date()
    title = graphene.String()
    content = graphene.String()


class CreatePost(graphene.Mutation):
    class Arguments:
        input = PostInput(required=True)

    ok = graphene.Boolean()
    post = graphene.Field(PostType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True

        post_instance = Post(title=input.title, content=input.content, date=date.today())
        post_instance.save()
        return CreatePost(ok=ok, post=post_instance)


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
