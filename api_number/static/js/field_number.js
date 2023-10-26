
  var FormStructure = {
  'category': CategoryClass,
  'number': NumberClass,
  'boolean': BooleanClass,
  'condition': ConditionClass

  }

  function  FormManager(container_id, api_url){
    var fmanager = {
        'instance': null,
        'qid': null,
        'list': null,
        'id': container_id,
        'api_url': api_url,
        'form_data': {}, //Aqui va la informacion del formulario
        'init': function(){
            this.list = [];
            fetch(this.api_url,
            {
            headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json'}
            }
            ).then((response)=>{return response.json()}
                  ).then(
                  this.base_request_success(this)

                  ).catch((error)=>{console.log(error)})
            //Se llama al metodo edit_component
            //this.edit_component();
            //this.delete_component();
            //this.delete_element_list(componentId);
            console.log("INIT:: ",this.list)
        },
        'base_request_success': function(instance){
            return function(data){
    //Aca esta llegadno la data
        console.log("base_request_success-----   ",data);
        if (data && data['data']) {
        this.instance = instance;
        instance.form_data = data;
            instance.process_forms();

        } else {
            console.log('Error: Datos no válidos');
        }
    }
        },
        'process_forms': function(){
        let context = {'has_error': false, 'parent': this.id};
        this.process_children(this.form_data['data'], context);
        $("#form_content").droppable({
                accept: $('.builder-component'),
                activeClass: "active",
                hoverClass: "hover",
                drop: function (event, ui) {
                let idrandom = (Math.random() + 1).toString(36).substring(7);
                //console.log(ui)
                let droppedItem = ui.helper.clone();
                droppedItem.attr('id', 'textbox-'+idrandom);

                let data = droppedItem.data('forms'); // Accede al atributo data-forms del elemento clonado

                //console.log("DATA DATA::: ",data)
                let template = fmanager.form_content(data); // Usar this.form_content

                console.log(data.id)
                    //console.log("TEMPLATE:::: ", template);
                $(this).find('.form-components').append(template);

                fmanager.repositionSaveButton();
                //fmanager.delete_component();


                }
            });

            this.edit_component();
            this.delete_component();

            //console.log("Agregando...: ",this.list)
        },
        //Metodo que me permite matener el boton del formulario siempre abajo
        'repositionSaveButton':function(){
            let formContent = $('#form_content');
            let formComponents = formContent.find('.form-components');
            let saveButton = formContent.find('.save-button');

            formComponents.append(saveButton);
        },

        'delete_component': function(){
        let component= null;
        let id = '';
            $(document).on('click', '.delete-btn', function() {
                let btn_delete = $(this);
                component = btn_delete.closest('.template');
                id = component.data('id');
                console.log("ID a eliminar de la lista global... ", id);
                component.remove();
                console.log("Eliminado El Componente... ", id);

                // Llamar a la función delete_element_list() dentro del contexto correcto utilizando bind()
                fmanager.delete_element_list(id);
            });
                //this.delete_element_list(id);
                console.log("DELETE COMPONENT... ",this.list)
        },
        'delete_element_list': function(id){

            if (this.list) {
            console.log("IDS:: ", this.list)
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id === id) {
                        this.list.splice(i, 1);
                        console.log("Eliminado de la Lista... ",id)
                        break;
                    }

                }
                console.log("Nueva Lista... ", this.list)
             }

        },
        'edit_component': function(){
        console.log("EDIT  ELEMENTS.. ", this.list)
            let labelElement, inputElement, descriptionElement, labelPosition,checkboxRequired = null;
         $(document).on('click', '.edit-btn', function() {
                //let dataID = $(this).closest('.template').data('id');
                let btn = $(this);
                var dataID = $(this).attr('id');
                let component = btn.closest('.template');
                $("#btn_modal").modal('show');
                 labelElement = component.find('.label-text');
                 inputElement = component.find('.text-input');
                 descriptionElement = component.find('.description');
                 labelPosition = component.find('.card-body').attr('class').split(' ')[2];
                 checkboxRequired = $('.modal-required');

                console.log("ELEMENTOS::: ",labelElement,
                inputElement, descriptionElement,"Posi...", labelPosition, dataID," ----- ")

                // Obtener los valores actuales del componente
                let label = labelElement.text();
                let placeholder = inputElement.attr("placeholder");
                let modalmin = inputElement.attr("minlength");
                let modalmax = inputElement.attr("maxlength");
                let modalstep = inputElement.attr("step");
                let description = descriptionElement.text();
                let required =
                console.log("VALORES::: ",label, placeholder, modalmin, modalmax, modalstep, checkboxRequired, labelPosition)

                $('.modal-label').val(label);
                $('.modal-placeholder').val(placeholder);
                //$('.description').val(description);
                $('.form-select').val(labelPosition);
                if (inputElement.prop('required')) {
                    // Activa el checkbox del modal
                    checkboxRequired.prop('checked', true);
                }
                $('.modal-required').val(modalmax);
                $('.modal-max').val(modalmax);
                $('.modal-min').val(modalmin);
                $('.modal-step').val(modalstep);

                checkboxRequired.on('change', function() {
                   inputElement.prop('required', checkboxRequired.prop('checked'));
                });

                });
        let aux= {};
        $(document).on("click",'#guardarCambiosBtn', function() {
            let btn_save = $(this);
            let component_save = btn_save.closest('#btn_modal');
            let id_save = component_save.data('btn');
            // Obtener los valores del modal
            let label = $('.modal-label').val();
            let placeholder = $('.modal-placeholder').val();
            let labelPosition = $('.modal-select').val();
            let required = $('.modal-required').prop('checked');
            let maxText = $('.modal-max').val();
            let minText = $('.modal-min').val();
            let step = $('.modal-step').val();

            aux = {
                    id: id_save,
                    label: label,
                    inputType: 'text',
                    labelPosition: labelPosition,
                    placeholder: placeholder,
                    description:'',
                        validate: {
                            required: required,
                            minLength: minText,
                            maxLength: maxText,
                            step: step
                            },
                            conditional: {
                                quetion_related: [''],
                                evaluate: "prueba"
                            }
                    }
            // Buscar el componente correspondiente en la lista
            //let list = fmanager.list.find( item => item.id === id_save);
//                if (this.list && Array.isArray(this.list)) {
//                    for(let i = 0; i < this.list.length; i++){
//                        console.log("COMPONENT:::   ",this.list[i])
//                        if(this.list[i].id === id_save){
//                            // Actualizar los valores del componente
//                            this.list[i].label = label;
//                            this.list[i].placeholder = placeholder;
//                            this.list[i].labelPosition = labelPosition;
//                            this.list[i].validate.required = (required === 'checked' ? 'true' : 'false');
//                            this.list[i].validate.maxLength = maxText;
//                            this.list[i].validate.minLength = minText;
//                            this.list[i].validate.step = step;
//                        }
//                    }
//                    }

        // Actualizar la vista del componente
        //let componentElement = $(`[data-id="${id_save}"]`);
        labelElement.text(aux.label);
        inputElement.attr('placeholder', aux.placeholder);
        $('.card-body').removeClass().addClass(`card-body mt-4 ${aux.labelPosition}`);
        inputElement.prop('required', (aux.validate.required === 'checked' ? 'required' : ''));
        inputElement.attr('maxlength', aux.validate.maxText);
        inputElement.attr('minlength', aux.validate.minText);
        inputElement.attr('step', aux.validate.step);

        // Cerrar el modal
        $("#btn_modal").modal('hide');
        //console.log("Lista MOdificada::: ", fmanager.list)
        });

                    for(let i = 0; i < this.list.length; i++){
                        console.log("COMPONENT:::   ",this.list[i])
                        if(this.list[i].id === aux.id){
                            // Actualizar los valores del componente
                            this.list[i].label = aux.label;
                            this.list[i].placeholder = aux.placeholder;
                            this.list[i].labelPosition = aux.labelPosition;
                            this.list[i].validate.required = aux.validate.required;
                            this.list[i].validate.maxLength = aux.validate.maxText;
                            this.list[i].validate.minLength = aux.validate.minText;
                           this.list[i].validate.step = aux.validate.step;
                       }
                    }
                    console.log("Lista MOdificada::: ", this.list)

        },

        'return_data': function(id){
            for(let i=0; i< this.list.length; i++){
            if(this.list[i].id === id){
            return {
            id: this.list[i].id,
            label: this.list[i].label,
            labelPosition: this.list[i].labelPosition,
            placeholder: this.list[i].placeholder,
            description: this.list[i].description,
            validate: {
                required: this.list[i].validate.required,
                maxLength: this.list[i].validate.maxLength,
                minLength: this.list[i].validate.minLength,
                step: this.list[i].validate.step
            },
            conditional: {
                quetion_related: this.list[i].conditional.quetion_related,
                evaluate: this.list[i].conditional.evaluate
            }
            };
            }
            }
            return null;
        },

        'save_modal': function(dataID){
            let templateID = $(this).closest('.template').data('id');
            //let modalDataID = $("#btn_modal");
            console.log("SAVE MODAL::: ",modalDataID)
              if(templateID === modalDataID.data('data-id') && templateID === modalDataID.data('data-btn')) {
                 $("#guardarCambiosBtn").on("click", function() {
        // Obtener los valores del modal
        let label = $('.modal-label').val();
        let placeholder = $('.modal-placeholder').val();
        let labelPosition = $('.modal-select').val();
        let required = $('.modal-required').prop('checked');
        let maxText = $('.modal-max').val();
        let minText = $('.modal-min').val();
        let step = $('.modal-step').val();

        // Buscar el componente correspondiente en la lista
        let component = fmanager.list.find(item => item.id === dataID);
        console.log("COMPONENT:::   ",component)
        // Actualizar los valores del componente
        component.label = label;
        component.placeholder = placeholder;
        component.labelPosition = labelPosition;
        component.validate.required = required;
        component.validate.maxLength = maxText;
        component.validate.minLength = minText;
        component.validate.step = step;

        // Actualizar la vista del componente
        let componentElement = $(`[data-id="${dataID}"]`);
        componentElement.find('.label-text').text(label);
        componentElement.find('.text-input').attr('placeholder', placeholder);
        componentElement.find('.card-body').removeClass().addClass(`card-body mt-4 ${labelPosition}`);
        componentElement.find('.text-required').prop('checked', required);
        componentElement.find('.text-input').attr('maxlength',maxText);
        componentElement.find('.text-input').attr('minlength',minText);
        componentElement.find('.text-input').attr('step',step);
        // Cerrar el modal
        $("#btn_modal").modal('hide');
    });
              }

        },

        'editing_modal': function(dataID){

            let modal = `
            <!-- Modal -->
            <div class="modal fade" id="btn_modal" data-id="${dataID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-md" id="${dataID}">
    <div class="modal-content">
      <!-- <div class="modal-header"> -->
    <div class="modal-header">
         <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Display</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Validation</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Conditional</button>
  </li>
</ul>


    <!--  </div> -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      <div class="modal-body">
          <!-- ACA VA EL TAB PARA PODER GUARDAR -->

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <!-- ACA VA EL: LABELNAME, LABELPOSITION, PLACEHOLDER Y EL DESCRIPTION -->
    <div class="form-group">
        <label for="labelname">Label</label>
        <input type="text" class="form-control modal-label" value="">
    </div>

      <div class="form-group">
        <label for="labelPosition" >LabelPsition</label>
        <select id="labelposition" class="form-select modal-select">
            <option value="text-start">left</option>
            <option value="text-center">center</option>
            <option value="text-end">right</option>
        </select>
    </div>

      <div class="form-group">
        <label for="placeholder">Placeholder</label>
        <input type="text" class="form-control modal-placeholder" value="">
    </div>
      <!-- END -->
  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

    <div class="form-check">
  <input class="form-check-input modal-required" type="checkbox" id="required">
  <label class="form-check-label" for="required">
    Required
  </label>
</div>

      <div class="form-group">
        <label for="maximumlength">Maximum Length</label>
        <input type="number" class="form-control modal-max" value="">
    </div>

      <div class="form-group">
        <label for="minimumlength">Minimum Length</label>
        <input type="number" class="form-control modal-min" value="">
    </div>

      <div class="form-group">
        <label for="step">Step</label>
        <input type="text" class="form-control modal-step" value="">
    </div>

  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Conditional</div>
</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-btn="${dataID}" id="guardarCambiosBtn">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
           `;

            return modal;
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
                    //this.list.push(children[i]);
                    break;
                case 'Number':
                    this.render_number(parent, children[i]);
                    //this.list.push(children[i]);
                    break;

                default:

                    break;
            }

               }
        }
    },
    'render_textfield': function(parent, data){
    //console.log("render_textfield::: ", data, "Parent::: ", parent)
    //data.id = 1;
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
    //data.id = 2;
    //console.log('RENDER_NUMBER::: ', data, "PARENT:: ", parent)
    //this.qid = (Math.random() + 1).toString(36).substring(7);

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
        this.list.push(data);

        let modalTemplate = this.editing_modal(data);
        let template = `
    <div class="card template" data-id="${data.id}" >
    <div class="card-body mt-3 ${data.labelPosition}" id="body-${data.id}">

        <label for="input" class="form-label label-text" id="label-${data.id}">${data.label}</label>
        <input type="${data.inputType}" id="input-${data.id}" class="form-control text-input" aria-describedby="input" minlength="${data.validate.minLength}" maxlength="${data.validate.maxLength}" step="${data.validate.step}" placeholder="${data.placeholder}" ${data.validate.required ? 'required' : ''}>
        <div id="desciption" class="form-text description" id="description-${data.id}">
            ${data.description}
        </div>


            <div class="button-container">
                <button type="button" class="btn btn-sm btn-primary edit-btn" id="${data.id}"  data-bs-toggle="modal" data-bs-target="#btn_modal">
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
                </button>
                        <button type="button" class="btn btn-sm btn-danger delete-btn">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                    </div>
                </div>
            `;
        template += modalTemplate;


        return template;
    },
    'update_component': function(data){

        for(let i=0; i < this.list.length; i++){
        if(this.list[i].id === data.id){
        console.log("FOR::: ", data[i], data, this.list[i])
             data.label = this.list[i].label;
             data.labelPosition = this.list[i].labelPosition;
             data.placeholder = this.list[i].placeholder;
             data.description = this.list[i].description;
             data.validate.required = this.list[i].validate.required;
             data.validate.maxLength = this.list[i].validate.maxLength;
             data.validate.minLength = this.list[i].validate.minLength;
             data.validate.step = this.list[i].validate.step;
            return;
        }
        }

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
