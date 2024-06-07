from django.http import HttpResponse
from django.template import loader


# Create your views here.


def render_angular(request):
    angular_template = loader.get_template("index.html")
    return HttpResponse(angular_template.render())
