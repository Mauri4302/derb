from contextlib import nullcontext

from django.db import models

# Create your models here.
class InputSetting(models.Model):
    placeholder = models.CharField(max_length=255, null=True)
    required = models.BooleanField(default=False)
    minlength = models.DecimalField(null=True,max_digits=18, decimal_places=2)
    maxlength = models.DecimalField(null=True,max_digits=18, decimal_places= 2)
    step = models.DecimalField(null=True,max_digits=18, decimal_places= 2)

    def __str__(self):
        return self.placeholder

class InputField(models.Model):
    ALIGNMENT_CHOICES = [
        ('text-start', 'text-start'),
        ('text-center', 'text-center'),
        ('text-end', 'text-end'),
    ]
    question = models.CharField(max_length=255, null=True)
    type = models.CharField(max_length=30, default='text')
    label_alignment = models.CharField(max_length=20, choices=ALIGNMENT_CHOICES)
    #label = models.CharField(max_length=255, default='label')
    setting = models.OneToOneField(InputSetting, on_delete=models.CASCADE)

    def __str__(self):
        return self.question

class NumberInputField(InputField):
    text_help = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.text_help

class QuestionCondition(models.Model):
    question_referent = models.ForeignKey('InputField', on_delete=models.CASCADE)
    question = models.ManyToManyField(InputField, related_name='question_word')
    condition = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.question_referent} - {self.pk} - {self.condition}"

class CustomForm(models.Model):
    description = models.CharField(max_length=230, default='myform')
    data = models.JSONField(null=True)

    # def to_json(self):
    #     return {
    #         'pk': self.pk,
    #         'description': self.description,
    #         'data': self.data,
    #     }

class FormioField(models.Model):
    label = models.CharField(max_length=255)
    input_type = models.CharField(max_length=255)
    label_position = models.CharField(max_length=255)
    placeholder = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    # Validate
    required = models.BooleanField(default=False)
    min_length = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    max_length = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    step = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)

    # Respuesta del usuario
    user_response = models.CharField(max_length=255, blank=True, null=True)

    # Relación de muchos a muchos consigo mismo para las condiciones
    conditions = models.ManyToManyField('self', through='FormioCondition', symmetrical=False, related_name='related_conditions', blank=True)

    def __str__(self):
        return self.label

class FormioCondition(models.Model):
    question = models.ForeignKey(FormioField, on_delete=models.CASCADE, related_name='condition_questions')
    condition = models.ForeignKey(FormioField, on_delete=models.CASCADE, related_name='condition_targets')
    evaluate = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.question.label} - {self.evaluate} - {self.condition.label}"
