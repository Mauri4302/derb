setting = InputSetting.objects.all()
    number_input_field = NumberInputField.objects.all()
    question_conditional = QuestionCondition.objects.all()
    context = {
        'setting':setting,
        'number_input_field':number_input_field,
        'question_conditional':question_conditional
    }