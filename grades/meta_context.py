from django.conf import settings


def meta_context(request):
    """Provide extra context information for meta tag generation."""
    return {
        'meta': {
            'title': 'Grades Calc',
            'description': 'Grades calculator.',
            'keywords': 'grades,calc,modules,exams,first,result',
            # Image to display to Google+ and Facebook
            'image': settings.STATIC_URL + 'images/social.png',
            # Facebook page ID (if any)
            'fb_page_id': '',
         }
    }
