# Generated by Django 4.0.4 on 2022-05-01 22:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_email'),
        ('ticketsystem', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('tId', models.AutoField(auto_created=True, primary_key=True, serialize=False, unique=True, verbose_name='ID')),
                ('QR_Code', models.TextField()),
                ('ticket_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ticketsystem.event')),
                ('ticket_owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.user')),
            ],
        ),
    ]
