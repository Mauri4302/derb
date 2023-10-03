from django.db import models

# Create your models here.
class InputValidation(models.Model):
    required = models.BooleanField(default=False)
    minlength = models.PositiveIntegerField(default=0)
    maxlength = models.PositiveIntegerField(default=100)
    step = models.FloatField(default=1)

class InputField(models.Model):
    ALIGNMENT_CHOICES = [
        ('left', 'Left'),
        ('right', 'Right'),
        ('center', 'Center'),
    ]

    label_alignment = models.CharField(max_length=10, choices=ALIGNMENT_CHOICES)
    label = models.CharField(max_length=255)
    placeholder = models.CharField(max_length=255)
    validations = models.OneToOneField(InputValidation, on_delete=models.CASCADE)

    def __str__(self):
        return self.label