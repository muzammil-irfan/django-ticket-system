# Generated by Django 4.0.4 on 2022-05-05 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ticketsystem', '0011_payment_payment_event_alter_payment_buyer_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Payment',
        ),
    ]