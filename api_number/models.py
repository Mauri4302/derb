from django.db import models

# Create your models here.
class InputSetting(models.Model):
    placeholder = models.CharField(max_length=255)
    required = models.BooleanField(default=False)
    minlength = models.IntegerField(null=True)
    maxlength = models.IntegerField(null=True)
    step = models.FloatField(default=1)

    def __str__(self):
        return self.placeholder

class InputField(models.Model):
    ALIGNMENT_CHOICES = [
        ('text-start', 'text-start'),
        ('text-center', 'text-center'),
        ('text-end', 'text-end'),
    ]
    type = models.CharField(max_length=30, default='text')
    label_alignment = models.CharField(max_length=20, choices=ALIGNMENT_CHOICES)
    label = models.CharField(max_length=255)
    setting = models.OneToOneField(InputSetting, on_delete=models.CASCADE)

    def __str__(self):
        return self.label

class NumberInputField(InputField):
    text_help = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.text_help

class QuestionCondition(models.Model):
    question_referent = models.ForeignKey(InputField, on_delete=models.CASCADE)
    question = models.ManyToManyField(InputField, related_name='question')
    condition = models.CharField(max_length=255, null=True)

class CustomForm(models.Model):
    description = models.CharField(max_length=230, default='myform')
    data = models.JSONField(null=True)

