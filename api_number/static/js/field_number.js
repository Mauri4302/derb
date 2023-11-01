
  /*var FormStructure = {
  'category': CategoryClass,
  'number': NumberClass,
  'boolean': BooleanClass,
  'condition': ConditionClass

  }*/

  function  FormManager(container_id, api_url){
  var list = [];
    var fmanager = {
        'qid': null,
        'id': container_id,
        'api_url': api_url,
        'form_data': {}, //Aqui va la informacion del formulario
        'init': function(){

            fetch(this.api_url,
            {
            headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json'}
            }
            ).then((response)=>{return response.json()}
                  ).then(
                  this.base_request_success(this)

                  ).catch((error)=>{console.log(error)})
        this.save_form();
        },
        'save_form': function(){
         $(document).on("submit", "#form_content_template", function(event) {
            event.preventDefault(); // Previene que el formulario se envíe normalmente

            //let formData = new FormData(form)
//            const plainFormData = Object.fromEntries(formData.entries());
//	        const formDataJsonString = JSON.stringify(plainFormData);
            // Obtén los datos del formulario
            var formData = new FormData(this);

            // Crea un objeto para almacenar los datos del formulario
            var jsonData = {};
            list.forEach(function(value, key) {
                jsonData[key] = value;
            });

            fetch("derb/save", {
            method: "POST",
             body: JSON.stringify(jsonData),
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'X-CSRFToken': fmanager.get_cookie('csrftoken'),
            }
        })
        .then(response => response.json())
        .then(data => {
        console.log("Formulario enviado con éxito:", data);
        // Puedes manejar la respuesta del servidor aquí

        })
        .catch(error => {
        console.error("Error al enviar el formulario:", error);
        });
        let clean = document.getElementById('form_content_template');
        clean.reset();
    });
        },
        'base_request_success': function(instance){
            return function(data){
    //Aca esta llegadno la data
        console.log("base_request_success-----   ",data);
        if (data && data['data']) {
        this.instance = instance;
        instance.form_data = data;
        //this.list = data;
            instance.process_forms();

        } else {
            console.log('Error: Datos no válidos');
        }
    }
        },
        'process_forms': function(){
        let context = {'has_error': false, 'parent': this.id};
        this.process_children(this.form_data['data'], context);
        let data= null;
        $("#form_content_template").droppable({
                accept: $('.builder-component'),
                activeClass: "active",
                hoverClass: "hover",
                drop: function (event, ui) {
                let idrandom = (Math.random() + 1).toString(36).substring(7);
                //console.log(ui)
                let droppedItem = ui.helper.clone();
                droppedItem.attr('id', 'textbox-'+idrandom);

                data = droppedItem.data('forms'); // Accede al atributo data-forms del elemento clonado
                console.log("DROPITEM:: ", droppedItem)
                //console.log("DATA DATA::: ",data)
               let template = fmanager.form_content(data); // Usar this.form_content



                    //console.log("TEMPLATE:::: ", template);
                $(this).find('.form-components').append(template);

                fmanager.repositionSaveButton();
                fmanager.delete_component();
                fmanager.edit_component(data.id);


                 console.log("ID_IN_DROP",data.id)

                }

            });
            $('#btn_save').on('click', fmanager.update_modal(fmanager));
//            fmanager.update_modal(fmanager);
        },
        //Metodo que me permite mantener el boton del formulario siempre abajo
        'repositionSaveButton':function(){
            let formContent = $('#form_content');
            let formComponents = formContent.find('.form-components');
            let saveButton = formContent.find('.save-button');

            formComponents.append(saveButton);
        },

        'delete_component': function(){

        $('.delete-btn').on('click', function() {
        let templateId = $(this).closest('.template').data('template');
        let template = $('[data-template="' + templateId + '"]');
        for(let i = 0; i < list.length; i++){
            if(list[i].id === templateId){
                list.splice(i, 1);

            }
        }
         if (template.length > 0) {
            // Eliminar el elemento del DOM
            template.remove();
            }
            console.log("COMPONENTE_ELIMINADO____ ")
            console.log("NUEVA LISTA DESPUES DE ELIMINAR.... ", list)
            });

        },

        'edit_component': function(btn_id) {
            let aux= null;
            $('#'+btn_id).on('click', function() {
            console.log("VAMOS A EDITAR:  ", btn_id)

            //list = list.find(item => item.id === btn_id);
            $('#current_data_id').val(btn_id);
            console.log("CLICK... ", list, "AUX... ", aux)
            $('#btn_modal').modal('show');
             list.forEach(function(item){
            if(item.id === btn_id){
                $('.modal-label').val(item.label);
                $('.modal-select').val(item.labelPosition);
                $('.modal-placeholder').val(item.placeholder);
                $('.modal-required').prop('checked', item.validate.required);
                $('.modal-max').val(item.validate.maxLength);
                $('.modal-min').val(item.validate.minLength);
                $('.modal-step').val(item.validate.step);
            }
            });
        });
        },
        'update_modal': function(fmanager) {
        var manager = fmanager;
        // Evento click en el botón de guardar cambios del modal
        var aux = {};
        return function() {
        let id_modal = $('#current_data_id').val();
         aux = list.find(item => item.id === id_modal);
            console.log("ACTUALIZANDO... ", list)
        // Obtener los valores del modal de edición
        var label = $('#labelname').val();
        var labelPosition = $('#labelposition').val();
        var placeholder = $('#placeholder').val();
        var required = $('#required').prop('checked');
        var maxLength = $('#maximumlength').val();
        var minLength = $('#minimumlength').val();
        var step = $('#step').val();


        console.log("ACTUALIZADO.... ", list)
        // Actualizar los valores en el elemento original
        var template = $('.template.active');
        template.find('.modal-label').val(label);
        template.find('.modal-select').val(labelPosition);
        template.find('.modal-placeholder').val(placeholder);
        template.find('.modal-required').prop('checked', required);
        template.find('.modal-max').val(maxLength);
        template.find('.modal-min').val(minLength);
        template.find('.modal-step').val(step);

        // Cerrar el modal de edición
        $('#btn_modal').modal('hide');

        }
        },

        'process_children': function(children, context){
            let keys = null;
            //this.list = [];
            let indexclass = -1;
            let classM = null;
            let type = null;
            let parent = context['parent'];
            for(let i=0; i < children.length; i++){
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('label');
                if(indexclass != -1){
                  type = children[i].label;
            switch(type) {

                case 'Textfield':
                    this.render_textfield(parent, children[i]);

                    break;
                case 'Number':
                    this.render_number(parent, children[i]);

                    break;

                default:

                    break;
            }

               }
        }
    },
    'render_textfield': function(parent, data){

    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
 <div class="field-type">${data.label}</div>

</div>
    `;

     let result = Sqrl.render(template, {title:data.label});
    let bodydiv = $("#"+parent);
    bodydiv.append(result);

//DRAG AND DROP
    let element = bodydiv.find("#children");
           this.makeElementDraggable(element);
    },
    'render_number': function(parent, data){

    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
    <div class="field-type">${data.label}</div>
</div>
    `;

     let result = Sqrl.render(template, {title:data.label});
    let bodydiv = $("#"+parent);
    //$(result).append("#"+parent)
    bodydiv.append(result);
       let element = bodydiv.find("#children");
           this.makeElementDraggable(element);

    },
    'makeElementDraggable': function(element) {
            this.qid = (Math.random() + 1).toString(36).substring(7);
            element.attr('id', 'textBox-' + this.qid);
            element.addClass('textbox card btn btn-info d-flex align-items-center justify-content-center');
            element.attr('draggable', true);

            element.draggable({
                revert: "invalid",
                helper: "clone",
                appendTo: "body",
                axis: false,
                cursor: "move"
            });

        },
        'form_content': function(data){

        console.log("FORM_CONTENT:::: ", data)
        let dataID = (Math.random() + 1).toString(36).substring(7);
        data.id = dataID;

        list.push(data);
        console.log("Elemento agregado a la lista:: ", list)
        let template = `
    <div class="card template template_${data.id}" data-template="${data.id}" data-template-class="template_${data.id}">
    <div class="card-body mt-3 ${data.labelPosition}" id="body-${data.id}">

        <label for="input" class="form-label label-text" id="label-${data.id}">${data.label}</label>
        <input type="${data.inputType}" id="input-${data.id}" class="form-control text-input" aria-describedby="input" minlength="${data.validate.minLength}" maxlength="${data.validate.maxLength}" step="${data.validate.step}" placeholder="${data.placeholder}" ${data.validate.required ? 'required' : ''}>
        <div id="desciption" class="form-text description" id="description-${data.id}">
            ${data.description}
        </div>


            <div class="button-container">
                <button type="button" class="btn btn-sm btn-primary btn_edit" id="${data.id}">
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
                </button>
                        <button type="button" class="btn btn-sm btn-danger delete-btn">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                    </div>
                </div>
            `;
        return template;
    },
        //Get the CSRF Token
       'get_cookie': function(name){
           return getCookie(name);
       },

    }

    fmanager.init();
    return fmanager;
  }

 function process_form(container_id){
    var fmanager = FormManager(container_id, document.form_url.form_api);
    //fmanager.process_form();
    return fmanager;
 }

 process_form('component');
