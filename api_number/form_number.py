"""form = {
    'config': {
        'id': 1
    },
    'data': [
        {
            'class': 'category',
            'title': 'my category',
            'children': [
                         {
                            'class': 'category',
                            'title': 'subcategory',
                            'children': [
                                {
                                   'class': 'number', #type
                                   'description': 'test description',
                                   'placeholder': 'test',
                                   'minlength': 0,
                                   'maxlength': 0,
                                   'step': 0.1,
                                   'required': False,
                                   'children': [
                                              {
                                                  'class': 'condition',
                                                  'evaluate': '',
                                                  'children': [{

                                                  }]#more questions
                                              }
                                            ]
                                }

                            ]
                         },
                       ]
        }
    ]
} """

form = {
    'setting': {
        'name': 'form'
    },
    'data':[
{
            'id': '',
            'label': 'Textfield',
            'inputType': 'text',
            "labelPosition": "text-start",
            "placeholder": "PLace Holder...",
            "description":'',
                "validate": {
                "required": True,
                "minLength": 2,
                "maxLength": 45,
                "step": 0
                },
                "conditional": {
                "quetion_related": [''],
                "evaluate": "prueba"
            },
        },
{
            'id': '',
            'label': 'Number',
            'inputType': 'number',
            "labelPosition": "text-center",
            "placeholder": "question number",
            "description":'',
                "validate": {
                "required": False,
                "minLength": 1,
                "maxLength": 20,
                    "step": 0
            },
                "conditional": {
                "quetion_related": '',
                "evaluate": "prueba"
            },
        }
    ]
}

