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
            "type": "textfield",
            'inputType': 'text',
            'label': 'textfield',
            "labelPosition": "text-left",
            "placeholder": "PLace Holder...",
            "description":'',
                "validate": {
                "required": False,
                "minLength": 2,
                "maxLength": 45,
                },
                "conditional": {
                "quetion_related": '',
                "evaluate": "prueba"
            },
        },
{
            'id': '',
            "type": "number",
            'inputType': 'number',
            'label': 'Number',
            "labelPosition": "text-center",
            "placeholder": "question number",
            "description":'',
                "validate": {
                "required": False,
                "minLength": 2,
                "maxLength": 45,
            },
                "conditional": {
                "quetion_related": '',
                "evaluate": "prueba"
            },
        }
    ]
}

