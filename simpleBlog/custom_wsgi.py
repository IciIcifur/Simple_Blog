import json
from django.middleware.csrf import CsrfViewMiddleware


class CustomCsrfMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        if getattr(request, "csrf_processing_done", False):
            return None
        if getattr(callback, "csrf_exempt", False):
            return None
        try:
            body = request.body.decode("utf-8")
            body = json.loads(body)
        except (TypeError, ValueError, UnicodeDecodeError):
            return super(CustomCsrfMiddleware, self).process_view(
                request, callback, callback_args, callback_kwargs
            )

        return self._accept(request)
