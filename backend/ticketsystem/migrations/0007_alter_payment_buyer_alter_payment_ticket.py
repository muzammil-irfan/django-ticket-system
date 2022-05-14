# Generated by Django 4.0.4 on 2022-05-05 07:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_email'),
        ('ticketsystem', '0006_alter_ticket_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='buyer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to='authentication.user'),
        ),
        migrations.AlterField(
            model_name='payment',
            name='ticket',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket', to='ticketsystem.ticket'),
        ),
    ]
