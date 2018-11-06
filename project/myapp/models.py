from django.contrib.gis.db import models


# Create your models here.

class Icon(models.Model):
    title = models.CharField(max_length=100)
    path = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Marker(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=200, null=True, blank=True)
    point = models.PointField()
    icon = models.ForeignKey(Icon, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
