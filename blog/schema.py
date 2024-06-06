from datetime import date

import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from blog.models import Post


# TYPES
class PostType(DjangoObjectType):
    class Meta:
        model = Post


# INPUTS
class CreatePostInput(graphene.InputObjectType):
    id = graphene.Int()
    date = graphene.Date()
    title = graphene.String()
    content = graphene.String()


class EditPostInput(graphene.InputObjectType):
    id = graphene.Int()
    title = graphene.String()
    content = graphene.String()


# QUERIES
class Query(ObjectType):
    post = graphene.Field(PostType, id=graphene.Int())
    posts = graphene.List(PostType)

    def resolve_post(self, info, **kwargs):
        if kwargs.get("id"):
            return Post.objects.get(pk=kwargs.get("id"))
        return None

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()


# MUTATIONS
class CreatePost(graphene.Mutation):
    class Arguments:
        input = CreatePostInput(required=True)

    ok = graphene.Boolean()
    post = graphene.Field(PostType)

    @staticmethod
    def mutate(root, info, input: CreatePostInput = None):
        ok = True

        post_instance = Post(
            title=input.title, content=input.content, date=date.today()
        )
        post_instance.save()
        return CreatePost(ok=ok, post=post_instance)


class EditPostById(graphene.Mutation):
    class Arguments:
        input = EditPostInput(required=False)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(root, info, input: EditPostInput = None):
        ok = True
        post_instance = Post.objects.get(pk=input.id)
        post_instance.title = input.title
        post_instance.content = input.content
        post_instance.save()
        return EditPostById(ok=ok)


class DeletePostById(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(root, info, id):
        ok = True
        post_instance = Post.objects.get(pk=id)
        post_instance.delete()
        return DeletePostById(ok=ok)


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    edit_post = EditPostById.Field()
    delete_post = DeletePostById.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
