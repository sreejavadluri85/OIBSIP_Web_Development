
from django.db import models
from django.utils.text import slugify


class PortfolioProfile(models.Model):

    full_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    # Optional profile photo
    profile_photo = models.ImageField(
        upload_to="profile_photos/",
        blank=True,
        null=True
    )

    professional_title = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    description = models.TextField()

    skills = models.TextField(
        help_text="Enter skills separated by commas"
    )
    education = models.TextField()
    projects = models.TextField()

    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.full_name) or "portfolio"
            unique_slug = base_slug
            count = 1

            while PortfolioProfile.objects.filter(
                slug=unique_slug
            ).exclude(pk=self.pk).exists():

                count += 1
                unique_slug = f"{base_slug}-{count}"

            self.slug = unique_slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name
