
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

            //this.repositionSaveButton();
            //this.delete_component();
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
        //Aca esta llegando la data
        //console.log("ID: ",context['parent'])
        //console.log('Hola-- ',this.form_data['data']);
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
                console.log("DATA DATA::: ",data)
                let template = fmanager.form_content(data); // Usar this.form_content
                    //console.log("TEMPLATE:::: ", template);
                $(this).find('.form-components').append(template);
                fmanager.repositionSaveButton();


                fmanager.delete_component();
                $(document).on('click', '.edit-btn', function() {
                        let dataID = $(this).closest('.template').data('id');
                        let modalDataID = $("#btn_modal").data('id');
                        console.log("DATAID::::: ", dataID);

                        if (dataID === modalDataID) {

                                fmanager.edit_component(dataID);
                        } else {
                            console.log("Los IDs no coinciden.");

                        }
                        //$("#btn_modal").modal('show');
                        //fmanager.edit_component(dataID);


                    });
                }
            });

        },
        'repositionSaveButton':function(){
            let formContent = $('#form_content');
            let formComponents = formContent.find('.form-components');
            let saveButton = formContent.find('.save-button');

            formComponents.append(saveButton);
        },
        'delete_component': function(){
        $(document).on('click', '.delete-btn', function() {

        let component = $(this).closest('.template');
        let componentId = component.data('id');
        fmanager.delete_element_list(componentId);

        component.remove();

        });
        },
        'delete_element_list': function(id){
            this.list = this.list.filter(item => item.id !== id);
            console.log("LIST LIST:::: ",this.list)
        },
        'edit_component': function(dataID){

        //this.editing_modal(dataID);
        let component = $(`[data-id="${dataID}"]`);

        console.log("BOTON CON EL ID::: ", component);
        let labelElement = component.find('.label-text');
        let inputElement = component.find('.text-input');
        let descriptionElement = component.find('.description');
        let labelPosition = component.find('.card-body').attr('class').split(' ')[1];

        // Obtener los valores actuales del componente
        let label = labelElement.text();
        let placeholder = inputElement.attr("placeholder");
        let description = descriptionElement.text();
        console.log("EDITANDO:::: ",label, placeholder, description, claseLabelPosition);

        $('.modal-label').val(label);
        $('.modal-placeholder').val(placeholder);
        $('.description').val(description);
        $("#btn_modal").modal('show');
        $('.form-select').val(labelPosition);

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
        <select id="labelposition" class="form-select">
            <option value="text-left">left</option>
            <option value="text-center">center</option>
            <option value="text-right">right</option>
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
  <input class="form-check-input" type="checkbox" value="" id="required">
  <label class="form-check-label" for="required">
    Required
  </label>
</div>

      <div class="form-group">
        <label for="maximumlength">Maximum Length</label>
        <input type="number" class="form-control" value="">
    </div>

      <div class="form-group">
        <label for="minimumlength">Minimum Length</label>
        <input type="number" class="form-control" value="">
    </div>

      <div class="form-group">
        <label for="messageerror">Label Error</label>
        <input type="text" class="form-control" value="">
    </div>

  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Conditional</div>
</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="guardarCambiosBtn">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
            `;

            return modal;
        },
        'process_children': function(children, context){
            let keys = null;
            this.list = [];
            let indexclass = -1;
            let classM = null;
            let type = null;
            let parent = context['parent'];
            for(let i=0; i < children.length; i++){
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('type');
                if(indexclass != -1){
                  type = children[i].type;
            switch(type) {

                case 'textfield':
                    this.render_textfield(parent, children[i]);
                    //this.list.push(children[i]);
                    break;
                case 'number':
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
    data.id = 1;
    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
 <div class="field-type">${data.type}</div>

</div>
    `;

     let result = Sqrl.render(template, {title:data.type});
    let bodydiv = $("#"+parent);
    bodydiv.append(result);

//DRAG AND DROP
    let element = bodydiv.find("#children");
           this.makeElementDraggable(element);
    },
    'render_number': function(parent, data){
    data.id = 2;
    console.log('RENDER_NUMBER::: ', data, "PARENT:: ", parent)
    //this.qid = (Math.random() + 1).toString(36).substring(7);

    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
    <div class="field-type">${data.type}</div>
</div>
    `;

     let result = Sqrl.render(template, {title:data.type});
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

        console.log("LIST__:::: ", this.list);
        let modalTemplate = this.editing_modal(data.id);
    let template = `
    <div class="card template" data-id="${data.id}" id="${data.id}">
    <div class="card-body ${data.labelPosition}">
        <label for="input" class="form-label label-text">${data.label}</label>
        <input type="${data.inputType}" id="input" class="form-control text-input" aria-describedby="input" placeholder="${data.placeholder}" ${data.required ? 'required' : ''}>
        <div id="desciption" class="form-text description">
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
            this.list[i].label = data.label;
            this.list[i].labelPosition = data.labelPosition;
            this.list[i].placeholder = data.placeholder;
            this.list[i].description = data.description;
            this.list[i].validate.required = data.validate.required;
            this.list[i].validate.maxLength = data.validate.maxLength;
            this.list[i].validate.minLength = data.validate.minLength;
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


/*
'process_children': function(children, context){
            let keys = null;
            let indexclass = -1;
            let classM = null;
            let parent = context['parent'];

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
                console.log("CHILDREN: ", indexclass)
                if(indexclass !== -1){
                    this.process_children(children[i].children, context);
                }

            }
        }
*/