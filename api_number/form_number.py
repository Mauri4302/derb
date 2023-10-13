form = {
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
}