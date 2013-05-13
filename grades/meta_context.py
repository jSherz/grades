from django.conf import settings


def meta_context(request):
    """Provide extra context information for meta tag generation."""
    return {
        'meta': {
            'title': 'Grades Calc',
            'description': 'Meta description.',
            'keywords': 'Meta keywords.',
            # Image to display to Google+ and Facebook
            'image': settings.STATIC_URL + 'images/facebook.jpg',
            # Facebook page ID (if any)
            'fb_page_id': '',
         }
    }
