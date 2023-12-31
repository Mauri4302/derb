# Generated by Django 4.2.7 on 2023-11-16 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(default='myform', max_length=230)),
                ('data', models.JSONField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FormioCondition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('evaluate', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='InputField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255, null=True)),
                ('type', models.CharField(default='text', max_length=30)),
                ('label_alignment', models.CharField(choices=[('text-start', 'text-start'), ('text-center', 'text-center'), ('text-end', 'text-end')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='InputSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('placeholder', models.CharField(max_length=255, null=True)),
                ('required', models.BooleanField(default=False)),
                ('minlength', models.DecimalField(decimal_places=2, max_digits=18, null=True)),
                ('maxlength', models.DecimalField(decimal_places=2, max_digits=18, null=True)),
                ('step', models.DecimalField(decimal_places=2, max_digits=18, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='NumberInputField',
            fields=[
                ('inputfield_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api_number.inputfield')),
                ('text_help', models.CharField(max_length=255, null=True)),
            ],
            bases=('api_number.inputfield',),
        ),
        migrations.CreateModel(
            name='QuestionCondition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(max_length=255, null=True)),
                ('question', models.ManyToManyField(related_name='question_word', to='api_number.inputfield')),
                ('question_referent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_number.inputfield')),
            ],
        ),
        migrations.AddField(
            model_name='inputfield',
            name='setting',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api_number.inputsetting'),
        ),
        migrations.CreateModel(
            name='FormioField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255)),
                ('input_type', models.CharField(max_length=255)),
                ('label_position', models.CharField(max_length=255)),
                ('placeholder', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('required', models.BooleanField(default=False)),
                ('min_length', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('max_length', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('step', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('user_response', models.CharField(blank=True, max_length=255, null=True)),
                ('conditions', models.ManyToManyField(blank=True, related_name='related_conditions', through='api_number.FormioCondition', to='api_number.formiofield')),
            ],
        ),
        migrations.AddField(
            model_name='formiocondition',
            name='condition',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='condition_targets', to='api_number.formiofield'),
        ),
        migrations.AddField(
            model_name='formiocondition',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='condition_questions', to='api_number.formiofield'),
        ),
    ]
