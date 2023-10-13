/*const form = document.getElementById('myForm');

    // Escuchar el evento submit del formulario
    form.addEventListener('submit', function(event) {
      event.preventDefault();


      const labelAlignment = document.getElementById('labelAlignment').value;
      const label = document.getElementById('label').value;
      const placeholder = document.getElementById('placeholder').value;
      const required = document.getElementById('required').checked;
      const minLength = document.getElementById('minLength').value;
      const maxLength = document.getElementById('maxLength').value;
      const step = document.getElementById('step').value;

      const inputAttributes = {
        labelAlignment,
        label,
        placeholder,
        required,
        minLength,
        maxLength,
        step
      };

      console.log(inputAttributes);
    }); */

    /*console.log("hola")
    const text_box = document.querySelector('#textBox')
    const contenedor = document.querySelector('#contenedor')

    text_box.addEventListener('dragstart', e =>{
    console.log('Drag Start...')
    })

    text_box.addEventListener('dragend', e =>{
    console.log('Drag End...')
    })

     text_box.addEventListener('drag', e =>{
    console.log('Drag...')
    })*/
    //console.log(document.form_url.form_api)
  var FormStructure = {
  'category': CategoryClass,
  'number': NumberClass,
  'boolean': BooleanClass,
  'condition': ConditionClass

  }

  function  FormManager(container_id, api_url){
    var fmanager = {
        'id': container_id,
        'api_url': api_url,
        'form_data': {}, //Aqui va la informacion del formulario
        'init': function(){
            fetch(this.api_url,
            {
            headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json'}
            }
            ).then((response)=>{return response.json()}
                  ).then(this.base_request_success(this)).catch((error)=>{console.log(error)})
        },
        'base_request_success': function(instance){
            return function(data){
    //Aca esta llegadno la data
        //console.log("base_request_success-----   ",data);
        if (data && data['data']) {
        instance.form_data = data;
            instance.process_forms();

        } else {
            console.log('Error: Datos no válidos');
        }
    }
        },
        'process_forms': function(){
        let context = {'has_error': false, 'parent': this.id};
        //Aca esta llegando la data
        //console.log("ID: ",context['parent'])
        //console.log('Hola-- ',this.form_data['data']);
        this.process_children(this.form_data['data'], context);
        },
        'process_children': function(children, context){
            let keys = null;
            let indexclass = -1;
            let classM = null;
            let parent = context['parent'];
            let d = 0
            //console.log("children---- ",children," --- ",context);
            for(let i=0; i < children.length; i++){
                console.log("KEYS: ",d, Object.keys(children[i]))
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('class');
                //console.log("CLASS: ", indexclass)
                if(indexclass != -1){
                  classM = FormStructure[children[i].class]
                  parent = classM.render_data(parent, children[i]);
                  context['parent'] = parent;
                }
                indexclass = keys.indexOf('children');
                //console.log("CHILDREN: ", indexclass)
                if(indexclass !== -1){
                    this.process_children(children[i].children, context);
                }
                d++;
            }
        }
    }

    fmanager.init();
    return fmanager;
  }

 function process_form(container_id){
    var fmanager = FormManager(container_id, document.form_url.form_api);
    //fmanager.process_form();
    return fmanager;
 }

 process_form('textBox');

